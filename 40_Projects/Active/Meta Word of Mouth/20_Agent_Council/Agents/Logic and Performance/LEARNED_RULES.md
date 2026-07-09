# Logic and Performance Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## LOGIC-CONC-001 — Shared snapshot read-modify-write requires lost-update protection
```yaml
id: LOGIC-CONC-001
status: project-local
trigger: multiple workers can target same logical person and update one mutable snapshot
rule: require optimistic versioning, row lock, atomic DB operation, serialized owner or merge-safe event model
boundary: Immutable append-only signal writes are outside this rule
evidence_required: overlapping same-person worker test with zero lost deltas
last_proven_revision: null
```

## LOGIC-PERF-001 — Fuzzy or AI matching requires candidate narrowing
```yaml
id: LOGIC-PERF-001
status: project-local
trigger: matching compares potentially large entity sets
rule: define deterministic blocking/indexed candidate narrowing before expensive fuzzy/AI scoring
boundary: Tiny bounded admin-only datasets may accept simpler approach with explicit bound
evidence_required: complexity review + representative-volume benchmark
last_proven_revision: null
```
