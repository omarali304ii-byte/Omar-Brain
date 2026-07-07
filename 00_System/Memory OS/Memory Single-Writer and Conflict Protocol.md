---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [memory, concurrency, conflicts, single-writer]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Memory Single-Writer and Conflict Protocol

## Rule
Only the **Memory Curator** role may commit durable semantic or procedural changes.

Other agents may:
- read,
- propose,
- attach evidence,
- challenge,
- request supersession.

## Concurrency contract
A commit proposal records:
```yaml
target_note:
base_content_hash:
base_updated_at:
proposal_id:
```

Before commit:
1. re-read target,
2. recompute hash,
3. if unchanged, apply,
4. if changed, enter conflict resolution,
5. never overwrite silently.

## Conflict resolution order
1. current runtime/repository truth for current technical state,
2. authoritative source and verified evidence,
3. approved decision records,
4. newer validated semantic memory,
5. older semantic memory,
6. episode recollection,
7. AI inference.

## Contradictions
Contradictions are first-class. Record:
- claim A,
- claim B,
- evidence for each,
- scope/time differences,
- resolution,
- unresolved state when necessary.
