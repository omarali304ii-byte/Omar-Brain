# Data and Truth Change Impact Map

## Activate this agent when
- schema or migration change (any file under `prisma/`)
- identity/merge behavior changes (`src/lib/people/`, Customer, PersonIdentity)
- permission affects sensitive data (`src/lib/auth/permissions.ts`, DTO gating)
- new derived snapshot/cache (new PersonIntelligenceSnapshot field, new cached column)
- shared-state update (`src/lib/intelligence/customer-intelligence.ts` locking changes)
- new provider identifier exposed (new route returning providerCustomerId/providerSendId/providerMessageId)
- new AI Brain schema change (`src/lib/brain/`, AiBrain, PromptVersion, KnowledgeSource)
- new status enum value (MessageStatus, ConversationStatus, IntelligenceJobStatus, etc.)
- new unique constraint or index
- new raw SQL (any `$queryRaw`, `$executeRaw`, `FOR UPDATE`, `SKIP LOCKED`, `ON CONFLICT`)
- migration with data backfill
- new cross-domain writer (e.g., a worker writing to multiple entity tables)
- existing invariant surface modified

## Cross-agent protocol
- Architecture boundary change -> handoff Architecture
- Invariant/schema/privacy truth -> handoff Data & Truth
- Provider workflow semantics -> handoff Integration & Workflow
- Concurrency/complexity -> handoff Logic & Performance
- Human-visible state meaning -> handoff Product & UX
- Worker/deployment/recovery -> handoff Runtime & Reliability
- Any closure claim -> handoff Quality Engineer; Critic for final challenge

## Specific triggers
| Change | Handoff To |
|---|---|
| `prisma/schema.prisma` model change | Data & Truth (primary), Architecture |
| New migration file | Data & Truth (verify invariants), Runtime & Reliability |
| `permissions.ts` role/permission change | Data & Truth |
| DTO adds/removes provider ID field | Data & Truth |
| `customer-intelligence.ts` locking change | Data & Truth, Logic & Performance |
| `send-message.ts` / `finalize-send.ts` change | Data & Truth, Integration & Workflow |
| `prompt-versions.ts` change | Data & Truth |
| `provider-id.ts` change | Data & Truth |
| New API route returning sensitive data | Data & Truth, Architecture |
