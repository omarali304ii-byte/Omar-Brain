# Integration and Workflow Current Findings

```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
freshness: current_for_verified_scope
rule: re-inspect current repo before closing or adding live claims
```

## Active

### MWOM-INT-001 — Transport exception collapses to FAILED; cannot distinguish "Meta accepted" from "never reached Meta"

```yaml
finding_id: MWOM-INT-001
title: Meta send transport exception misclassified as definitive failure
severity: P0
status: confirmed-active (with significant controls)
owner: Integration & Workflow

claim: >
  fetch() transport exceptions in sendMetaTextMessage (meta-send-client.ts:217-231) are collapsed
  to MetaSendError("META_SEND_FAILED"). This includes DNS failures, TCP connection refused,
  TLS failures, and critically: read timeouts where Meta may have already accepted the message.
  The caller (both route POST and sendConversationMessage) marks the message as locally FAILED.
  If a user retries (re-POST), the retry could duplicate a Meta-accepted message.

exact_failure_window:
  1. sendMetaTextMessage calls fetch() (meta-send-client.ts:219)
  2. Meta receives and accepts the POST, begins processing
  3. HTTP response is sent by Meta but network drops packets before client reads it
  4. fetch() throws (read timeout or connection reset after Meta accepted)
  5. catch block (line 227-231): creates MetaSendError("META_SEND_FAILED")
  6. sendConversationMessage catch (line 95-128): marks message FAILED
  7. Route POST catch (line 327-355): marks message FAILED, returns 502
  8. User sees failure → retries → new POST creates new message → second Meta send duplicates

duplicate_scenario:
  - User sends message → fetch() times out after Meta accepted → FAILED in UI
  - User sends same message again → new message row created → second Meta API call
  - Result: Meta delivers duplicate message to customer

affected_paths:
  - src/lib/meta/meta-send-client.ts:217-231 (transport catch → META_SEND_FAILED)
  - src/lib/messaging/send-message.ts:95-128 (MetaSendError → FAILED)
  - app/api/inbox/conversations/[id]/messages/route.ts:327-355 (error → FAILED)
  - src/lib/messaging/send-reconciliation.ts:6-41 (stale SENDING → RECONCILIATION_REQUIRED)

current_controls:
  1. recoverStaleOutboundSends: marks stale SENDING (5+ min) as RECONCILIATION_REQUIRED — never auto-resends
  2. FAILED state warning: response includes reconciliation warning for RECONCILIATION_REQUIRED
  3. No automatic retry: each send is single-shot
  4. RECONCILIATION_REQUIRED documented: "Do not resend until reconciliation is complete"

control_gaps:
  1. Transport exception (read timeout after server accepted) is indistinguishable from DNS failure
     at the only decision point (fetch catch)
  2. No HTTP-level idempotency key on the POST route
  3. No idempotency key passed to Meta API
  4. No deduplication on (conversationId, text, timestamp) for outbound sends
  5. User-facing error message does not distinguish "never sent" from "may have been sent"
  6. No provider message lookup to resolve ambiguous sends after the fact
  7. No inbound echo/status callback used to resolve ambiguity

safe_retry_rule: >
  DNS failure, TCP refused, TLS failure: safe to retry (Meta never received request).
  Cannot distinguish these from timeout-after-accept at the error-classification layer.

unsafe_retry_rule: >
  Read timeout, connection reset after Meta MAY have accepted: retry duplicates the message.
  Must reconcile first (check Meta for message existence, wait for echo/delivery status).

required_fix:
  1. Add AbortController timeout to fetch() calls (e.g., 30s) to bound wait times
  2. After timeout, set state to RECONCILIATION_REQUIRED instead of FAILED
     (unless TLS/DNS/TCP-refused errors can be reliably distinguished)
  3. OR: implement Meta message lookup to resolve ambiguous sends before marking FAILED
  4. OR: accept RECONCILIATION_REQUIRED for all transport exceptions, requiring human reconciliation

required_tests:
  - INT-EVAL-001: fault-injection test: simulate read timeout after Meta accepts → verify RECONCILIATION_REQUIRED
  - INT-EVAL-002: fault-injection test: simulate DNS failure → verify safe-to-retry
  - INT-EVAL-003: duplicate prevention: verify that retry after ambiguous outcome cannot create duplicate Meta message

runtime_proof: none (tests not executed; fault injection not implemented)
evidence:
  - meta-send-client.ts:217-231 (transport catch)
  - send-message.ts:95-128 (catch → FAILED)
  - route.ts:327-355 (catch → FAILED)
  - send-reconciliation.ts:6-41 (stale recovery)
revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```

### MWOM-INT-002 — No fetch timeout on any Meta API call
```yaml
finding_id: MWOM-INT-002
title: All Meta fetch() calls lack timeout configuration
severity: P1
status: new
owner: Integration & Workflow

claim: >
  Every fetch() call to Meta APIs (send, inbox sync, publishing, asset discovery, OAuth)
  is made without AbortController or timeout signal. A hung connection could block
  indefinitely. The only backstop is the 5-minute stale-SENDING recovery for outbound
  sends. Other Meta API calls (inbox sync during GET, publishing, sync) have no
  timeout at all.

affected_surfaces:
  - meta-send-client.ts (sendText, sendTemplate)
  - instagram-inbox-sync.ts (conversation fetch)
  - facebook-inbox-sync.ts (conversation fetch)
  - instagram-content-client.ts (publishing API calls)
  - meta-client.ts (generic GET/POST)
  - meta-oauth.ts (token exchange)
  - meta-assets.ts (page/account discovery)
  - meta-manual-connect.ts (connection probing)

required_fix: Add AbortController with configurable timeout to all fetch() calls
required_tests: timeout injection tests for send, sync, and publish paths
```
