---
type: system
status: active
created: 2026-07-07
topics: [ai, resume, interruption, recovery]
ai_access: allowed
---
# Interruption and Resume Protocol

Use after crash, context reset, user interruption, model handoff, or long pause.

## Resume sequence
1. resolve canonical project,
2. load latest active checkpoint,
3. inspect current Git/workspace state,
4. compare revision and changed files,
5. inspect whether external dependencies changed,
6. revalidate the last trusted milestone,
7. reconcile queue/task graph,
8. continue exact next action.

## Never do
- restart from vague memory,
- assume previous agent's unverified claim,
- discard uncommitted work,
- rerun destructive steps blindly,
- create a second parallel task graph without reconciliation.
