import { Ticker, TokenBalance } from "./common.types";

export const config: Config = {
  seeds: [
    {
      ticker: "ETH",
      usd_price: 1900,
      startWeight: 0.5,
      targetWeight: 0.6,
      seedBalance: 2631.57895,
    },
    {
      ticker: "BTC",
      usd_price: 29_000,
      startWeight: 0.5,
      targetWeight: 0.4,
      seedBalance: 172.413793,
    },
  ],
  duration_blocks: (86400 / 12) * 2,
  starting_liqudity: 1000,
};

export type Seed = {
  ticker: Ticker;
  seedBalance: TokenBalance;
  usd_price: number;
  startWeight: number;
  targetWeight: number;
};

export type Config = {
  seeds: Seed[];
  duration_blocks: number;
  starting_liqudity: number;
};

export function from_config(config: Config): {
  tokens: Ticker[];
  prices: Map<Ticker, number>;
  seed_balances: Map<Ticker, TokenBalance>;
  start_weights: Map<Ticker, number>;
  target_weights: Map<Ticker, number>;
  duration: number;
  starting_liqudity: number;
} {
  const { seeds, duration_blocks, starting_liqudity } = config;

  if (config.seeds.length < 2) {
    throw new Error("Must have at least 2 seeds");
  }

  let tokens = seeds.map((c) => c.ticker);
  let prices = new Map<Ticker, number>();
  let seed_balances = new Map<Ticker, number>();
  let start_weights = new Map<Ticker, number>();
  let target_weights = new Map<Ticker, number>();

  for (let seed of seeds) {
    if (seed.seedBalance <= 0)
      throw new Error(`Invalid balance ${seed.ticker}`);

    prices.set(seed.ticker, seed.usd_price);
    seed_balances.set(seed.ticker, seed.seedBalance);
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
    starting_liqudity,
  };
}
