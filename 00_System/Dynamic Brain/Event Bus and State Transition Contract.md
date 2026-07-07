---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [events, state-machine, runtime, dynamic-brain]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Event Bus and State Transition Contract

## Purpose
Make automation react to durable events rather than ad-hoc folder polling logic.

## Core event types
- `vault.note.created`
- `vault.note.changed`
- `vault.note.deleted`
- `project.state.changed`
- `run.started`
- `run.checkpointed`
- `run.failed`
- `run.completed`
- `memory.proposed`
- `memory.committed`
- `memory.superseded`
- `retrieval.eval.failed`
- `capability.eval.changed`
- `system.change.approved`

## Event envelope
```json
{
  "event_id": "evt-...",
  "event_type": "run.failed",
  "occurred_at": "...",
  "actor": "toolsmith",
  "project_id": "...",
  "correlation_id": "...",
  "causation_id": "...",
  "payload": {},
  "evidence": []
}
```

## Rules
- event IDs are unique,
- handlers are idempotent where practical,
- events do not replace canonical state,
- failed handlers are observable and retryable,
- sensitive payloads are minimized.
