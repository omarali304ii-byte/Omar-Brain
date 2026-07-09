---
type: project-council-roster
status: active
created: 2026-07-09
updated: 2026-07-09
ai_access: allowed
project_id: prj-meta-word-of-mouth
---
# Agent Roster

## Control plane
| Agent | Local folder | Purpose |
|---|---|---|
| Supervisor | `Control/Supervisor/` | select agents, merge findings, build batches |
| Project Observer | `Control/Project Observer/` | update current truth, handoffs, evidence links |
| Toolsmith | `Control/Toolsmith/` | implement approved integrated changes |
| Critic Verifier | `Control/Critic Verifier/` | independently falsify completion claims |
| Memory Curator | `Control/Memory Curator/` | promote reusable learning only after evidence |

## Specialists
| Agent | Local folder | Owns |
|---|---|---|
| Architecture | `Agents/Architecture/` | system boundaries, coupling, module ownership |
| Data & Truth | `Agents/Data and Truth/` | schema, identity, invariants, truth ownership |
| Integration & Workflow | `Agents/Integration and Workflow/` | Meta APIs, webhooks, retries, idempotency, async workflows |
| Logic & Performance | `Agents/Logic and Performance/` | correctness, edge cases, complexity, query/performance risk |
| Product & UX | `Agents/Product and UX/` | inbox/lead/customer UX, dangerous actions, feedback states |
| Runtime & Reliability | `Agents/Runtime and Reliability/` | deployment, workers, logs, CI, recovery, observability |
| Quality Engineer | `Agents/Quality Engineer/` | tests, proof matrix, regression evidence |
