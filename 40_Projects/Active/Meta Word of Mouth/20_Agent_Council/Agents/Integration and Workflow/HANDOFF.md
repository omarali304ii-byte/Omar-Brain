# Integration and Workflow Handoff

```yaml
status: active
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
summary: Full integration-surface audit completed at bd8a7a6. MWOM-INT-001 confirmed active with controls.
  MWOM-INT-002 (no fetch timeouts) opened. MWOM-ARCH-001 integration contract defined.
  All owned surfaces mapped with exact paths. External systems cataloged. Retry/idempotency matrix built.
next_action: follow NEXT_START.md — prove or design INT-EVAL-001 (transport failure → RECONCILIATION_REQUIRED)
required_context:
  - DOMAIN_MODEL.md
  - OWNED_SURFACE_MAP.md
  - WORKFLOW_CATALOG.md
  - EXTERNAL_SYSTEM_REGISTRY.md
  - RETRY_IDEMPOTENCY_MODEL.md
  - CURRENT_FINDINGS.md
  - EVAL_REGISTRY.md
```

## Handoffs to other agents

### Architecture
```yaml
from: Integration & Workflow
to: Architecture
finding_ids: [MWOM-ARCH-001]
claim: >
  MWOM-ARCH-001 integration verification complete at bd8a7a6. Confirmed: inbox route POST
  (route.ts:189-450) duplicates sendConversationMessage (send-message.ts:59-202). Route directly
  imports sendMetaTextMessage and resolveMetaSendToken. Both paths implement the same three-outcome
  model but differ in: AI feedback recording (route has it inline, sendConversationMessage does not),
  error mapping (route maps MetaSendError → HTTP codes; sendConversationMessage returns typed outcome),
  and reconcile marking (both mark RECONCILIATION_REQUIRED on local finalization failure).

provider_semantics_preservation_contract:
  route_must_preserve:
    - three-outcome model (SENT/FAILED/RECONCILIATION_REQUIRED)
    - providerSendId returned to caller on SENT
    - RECONCILIATION_REQUIRED warning in response body
    - conversation → WAITING_CUSTOMER on SENT
    - audit log MESSAGE_SENT on SENT
  workflow_must_own:
    - Meta send invocation (via sendProviderMessage dep injection)
    - error classification (MetaSendError, MetaSendTokenError)
    - finalization (finalizeProviderAcceptedSend)
  provider_semantics:
    - must NOT change how sendMetaTextMessage is invoked
    - must NOT change token resolution (resolveMetaSendToken)
    - must NOT change permission model detection
  failure_semantics:
    - MetaTokenError → same HTTP codes (404/403/409/400)
    - MetaSendError → same HTTP codes (403/429/400/409/502)
    - unknown error → 502
  unknown_outcome_semantics:
    - transport exception → same behavior (META_SEND_FAILED, status=502)
    - local finalization failure → same behavior (202, reconciliationRequired=true, warning text)
  reconciliation_semantics:
    - must preserve message row update to RECONCILIATION_REQUIRED with providerSendId
    - must preserve stale SENDING → RECONCILIATION_REQUIRED by worker
  ai_feedback_semantics:
    - must still record AI feedback after successful send (route.ts:394-403)
    - migration plan: move feedback recording to post-send hook or service layer
  http_contract:
    - POST: same request body schema (text 1-2000 chars, optional aiSuggestionId)
    - POST: same auth (requireApiPermission("send_message"))
    - POST: same conversation validation (exists, not CLOSED)
    - POST: send readiness errors → same HTTP statuses
    - POST: send failure → same HTTP statuses + error code + message
    - POST: success → mapped MessageDto
    - POST: reconciliation → 202 + mapMessageDto + code + reconciliationRequired + warning
    - GET: unchanged

evidence:
  - route.ts:189-450 (route POST handler inspected line by line)
  - send-message.ts:59-202 (dedicated workflow inspected line by line)
  - meta-send-client.ts:192-256 (sendMetaTextMessage inspected)

required_action: Architecture should incorporate this provider-semantics contract
  into the MWOM-ARCH-001 acceptance contract before Supervisor review
required_proof: post-refactor: route no longer imports sendMetaTextMessage or resolveMetaSendToken;
  all send-integrity + reconciliation + security + AI feedback tests pass
```

### Toolsmith
```yaml
from: Integration & Workflow
to: Toolsmith
finding_ids: [MWOM-INT-001]
claim: >
  MWOM-INT-001 requires code-level fix: transport exceptions in meta-send-client.ts should
  distinguish between "definitely not delivered" (DNS/TLS/TCP-refused) and "unknown outcome"
  (read timeout, connection reset). Unknown outcomes should produce RECONCILIATION_REQUIRED
  instead of FAILED. After implementation, Integration verifies the error model.
required_action: implement transport exception classification in meta-send-client.ts
proof_needed: INT-EVAL-001 (transport timeout → RECONCILIATION_REQUIRED)
```

### Runtime & Reliability
```yaml
from: Integration & Workflow
to: Runtime & Reliability
finding_ids: []
claim: >
  Four workers defined in package.json scripts (customer-intelligence, outbound-send-reconciliation,
  instagram-publishing, attention). Workers implement graceful SIGINT/SIGTERM shutdown.
  None configured as Docker services. Docker Compose runs only Next.js dev server + PostgreSQL.
  Production worker deployment, monitoring, and health status are unknown.
  Workers use FOR UPDATE SKIP LOCKED for safe concurrent operation; production concurrency is
  unverified (single worker instance? multiple?). Recovery mechanisms (stale lock, stale send)
  are wired but production runtime is unproven.
required_action: verify worker deployment topology; confirm which workers run in production;
  verify worker health monitoring and restart behavior
proof_needed: production runtime verification or documented deployment configuration
```

### Quality Engineer
```yaml
from: Integration & Workflow
to: Quality Engineer
finding_ids: [MWOM-INT-001, MWOM-INT-002]
claim: >
  MWOM-INT-001 needs fault-injection tests (INT-EVAL-001: simulated read timeout after provider accept).
  MWOM-INT-002 needs timeout injection tests for all Meta API calls.
  Coverage gaps identified: no tests for inbox sync, Instagram publishing worker, OAuth flow,
  Meta send via sendConversationMessage (only route tests exist), audit log dedup, send idempotency.
  Existing test scripts (test-send-reconciliation, test-webhook-idempotency, intelligence tests)
  need runtime execution verification.
required_action:
  - design and implement INT-EVAL-001 (fault-injection transport timeout test)
  - design INT-EVAL-002 (fetch timeout test)
  - verify existing test execution and results
  - identify test coverage for uncovered workflows
```

### Data & Truth
```yaml
from: Integration & Workflow
to: Data & Truth
finding_ids: []
claim: >
  Idempotency relies heavily on unique constraints in PostgreSQL: providerEventId, providerMessageId,
  sourceMessageId, dedupeKey. Audit log lacks a unique constraint on (entityType, entityId, action),
  creating a theoretical duplicate audit log window during reconciliation.
  Outbound send has NO idempotency key or unique constraint — duplicate sends are structurally possible.
  Integration verified constraint existence in schema.prisma at bd8a7a6; runtime enforcement depends
  on PostgreSQL configuration.
required_action: review audit log dedup; consider adding unique constraint or serialized check.
proof_needed: schema review + constraint verification
```

### Logic & Performance
```yaml
from: Integration & Workflow
to: Logic & Performance
finding_ids: []
claim: >
  Webhook ingestion uses Serializable isolation level for strong dedup — potential for
  serialization failures under high concurrent webhook load.
  Inbox sync (GET route) performs synchronous Meta API calls (Instagram + Facebook in parallel)
  during Page load — N+2 external calls per conversation view.
  Intelligence worker polls every 5s for a single job — polling cost proportional to poll
  frequency and number of workspaces.
  No caching layer between Meta API and local DB for inbox sync.
required_action: profile webhook throughput under concurrent delivery; evaluate inbox sync
  latency; consider polling optimization for multi-workspace intelligence.
```
