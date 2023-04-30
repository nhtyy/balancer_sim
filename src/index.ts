import { LinearRebalancePool } from "./pool";
import { config, from_config } from "./config";
import { State } from "./state";
import { driver } from "./driver";
import { two_token_arb } from "./hooks";

const {
  tokens,
  seed_balances,
  start_weights,
  target_weights,
  duration,
  starting_liqudity,
} = from_config(config);

const pool = new LinearRebalancePool(
  tokens,
  seed_balances,
  starting_liqudity,
  start_weights,
  target_weights,
  duration
);

const state = new State(pool);

const before_balance_0 = state.pool.balances.get(tokens[0]);
const before_balance_1 = state.pool.balances.get(tokens[1]);

driver(state, [two_token_arb]);

console.log({ bleed: state.bleed });
console.log({ arbs: state.arbs });
console.log({
  before_balance_0,
  before_balance_1,
  after_balance_0: state.pool.balances.get(tokens[0]),
  after_balance_1: state.pool.balances.get(tokens[1]),
});
