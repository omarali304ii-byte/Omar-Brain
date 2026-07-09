---
name: batch-resume
description: Resume an interrupted Agent Loop batch from persistent Brain state, reconcile repo drift, and continue exact next action without rediscovering the whole project.
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, agentic-execution, batches]
ai_access: allowed
---
# Resume Batch

1. Resolve the exact Agent Loop.
2. Read `RUNTIME_STATE.json`, then run `agent-loop.mjs status`.
3. Recompile the capsule with `agent-loop.mjs context`.
4. Read `Runtime/CURRENT_CONTEXT.md` first.
5. Compare repo revision/status in the capsule with the last checkpoint.
6. If drift exists, inspect only changed/relevant files and invalidate stale assumptions.
7. Continue the current batch's exact next action.
8. Verify before any transition.
