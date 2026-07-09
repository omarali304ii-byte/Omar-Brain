# Architecture Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## ARCH-MWOM-001 — Ingress must remain decoupled from failure-prone intelligence
```yaml
id: ARCH-MWOM-001
status: project-local
trigger: provider webhook path adds AI/enrichment work
rule: persist/normalize/enqueue first; downstream intelligence remains asynchronous
boundary: Does not forbid fast deterministic validation in ingress
evidence_required: Static boundary inspection + failure-path test
last_proven_revision: null
```
