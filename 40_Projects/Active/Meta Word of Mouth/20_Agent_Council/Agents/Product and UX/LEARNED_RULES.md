# Product and UX Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## UX-MWOM-001 — Analytics attribution must follow verified outcome, not pre-action intent
```yaml
id: UX-MWOM-001
status: project-local
trigger: UI records AI suggestion usage before irreversible/send outcome is confirmed
rule: record pending intent separately; mark used only after verified successful send
boundary: Pure local draft analytics may record draft interaction separately
evidence_required: send-success/failure attribution regression
last_proven_revision: null
```
