---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [memory, promotion, validation, learning]
ai_access: allowed
version: 1.0
---
# Memory Promotion Pipeline

## State machine

```text
observed
   ↓
proposed
   ↓
checking-provenance
   ↓
checking-duplicates
   ↓
checking-contradictions
   ↓
critic-review
   ↓
┌──────────────┬───────────────┬──────────────┐
▼              ▼               ▼              ▼
semantic       procedural      episode-only   rejected
candidate      candidate
   ↓              ↓
curator-commit  change-control
   ↓              ↓
reindex         curator-commit
   └──────┬───────┘
          ▼
      evaluate
          ↓
     revalidate later
```

## Proposal requirements
Every proposal needs:
- `proposal_id`,
- candidate memory class,
- target canonical note or creation reason,
- exact assertions/procedure change,
- evidence links,
- confidence,
- contradiction search result,
- privacy classification,
- expected future value.

## Decision outcomes
- `commit-semantic`
- `commit-procedural`
- `episode-only`
- `merge-existing`
- `defer-review`
- `reject`

## Automatic commit boundary
The default is **no automatic semantic or procedural commit** from a worker agent. Automatic commit may be enabled only for narrow, deterministic, tested transformations with an approved policy.
