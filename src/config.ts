import { Ticker, TokenBalance } from "./common.types";

export const config: Config = {
  seeds: [
    {
      ticker: "ETH",
      startWeight: 0.5,
      targetWeight: 0.7,
      seedBalance: 2631.57895,
    },
    {
      ticker: "BTC",
      startWeight: 0.5,
      targetWeight: 0.3,
      seedBalance: 172.413793,
    },
  ],
  duration_blocks: (86400 / 12) * 1.5,
  starting_liqudity: 1000,
};

export type Seed = {
  ticker: Ticker;
  seedBalance: TokenBalance;
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
  let seed_balances = new Map<string, number>();
  let start_weights = new Map<string, number>();
  let target_weights = new Map<string, number>();

  for (let seed of seeds) {
    if (seed.seedBalance <= 0)
      throw new Error(`Invalid balance ${seed.ticker}`);

    seed_balances.set(seed.ticker, seed.seedBalance);
    start_weights.set(seed.ticker, seed.startWeight);
    target_weights.set(seed.ticker, seed.targetWeight);
  }

  return {
    tokens,
    seed_balances,
    start_weights,
    target_weights,
    duration: duration_blocks,
    starting_liqudity,
  };
}
