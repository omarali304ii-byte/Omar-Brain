# Integration and Workflow Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## INT-MWOM-001 — Externally accepted/local unknown is a first-class state
```yaml
id: INT-MWOM-001
status: project-local
trigger: external side effect occurs before local commit and response can be lost
rule: model uncertain outcome; do not mark definitively failed or blindly retry; reconcile by provider evidence where possible
boundary: Pure local idempotent operations do not require provider reconciliation
evidence_required: partial-failure regression + reconciliation test
last_proven_revision: null
```
