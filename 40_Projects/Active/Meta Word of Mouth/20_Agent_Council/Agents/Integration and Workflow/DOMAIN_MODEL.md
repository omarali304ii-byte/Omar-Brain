# Integration and Workflow Domain Model

```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-10
verification_scope: full integration-surface code inspection (messaging, webhooks, Meta clients, workers, reconciliation, API routes, Prisma schema, tests, scripts)
freshness: current_for_verified_scope
```

## System topology

Three external provider roles exist:
1. **Meta Graph API v25.0** — inbound webhooks (Social + WhatsApp), outbound messages (FB/IG/WA), OAuth connection, Instagram publishing, inbox sync
2. **OpenAI** (Responses API via `https://api.openai.com/v1/responses`) — AI suggestions, customer intelligence analysis; no `openai` SDK — raw `fetch()` only
3. **Supabase** — PostgreSQL hosting (not auth); Edge Functions (`meta-webhook`, `meta-oauth-callback`) as temporary HTTPS adapters; project ref `qrrnfrzpneqiursxtfdp`, region `eu-west-2`

No other external providers (no email, analytics, auth, cloud storage).

## Inbound webhook lifecycle

```
Meta POST → signature verification (HMAC-SHA256, raw bytes → timingSafeEqual)
→ payload parsing (Messenger / Instagram / WhatsApp changes)
→ Serializable transaction (retry up to 3 on P2034/40001):
  → FOR UPDATE lock on providerEventId
  → INSERT ON CONFLICT DO NOTHING
  → processedAt check → skip if already done
  → resolveMetaAsset (providerAssetId + platform → workspace)
  → Customer upsert → Person → Conversation upsert → Message insert (ON CONFLICT providerMessageId)
  → enqueueIntelligenceJob (ON CONFLICT sourceMessageId)
  → mark webhook_event.processedAt
```

**Webhook identity:** `providerEventId` (primary: parser-derived from platform:asset:type:messageId; fallback: platform:asset:type:payloadHash:index)

**Deduplication levels:**
- webhook_events: `providerEventId` UNIQUE + FOR UPDATE lock
- messages: `providerMessageId` UNIQUE + ON CONFLICT DO NOTHING
- intelligence_jobs: `sourceMessageId` UNIQUE + ON CONFLICT DO NOTHING

**No queue between webhook and processing** — events processed synchronously in HTTP request. Only background dispatch is intelligence job enqueue.

## Outbound send state machine (three-outcome model)

```
SENDING ──► Meta accepts + local finalize OK ──► SENT
SENDING ──► Meta rejects (4xx/5xx with error) ──► FAILED
SENDING ──► Meta accepts + local finalize FAILS ──► RECONCILIATION_REQUIRED (LOCAL_FINALIZATION_FAILED)
SENDING ──► transport exception (no response) ──► FAILED (META_SEND_FAILED)
SENDING ──► stale > 5 min ──► RECONCILIATION_REQUIRED (SEND_OUTCOME_UNKNOWN) via recoverStaleOutboundSends
RECONCILIATION_REQUIRED + providerSendId ──► reconcileProviderAcceptedSend ──► SENT
RECONCILIATION_REQUIRED + no providerSendId ──► UNKNOWN_OUTCOME (human decision)
```

**Critical gap (MWOM-INT-001):** Transport exception (fetch() catch block) is collapsed into `META_SEND_FAILED` → locally FAILED. A read-timeout after Meta accepted the request cannot be distinguished from a DNS failure. A user retry (new POST) could duplicate an already-accepted message.

**No automatic retry exists.** Each send is single-shot. `sendAttemptCount` initialized to 1, never incremented by retry logic. No idempotency key passed to Meta API.

## Reconciliation mechanisms

1. **Stale SENDING recovery** (`recoverStaleOutboundSends`): worker polls every 30s, finds SENDING with `lastSendAttemptAt` > 5 min, marks RECONCILIATION_REQUIRED via FOR UPDATE SKIP LOCKED. Never auto-resends.

2. **Provider-accepted reconciliation** (`reconcileProviderAcceptedSend`): FOR UPDATE on the message row, validates status == RECONCILIATION_REQUIRED + providerSendId exists, then transitions to SENT + conversation update + audit log (dedup check on existing MESSAGE_SENT audit).

3. **UNKNOWN_OUTCOME** (`processOutboundSendReconciliation`): RECONCILIATION_REQUIRED without providerSendId → returns UNKNOWN_OUTCOME for human decision.

## Worker topology (4 defined, deployment unproven)

| Worker | Script | Poll | Purpose |
|--------|--------|------|---------|
| `customer-intelligence-worker` | `scripts/customer-intelligence-worker.ts` | 5s | Claims PENDING intelligence jobs (FOR UPDATE SKIP LOCKED), calls OpenAI, stores results |
| `outbound-send-reconciliation-worker` | `scripts/outbound-send-reconciliation-worker.ts` | 30s | recovers stale SENDING → RECONCILIATION_REQUIRED |
| `instagram-publishing-worker` | `scripts/instagram-publishing-worker.ts` | 60s | Publishes scheduled/retryable Instagram posts |
| `attention-worker` | `scripts/attention-worker.ts` | 60s | Creates follow-up tasks (hot leads, stale warm, reply window risk) |

Workers use graceful SIGINT/SIGTERM shutdown. None configured as separate Docker services — must be run manually via `npm run worker:*`. Production deployment status is **runtime-unknown**.

## Two parallel send code paths (MWOM-ARCH-001 context)

1. **Inbox route** (`app/api/inbox/conversations/[id]/messages/route.ts` POST): imports `sendMetaTextMessage` + `resolveMetaSendToken` directly. Creates message, calls Meta, handles 3 outcomes inline. Records AI feedback inline. 450 lines.
2. **Dedicated workflow** (`src/lib/messaging/send-message.ts` — `sendConversationMessage`): imports `sendMetaTextMessage`. Creates message, calls Meta, returns typed outcome (SENT/FAILED/RECONCILIATION_REQUIRED). Does NOT record AI feedback. 202 lines. Injectable deps.

Both implement the same three-outcome model. The route does NOT delegate to `sendConversationMessage`. Route directly imports provider adapters. This is the subject of MWOM-ARCH-001.

## Meta provider authentication

- **OAuth flow**: Supervised by Supabase Edge Function → long-lived token encrypted (AES-256-GCM) → stored in metaAsset/connection rows
- **Send token resolution** (`resolveMetaSendToken`): WhatsApp system user token (highest priority) → asset-level token (decrypted + debug_token verified) → connection-level token fallback
- **No hardcoded tokens in application code** — all live credentials in `.env.local` (not committed)
