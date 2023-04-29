import { TokenBalance, Ticker } from "./common.types";
import { LinearRebalance } from "./rebalance";
import { Pool, Rebalance } from "./interfaces.types";

export class BasePool implements Pool {
  tokens: Array<Ticker>;
  balances: Map<Ticker, TokenBalance>;
  rebalance: Rebalance;
  total_liquidity: number;

  constructor(
    tokens: Array<Ticker>,
    balances: Map<Ticker, TokenBalance>,
    rebalance: Rebalance,
    starting_liquidity: number
  ) {
    this.tokens = tokens;
    this.balances = balances;
    this.rebalance = rebalance;
    this.total_liquidity = starting_liquidity;
  }

  spot_price(time: number, input: Ticker, output: Ticker): number {
    let input_weight = 1 / this.rebalance.weight(time, input);
    let output_weight = 1 / this.rebalance.weight(time, output);
    let input_balance = this.balances.get(input);
    let output_balance = this.balances.get(output);

    if (input_balance === undefined || output_balance === undefined) {
      throw new Error("Invalid token, spot_price");
    }

    return (input_balance * input_weight) / (output_balance * output_weight);
  }

  swap_in(
    time: number,
    input: Ticker,
    output: Ticker,
    amount: TokenBalance
  ): TokenBalance {
    let out = this.out_given_in(time, input, output, amount);

    // we know these are both defined because of the above fn
    let initial_input_balance = this.balances.get(input);
    let initial_output_balance = this.balances.get(output);

    this.balances.set(input, initial_input_balance! + amount);
    this.balances.set(output, initial_output_balance! - out);

    return out;
  }

  out_given_in(
    time: number,
    input: Ticker,
    output: Ticker,
    amount: TokenBalance
  ): TokenBalance {
    let input_weight = this.rebalance.weight(time, input);
    let output_weight = this.rebalance.weight(time, output);
    let input_balance = this.balances.get(input);
    let output_balance = this.balances.get(output);

    if (input_balance === undefined || output_balance === undefined) {
      throw new Error("Invalid token, out_given_in");
    }

    let power = input_weight / output_weight;
    let frac = input_balance / (input_balance + amount);
    return output_balance * (1 - frac ** power);
  }

  in_given_out(
    time: number,
    input: Ticker,
    output: Ticker,
    amount: TokenBalance
  ): TokenBalance {
    return 1;
  }

  in_given_price(
    time: number,
    input: Ticker,
    output: Ticker,
    price: number
  ): TokenBalance {
    return 1;
  }

  // see https://github.com/balancer/balancer-core/blob/f4ed5d65362a8d6cec21662fb6eae233b0babc1f/contracts/BPool.sol#L367
  add_liquidity(amount: number): void {}
}

export class LinearRebalancePool extends BasePool {
  constructor(
    tokens: Array<Ticker>,
    balances: Map<Ticker, TokenBalance>,
    starting_liquidity: number,
    start_weights: Map<Ticker, number>,
    target_weights: Map<Ticker, number>,
    duration: number
  ) {
    const rebalance = new LinearRebalance(
      tokens,
      start_weights,
      target_weights,
      duration
    );

    super(tokens, balances, rebalance, starting_liquidity);
  }
}
