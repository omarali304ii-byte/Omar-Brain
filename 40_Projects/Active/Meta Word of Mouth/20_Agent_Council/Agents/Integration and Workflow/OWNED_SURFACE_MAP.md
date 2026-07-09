# Integration and Workflow Owned Surface Map

## Known owned surfaces
- `app/api/inbox/conversations/[id]/messages/route.ts`
- Meta Graph API send client/adapter paths
- webhook verification and ingestion code
- Supabase Edge webhook/OAuth adapters
- provider event/message identity mapping

## Map status
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
freshness: partial
completeness: bootstrap_from_verified_assessment
```

## Rule
On revision drift, inspect changed files intersecting these surfaces first. Expand only when evidence shows a new owned surface.
