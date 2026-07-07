---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, architecture, web, ai]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Architecture

## Observed architecture
```text
Meta webhook
  -> raw-byte signature verification
  -> idempotent WebhookEvent persistence
  -> asset/workspace resolution
  -> Customer + Conversation + Message normalization
  -> IntelligenceJob enqueue (conflict-safe)

Intelligence worker
  -> claim job with FOR UPDATE SKIP LOCKED
  -> load bounded person/conversation context
  -> call OpenAI with strict JSON schema
  -> validate again with Zod
  -> write source-linked PersonSignal rows
  -> merge durable PersonIntelligenceSnapshot
  -> refresh deterministic Opportunity
  -> complete job only after downstream refresh succeeds

Attention engine
  -> evaluate business conditions
  -> create/update follow-up tasks idempotently
```

## Key boundaries
- Browser -> application API only.
- Application server -> database and Meta Graph API.
- Webhook handler -> ingest/store/enqueue; no OpenAI call.
- AI output -> schema validation -> evidence-linked persistence.
- Workspace authorization -> before scoped data exposure.
- Sensitive provider IDs and intelligence -> DTO-level default hiding/masking unless permission grants exposure.

## Concurrency and idempotency patterns observed
- Unique provider event/message identities.
- `ON CONFLICT DO NOTHING` for duplicate-safe enqueue and inserts.
- `FOR UPDATE SKIP LOCKED` for worker claiming.
- Stale worker lock recovery.
- Serializable webhook transactions with bounded retry.
- Migration designed for repeated execution.

## Architecture verdict
Strong separation of request ingestion, asynchronous intelligence and deterministic business logic. The main architectural risk is not the core model; it is operational maturity and future coupling as the intelligence module grows.
