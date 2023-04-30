import { State } from "./state";

export function two_token_arb(state: State): void {
  const pool = state.pool;
  const time = state.height;
  const tokens = pool.tokens;
  let token0 = tokens[0];
  let token1 = tokens[1];
  let token0_usd = state.prices_usd.get(token0)!;
  let token1_usd = state.prices_usd.get(token1)!;
  const gas_cost_usd = 100;

  const price_1_in_0 = token1_usd / token0_usd;

  // amount in token 0 eth
  const amount_in_0 = pool.in_given_price(
    time,
    tokens[0],
    tokens[1],
    price_1_in_0
  );

  // amount in token 1 btc
  const amount_out_1 = pool.out_given_in(time, token0, token1, amount_in_0);

  const amount_in_market_price = amount_in_0 * token0_usd;
  const amount_out_market_price = amount_out_1 * token1_usd;

  const profit =
    amount_out_market_price - amount_in_market_price - gas_cost_usd;

  if (profit > 0) {
    console.log({ spot_price: pool.spot_price(time, token0, token1) });
    console.log({ price_1_in_0 });
    console.log({ profit });
    console.log({ amount_in_0, amount_out_1 });

    state.arbs += 1;
    state.bleed += gas_cost_usd + profit;
    state.pool.swap_in(time, token0, token1, amount_in_0);
  }
}
