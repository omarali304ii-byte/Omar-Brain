---
type: system
status: active
created: 2026-07-07
topics: [project, contract, execution]
ai_access: allowed
---
# Universal Project Contract

Every project, regardless of domain, uses the same control plane.

## Mandatory project identity
- unique `project_id`,
- canonical title and aliases,
- `project_class`,
- architecture profile,
- domain links,
- owner/context,
- repository/workspace links when applicable.

## Mandatory control artifacts
1. canonical project note,
2. compact AI context,
3. requirements/outcome,
4. roadmap/phases,
5. current state,
6. execution queue,
7. project-scoped ideas, tasks, research, and problems,
8. decisions,
9. evidence,
10. run history,
11. learning extraction,
12. closeout.

Software projects add architecture, data model, API contracts, security, test strategy, repo map, and runbook.

## Project invariants
- outcome is concrete,
- done definition is testable,
- scope and non-scope are explicit,
- current state is not history,
- queue reflects real work,
- every task has acceptance and verification,
- decisions are traceable,
- completion requires evidence,
- reusable learning escapes the project.

## OVX project inheritance
When a project belongs to OVX or is built under the OVX Smart Connected AI philosophy, load [[30_Business/Organizations/OVX Smart Connected AI]] and [[00_System/Project OS/OVX Smart Connected AI Project Standard]] before final architecture approval.

OVX-aligned projects must state how they solve the immediate problem, what existing reality they connect to, what useful context they contribute back, which permissions and source-of-truth boundaries apply, and how the work increases the potential value of future OVX projects.

## No hidden project state
Important decisions, blockers, architecture changes, task completion, and verification evidence must not live only inside chat history.
