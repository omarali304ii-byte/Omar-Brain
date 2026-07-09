# Integration and Workflow Owned Surface Map

```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
freshness: current_for_verified_scope
completeness: verified-static-full
```

## Owned surfaces (full ownership)

### Meta outbound send
- `src/lib/messaging/send-message.ts` — `sendConversationMessage` (three-outcome model, injectable deps)
- `src/lib/messaging/finalize-send.ts` — `finalizeProviderAcceptedSend` (transaction-based message→SENT + conversation update + audit)
- `src/lib/messaging/send-reconciliation.ts` — `recoverStaleOutboundSends`, `reconcileProviderAcceptedSend`, `processOutboundSendReconciliation`
- `src/lib/meta/meta-send-client.ts` — `sendMetaTextMessage`, `sendWhatsAppTemplateMessage`, MetaSendError classification
- `src/lib/meta/meta-send-token.ts` — `resolveMetaSendToken` (decryption + debug_token verification + priority chain)
- `src/lib/meta/meta-send-readiness.ts` — `canAssetSendReplies`, `canAssetReceiveWebhook`, permission model detection

### Webhook ingestion
- `src/lib/meta/webhook-signature.ts` — HMAC-SHA256 verification, timing-safe comparison
- `src/lib/meta/webhook-parser.ts` — Meta payload parsing (Messenger/Instagram/WhatsApp)
- `src/lib/meta/webhook-ingestion.ts` — event dedup, asset resolution, message normalization, intelligence enqueue
- `src/lib/meta/webhook-controller.ts` — GET challenge + POST handler orchestration

### API routes (integration-facing)
- `app/api/meta/webhook/route.ts` — legacy Social webhook
- `app/api/meta/webhooks/social/route.ts` — split Social webhook
- `app/api/meta/webhooks/whatsapp/route.ts` — WhatsApp-only webhook
- `app/api/inbox/conversations/[id]/messages/route.ts` — inbox POST (send message — owned for provider semantics; route structure owned by Architecture)

### Meta provider client layer
- `src/lib/meta/meta-client.ts` — generic Graph API GET/POST helpers
- `src/lib/meta/meta-config.ts` — profile-based env config (Social/WhatsApp), graph API version, base URLs
- `src/lib/meta/meta-env.ts` — `getMetaGraphBaseUrl()`, `getInstagramGraphBaseUrl()`
- `src/lib/meta/meta-oauth.ts` — OAuth flow (code exchange, token exchange, debug_token)
- `src/lib/meta/meta-mappers.ts` — provider-to-internal type mapping
- `src/lib/meta/meta-manual-connect.ts` — manual token connection
- `src/lib/meta/meta-assets.ts` — asset discovery (Pages, IG accounts)
- `src/lib/meta/permission-catalog.ts` — Meta OAuth scopes
- `src/lib/meta/integration-profile.ts` — `MetaIntegrationProfile` type, platform→profile resolver
- `src/lib/meta/messaging-policy.ts` — reply window rules (24h WhatsApp, FB/IG restrictions)

### Instagram publishing (provider integration)
- `src/lib/meta/instagram-content-client.ts` — container create, publish, status check
- `src/lib/meta/instagram-content-errors.ts` — error classification
- `src/lib/meta/instagram-publishing-token.ts` — token resolution
- `src/lib/meta/instagram-publishing-readiness.ts` — readiness checks

### Inbox sync (provider integration)
- `src/lib/meta/instagram-inbox-sync.ts` — Instagram conversation polling
- `src/lib/meta/facebook-inbox-sync.ts` — Facebook conversation polling

### Workers (integration-related)
- `scripts/customer-intelligence-worker.ts` — OpenAI-powered intelligence polling
- `scripts/outbound-send-reconciliation-worker.ts` — stale SENDING recovery
- `scripts/instagram-publishing-worker.ts` — Instagram content publishing
- `scripts/instagram-publishing-once.ts` — one-shot Instagram publish

### Supabase Edge Functions (temporary adapters)
- `supabase/functions/meta-webhook/index.ts` — Deno webhook handler
- `supabase/functions/_shared/webhook-ingestion.ts` — raw SQL ingestion
- `supabase/functions/_shared/webhook-parser.ts` — identical parser
- `supabase/functions/_shared/crypto.ts` — Web Crypto HMAC + AES-GCM
- `supabase/functions/_shared/db.ts` — PostgreSQL connection pool

### OpenAI integration
- `src/lib/ai/suggestions.ts` — AI reply suggestions (Responses API, json_schema, fallback)
- `src/lib/intelligence/customer-intelligence.ts` — customer intelligence pipeline (enqueue, claim, process, recover, merge, source-order)
- `src/lib/intelligence/memory-merge.ts` — durable memory merging
- `src/lib/intelligence/source-order.ts` — temporal ordering comparator
- `src/lib/intelligence/lead-scoring.ts` — opportunity scoring

## Shared surfaces (coordination required)

| Surface | Primary owner | Integration responsibility |
|---------|--------------|---------------------------|
| `prisma/schema.prisma` | Data & Truth | Message/intelligence_job/webhook_event models |
| `package.json` worker scripts | Runtime & Reliability | Worker definitions, poll interval env vars |
| `docker-compose.yml` | Runtime & Reliability | Worker service configuration |
| `.env.local` / `.env.example` | Runtime & Reliability | Provider credentials, API versions |
| `app/api/inbox/conversations/[id]/messages/route.ts` POST | Architecture (route structure) / Integration (provider semantics) | Send semantics, error mapping, reconciliation marking |

## Observe only (relevant but not owned)

| Surface | Owner | Why relevant |
|---------|-------|-------------|
| `src/lib/auth/` | Architecture | Session auth (integration routes depend on) |
| `src/lib/db/prisma.ts` | Data & Truth | Prisma client singleton |
| `src/lib/people/person-identity.ts` | Data & Truth | Person creation from customer |
| `src/lib/ai/feedback.ts` | Product & UX | AI suggestion feedback recording |
| `src/lib/opportunities/opportunity-engine.ts` | Data & Truth | Opportunity refresh from signals |
| `src/lib/attention/attention-engine.ts` | Product & UX | Follow-up task creation |
| `src/lib/content/instagram/` | Architecture | Instagram content service (publishing worker depends on) |
| `src/lib/inbox/inbox-dto.ts` | Architecture | Message DTO mapping |
