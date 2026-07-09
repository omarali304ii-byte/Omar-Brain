# Runtime and Reliability Owned Surface Map

## Known owned surfaces
- `scripts/customer-intelligence-worker.ts`
- stale recovery helper in intelligence module
- `docker-compose.yml`
- `.github/workflows/verify.yml`
- deployment/server adapters
- runtime health/logging/metrics configuration

## Map status
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
freshness: partial
completeness: bootstrap_from_verified_assessment
```

## Rule
On revision drift, inspect changed files intersecting these surfaces first. Expand only when evidence shows a new owned surface.
