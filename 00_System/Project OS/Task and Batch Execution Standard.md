---
type: system
status: active
created: 2026-07-07
topics: [tasks, batches, execution]
ai_access: allowed
---
# Task and Batch Execution Standard

## Work hierarchy

```text
Project
  └── Phase
       └── Batch
            └── Feature / task
                 └── Verification evidence
```

## Task readiness
A task is `ready` only when it has:
- objective,
- scope,
- acceptance criteria,
- dependencies,
- relevant files/modules or discovery instruction,
- verification method.

## Atomic execution
Prefer the smallest coherent unit that can be implemented and verified end-to-end. Do not split work so thinly that architecture breaks, and do not create giant “build everything” tasks.

## Batch rule
A batch groups tasks that form one verifiable increment. Each batch ends with:
1. integrated verification,
2. current-state update,
3. queue update,
4. run record,
5. learning extraction.

## Dependency graph
An agent must not execute downstream work while an unresolved prerequisite invalidates it. It may execute independent ready work.
