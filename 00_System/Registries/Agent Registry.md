---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [registry, agents]
ai_access: allowed
version: 3.0
---
# Agent Registry

Machine-readable source: [[agent-registry.json]]

The v3 registry is operational, not merely descriptive. Every role declares activation conditions, required inputs, outputs, memory access, approval boundaries, and a stop condition.

| Role | Activate when | Durable memory write | Primary responsibility |
|---|---|---:|---|
| Supervisor | non-trivial multi-step run | no | objective, routing, task graph, state |
| Librarian | ambiguous/cross-domain retrieval | no | canonical resolution, context pack |
| Researcher | evidence synthesis/current research | no | source-backed findings |
| Toolsmith | repo/tool/code execution | no | implementation and execution evidence |
| Production Hardener | production audit/hardening/release candidate | no | audit → fix → re-verify → risk register |
| Critic | completion/high-risk/release/promotion | no | independent verification |
| Memory Curator | durable memory proposed | **yes** | canonical semantic/procedural commit |

## Selection rule
Use the fewest agents necessary. Do not spawn specialists merely because they exist.

## Durable write rule
`proposal → provenance → duplicate check → contradiction check → critic when required → curator commit → reindex → evaluate`
