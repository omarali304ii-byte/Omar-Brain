# Architecture Owned Surface Map

## Known owned surfaces
- `src/lib/intelligence/customer-intelligence.ts` — major orchestration hotspot
- `scripts/customer-intelligence-worker.ts` — worker boundary/runtime wiring
- `app/api/inbox/conversations/[id]/messages/route.ts` — outbound send application boundary
- Meta webhook/OAuth adapters and temporary Supabase Edge paths
- Prisma/domain/service boundaries referenced by current project map

## Map status
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
freshness: partial
completeness: bootstrap_from_verified_assessment
```

## Rule
On revision drift, inspect changed files intersecting these surfaces first. Expand only when evidence shows a new owned surface.
