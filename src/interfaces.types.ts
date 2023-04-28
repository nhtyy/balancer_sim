import { Ticker, TokenBalance } from "./common.types";

export interface Rebalance {
  tokens: Array<Ticker>;
  start_weights: Map<Ticker, number>;
  target_weights: Map<Ticker, number>;
  duration: number;
  weight(time: number, token: Ticker): number;
}

export interface Pool {
  tokens: Array<Ticker>;
  balances: Map<Ticker, number>;
  rebalance: Rebalance;
  total_liquidity: number;

  /**
   *
   * @param time
   * @param input token ticker
   * @param output token ticker
   */
  spot_price(time: number, input: Ticker, output: Ticker): number;

  /**
   *
   * @param time block height
   * @param input ticker
   * @param output ticker
   * @param amount amount of input token
   * @returns amount of output token
   *
   * mutates balances
   */
  swap_in(
    time: number,
    input: Ticker,
    output: Ticker,
    amount: TokenBalance
  ): TokenBalance;

  /**
   *
   * @param time
   * @param input
   * @param output
   * @param amount
   * pure function
   */
  out_given_in(
    time: number,
    input: Ticker,
    output: Ticker,
    amount: TokenBalance
  ): TokenBalance;

  /**
   *
   * @param time
   * @param input
   * @param output
   * @param amount
   * pure function
   */
  in_given_out(
    time: number,
    input: Ticker,
    output: Ticker,
    amount: TokenBalance
  ): TokenBalance;

  /**
   *
   * @param time
   * @param input
   * @param output
   * @param price
   * pure function
   */
  in_given_price(
    time: number,
    input: Ticker,
    output: Ticker,
    price: number
  ): TokenBalance;

  /**
   *
   * @param amount
   */
  add_liquidity(amount: number): void;
}

export interface State {
  height: number;
  pool: Pool;

  advanace(): void;
}
