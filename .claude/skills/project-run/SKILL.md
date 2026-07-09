---
name: project-run
description: Resolve an existing Omar project, inspect the real repository, execute the smallest verifiable batch, repair failures, and continue until a valid exit condition.
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, projects, execution]
ai_access: allowed
---
# Project Run

Use for continue, finish, fix, implement, migrate, integrate, refactor, or inspect requests on an existing project.

## Mandatory sequence
1. Resolve project using exact `project_id`, path/repo URL, title, aliases, then context.
2. Read manifest and compact project control packet.
3. Inspect actual repo:
   - Git status/branch/revision
   - repo instructions
   - manifests/workspaces
   - relevant entrypoints/modules
   - schema/migrations
   - auth/permissions
   - integrations
   - tests and commands
4. Compare docs to repo; treat drift as a finding.
5. Build dependency-aware task graph.
6. Choose smallest verifiable batch.
7. Implement without unrelated changes.
8. Run the checks that prove that batch.
9. On failure: classify -> diagnose root cause -> change hypothesis -> repair -> re-run.
10. Repeat until acceptance is verified or a real blocker/scope boundary exists.
11. Use `/brain-writeback` for verified state/evidence/learning changes.

## Never
- infer current repo truth from memory alone;
- rewrite the app for a bounded task;
- add fake data to make UI look complete;
- claim checks passed when not executed;
- stop after the first failed attempt.
