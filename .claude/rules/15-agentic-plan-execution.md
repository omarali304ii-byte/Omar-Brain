---
paths:
  - "40_Projects/**/Agent Loop/**"
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, agentic-execution, batches]
ai_access: allowed
---
# Agentic plan execution rule

When an `Agent Loop` exists, it is the authoritative execution state for that plan.

- Never jump batches because a later task looks easier.
- Never mark a batch done from prose.
- Read `Runtime/CURRENT_CONTEXT.md` first; do not load the whole plan or Brain unless the capsule explicitly lacks required authority.
- Work only `current_batch` and its allowed scope.
- Preserve exact failures and retry the same batch after root-cause diagnosis.
- Required batches cannot be silently skipped.
- A downstream batch starts only after dependency gates pass.
- Between batches prefer a fresh context and use the handoff artifact.
- Cached file summaries are usable only when their recorded hash matches current content.
- External repo/runtime truth overrides stale Brain notes; record drift.
