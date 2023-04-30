import { Pool } from "./interfaces.types";

export class State {
  height: number;
  pool: Pool;
  prices_usd: Map<string, number>;
  bleed: number;
  arbs: number;

  constructor(pool: Pool, prices_usd: Map<string, number>) {
    this.height = 0;
    this.bleed = 0;
    this.arbs = 0;

    this.pool = pool;
    this.prices_usd = prices_usd;
  }

  advance() {
    this.height += 1;
  }
}
