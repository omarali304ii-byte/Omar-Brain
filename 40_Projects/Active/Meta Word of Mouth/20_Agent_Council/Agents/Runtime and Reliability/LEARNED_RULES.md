# Runtime and Reliability Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## RUN-MWOM-001 — Implemented recovery is not operational until invoked by runtime path
```yaml
id: RUN-MWOM-001
status: project-local
trigger: recovery helper exists but worker/scheduler path does not call it
rule: require runtime wiring, cadence, observability and recovery proof
boundary: Manual operator-only tools may remain manual if explicitly documented and tested
evidence_required: worker stale-lock end-to-end test
last_proven_revision: null
```
