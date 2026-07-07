---
type: system
status: active
created: 2026-07-07
topics: [documentation, drift, project]
ai_access: allowed
---
# Documentation Drift Policy

Documentation is part of completion when it controls future execution.

## Drift classes
- `intent-drift`: architecture/requirements changed but docs did not,
- `implementation-drift`: docs claim behavior code does not have,
- `state-drift`: current-state note is stale,
- `queue-drift`: tasks no longer match reality,
- `runbook-drift`: operational steps no longer work.

## Rule
When an agent discovers drift, it must either:
- repair it in scope,
- create a ready task with evidence,
- or record a blocker.

It may not silently rely on stale docs.
