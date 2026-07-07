---
type: system
status: active
created: 2026-07-07
topics: [ai, ingestion, architecture, learning]
ai_access: allowed
version: 2.0
---
# AI Ingestion Pipeline

## Goal
Allow arbitrary new material to enter Omar Brain without degrading structure or confusing project execution.

```text
Capture
  ↓
Preserve raw source/evidence
  ↓
Normalize exact identifiers
  ↓
Detect project/entity references
  ↓
Resolve canonical entities/projects
  ↓
Classify primary purpose
  ↓
Search exact + semantic duplicates
  ↓
Choose update/create/merge/link/inbox/discard
  ↓
Apply controlled metadata
  ↓
Route to canonical home
  ↓
Update project current truth when verified
  ↓
Extract failures/lessons/pattern candidates
  ↓
Verify structure, trust, access, contradictions
  ↓
Index changed content only
```

## Stage 1 — Capture
Inputs may come from:
- manual note,
- ChatGPT conversation,
- email,
- GitHub/repository,
- meeting transcript,
- web/source clip,
- screenshot description,
- document,
- code/terminal output,
- test/runtime evidence.

Unprocessed material starts in `01_Inbox` unless an explicit high-confidence target is known.

## Stage 2 — Preserve
Preserve:
- exact names,
- dates,
- error messages,
- code identifiers,
- IDs and paths,
- source/revision,
- speaker distinction,
- evidence vs interpretation.

## Stage 3 — Resolve project/entity
If the input concerns an existing project, resolve it before routing. A feature idea for Project X is not automatically a new project.

## Stage 4 — Classify purpose
Choose exactly one primary type: idea, project, task, decision, lesson, failure signature, skill, knowledge form, entity, review, etc.

## Stage 5 — Duplicate resolution
Use:
- exact lexical search,
- aliases,
- identifiers,
- semantic search,
- metadata filters,
- graph relationships,
- project scope.

## Stage 6 — Write decision
Choose one explicit operation:
- `update_existing`,
- `create_new`,
- `merge`,
- `link_only`,
- `keep_in_inbox`,
- `discard_with_reason`.

Creation is not the default.

## Stage 7 — Project synchronization
Verified project material may update:
- current state,
- execution queue,
- decision record,
- evidence,
- run history.

Do not update “current truth” from unverified AI inference.

## Stage 8 — Learning extraction
Meaningful execution may produce:
- failure signature,
- candidate lesson,
- anti-pattern candidate,
- cross-project pattern evidence,
- standard change proposal.

Promotion follows the learning ladder.

## Stage 9 — Verification
No write is complete until:
- path/type/status valid,
- duplicate risk checked,
- access policy respected,
- contradiction handled,
- source/confidence honest,
- project links resolved,
- changed content only queued for indexing.
