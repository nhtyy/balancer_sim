import { State } from "./state";

export function driver(state: State) {
  while (true) {
    state.advance();

    let height = state.height;
    console.log({ height });
    if (height > 5) break;

    let tokens = state.pool.tokens;

    console.log(state.pool.out_given_in(height, tokens[0], tokens[1], 5));
  }
}
