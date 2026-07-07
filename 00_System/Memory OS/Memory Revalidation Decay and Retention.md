---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [memory, staleness, revalidation, retention]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Memory Revalidation Decay and Retention

## Principle
Memory confidence is not eternal. Facts age at different rates.

## Freshness classes
| Class | Examples | Default review |
|---|---|---|
| volatile | current APIs, prices, office holders, project runtime state | 1–14 days |
| active | project architecture, dependencies, client process | 14–60 days |
| slow | skills, long-lived strategy, stable relationships | 90–365 days |
| historical | completed episode, dated decision, evidence | no decay; preserve context |
| constitutional | approved system law | review on system change |

## Retrieval behavior
When a fact is past `review_by`:
- do not silently hide it,
- lower trust/ranking,
- label as stale,
- seek current source when task depends on freshness.

## Retention
- episodes: keep append-only summaries; archive by year when cold,
- raw traces: retention based on privacy/cost policy,
- rejected proposals: retain enough for audit, then archive,
- embeddings/indexes: disposable and rebuildable,
- canonical notes: never delete solely because an index changes.
