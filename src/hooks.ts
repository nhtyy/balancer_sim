import { State } from "./state";

export function two_token_arb(state: State): void {
  const pool = state.pool;
  const time = state.height;
  const tokens = pool.tokens;

  const btc_usd = 29_000;
  const eth_usd = 1900;
  const gas_cost = 100;

  const price_0_in_1 = btc_usd / eth_usd;
  console.log({ price_0_in_1 });
  console.log({ token0: tokens[0], token1: tokens[1] });

  console.log({ spot_price: pool.spot_price(time, tokens[0], tokens[1]) });

  // 1. Buy token 0 with token 1
  // amount in is token 1 eth
  const amount_in = pool.in_given_price(
    time,
    tokens[0],
    tokens[1],
    price_0_in_1
  );

  // 2. Sell token 0 for token 1
  // amount in token 0 btc
  const amount_out = pool.out_given_in(time, tokens[0], tokens[1], amount_in);

  console.log({ amount_in, amount_out });

  const amount_out_market_price = amount_out * btc_usd;
  const amount_in_market_price = amount_in * eth_usd;

  const profit = amount_out_market_price - amount_in_market_price - gas_cost;
  console.log({ profit });
  if (profit > 0) {
    state.bleed += gas_cost + profit;
    state.pool.swap_in(time, tokens[0], tokens[1], amount_in);
  }
}
