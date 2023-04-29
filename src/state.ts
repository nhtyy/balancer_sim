import { Pool } from "./interfaces.types";

export class State {
  height: number;
  pool: Pool;
  message: string;

  constructor(pool: Pool) {
    this.height = 0;
    this.pool = pool;
    this.message = "";
  }

  advance() {
    this.height += 1;
  }
}
