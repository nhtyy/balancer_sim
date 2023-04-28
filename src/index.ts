import { State } from "./state";
import { Ticker, TokenBalance } from "./common.types";
import { BasePool, LinearRebalancePool } from "./pool";
import { LinearRebalance } from "./rebalance";
import { config, from_config } from "./config";

// block time 12 seconds
// 2 days in blocks
const duration = (86400 / 12) * 2;

// arbitrary starting liquidity
// see balancer-core/BPool.sol finalize() for more info
const starting_liqudity: number = 1000;

function drive() {
  let { tokens, seed_balances, start_weights, target_weights } =
    from_config(config);

  let rebalance = new LinearRebalance(
    tokens,
    start_weights,
    target_weights,
    duration
  );

  let pool = new LinearRebalancePool(
    tokens,
    seed_balances,
    rebalance,
    starting_liqudity
  );

  let state = new State(pool);
}
