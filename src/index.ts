import { LinearRebalancePool } from "./pool";
import { config, from_config } from "./config";
import { State } from "./state";
import { driver } from "./driver";

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

driver(state, []);
