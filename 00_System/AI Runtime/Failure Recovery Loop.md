---
type: system
status: active
created: 2026-07-07
topics: [ai, debugging, failure-recovery]
ai_access: allowed
---
# Failure Recovery Loop

When execution fails:

1. Preserve exact failure signature.
2. Capture environment and command/action.
3. Classify layer: build, runtime, data, permission, network, provider, logic, test, tooling.
4. Search exact signature in project and global memory.
5. Search semantic root-cause neighbors.
6. Inspect recent diff/state changes.
7. Form the smallest falsifiable hypothesis.
8. Run a diagnostic that distinguishes causes.
9. Apply the smallest safe repair.
10. Re-run original failing verification.
11. Run nearby regression checks.
12. Record root cause and evidence.
13. Extract reusable failure signature/lesson when warranted.

Do not shotgun random changes. Do not hide failing checks.
