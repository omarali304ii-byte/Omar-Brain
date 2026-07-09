---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [agents, startup, context, restart]
ai_access: allowed
version: 2.0
---
# Deterministic Agent Entry Protocol

## Goal
An agent must not begin by wondering what happened. It begins by reconstructing the smallest authoritative state pack.

## Mandatory entry sequence
```text
E0 Resolve canonical project
E1 Read council home and runtime state
E2 Read own NEXT_START first
E3 Read own current cognition stack
E4 Confirm repo branch/revision/runtime reality
E5 Detect drift between stored truth and reality
E6 Reconcile only affected current files
E7 Execute owned loop
```

## E0 — Resolve project
Required:
```yaml
project_id:
project_path:
repo_path_or_url:
branch:
revision:
task_scope:
```
Ambiguous resolution blocks project-specific writes.

## E1 — Read project control plane
Read:
1. project current state and execution queue,
2. `20_Agent_Council/00_COUNCIL_HOME.md`,
3. `Runtime/COUNCIL_STATE.json`,
4. `Runtime/LOOP_STATE.json`,
5. `07_ACTIVE_WORK_BOARD.md`,
6. `09_AGENT_FINDINGS_INDEX.md`.

## E2 — Read exact restart pointer
Read the selected agent's `NEXT_START.md` before broad exploration.

It must state:
```yaml
status:
last_verified_revision:
start_here:
first_files_to_open:
active_finding_ids:
open_unknowns:
first_action:
do_not_repeat:
proof_needed_next:
```

## E3 — Load owned cognition only
Read, in order:
1. `00_START_HERE.md`
2. `AGENT_HOME.md`
3. `DOMAIN_MODEL.md`
4. `OWNED_SURFACE_MAP.md`
5. `ACTIVE_WORK.md`
6. `RULES.md`
7. `LEARNED_RULES.md`
8. `FAILURE_PATTERNS.md`
9. `EVAL_REGISTRY.md`
10. `CURRENT_FINDINGS.md`
11. `OPEN_UNKNOWNS.md`
12. `EVIDENCE_REQUIREMENTS.md`
13. `HANDOFF.md`

Do not dump unrelated agent folders.

## E4 — Reality check
Minimum software reality check when a repo exists:
```text
git branch
revision
working tree status
relevant changed files
relevant runtime/env availability
```
Stored project truth is a navigation hypothesis until checked against current reality.

## E5 — Drift classification
```yaml
none: stored truth matches reality
benign: unrelated repo movement
owned-drift: owned surface changed
cross-agent-drift: another surface invalidates this agent model
unknown: cannot verify
```

Owned or cross-agent drift must update the relevant current cognition before closure.

## E6 — Context budget law
Use the smallest useful context:
- exact restart pointer first,
- exact active findings,
- exact surface map,
- exact code paths,
- expand only when evidence demands it.

## E7 — Start work
The first work action must be one of:
- verify an active finding,
- continue a declared batch,
- inspect owned drift,
- close an explicit unknown,
- run a required proof.

"Explore the project" is not a valid first action when a restart pointer exists.
