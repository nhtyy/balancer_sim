import { State } from "./state";

export function two_token_arb(state: State): void {
  const pool = state.pool;
  const time = state.height;
  const tokens = pool.tokens;

  const btc_usd = 29_000;
  const eth_usd = 1900;
  const gas_cost_usd = 100;

  const price_1_in_0 = btc_usd / eth_usd;

  // amount in token 0 eth
  const amount_in = pool.in_given_price(
    time,
    tokens[0],
    tokens[1],
    price_1_in_0
  );

  // amount in token 1 btc
  const amount_out = pool.out_given_in(time, tokens[0], tokens[1], amount_in);
  const amount_in_market_price = amount_in * eth_usd;
  const amount_out_market_price = amount_out * btc_usd;

  const profit =
    amount_out_market_price - amount_in_market_price - gas_cost_usd;

  if (profit > 0) {
    state.arbs += 1;
    state.bleed += gas_cost_usd + profit;
    state.pool.swap_in(time, tokens[0], tokens[1], amount_in);
  }

  console.log({ spot_price: pool.spot_price(time, tokens[0], tokens[1]) });
  console.log({ price_1_in_0 });
  console.log({ profit });
  console.log({ amount_in, amount_out });
}
