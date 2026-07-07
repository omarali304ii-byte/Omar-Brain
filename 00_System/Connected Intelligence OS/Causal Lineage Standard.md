---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [connected-intelligence, control, experience]
ai_access: allowed
---
# Causal Lineage Standard

Semantic similarity is not causality. Causal lineage records what happened, in what run, because of what known predecessor, with what evidence.

## Required event context
- `event_id`
- `event_type`
- `occurred_at`
- `correlation_id`
- optional `causation_id` only when a real predecessor is known
- optional `project_id`, `run_id`, `object_id`

## Golden rule
Never manufacture a causation edge from temporal order or semantic similarity.

## Preferred real-work chain
```text
project -> run -> action -> result -> failure/success -> evidence -> decision
        -> project-state change -> learning candidate -> later validation
```

## Completion proof
A high-confidence reusable lesson should be traceable backwards to real runs and evidence, not merely to a summary note.
