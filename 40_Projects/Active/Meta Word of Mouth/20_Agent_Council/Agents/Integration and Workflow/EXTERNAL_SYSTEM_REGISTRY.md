# Integration and Workflow — External System Registry

```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
freshness: current_for_verified_scope
```

## System: Meta Graph API

```yaml
provider: Meta (Facebook)
status: active
owned_by: Integration & Workflow
direction: bidirectional (inbound webhooks + outbound messages + OAuth + publishing + inbox sync)

entrypoints:
  inbound:
    - POST /api/meta/webhook (legacy Social)
    - POST /api/meta/webhooks/social (Social)
    - POST /api/meta/webhooks/whatsapp (WhatsApp)
    - supabase/functions/meta-webhook (Edge adapter)
  outbound:
    - POST /{assetId}/messages (FB, WA)
    - POST /me/messages (IG)
    - GET /debug_token
    - GET /oauth/access_token
    - GET /me/accounts (asset discovery)
    - POST /{igUserId}/media (IG publishing)
    - POST /{igUserId}/media_publish (IG publishing)
    - GET /me/conversations (IG sync)
    - GET /{pageId}/conversations (FB sync)

credentials:
  - META_SOCIAL_APP_ID / META_SOCIAL_APP_SECRET
  - META_WHATSAPP_APP_ID / META_WHATSAPP_APP_SECRET
  - META_TOKEN_ENCRYPTION_KEY (AES-256-GCM)
  - META_WHATSAPP_SYSTEM_USER_TOKEN (WhatsApp highest priority)
  - Per-asset encrypted accessToken in metaAsset/connection rows

token_resolution: resolveMetaSendToken (WhatsApp system token → asset token → connection token → error)
  Each token decrypted and verified via debug_token before use

api_base:
  - https://graph.facebook.com/v25.0 (Main Graph API)
  - https://graph.instagram.com/v25.0 (IG direct messaging)

api_version: v25.0 (META_GRAPH_API_VERSION)

operations:
  incoming_events: messaging events (FB/IG), changes events (WA/IG)
  outgoing_calls: send text, send template (WA), create/publish media (IG), sync conversations, debug token, asset discovery, OAuth token exchange

retry_policy: no automatic outbound retry; webhook serialization retry up to 3; Instagram publish exponential backoff for transient errors

timeout_policy: no explicit fetch timeout — Meta API calls have no upper bound; stale SENDING threshold (5 min) is backstop

idempotency:
  inbound: providerEventId UNIQUE + FOR UPDATE + processedAt guard
  outbound: NONE (no idempotency key sent to Meta; no dedup on conversation+text)
  Instagram: publishAttemptedAt/providerContainerId guard prevents re-publish

reconciliation:
  outbound: recoverStaleOutboundSends (stale SENDING → RECONCILIATION_REQUIRED), reconcileProviderAcceptedSend (RECONCILIATION_REQUIRED + providerSendId → SENT)
  intelligence: recoverStaleIntelligenceJobs (stale PROCESSING → PENDING or FAILED)

observability: console.warn/error with redacted fields (no raw tokens/secrets/signatures); fbtrace_id prefix for Meta error correlation

tests:
  - send-reconciliation
  - webhook-idempotency (9 tests)
  - intelligence-worker pipeline tests
  - OAuth flow: no test found
  - inbox sync: no test found

runtime_dependency: Meta API must be reachable for send, OAuth, publishing, and inbox sync; webhook ingestion depends on Meta delivering to correct endpoint

known_risks:
  - MWOM-INT-001: transport exception collapsed to FAILED, cannot distinguish "Meta accepted" from "never reached Meta"
  - No HTTP timeouts on fetch calls to Meta
  - Outbound sends lack idempotency
  - Production worker deployment is unproven
  - Two parallel send paths (route duplicates dedicated workflow)

evidence: full static inspection of src/lib/meta/*, src/lib/messaging/*, app/api/* routes, scripts/* workers, supabase/functions/*
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```

## System: OpenAI

```yaml
provider: OpenAI
status: active
owned_by: Integration & Workflow (API integration) / Logic & Performance (model behavior)
direction: outbound-only (API calls; no inbound from OpenAI)

entrypoints:
  - src/lib/ai/suggestions.ts (AI reply suggestions)
  - src/lib/intelligence/customer-intelligence.ts (customer intelligence)

credentials:
  - OPENAI_API_KEY
  - OPENAI_MODEL (default: gpt-4.1-mini)
  - OPENAI_INTELLIGENCE_MODEL (falls back to OPENAI_MODEL)

token_resolution: process.env.OPENAI_API_KEY directly

api_base: https://api.openai.com/v1/responses (NOT configurable)

api_version: Responses API (NOT Chat Completions); json_schema strict mode for structured output

operations:
  outgoing_calls:
    - POST /v1/responses (AI suggestions — 20s timeout)
    - POST /v1/responses (customer intelligence — 25s timeout)
  incoming_events: NONE

retry_policy: no automatic retry; fallback to rule-based suggestion on OpenAI failure for suggestions; throws CustomerIntelligenceError for intelligence (no fallback)
timeout_policy: 20s (suggestions), 25s (intelligence); no retry on timeout

idempotency: N/A (read-only generation; writes are to local DB with unique constraints)
reconciliation: N/A

observability: console.warn on failures; error classification

tests:
  - intelligence-worker pipeline tests (implicitly test OpenAI integration)
  - no standalone OpenAI mock/fallback tests

runtime_dependency: OpenAI API must be reachable for AI suggestions and intelligence; missing API key → fallback or error

known_risks:
  - No OpenAI SDK version pinning (raw fetch, no dependency tracking)
  - Intelligence has no fallback if OpenAI is unavailable
  - No explicit retry on transient OpenAI errors
  - Model migration risk (gpt-4.1-mini → future model; no model version lock)

evidence: src/lib/ai/suggestions.ts, src/lib/intelligence/customer-intelligence.ts
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```

## System: Supabase

```yaml
provider: Supabase
status: active (PostgreSQL hosting + Edge Functions as temporary adapters)
owned_by: Runtime & Reliability (infrastructure) / Integration & Workflow (edge function adapters)
direction: infrastructure (not business provider)

entrypoints:
  - PostgreSQL: DATABASE_URL (port 5432 for local app, 6543 for edge functions with pgbouncer)
  - Edge Functions:
    - meta-webhook (verify_jwt=false)
    - meta-oauth-callback (verify_jwt=false)

credentials:
  - DATABASE_URL
  - Supabase project ref: qrrnfrzpneqiursxtfdp
  - Region: eu-west-2

operations:
  - PostgreSQL hosting (via @prisma/adapter-pg)
  - pgvector extension (1536-dim embeddings via text-embedding-3-small)
  - Edge Functions serve as public HTTPS endpoints for Meta webhook + OAuth callback

retry_policy: N/A (database is synchronous; edge functions are single-shot)

known_risks:
  - Edge Functions are documented as "temporary development infrastructure"
  - Dual connection strategy (local app vs edge functions use different pool ports)
  - Supabase is NOT used for auth or any database-adjacent service
  - No edge function monitoring or observability

evidence: supabase/functions/*, .env.local, supabase/.env, docker-compose*.yml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```

## System: Local Media Storage

```yaml
provider: Local Filesystem
status: active
owned_by: Architecture
direction: internal storage

operations:
  - file storage for media assets
  - public media serving via /api/public/media/{publicToken}
  - SHA-256 validation, size limits

credentials:
  - MEDIA_STORAGE_ROOT (default: ~/.word-of-mouth/media)
  - MEDIA_PUBLIC_BASE_URL

known_risks:
  - No cloud storage redundancy
  - Public URL must be HTTPS for Meta to fetch Instagram images
  - No CDN

evidence: src/lib/media/local-media-storage.ts, src/lib/media/media-config.ts
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```

## Systems explicitly NOT present

| System | Status | Evidence |
|--------|--------|----------|
| Email provider (SendGrid, Resend, etc.) | not present | no SMTP/integration code, no email dependencies |
| Third-party auth (NextAuth, Clerk, Supabase Auth) | not present | custom session-cookie auth only |
| Analytics (PostHog, GA4, Mixpanel) | not present | no analytics integration code |
| Cloud storage (S3, Cloudinary) | not present | local filesystem only |
| Redis / message queue / event bus | not present | DB-backed job queue only |
