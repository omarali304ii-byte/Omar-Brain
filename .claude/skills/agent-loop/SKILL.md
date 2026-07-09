---
name: agent-loop
description: Execute a long Omar Brain plan batch by batch with persistent state, minimal context capsules, verification gates, repair loops, and evidence-backed advancement. Use when Omar asks to run/continue a plan, batches, final goal, or autonomous project loop.
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, agentic-execution, batches]
ai_access: allowed
---
# Agent Loop

Use `$ARGUMENTS` as a project name, Agent Loop path, or instruction.

1. Resolve the canonical project. Prefer `<project packet>/Agent Loop`.
2. Run:
   `node "00_System/Agentic Execution OS/runtime/agent-loop.mjs" status "<Agent Loop dir>"`
3. If no active batch, run `boot`.
4. Read only `Runtime/CURRENT_CONTEXT.md` first.
5. Execute only the active batch. Start at exact read-first paths and expand only when evidence requires it.
6. Run:
   `node "00_System/Agentic Execution OS/runtime/agent-loop.mjs" verify "<Agent Loop dir>"`
7. If verification fails, read the exact report, diagnose root cause, repair the same batch, then verify again. Do not jump ahead.
8. If PASS closes the batch, immediately `boot` the next eligible batch when Omar asked to finish the whole plan.
9. Continue until final gate passes or a real blocker is recorded with:
   `node .../agent-loop.mjs block "<dir>" --reason "..." --next "..."`
10. Never silently skip. Optional skip requires the governed `skip` command with reason and impact.

For maximum token efficiency across many batches, prefer the fresh-context runner documented in `00_System/Agentic Execution OS/Claude Fresh Context Runner.md`.
