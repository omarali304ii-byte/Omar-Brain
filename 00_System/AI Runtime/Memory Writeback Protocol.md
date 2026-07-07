---
type: system
status: active
created: 2026-07-07
topics: [ai, memory, writeback]
ai_access: allowed
---
# Memory Writeback Protocol

After a meaningful execution batch, write back only durable value.

## Mandatory project writeback
- `09_CURRENT_STATE.md`: current truth changes,
- `10_EXECUTION_QUEUE.md`: task state/next work,
- `80_Runs/`: append run record,
- `70_Evidence/`: durable verification evidence when needed,
- `20_Decisions/`: only meaningful choices.

## Learning writeback candidates
- exact failure signature,
- verified root cause,
- reusable fix,
- repeated architecture insight,
- anti-pattern,
- cross-project pattern,
- standard change proposal.

## Anti-noise rule
Do not create a note for every command, thought, or tiny edit. Run records can summarize transient steps while preserving critical evidence.
