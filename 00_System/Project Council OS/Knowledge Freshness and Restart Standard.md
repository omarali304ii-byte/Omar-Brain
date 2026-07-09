---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [freshness, restart, stale-knowledge]
ai_access: allowed
version: 2.0
---
# Knowledge Freshness and Restart Standard

## Problem
Persistent notes can make an agent confidently wrong when the repository moves.

## Rule
Every current claim is bound to evidence scope and, for software projects, a revision when available.

## Freshness states
```text
current  -> verified against current relevant reality
partial  -> some owned surfaces verified
stale    -> known revision drift affects owned surface
unknown  -> reality unavailable
```

## Staleness triggers
Mark owned cognition stale when:
- current revision differs and owned files changed,
- schema/migration changed under a data rule,
- provider contract/runtime path changed,
- UI flow changed under a UX finding,
- worker/deployment topology changed,
- an accepted decision supersedes the model.

## Restart pointer invariant
Before any agent stops, `NEXT_START.md` must be updated.

A restart pointer is invalid if it says only:
```text
continue work
```

Valid:
```yaml
first_action: inspect updatePersonIntelligence write boundary for lost-update protection
first_files_to_open:
  - src/lib/intelligence/customer-intelligence.ts
active_finding_ids: [MWOM-DATA-003]
proof_needed_next:
  - concurrent same-person worker regression
avoid:
  - re-reading unrelated webhook ingestion
```

## No false freshness
A note edited today is not necessarily current. Freshness comes from verification, not file modification time.
