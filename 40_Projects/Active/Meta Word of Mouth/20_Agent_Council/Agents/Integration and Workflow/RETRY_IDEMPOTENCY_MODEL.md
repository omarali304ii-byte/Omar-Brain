# Integration and Workflow — Retry and Idempotency Matrix

```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
freshness: current_for_verified_scope
```

## Retry taxonomy

### Meta outbound send (`sendMetaTextMessage`, `sendWhatsAppTemplateMessage`)
```yaml
operation: POST to Meta Graph API send endpoint
failure_classes:
  # Provider definitely rejected
  - META_TOKEN_INVALID (190/401): safe-to-retry-after-fix
  - META_PERMISSION_MISSING (10/200): safe-to-retry-after-fix
  - META_RECIPIENT_INVALID (100/551): do-not-retry (permanent)
  - META_REPLY_WINDOW_CLOSED: safe-after-window-reopens
  - WHATSAPP_TEMPLATE_REQUIRED: safe-with-template-change
  - META_RATE_LIMITED (4/17/613/429): safe-after-backoff
  - META_UNKNOWN_SEND_ERROR: reconciliation-first

  # Transport failure (unknown outcome — DANGEROUS)
  - fetch() catch (DNS/TCP/TLS/read-timeout/connection-reset):
      collapsed to META_SEND_FAILED → local FAILED
      severity: P0 (MWOM-INT-001)
      retry_class: reconciliation-first (NOT safe-automatic)
      cannot distinguish: "Meta never received" vs "Meta accepted but response lost"

  # Provider accepted + local failure
  - Meta returned providerMessageId but finalizeSend failed:
      → RECONCILIATION_REQUIRED
      retry_class: safe-with-reconciliation (reconcileProviderAcceptedSend)
      idempotency_dependency: providerSendId

current_retry_behavior: NO automatic retry on any failure
max_attempts: 1 (single-shot; sendAttemptCount initialized to 1, never incremented)
backoff: N/A
stale_recovery: recoverStaleOutboundSends (5 min) marks SENDING as RECONCILIATION_REQUIRED

duplicate_risk: HIGH on transport failure retry. User could re-POST and create duplicate Meta message.
control_gap: No HTTP idempotency key. No Meta idempotency passed. No dedup on (conversationId, text, timestamp).
```

### Customer intelligence job processing (`processIntelligenceJob`)
```yaml
operation: OpenAI API call + local DB write
failure_classes:
  - OpenAI API error (4xx/5xx/timeout): retry-safe (no side effects if API call failed)
  - Local DB write failure after OpenAI call: retryable (signals re-deleted and re-created per sourceMessageId)
  - Stale worker lock (worker died mid-processing): recovery resets to PENDING
  - Max attempts exceeded (3): permanently FAILED

retry_behavior: stale lock recovery at startup + periodic (every 60 ticks ≈ 5 min)
max_attempts: 3 (MAX_JOB_ATTEMPTS)
backoff: N/A (jobs reset to PENDING; next poll claims them)
dead_letter_behavior: status = FAILED with STALE_WORKER_LOCK error code
idempotency: ON CONFLICT (sourceMessageId) DO NOTHING on enqueue; job COMPLETED check at write time; signals re-deleted before re-insert
concurrent_guard: FOR UPDATE SKIP LOCKED on claim; FOR UPDATE on job+person+snapshot on write
```

### Instagram publishing (`publishInstagramPostNow`)
```yaml
operation: Instagram Graph API publish flow (create container → poll → publish)
failure_classes:
  - transient (network, rate limit): retry-safe with exponential backoff
  - unknown_result (Meta contacted, outcome unknown): RECONCILIATION_REQUIRED (NOT retried)
  - permission/validation error: permanently FAILED

retry_behavior: exponential backoff for transient; nextAttemptAt = min(60s * 2^attempt, 30 min)
max_attempts: 5 (INSTAGRAM_PUBLISH_MAX_ATTEMPTS)
backoff: exponential (60s base, 30 min cap)
idempotency: providerContainerId/publishAttemptedAt guard prevents re-publishing
retry_safety: FAILED posts with no providerContainerId + no publishAttemptedAt are retryable
```

### Webhook ingestion (`ingestMetaWebhookPayload`)
```yaml
operation: PostgreSQL transaction (webhook_event + customer + conversation + message + intelligence job)
failure_classes:
  - PostgreSQL serialization conflict (P2034/40001): auto-retry up to 3
  - DB connection failure: HTTP 500 returned; Meta will retry delivery
  - other errors: thrown to caller (route returns 500)

retry_behavior: serialization retry within PostgreSQL transaction (3 attempts); Meta webhook delivery retry by Meta infrastructure
max_attempts: 3 (SERIALIZATION_RETRY_ATTEMPTS)
idempotency: providerEventId UNIQUE + FOR UPDATE + processedAt guard
duplicate_risk: LOW (Meta may redeliver same event, but dedup is strong)
```

### AI suggestion generation (`generateAiSuggestion`)
```yaml
operation: OpenAI Responses API call
failure_classes:
  - API key missing: fallback (rule-based suggestion)
  - OpenAI API error: fallback (rule-based suggestion)
  - Timeout (20s): fallback (rule-based suggestion)

retry_behavior: no retry; falls back to local rule-based suggestion
max_attempts: 1
```

### Inbox sync (Instagram/Facebook)
```yaml
operation: Meta Graph API conversation/message fetch
failure_classes:
  - API error: returned in summary.errors array; caller decides retry
  - Throttling: prevents concurrent syncs (per-workspace + per-conversation dedup)

retry_behavior: none built in; next GET request triggers re-sync
max_attempts: N/A
```

## HTTP status code behavior

| Status | Meaning | Current behavior | Gap |
|--------|---------|-----------------|-----|
| 400 | Bad request (recipient invalid) | FAILED, non-retryable | Correct |
| 401 | Token invalid | FAILED, user must reconnect | Correct (token refresh not automatic) |
| 403 | Permission missing | FAILED, user must reconnect | Correct |
| 404 | Asset not found | not explicitly handled | May map to META_UNKNOWN_SEND_ERROR |
| 409 | Conflict (reply window, template) | FAILED with specific code | Correct |
| 429 | Rate limited | FAILED, user must wait | No automatic backoff/retry |
| 500 | Meta server error | META_UNKNOWN_SEND_ERROR → FAILED | Should consider safe retry with backoff |
| 502/503/504 | Meta infrastructure | META_UNKNOWN_SEND_ERROR → FAILED | Reconciliation-first would be safer |
| DNS failure | Never reached Meta | META_SEND_FAILED → FAILED | Currently collapsed with timeout |
| TCP reset | Unknown | META_SEND_FAILED → FAILED | Cannot distinguish from accepted |
| Connect timeout | Never reached Meta | META_SEND_FAILED → FAILED | Safe to retry (but is not retried) |
| Read timeout | Response may have been sent | META_SEND_FAILED → FAILED | DANGEROUS to retry (MWOM-INT-001) |
| TLS failure | Never reached Meta | META_SEND_FAILED → FAILED | Safe to retry (but is not retried) |

## Idempotency registry

### Event deduplication (inbound)
```yaml
workflow: webhook ingestion
operation: webhook event storage
idempotency_scope: per-event
key: providerEventId (parser-generated: platform:asset:type:messageId)
key_source: Meta webhook payload
persistence: webhook_events table, providerEventId UNIQUE constraint
transaction_boundary: FOR UPDATE lock → INSERT ON CONFLICT DO NOTHING → re-lock on conflict
concurrent_duplicate_behavior: serialized by FOR UPDATE row lock; second event sees processedAt set and skips
replay_behavior: already-processed events return processedDuplicate=true without re-normalization
known_gap: None (strong dedup)
tests: scripts/test-webhook-idempotency.ts (9 tests: dedup, concurrent, replay, cross-event)
```

### Message deduplication (inbound)
```yaml
workflow: webhook ingestion → message normalization
operation: message insert
idempotency_scope: per-provider-message
key: providerMessageId (from Meta)
key_source: Meta webhook payload (message.mid or message.id)
persistence: messages table, providerMessageId UNIQUE constraint
transaction_boundary: INSERT ON CONFLICT (providerMessageId) DO NOTHING within serializable transaction
concurrent_duplicate_behavior: second insert silently does nothing; intelligence job NOT enqueued for duplicate
replay_behavior: duplicate message silently skipped
known_gap: None (strong dedup)
tests: webhook-idempotency tests cover message dedup
```

### Intelligence job deduplication
```yaml
workflow: webhook ingestion → intelligence enqueue
operation: intelligence job insert
idempotency_scope: per-source-message
key: sourceMessageId
key_source: local message UUID (generated at message insert)
persistence: intelligence_jobs table, sourceMessageId UNIQUE constraint
transaction_boundary: INSERT ON CONFLICT (sourceMessageId) DO NOTHING within serializable transaction
known_gap: None
tests: test-intelligence-jobs.ts, test-intelligence-idempotency.ts
```

### Outbound send idempotency
```yaml
workflow: outbound message send
operation: POST to Meta send endpoint
idempotency_scope: NONE
key: NOT IMPLEMENTED
gap: No HTTP idempotency key, no Meta idempotency, no dedup on (conversationId, text)
duplicate_risk: HIGH if user retries a transport-failed send
control: RECONCILIATION_REQUIRED for known Meta-accepted messages; warn text in response
test: scripts/test-send-reconciliation.ts (tests reconciliation, NOT idempotency)
```

### Audit log deduplication
```yaml
workflow: send reconciliation
operation: audit log creation during reconcileProviderAcceptedSend
idempotency_scope: per-message-send
key: entityType="Message" + entityId=messageId + action="MESSAGE_SENT"
key_source: query before insert
persistence: findFirst check before create (NOT a unique constraint)
concurrent_duplicate_behavior: findFirst check is NOT serialized; theoretical window for duplicate audit
known_gap: no unique constraint on audit log for (entityType, entityId, action)
test: none explicit for audit log dedup
```

### Instagram post publish guard
```yaml
workflow: Instagram publishing
operation: publish container
idempotency_scope: per-post
key: providerContainerId + publishAttemptedAt
key_source: Meta API response (container ID)
persistence: instagram_posts table columns
transaction_boundary: retry checks: if providerContainerId or publishAttemptedAt exists → blocked
known_gap: if process crashes AFTER Meta publishes but BEFORE providerContainerId is set, post remains retryable
test: none explicit for publishing
```
