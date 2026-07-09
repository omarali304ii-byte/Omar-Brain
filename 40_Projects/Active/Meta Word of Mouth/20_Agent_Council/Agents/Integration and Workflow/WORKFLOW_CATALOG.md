# Integration and Workflow — Workflow Catalog

```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
freshness: current_for_verified_scope
```

## Proven workflows

### WF-INT-001 — Meta webhook ingestion (inbound)
```yaml
status: verified-static
trigger: Meta POST webhook to /api/meta/webhooks/{social|whatsapp}
entrypoint: webhook-controller.ts → ingestMetaWebhookPayload
external_boundaries: Meta → webhook route → PostgreSQL
transaction_boundaries: single Serializable transaction per event (retry 3 on conflict)
idempotency: providerEventId UNIQUE + FOR UPDATE lock + processedAt guard
retry: serialization conflict auto-retry up to 3; no external retry
reconciliation: N/A (inbound only)
failure_states: unresolved asset (stored but skipped), duplicate event (skipped), unparseable → error
workers: none (synchronous HTTP processing; intelligence job enqueued to DB)
tests: scripts/test-webhook-idempotency.ts (9 tests)
```

### WF-INT-002 — Outbound text send via inbox route
```yaml
status: verified-static (duplicates WF-INT-003 — see MWOM-ARCH-001)
trigger: POST /api/inbox/conversations/[id]/messages
entrypoint: route.ts:189 POST handler
external_boundaries: Next.js → Meta Graph API (sendMetaTextMessage)
transaction_boundaries: 1) message CREATE (SENDING), 2) Meta call, 3) message+conversation+audit UPDATE in transaction OR FAILED update OR RECONCILIATION_REQUIRED update
idempotency: none (no HTTP idempotency key, no Meta idempotency key, no dedup on conversation+text)
retry: none (single-shot; user must re-POST for retry)
reconciliation: RECONCILIATION_REQUIRED for local finalization failure; stale SENDING → RECONCILIATION_REQUIRED
failure_states: FAILED (Meta rejection/transport), RECONCILIATION_REQUIRED (Meta accepted + local failed)
workers: outbound-send-reconciliation-worker (stale recovery)
tests: scripts/test-send-reconciliation.ts
```

### WF-INT-003 — Outbound text send via sendConversationMessage
```yaml
status: verified-static (dedicated workflow, canonical send path)
trigger: programmatic call to sendConversationMessage
entrypoint: src/lib/messaging/send-message.ts:sendConversationMessage
external_boundaries: Meta Graph API (injectable sendProviderMessage)
transaction_boundaries: 1) message CREATE (SENDING), 2) Meta call via injected dep, 3) finalize OR fail OR mark RECONCILIATION_REQUIRED
idempotency: none
retry: none (single-shot; caller must re-invoke)
reconciliation: RECONCILIATION_REQUIRED with providerSendId preserved; stale RECONCILIATION_REQUIRED → reconcileProviderAcceptedSend
failure_states: FAILED / RECONCILIATION_REQUIRED
workers: outbound-send-reconciliation-worker
tests: none specific to sendConversationMessage (covered by route tests)
```

### WF-INT-004 — Outbound send reconciliation
```yaml
status: verified-static
trigger: poll by outbound-send-reconciliation-worker (30s) OR manual reconcile call
entrypoint: send-reconciliation.ts:recoverStaleOutboundSends / reconcileProviderAcceptedSend
external_boundaries: none (pure local DB state transition)
transaction_boundaries: stale recovery uses FOR UPDATE SKIP LOCKED on raw SQL query; reconciliation uses FOR UPDATE in transaction
idempotency: reconciliation checks status==RECONCILIATION_REQUIRED; audit log dedup check for MESSAGE_SENT
retry: N/A (workers retry on next poll)
reconciliation: this IS the reconciliation mechanism
failure_states: NOT_RECONCILIABLE (wrong status or no providerSendId), UNKNOWN_OUTCOME (no providerSendId)
workers: outbound-send-reconciliation-worker
tests: scripts/test-send-reconciliation.ts
```

### WF-INT-005 — Customer intelligence job processing
```yaml
status: verified-static
trigger: webhook ingestion enqueues PENDING job; worker claims via FOR UPDATE SKIP LOCKED
entrypoint: customer-intelligence.ts:claimPendingIntelligenceJob → processIntelligenceJob
external_boundaries: OpenAI Responses API (raw fetch, 25s timeout)
transaction_boundaries: claim (FOR UPDATE SKIP LOCKED), process (FOR UPDATE on job+person+snapshot in single tx), complete (FOR UPDATE on job)
idempotency: sourceMessageId UNIQUE on intelligence_jobs; ON CONFLICT DO NOTHING on signal insert; job COMPLETED check at write time
retry: stale lock recovery resets to PENDING (<3 attempts); max 3 attempts then permanently FAILED
reconciliation: stale lock recovery (recoverStaleIntelligenceJobs) at startup + periodic (5 min)
failure_states: FAILED (non-retryable error or max attempts), STALE_WORKER_LOCK (no capacity/worker died)
workers: customer-intelligence-worker
tests: test-intelligence-worker.ts, test-intelligence-jobs.ts, test-intelligence-stale-lock-recovery.ts, test-intelligence-partial-retry.ts, test-intelligence-memory-concurrency.ts, test-intelligence-ordering-concurrency.ts, test-intelligence-idempotency.ts
```

### WF-INT-006 — AI reply suggestion generation
```yaml
status: verified-static
trigger: API call to suggestion endpoint
entrypoint: src/lib/ai/suggestions.ts
external_boundaries: OpenAI Responses API (raw fetch, 20s timeout, json_schema strict mode)
transaction_boundaries: reads only (context load); writes via feedback recording (separate flow)
idempotency: N/A (read-only generation)
retry: fallback to rule-based suggestion on OpenAI failure; no retry
reconciliation: N/A
failure_states: fallback_missing_openai_key, fallback_openai_error
workers: none
tests: not found in test scripts (coverage gap)
```

### WF-INT-007 — Instagram publishing
```yaml
status: verified-static
trigger: scheduled post reaches scheduledFor; worker polls (60s)
entrypoint: instagram-publisher.ts:processDueInstagramPosts → publishInstagramPostNow
external_boundaries: Instagram Graph API (container create → poll status → publish → get permalink)
transaction_boundaries: claim (updateMany with lock check), publish (multi-step Meta API calls), finalize (POST update)
idempotency: providerContainerId + publishAttemptedAt guard prevents re-publishing; dedupeKey on follow_up_tasks
retry: transient errors → exponential backoff (min 60s * 2^n, max 30 min, max 5 attempts); unknown_result → RECONCILIATION_REQUIRED
reconciliation: RECONCILIATION_REQUIRED for ambiguous publish outcomes; lock timeout 10 min
failure_states: FAILED (non-retryable/permission), RECONCILIATION_REQUIRED (unknown outcome), retryable with backoff
workers: instagram-publishing-worker, instagram-publishing-once
tests: not found for publishing worker (coverage gap)
```

### WF-INT-008 — Instagram/Facebook inbox sync
```yaml
status: verified-static
trigger: GET /api/inbox/conversations/[id]/messages (inline sync) or programmatic call
entrypoint: instagram-inbox-sync.ts:syncInstagramConversationInbox / facebook-inbox-sync.ts:syncFacebookConversationInbox
external_boundaries: Instagram/Facebook Graph API (GET conversations/messages endpoints)
transaction_boundaries: per-message upsert with dedup; throttled per workspace (15s IG, 5s FB) and per conversation (2s)
idempotency: providerMessageId OR providerSendId check before insert; throttling prevents concurrent syncs
retry: errors returned in summary.errors array; caller decides retry
reconciliation: none (pull-based sync; next sync fills gaps)
failure_states: errors in summary.errors
workers: none (inline during GET request)
tests: not found (coverage gap)
```

### WF-INT-009 — Meta OAuth connection flow
```yaml
status: verified-static
trigger: user clicks connect → Meta OAuth dialog → callback
entrypoint: meta-oauth.ts (token exchange) / supabase/functions/meta-oauth-callback (edge handler)
external_boundaries: Meta OAuth dialog, graph.facebook.com/oauth/access_token, graph.facebook.com/debug_token
transaction_boundaries: state creation (10 min TTL), token exchange (code → short-lived → long-lived)
idempotency: state tokens are SHA-256 hashed, stored in meta_oauth_states table; one-time use
retry: redirect flow; user retries if fails
reconciliation: N/A
failure_states: invalid state, token exchange failure, permission insufficient
workers: none
tests: none visible for OAuth flow (coverage gap)
```
