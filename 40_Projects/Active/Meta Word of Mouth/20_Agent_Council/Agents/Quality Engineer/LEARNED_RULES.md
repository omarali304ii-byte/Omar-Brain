# Quality Engineer Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## QUAL-MWOM-001 — A production blocker closes only with a regression matching its failure mode
```yaml
id: QUAL-MWOM-001
status: project-local
trigger: P0/P1 fix is proposed
rule: require adversarial test at same semantic layer as the bug; build/typecheck alone insufficient
boundary: Pure documentation blockers may use review evidence
evidence_required: targeted regression + critic verdict
last_proven_revision: null
```
