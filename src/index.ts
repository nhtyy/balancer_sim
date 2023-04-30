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
  starting_token_supply,
  prices,
} = from_config(config);

const pool = new LinearRebalancePool(
  tokens,
  seed_balances,
  starting_token_supply,
  start_weights,
  target_weights,
  duration
);

const state = new State(pool, prices);

driver(state, [two_token_arb]);
