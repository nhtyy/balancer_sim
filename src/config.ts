import { Ticker, TokenBalance } from "./common.types";

export const config: Config = {
  seeds: [
    {
      ticker: "ETH",
      usd_price: 1900,
      startWeight: 0.5,
      targetWeight: 0.6,
    },
    {
      ticker: "BTC",
      usd_price: 29_000,
      startWeight: 0.5,
      targetWeight: 0.4,
    },
  ],
  duration_blocks: (86400 / 12) * 2, // 2 days
  starting_token_supply: 1000,
  starting_tvl: 10_000_000,
};

export type Seed = {
  ticker: Ticker;
  usd_price: number;
  startWeight: number;
  targetWeight: number;
};

export type Config = {
  seeds: Seed[];
  starting_tvl: number;
  duration_blocks: number;
  starting_token_supply: number;
};

export function from_config(config: Config): {
  tokens: Ticker[];
  prices: Map<Ticker, number>;
  seed_balances: Map<Ticker, TokenBalance>;
  start_weights: Map<Ticker, number>;
  target_weights: Map<Ticker, number>;
  duration: number;
  starting_token_supply: number;
} {
  const { seeds, duration_blocks, starting_token_supply, starting_tvl } =
    config;

  if (config.seeds.length < 2) {
    throw new Error("Must have at least 2 seeds");
  }

  let tokens = seeds.map((c) => c.ticker);
  let prices = new Map<Ticker, number>();
  let seed_balances = new Map<Ticker, number>();
  let start_weights = new Map<Ticker, number>();
  let target_weights = new Map<Ticker, number>();

  for (let seed of seeds) {
    let balance = (starting_tvl / seed.usd_price) * seed.startWeight;

    prices.set(seed.ticker, seed.usd_price);
    seed_balances.set(seed.ticker, balance);
    start_weights.set(seed.ticker, seed.startWeight);
    target_weights.set(seed.ticker, seed.targetWeight);
  }

  return {
    tokens,
    prices,
    seed_balances,
    start_weights,
    target_weights,
    duration: duration_blocks,
    starting_token_supply,
  };
}
