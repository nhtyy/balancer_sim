export type Config = {
  ticker: string;
  startWeight: number;
  targetWeight: number;
  seedBalance: number;
}[];

export const config: Config = [
  {
    ticker: "ETH",
    startWeight: 0.5,
    targetWeight: 0.7,
    seedBalance: 100,
  },
  {
    ticker: "BTC",
    startWeight: 0.5,
    targetWeight: 0.3,
    seedBalance: 100,
  },
];

export function from_config(config: Config): {
  tokens: string[];
  seed_balances: Map<string, number>;
  start_weights: Map<string, number>;
  target_weights: Map<string, number>;
} {
  let tokens = config.map((c) => c.ticker);
  let seed_balances = new Map<string, number>();
  let start_weights = new Map<string, number>();
  let target_weights = new Map<string, number>();

  for (let c of config) {
    seed_balances.set(c.ticker, c.seedBalance);
    start_weights.set(c.ticker, c.startWeight);
    target_weights.set(c.ticker, c.targetWeight);
  }

  return {
    tokens,
    seed_balances,
    start_weights,
    target_weights,
  };
}
