import { Pool } from "./pool";

export class State {
  height: number;
  pool: Pool;

  constructor(height: number, pool: Pool) {
    this.height = height;
    this.pool = pool;
  }

  advance() {
    this.height += 1;
  }
}
