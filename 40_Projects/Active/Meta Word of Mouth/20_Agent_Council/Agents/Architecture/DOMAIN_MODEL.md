# Architecture Domain Model

## Freshness
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
last_verified_at: 2026-07-07
verification_scope: stored repo inspection and static verification; recheck before live claim
freshness: partial
```

## Current model
- Meta webhook path is designed as signature verification -> durable/idempotent ingestion -> normalization -> intelligence enqueue.
- Intelligence work is asynchronous and evidence-linked; direct OpenAI work does not belong in webhook ingestion.
- Attention/follow-up behavior is deterministic business logic downstream of intelligence.
- Main structural risk is growth pressure around `src/lib/intelligence/customer-intelligence.ts` and drift between temporary Supabase adapters and owned production paths.

## Model maintenance rule
When owned reality changes, rewrite this present-tense model and link evidence. Do not append a diary.
