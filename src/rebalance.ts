import { Ticker } from "./common.types";
import { Rebalance } from "./interfaces.types";

export class LinearRebalance implements Rebalance {
  tokens: Array<Ticker>;
  start_weights: Map<Ticker, number>;
  target_weights: Map<Ticker, number>;
  duration: number;

  constructor(
    tokens: Array<Ticker>,
    start_weights: Map<Ticker, number>,
    target_weights: Map<Ticker, number>,
    duration: number
  ) {
    this.tokens = tokens;
    this.start_weights = start_weights;
    this.target_weights = target_weights;
    this.duration = duration;
  }

  scalar(token: Ticker): number {
    let target_weight = this.target_weights.get(token);
    let start_weight = this.start_weights.get(token);

    if (target_weight === undefined || start_weight === undefined) {
      throw new Error("Invalid token, scalar");
    }

    return (target_weight - start_weight) / this.duration;
  }

  weight(time: number, token: Ticker): number {
    let start_weight = this.start_weights.get(token);

    if (start_weight === undefined) {
      throw new Error("Invalid token, weight");
    }

    return start_weight + this.scalar(token) * time;
  }
}
