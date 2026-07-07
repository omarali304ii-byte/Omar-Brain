---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [memory, episodic-memory, runs, traces, learning]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Episodic Memory Standard

## Purpose
Preserve what actually happened so future agents can debug, resume, evaluate, and learn.

## Storage
- global cross-domain episodes: `85_Episodes/YYYY/MM/`,
- project runs: `<project>/80_Runs/`,
- high-volume raw traces: external trace store with durable IDs linked from the episode note.

## Append-only rule
An episode is historical evidence. Do not rewrite history to make a run look cleaner.
Corrections are appended under `## Correction` or recorded in a later episode that links to the original.

## Required episode fields
```yaml
memory_class: episodic
episode_id: ep-...
run_id: run-...
thread_id: ...
status: completed|completed-with-warnings|failed|interrupted|blocked
started_at: ISO-8601
ended_at: ISO-8601
agents: []
tools_used: []
projects: []
artifacts: []
retrieval_keys: []
human_feedback: none|accepted|accepted-with-edits|rejected
promote_candidates: []
```

## Required body
1. Goal
2. Initial state
3. Context loaded
4. Plan/task graph
5. Actions and tools
6. Decisions
7. Failures and repair attempts
8. Verification evidence
9. Outcome
10. Candidate lessons
11. Exact next action if incomplete

## Episode compression
Do not dump every token into Obsidian. Store:
- trace ID,
- key state transitions,
- tool evidence,
- failure signatures,
- decisions,
- outcome,
- promotion candidates.

## Retrieval priority
For “what happened?” queries:
- exact IDs and failure strings first,
- recency boost,
- project/thread filter,
- semantic retrieval,
- parent episode expansion.
