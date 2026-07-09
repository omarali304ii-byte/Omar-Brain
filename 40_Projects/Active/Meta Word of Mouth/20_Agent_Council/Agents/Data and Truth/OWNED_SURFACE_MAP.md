# Data and Truth Owned Surface Map

## Map status
```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
freshness: current_for_verified_scope
completeness: comprehensive_static
```

## Owned surfaces

### Schema and migrations
- `prisma/schema.prisma` — canonical data model definition
- `prisma/migrations/*/migration.sql` — all migration files defining schema reality
- Why: source of truth for all models, constraints, enums, and relationships

### Tenant boundaries
- `src/lib/auth/permissions.ts` — role-to-permission mapping, defines who can see what
- `src/lib/auth/api-auth.ts` — requireApiPermission gate
- Why: defines workspace isolation and data access gates

### Person / Customer / Identity
- `src/lib/people/people-dto.ts` — person DTO mapping with provider ID masking
- `src/lib/people/people-query.ts` — person search/listing with permission gates
- `app/api/people/route.ts` — people list API
- `app/api/people/[id]/route.ts` — people detail API
- Why: identity truth, provider ID exposure control, person-customer relationship

### Leads / Opportunities
- `src/lib/opportunities/opportunity-dto.ts` — opportunity DTO with evidence gating and provider ID masking
- `app/api/leads/route.ts` — leads list API
- `app/api/leads/[id]/route.ts` — leads detail API
- Why: evidence visibility gating, provider ID exposure, system-derived vs human-override truth

### Inbox / Conversations
- `src/lib/inbox/inbox-dto.ts` — inbox DTO with provider ID masking
- `app/api/inbox/conversations/route.ts` — inbox list API
- `app/api/inbox/conversations/[id]/route.ts` — inbox detail API
- `app/api/inbox/conversations/[id]/messages/route.ts` — message send route with feedback recording
- Why: provider ID masking in conversation display, send-complete feedback recording

### Intelligence / Signals / Snapshots
- `src/lib/intelligence/customer-intelligence.ts` — intelligence job processing, snapshot persistence, FOR UPDATE locking
- `src/lib/intelligence/source-order.ts` — deterministic source ordering for concurrency
- `scripts/customer-intelligence-worker.ts` — worker loop
- Why: invariant surfaces for job idempotency, snapshot concurrency, stale recovery

### Message send pipeline
- `src/lib/messaging/send-message.ts` — three-outcome send workflow
- `src/lib/messaging/finalize-send.ts` — post-accept finalization (message + conversation + audit)
- `src/lib/messaging/send-reconciliation.ts` — stale SENDING recovery + human reconciliation
- `scripts/outbound-send-reconciliation-worker.ts` — reconciliation worker
- Why: send state transitions, RECONCILIATION_REQUIRED semantics, idempotency

### AI Brain
- `src/lib/brain/prompt-versions.ts` — prompt version lifecycle with FOR UPDATE locking
- `src/lib/brain/brain-profile.ts` — brain profile management
- `src/lib/brain/repositories/pgvector-knowledge.repository.ts` — knowledge chunk storage
- `prisma/migrations/20260709120000_ai_brain_foundation/migration.sql` — AI Brain schema foundation
- Why: prompt version invariants, active prompt authority, knowledge chunk truth

### Provider ID privacy
- `src/lib/privacy/provider-id.ts` — centralized masking + exposure gating
- Why: the single function controlling provider ID visibility across all surfaces

### AI Suggestion usage
- `src/lib/ai/suggestion-usage.ts` — usage classification (USED_AS_IS vs EDITED_BEFORE_SEND)
- `app/api/ai/suggestions/[id]/feedback/route.ts` — feedback recording with pre-send rejection
- Why: suggestion usage truth, send-success attribution

### Data-sensitive tests
- `scripts/test-route-security.ts` — permission/authorization tests across routes
- `scripts/test-intelligence-ordering-concurrency.ts` — concurrent snapshot update tests
- `scripts/test-intelligence-memory-concurrency.ts` — concurrent memory merge tests
- `scripts/test-intelligence-stale-lock-recovery.ts` — stale lock recovery tests
- `scripts/test-message-send-integrity.ts` — send pipeline integrity tests
- `scripts/test-send-reconciliation.ts` — reconciliation lifecycle tests
- `scripts/test-ai-suggestion-usage.ts` — suggestion usage attribution tests
- `scripts/test-ai-brain-prompt-versioning.ts` — prompt version invariant tests
- `scripts/test-ai-brain-isolation.ts` — AI Brain workspace isolation tests
- `scripts/test-ai-brain-permissions.ts` — AI Brain permission tests
- `scripts/test-intelligence-permissions.ts` — intelligence permission tests
- `scripts/test-people-api.ts` — people API tests
- `scripts/test-clean-migration.ts` — clean migration tests
- Why: these tests are the evidence for data invariants; Data & Truth owns their proof scope
