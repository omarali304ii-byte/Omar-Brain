# Integration and Workflow Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## INT-MWOM-001 — Externally accepted/local unknown is a first-class state
```yaml
id: INT-MWOM-001
status: project-local
trigger: external side effect occurs before local commit and response can be lost
rule: >
  Model uncertain outcome explicitly. Do not mark definitively failed or blindly retry.
  Use RECONCILIATION_REQUIRED for ambiguous outcomes. Reconcile by provider evidence
  where possible.
boundary: Pure local idempotent operations do not require provider reconciliation
evidence_required: partial-failure regression + reconciliation test
last_proven_revision: null
source_finding: MWOM-INT-001
```

## INT-MWOM-002 — Transport exception ≠ provider rejection
```yaml
id: INT-MWOM-002
status: project-local
trigger: fetch() catch block conflates transport failures with provider rejections
rule: >
  Transport exceptions must be classified into:
  a) definitely not delivered (DNS, TCP refused, TLS failure) — safe to retry
  b) unknown outcome (read timeout, connection reset) — RECONCILIATION_REQUIRED
  A single catch block collapsing all transport errors to FAILED creates duplicate risk.
boundary: Only applies to non-idempotent external calls
evidence_required: fault-injection test proving classification
last_proven_revision: null
source_finding: MWOM-INT-001 (derived during revalidation at bd8a7a6)
```

## INT-MWOM-003 — Every outbound fetch needs a timeout
```yaml
id: INT-MWOM-003
status: project-local
trigger: fetch() call to external API without AbortController/timeout
rule: >
  Every external fetch() must have a timeout. Without one, a hung connection
  blocks the request indefinitely. The stale-recovery backstop (5 min) is
  reactive, not preventive. Timeouts must be operation-specific (send: 30s,
  inbox sync: 15s, publishing poll: 10s).
boundary: Applies to all external HTTP calls
evidence_required: timeout injection tests
last_proven_revision: null
source_finding: MWOM-INT-002
```

## INT-MWOM-004 — Idempotency needs a key, not just a state
```yaml
id: INT-MWOM-004
status: project-local
trigger: operation has deduplication state (RECONCILIATION_REQUIRED) but no idempotency key at the API boundary
rule: >
  A reconciliation state protects against known-accepted + local-failed, but does NOT
  protect against unknown-outcome retries. Without an idempotency key at the HTTP or
  provider level, a retry of a transport-failed send can duplicate. The gap is between
  "we know Meta accepted" (RECONCILIATION_REQUIRED with providerSendId) and "we don't
  know if Meta accepted" (FAILED with META_SEND_FAILED).
boundary: Applies to all non-idempotent external write operations
evidence_required: test proving that retry after FAILED(META_SEND_FAILED from transport)
  can duplicate a Meta-accepted message
last_proven_revision: null
source_finding: MWOM-INT-001
```
