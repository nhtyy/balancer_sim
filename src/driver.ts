import { State } from "./state";

export function driver(state: State, hooks: ((state: State) => void)[]) {
  let duration = state.pool.rebalance.duration;

  while (true) {
    let height = state.height;
    if (height > duration) break;

    let tokens = state.pool.tokens;

    // hooks can mutate state
    hooks.forEach((hook) => hook(state));

    console.log({ height });
    console.log({
      spot_price: state.pool.spot_price(height, tokens[0], tokens[1]),
    });

    state.advance();
  }
}
