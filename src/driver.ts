import { State } from "./state";

export function driver(state: State, hooks: ((state: State) => void)[]) {
  let duration = state.pool.rebalance.duration;
  let tokens = state.pool.tokens;

  const before_balance_0 = state.pool.balances.get(tokens[0]);
  const before_balance_1 = state.pool.balances.get(tokens[1]);

  while (true) {
    let height = state.height;
    if (height > duration) break;

    // hooks can mutate state
    hooks.forEach((hook) => hook(state));

    state.advance();
  }

  const after_balance_0 = state.pool.balances.get(tokens[0]);
  const after_balance_1 = state.pool.balances.get(tokens[1]);

  console.log({ bleed: state.bleed });
  console.log({ arbs: state.arbs });
  console.log({
    before_balance_0,
    before_balance_1,
    after_balance_0,
    after_balance_1,
    diff_0:
      (after_balance_0! - before_balance_0!) * state.prices_usd.get(tokens[0])!,
    diff_1:
      (after_balance_1! - before_balance_1!) * state.prices_usd.get(tokens[1])!,
  });
}
