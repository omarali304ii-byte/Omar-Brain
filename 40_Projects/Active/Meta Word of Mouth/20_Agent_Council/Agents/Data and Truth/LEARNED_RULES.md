# Data and Truth Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## DATA-MWOM-001 — Sensitive evidence permission follows data meaning, not page permission
```yaml
id: DATA-MWOM-001
status: project-local
trigger: DTO/route returns AI evidence or source message text
rule: require explicit intelligence-exposure authorization even when parent entity is viewable
boundary: Public/non-sensitive lead metadata may remain under lead permission
evidence_required: route-level permission tests
last_proven_revision: null
```

## DATA-MWOM-002 — Provider identity must not become canonical display identity by fallback
```yaml
id: DATA-MWOM-002
status: project-local
trigger: UI/DTO fallback uses raw provider ID
rule: use centralized masked/display policy; raw provider IDs require explicit exposure permission
boundary: Operational internal logs may use IDs under separate access controls
evidence_required: cross-surface privacy tests
last_proven_revision: null
```
