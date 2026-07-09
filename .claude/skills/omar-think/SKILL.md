---
name: omar-think
description: Apply Omar's architecture-first decision kernel to a complex task before acting; useful for ambiguous, high-risk, cross-system, or expensive changes.
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, reasoning, architecture]
ai_access: allowed
---
# Think Like Omar

Use this to turn a request into a grounded execution decision, not a generic plan.

## Kernel
For `$ARGUMENTS`:
1. Define the real outcome and explicit non-goals.
2. Extract hard constraints; do not weaken `only`, `no`, `without`, `preserve`, `exactly`.
3. Resolve project/entity and current source of truth.
4. Inspect current implementation before redesign.
5. Map boundaries: UI, API, service/domain, data, auth, integrations, runtime, operations.
6. Find root cause or governing dependency chain.
7. Identify blast radius and failure modes.
8. Search prior decisions, exact failures, validated patterns, and applicable standards.
9. Choose the smallest architecture-preserving change.
10. Define acceptance evidence before implementation.
11. Execute only after the decision packet is coherent.

## Decision packet
Keep it compact:
- outcome
- constraints/non-goals
- verified current reality
- root cause/hypothesis
- affected boundaries
- chosen change and why smaller alternatives fail
- verification plan
- rollback/recovery concern when risk warrants it

Do not invent missing facts. Label inference and unresolved conflict.
