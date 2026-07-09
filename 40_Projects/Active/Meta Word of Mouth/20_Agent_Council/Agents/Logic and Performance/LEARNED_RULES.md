# Logic and Performance Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## LOGIC-CONC-001 — Shared snapshot read-modify-write requires lost-update protection
```yaml
id: LOGIC-CONC-001
status: project-local → proven
trigger: multiple workers can target same logical person and update one mutable snapshot
rule: require optimistic versioning, row lock, atomic DB operation, serialized owner or merge-safe event model
boundary: Immutable append-only signal writes are outside this rule
evidence_required: overlapping same-person worker test with zero lost deltas
last_proven_revision: bd8a7a6
evidence: test-intelligence-ordering-concurrency (3 scenarios PASSED), test-intelligence-memory-concurrency (PASSED)
```

## LOGIC-PERF-001 — Fuzzy or AI matching requires candidate narrowing
```yaml
id: LOGIC-PERF-001
status: project-local
trigger: matching compares potentially large entity sets
rule: define deterministic blocking/indexed candidate narrowing before expensive fuzzy/AI scoring
boundary: Tiny bounded admin-only datasets may accept simpler approach with explicit bound
evidence_required: complexity review + representative-volume benchmark
last_proven_revision: bd8a7a6 (complexity reviewed, no volume benchmark)
evidence: scoreOpportunity bounded at 100 signals; opportunity refresh bounded at 5 messages per conversation; people search has PAGE_SIZE=50 cursor
```

## LOGIC-CONC-002 — Evidence mutation on mutable entity requires entity lock
```yaml
id: LOGIC-CONC-002
status: project-local (new)
trigger: evidence or child rows are deleteMany + createMany within a transaction for a mutable parent
rule: acquire FOR UPDATE lock on the parent entity before evidence mutation, or use upsert-by-unique-key
boundary: If parent is already locked by caller's outer transaction, this may be satisfied
evidence_required: concurrent evidence refresh test showing no interleaving
last_proven_revision: null (rule derived from MWOM-LOGIC-001 discovery)
evidence: MWOM-LOGIC-001 analysis of opportunity-engine.ts evidence handling
```

## LOGIC-CONC-003 — Agent cognition must reconcile against repo HEAD before making active claims
```yaml
id: LOGIC-CONC-003
status: project-local (new)
trigger: agent wakes from stored cognition and previous revision differs from HEAD
rule: diff owned surfaces before treating any stored finding status as current; a P0 in old cognition is not a P0 in new code until proven
boundary: applies to all agents with persistent cognition
evidence_required: NEXT_START self-check: revision diff completed, owned surfaces re-read, finding statuses reconciled
last_proven_revision: bd8a7a6
evidence: MWOM-DATA-003 was P0 in stored cognition at 8c027fab; code at bd8a7a6 materially changed with FOR UPDATE + source-order comparison. Pattern captured to prevent recurrence.
```

## LOGIC-CONC-004 — localeCompare on UUIDs is deterministic for ASCII-range UUIDs
```yaml
id: LOGIC-CONC-004
status: project-local (new)
trigger: string-based deterministic tiebreaking in distributed algorithm
rule: localeCompare is runtime-deterministic for ASCII-range strings (UUIDs). Do NOT use for Unicode-containing IDs without explicit locale specification.
boundary: messageId is UUID v4 (hex + hyphens = ASCII), so deterministic. Would need review for non-UUID ID formats.
evidence_required: unit test verifying compareSourceOrder(lowerId, higherId) consistent across Node runtimes
last_proven_revision: bd8a7a6
evidence: testComparatorFullyEqual in test-intelligence-ordering-concurrency — proven locally
```
