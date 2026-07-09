# Toolsmith Learned Rules

## CTRL-MWOM-001 — Restartability is a completion criterion
```yaml
status: project-local
trigger: active work or unresolved finding exists at agent stop
rule: require exact NEXT_START pointer with first action, files, unknowns and proof
boundary: no pointer required for fully idle role with no open owned work
evidence_required: council validation + readable restart state
```
