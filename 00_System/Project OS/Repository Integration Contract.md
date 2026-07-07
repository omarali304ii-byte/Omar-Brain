---
type: system
status: active
created: 2026-07-07
topics: [repository, project, git, context]
ai_access: allowed
---
# Repository Integration Contract

The brain stores project control and durable learning; the repository stores implementation truth.

## Canonical project note must record when applicable
- `repo_url`,
- `local_path`,
- `primary_branch`,
- important package/workspace roots,
- deployment environments,
- current verified revision when a run depends on it.

## Agent rules
- inspect repo before code claims,
- read repository-specific instructions first,
- never assume stack from old memory,
- do not rewrite unrelated code,
- preserve working behavior unless scope says otherwise,
- verify Git diff before declaring done,
- update project docs after meaningful implementation changes,
- never copy the whole repository into Obsidian.

## Truth split
- code/migrations/tests: implementation truth,
- brain project docs: intent, control, decisions, current-state summary,
- run records: what was executed and verified.
