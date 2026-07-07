---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [connected-intelligence, control, experience]
ai_access: allowed
---
# Universal Object Contract

Every durable thing that matters is an object. Paths may change; identity must remain stable.

## Required fields
```yaml
object_id: stable unique ID
object_type: controlled type
canonical_path: current canonical representation or explicit null for ledger-only objects
status: lifecycle state
authority: contextual | observed | verified | canonical
verification_state: explicit state
created_at: ISO timestamp
updated_at: ISO timestamp
```

## Optional but strongly preferred
- `project_id`
- `aliases`
- `content_hash`
- `summary`
- `source_ids`
- `review_by`
- `sensitivity`

## Identity rules
- Never reuse an `object_id` for a different thing.
- Renames update `canonical_path`; they do not create a new identity.
- Exact duplicate content hashes must be linked or merged, not silently copied.
- Ambiguous aliases must stay ambiguous. Resolution must fail safely rather than guess.
- A contextual import is not evidence. Use `verification_state: context-import-needs-repo-check` until observed in reality.
