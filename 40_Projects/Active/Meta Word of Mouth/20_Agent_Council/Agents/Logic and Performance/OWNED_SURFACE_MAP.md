# Logic and Performance Owned Surface Map

## Known owned surfaces
- `src/lib/intelligence/customer-intelligence.ts` — merge, claim, persistence and orchestration
- `scripts/customer-intelligence-worker.ts` — processing loop
- matching/dedup/people search paths
- opportunity scoring/ranking helpers
- DB queries used by bounded context loading

## Map status
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
freshness: partial
completeness: bootstrap_from_verified_assessment
```

## Rule
On revision drift, inspect changed files intersecting these surfaces first. Expand only when evidence shows a new owned surface.
