---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [connected-intelligence, control, experience]
ai_access: allowed
---
# Brain Transaction Protocol

Meaningful writes occur as validated transactions, not scattered AI edits.

## Supported operations
- `create_object`
- `update_object`
- `add_edge`
- `append_event`
- `append_provenance`
- `enqueue_impact`

## Commit sequence
```text
validate schema -> resolve identities -> check relation vocabulary -> dedupe
-> authority/conflict checks -> snapshot ledgers -> apply all operations
-> append committed transaction -> emit transaction.committed
```

On any failure, restore snapshots and append a rejected transaction record. No partial success claim.

## Authority
The transaction engine enforces mechanics. It does not grant an unverified claim verified status. Memory promotion remains governed by the existing Memory Curator single-writer rule.
