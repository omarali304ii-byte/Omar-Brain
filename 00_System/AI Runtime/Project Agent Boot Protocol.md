---
type: system
status: active
created: 2026-07-07
topics: [ai, project, boot, execution]
ai_access: allowed
---
# Project Agent Boot Protocol

An AI agent must complete this before project implementation.

## Phase 1 — Resolve project
1. Search exact title.
2. Search aliases.
3. Search `project_id`.
4. Search repo URL/local path.
5. Search company/product links.
6. Semantic search near matches.
7. Confirm one canonical project.

## Phase 2 — Load compact control context
Read in order:
1. [[00_System/Brain Constitution]],
2. relevant architecture profile/standards,
3. canonical project note,
4. `01_CONTEXT.md`,
5. `09_CURRENT_STATE.md`,
6. `10_EXECUTION_QUEUE.md`.

## Phase 3 — Load task-specific authority
Depending on task, read:
- requirements,
- architecture,
- data model,
- API contracts,
- security,
- test strategy,
- relevant decisions,
- relevant failures/patterns.

## Phase 4 — Inspect repository
When a repo is available:
- resolve path/revision,
- read repo instructions,
- inspect package/workspace structure,
- inspect current Git state,
- locate relevant modules,
- locate schema/migrations,
- locate tests and commands,
- compare docs to code.

## Phase 5 — Build execution graph
Before changing code:
- restate objective,
- identify constraints,
- list dependencies,
- choose smallest verifiable batch,
- define acceptance and verification,
- identify likely risks.

Only then execute.
