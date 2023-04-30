import { Pool } from "./interfaces.types";

export class State {
  height: number;
  pool: Pool;
  bleed: number;
  arbs: number;

  constructor(pool: Pool) {
    this.height = 0;
    this.pool = pool;
    this.bleed = 0;
    this.arbs = 0;
  }

  advance() {
    this.height += 1;
  }
}
