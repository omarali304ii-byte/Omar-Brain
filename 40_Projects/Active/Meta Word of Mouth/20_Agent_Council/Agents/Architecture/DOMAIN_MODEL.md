# Architecture Domain Model

## Freshness
```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-09
verification_scope: full live-repo architecture inspection and Brain reconciliation
freshness: current
```

## Architecture Map

```text
Meta Webhook Ingress
  -> raw-byte signature verification (per-profile: Social/WhatsApp)
  -> idempotent WebhookEvent persistence (payloadHash dedup)
  -> normalization (workspace resolution)
  -> intelligence job enqueue (ON CONFLICT sourceMessageId DO NOTHING)
  -> return acknowledgment

Intelligence Worker (scripts/customer-intelligence-worker.ts)
  -> stale lock recovery at startup + periodic (recoverStaleIntelligenceJobs)
  -> claim pending job (FOR UPDATE SKIP LOCKED, ordered by createdAt)
  -> context load (person, conversation messages, source message)
  -> AI analyzer via OpenAI Responses API (json_schema strict mode, model fallback chain)
  -> result validation (Zod schema, source-order tiebreak for concurrent updates)
  -> evidence-linked persistence (signals, snapshot merge, DURABLE_MEMORY merging)
  -> opportunity refresh (opportunity-engine)
  -> complete / retry / fail (PENDING/PROCESSING states with attempt counting)

Outbound Messaging
  -> authenticated route (POST /api/inbox/conversations/[id]/messages, send_message permission)
  -> validation (text, suggestion ownership, token/resolve, reply window)
  -> local SENDING record creation
  -> provider send (Meta Graph API via meta-send-client)
  -> three-outcome model:
    * SENT: provider accepted + local finalization succeeded
    * FAILED: provider rejected or MetaSendError thrown
    * RECONCILIATION_REQUIRED: provider accepted but local finalization failed
  -> reconciliation worker (scripts/outbound-send-reconciliation-worker.ts)
    * recovers stale SENDING records (>5min since lastSendAttemptAt)
    * human-initiated reconciliation for RECONCILIATION_REQUIRED messages

AI Brain Subsystem
  -> API routes: thin transport layer (auth + validation + domain invocation)
    * GET /api/ai-brain — ensureBrainForWorkspace, return profile
    * GET /api/ai-brain/overview — full overview with knowledge counts
    * GET|POST /api/ai-brain/prompt — list/save drafts
    * POST /api/ai-brain/prompt/versions/[id]/publish — publish a draft
    * GET /api/ai-brain/domains — list knowledge domains
    * POST /api/ai-brain/test — placeholder for test lab
  -> domain modules (src/lib/brain/):
    * brain-profile.ts — workspace-scoped Brain lifecycle (ensure, get overview)
    * prompt-versions.ts — DRAFT -> PUBLISHED -> SUPERSEDED lifecycle, locking (FOR UPDATE)
    * domains.ts — knowledge domain listing with source counts
    * constants.ts — embedding config, default domains, limits
    * brain-errors.ts — typed error hierarchy (BrainError)
    * route-errors.ts — BrainError -> HTTP mapping
  -> repository abstraction:
    * knowledge.repository.ts — KnowledgeRepository interface
    * pgvector-knowledge.repository.ts — PostgreSQL/pgvector implementation
  -> persistence: pgvector extension, KnowledgeChunk with 1536-dim embeddings
  -> permissions: view_ai_brain, manage_ai_brain, test_ai_brain (OWNER+ADMIN)
  -> schema: AiBrain, AiBrainPromptVersion, KnowledgeDomain, KnowledgeSource,
     KnowledgeSourceVersion, KnowledgeChunk

Opportunity/Leads
  -> evidence-linked signals -> opportunity scoring
  -> stage/status lifecycle with overrides
  -> intelligence evidence gated behind view_intelligence permission
  -> provider-ID privacy gated behind canExposeProviderId

Conversation/Inbox
  -> per-workspace conversations scoped by customer + asset
  -> dual-profile Meta sync (Instagram + Facebook)
  -> deterministic message ordering (timeMs -> createdAt tiebreak)

Workspace/Tenant
  -> workspace isolation at schema level (all models have workspaceId)
  -> role-based permissions: OWNER, ADMIN, AGENT, VIEWER

## Current structural strengths
- Webhook ingress remains pure: verify -> persist -> enqueue, no AI leakage
- Intelligence is fully async, evidence-linked, with schema-validated AI output
- Stale intelligence lock recovery is now wired into worker startup + periodic ticks
- Outbound messaging has explicit three-outcome uncertainty model with reconciliation lifecycle
- AI Brain is a coherent new bounded subsystem with proper layer separation
- AI Brain has repository interface abstraction (not direct pgvector coupling in domain logic)
- AI Brain prompt lifecycle has DRAFT/PUBLISHED/SUPERSEDED with locking
- Meta profiles are separated (Social vs WhatsApp) with multi-profile OAuth

## Current structural risks
- MWOM-ARCH-001: Outbound send route duplicates send-message.ts workflow —
  route directly orchestrates Meta send + local persistence + reconciliation,
  duplicating the dedicated sendConversationMessage function
- MWOM-ARCH-002: Inbox messages route owns cross-domain orchestration
  (send + AI feedback + reconciliation marking in same handler)
- customer-intelligence.ts remains at 865 lines; not yet urgent to split but
  change pressure will accumulate
- MWOM-ARCH-004: AI Brain test lab endpoint is a placeholder (no runtime execution)
- pgvector dependency is a runtime infrastructure requirement (not auto-provisioned)

## Model maintenance rule
When owned reality changes, rewrite this present-tense model and link evidence.
Do not append a diary.
