# Data and Truth Owned Surface Map

## Known owned surfaces
- `prisma/schema.prisma` and migrations
- People DTO/query/search paths
- Leads routes and `opportunity-dto.ts`
- Person signal/snapshot persistence in `customer-intelligence.ts`
- provider message/event unique keys

## Map status
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
freshness: partial
completeness: bootstrap_from_verified_assessment
```

## Rule
On revision drift, inspect changed files intersecting these surfaces first. Expand only when evidence shows a new owned surface.
