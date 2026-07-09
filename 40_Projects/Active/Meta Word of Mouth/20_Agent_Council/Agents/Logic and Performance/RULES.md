# Logic and Performance Rules

- Any same-person merge/update algorithm must state conflict resolution order.
- Heavy matching/scoring must define candidate narrowing before fuzzy/AI work.
- Race fixes require adversarial/concurrent tests, not only typecheck.
- Evidence mutation (deleteMany+createMany) within transaction requires lock on parent entity or upsert-by-unique-key.
- localeCompare on UUIDs is deterministic (ASCII-range); do not use for Unicode IDs without explicit locale.
- String-based tiebreaking in distributed algorithms must verify determinism across target runtimes.
- Lock ordering must be explicit and consistent across all paths that touch the same rows.

## Operating rules
- Verify current revision before treating stored claims as current.
- Apply learned-rule triggers before broad exploration.
- A fixed finding remains `fixed-pending-proof` until required evidence exists.
- Every meaningful problem must be assessed for failure pattern, learned rule and eval.
- Update `NEXT_START.md` before stopping.
- Do not claim P0 active when code and tests materially differ from stored cognition.
- Distinguish signal correctness, snapshot correctness, durable-memory correctness, semantic-latest-state correctness, job lifecycle correctness, and opportunity refresh correctness. They are not the same problem.
- Row-lock existence is necessary but not sufficient for correctness. Model the full interleaving.
- Performance claims require scale basis. Never write "this is slow/optimized/fine" without defined assumptions.
