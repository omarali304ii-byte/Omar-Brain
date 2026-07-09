---
name: plan-install
description: Convert Omar's detailed project plan and final goal into the machine-executable Agent Loop format without losing plan details. Use when Omar wants to put a plan into the Brain, split it into governed batches, or prepare autonomous batch execution.
disable-model-invocation: true
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, agentic-execution, batches]
ai_access: allowed
---
# Install Plan into Omar Brain

Use `$ARGUMENTS` as the plan source or project target.

1. Resolve the exact canonical project and repository. Do not guess aliases.
2. Read the full source plan once.
3. Preserve the final goal and every required batch; do not silently simplify scope.
4. Convert it to a `PLAN_SPEC.json` using `00_System/Agentic Execution OS/templates/PLAN_SPEC.example.json`.
5. For each batch define objective, dependencies, scope, read-first files where known, acceptance criteria, proof refs, verification commands, required artifacts, and skip policy.
6. Keep unknown file locations explicit rather than invented; use bounded `discovery_roots`.
7. Compile with:
   `node "00_System/Agentic Execution OS/runtime/plan-compiler.mjs" "<PLAN_SPEC.json>" "<Project Packet>/Agent Loop"`
8. Validate with:
   `node "00_System/Agentic Execution OS/runtime/validate-agent-loop.mjs" "<Agent Loop dir>"`
9. Run a dry boot/context compile and inspect token budget before execution.
10. Do not begin implementation until the machine plan validates.
