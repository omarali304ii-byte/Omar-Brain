---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [tracing, evaluation, observability, agents]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Trace and Eval Store Contract

## Purpose
Keep high-volume operational traces outside the canonical vault while preserving human-readable evidence and durable IDs in Obsidian.

## Trace identity
```yaml
trace_id:
run_id:
thread_id:
project_id:
started_at:
ended_at:
model_routes: []
tools: []
status:
cost:
latency:
```

## Vault writeback
An episode stores:
- trace ID,
- key state transitions,
- significant retrieval set,
- failures,
- verification evidence,
- outcome,
- promotion candidates.

## Evaluation linkage
Eval results reference:
- dataset version,
- runtime/profile version,
- trace IDs,
- score details,
- baseline comparison.
