# Logic and Performance Domain Model

## Freshness
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
last_verified_at: 2026-07-07
verification_scope: stored repo inspection and static verification; recheck before live claim
freshness: partial
```

## Current model
- Intelligence jobs are claimed with `FOR UPDATE SKIP LOCKED`; stale recovery logic exists separately.
- Person intelligence merges durable prior state with new evidence-derived deltas.
- Current P0 logic risk: separate jobs for the same person can compute from the same old snapshot and lose deltas or let older semantic state overwrite newer state.
- Heavy matching/scoring must narrow candidates before fuzzy/AI work as volume grows.

## Model maintenance rule
When owned reality changes, rewrite this present-tense model and link evidence. Do not append a diary.
