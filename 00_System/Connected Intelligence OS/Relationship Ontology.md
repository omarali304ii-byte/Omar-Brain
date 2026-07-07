---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [connected-intelligence, control, experience]
ai_access: allowed
---
# Relationship Ontology

The whole brain uses one controlled typed-edge vocabulary. AI may not invent new relation names during normal execution.

## Core relations
`belongs_to`, `depends_on`, `blocks`, `implements`, `verified_by`, `produced_by`, `produced_by_run`, `derived_from`, `learned_from`, `failed_because`, `resolved_by`, `supports`, `contradicts`, `supersedes`, `affects`, `applies_to`, `requires_skill`, `supports_goal`, `owned_by`, `uses_tool`, `uses_technology`, `validated_in`, `invalidated_in`.

## Edge contract
```json
{
  "edge_id": "edge-...",
  "from": "obj-...",
  "relation": "verified_by",
  "to": "obj-...",
  "project_id": "prj-...",
  "source_event_id": "evt-...",
  "created_at": "ISO-8601"
}
```

## Integrity rules
- Both endpoints must exist in the object registry.
- `verified_by` must target an evidence object.
- `produced_by_run` must target a run object.
- `resolved_by` cannot erase the original failure object.
- `contradicts` preserves both objects until authority resolution.
- New relation vocabulary requires governed system change, validator update and migration of affected edges.
