import { Pool } from "./interfaces.types";

export class State {
  height: number;
  pool: Pool;

  constructor(pool: Pool) {
    this.height = 0;
    this.pool = pool;
  }

  advance() {
    this.height += 1;
  }
}
