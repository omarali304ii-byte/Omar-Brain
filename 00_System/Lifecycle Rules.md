---
type: system
status: active
created: 2026-07-07
topics: [lifecycle, archive, ideas, projects]
ai_access: allowed
version: 2.0
---
# Lifecycle Rules

## Capture
Uncertain input starts in `01_Inbox` with `status: inbox`.

## Idea lifecycle
`candidate` → `validating` → `validated` → `promoted` or `rejected`.

Promotion to project requires outcome, done definition, scope boundary, profile, and next action.

## Project lifecycle
`active` → `waiting` / `paused` as reality requires → `completed` only after Done evidence → `archived` after closeout.

## Execution lifecycle
`proposed` → `ready` → `in-progress` → `verifying` → `done`.

Use `blocked` only with explicit blocker/evidence. Use `cancelled` for intentionally dropped work.

## Learning lifecycle
`observation` → `candidate` → `validated` → `pattern` → `standard` under promotion policy. Deprecated knowledge remains linked to replacement.

## Evergreen
Maintained knowledge/system/reference that remains actively useful.

## Superseded
Use when a newer authoritative item replaces an older one. Preserve bidirectional supersession links.

## Project close protocol
1. Verify Done gates.
2. Set project `completed`.
3. Record intended vs actual outcome.
4. Resolve residual work.
5. Extract lessons/failures/pattern evidence.
6. Link successor projects.
7. Move to archive after closeout.
8. Do not leave stale active copy.

## Duplicate merge
1. choose strongest canonical note,
2. merge unique verified content,
3. preserve sources/evidence,
4. add supersession/link redirects when useful,
5. archive/delete only safely,
6. never keep two active notes claiming same truth.
