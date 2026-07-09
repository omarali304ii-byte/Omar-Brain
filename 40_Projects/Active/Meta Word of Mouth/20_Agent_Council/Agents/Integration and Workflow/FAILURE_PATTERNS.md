# Integration and Workflow Failure Patterns

Current reusable project failure signatures.

## INT-FP-001 — Ambiguous external side-effect outcome
```yaml
pattern_id: INT-FP-001
status: active (confirmed at bd8a7a6)
signature: provider accepts, local persistence or response handling fails
root_cause: single try/catch collapses external and local outcomes
prevention: separate states, idempotency/reconciliation, retry policy
last_proven_revision: null
source_finding: MWOM-INT-001
```

## INT-FP-002 — Transport-level failure mistaken for provider rejection
```yaml
pattern_id: INT-FP-002
status: active (confirmed at bd8a7a6)
signature: fetch() catch block catches all transport errors and marks as FAILED
root_cause: no differentiation between "never reached server" and "server responded but response lost"
affected: meta-send-client.ts:217-231, instagram-content-client.ts fetch calls, inbox sync fetch calls
prevention: classify transport errors into safe-to-retry vs unknown-outcome; use RECONCILIATION_REQUIRED for unknown
last_proven_revision: null
source_finding: MWOM-INT-001, MWOM-INT-002
```

## INT-FP-003 — No timeout on external calls
```yaml
pattern_id: INT-FP-003
status: active (confirmed at bd8a7a6)
signature: all fetch() calls lack AbortController/timeout configuration
root_cause: development assumption that external APIs respond quickly; no defensive timeout
affected: all Meta API calls (send, sync, publishing, OAuth, asset discovery), all OpenAI calls (hardcoded timeouts exist only in suggestions and intelligence — 20s and 25s)
prevention: add configurable timeouts to all external fetch calls; set operation-appropriate defaults
last_proven_revision: null
source_finding: MWOM-INT-002
```
