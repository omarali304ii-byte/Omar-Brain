---
type: system
status: active
created: 2026-07-07
topics: [ai, handoff, multi-agent]
ai_access: allowed
---
# Multi-Agent Handoff Protocol

Agents must not hand off vague prose.

## Handoff packet
- resolved project ID/path,
- objective,
- current task/batch,
- acceptance criteria,
- completed work,
- changed files,
- verification run and results,
- unresolved failures,
- blocker classification,
- exact next action,
- relevant source links,
- revision/worktree state.

The receiving agent must re-verify critical state; it must not blindly trust another agent's “done.”
