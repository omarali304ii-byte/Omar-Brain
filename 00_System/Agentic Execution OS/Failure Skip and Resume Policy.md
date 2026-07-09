---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [failure, skip, resume, recovery]
ai_access: allowed
version: 11.0
---
# Failure Skip and Resume Policy

## Failure
Preserve the exact signature before changing code. Classify the layer, inspect current diff, form one falsifiable hypothesis, apply the smallest repair, re-run the original proof, then nearby regressions.

## Retry
Attempts belong to one batch identity. A retry does not create a shadow batch or erase prior failures.

## Resume
On a fresh session:
1. load `RUNTIME_STATE.json`;
2. compare current repo revision/status with the last checkpoint;
3. invalidate changed file intelligence;
4. revalidate the last trusted milestone when drift exists;
5. continue the exact current batch or next eligible batch.

## Skip
A skip record must include:
- reason;
- impact;
- unresolved risk;
- effect on final goal;
- who/what authorized it.

Required work cannot be silently converted to optional work.
