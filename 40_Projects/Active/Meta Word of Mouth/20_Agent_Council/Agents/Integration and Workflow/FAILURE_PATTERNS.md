# Integration and Workflow Failure Patterns

Current reusable project failure signatures.

## INT-FP-001 — Ambiguous external side-effect outcome
```yaml
pattern_id: INT-FP-001
status: active
signature: provider accepts, local persistence or response handling fails
root_cause: single try/catch collapses external and local outcomes
prevention: separate states, idempotency/reconciliation, retry policy
last_proven_revision: null
```
