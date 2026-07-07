---
type: system
status: active
created: 2026-07-07
topics: [ai, persistence, checkpoint, execution]
ai_access: allowed
---
# Persistent Agent Run State Contract

A project agent must be resumable after context reset, crash, model change, or handoff.

## Run identity
Every non-trivial execution run should have:
- `run_id`,
- resolved `project_id`,
- objective,
- acceptance criteria,
- start time/date,
- repo/worktree identity,
- architecture profile,
- status.

## Persistent state

```json
{
  "run_id": "run-...",
  "project_id": "prj-...",
  "objective": "...",
  "acceptance_criteria": ["..."],
  "task_graph": ["TASK-1", "TASK-2"],
  "current_node": "TASK-2",
  "completed_nodes": ["TASK-1"],
  "blocked_nodes": [],
  "attempts": 3,
  "last_failure_signature": "...",
  "repo_revision": "...",
  "changed_files": ["..."],
  "last_verification": "...",
  "evidence_links": ["..."],
  "exact_next_action": "...",
  "checkpoint_time": "..."
}
```

## Checkpoint triggers
Persist state:
- before destructive/risky action,
- after each completed task node,
- after meaningful failure diagnosis,
- after verification,
- before tool/context handoff,
- when blocked,
- before ending a run.

## Resume protocol
1. Resolve project.
2. Load latest non-completed run.
3. Verify repository/worktree still matches checkpoint.
4. Reconcile drift.
5. Re-run critical last verification if needed.
6. Continue from `exact_next_action` or next ready node.

## Rule
Conversation history is never the only store of execution progress.
