# Runtime and Reliability Domain Model

## Freshness
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
last_verified_at: 2026-07-07
verification_scope: stored repo inspection and static verification; recheck before live claim
freshness: partial
```

## Current model
- A stale intelligence recovery helper exists, but stored assessment found the worker loop did not call it.
- Local compose defines application service while PostgreSQL is external; self-contained reproducibility is not proven.
- Static build/typecheck/lint tests passed at stored revision, but deployed runtime, worker supervision and live providers are not proven.
- CI misses some critical production-gate checks.

## Model maintenance rule
When owned reality changes, rewrite this present-tense model and link evidence. Do not append a diary.
