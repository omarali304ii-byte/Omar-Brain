---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [batch, state-machine, verification, gates]
ai_access: allowed
version: 11.0
---
# Batch State Machine and Gates

## Legal states

```text
PENDING -> READY -> BOOTING -> RUNNING -> VERIFYING
                                      |          |
                                      |          +-> FAILED_VERIFICATION -> REPAIRING -> RUNNING
                                      +-> BLOCKED
VERIFYING -> PASSED -> COMMITTING_EVIDENCE -> DONE
FAILED_VERIFICATION -> BLOCKED
PENDING/READY -> SKIPPED only when skippable=true and a governed impact report exists
```

## Promotion gate
A downstream batch becomes eligible only when every `depends_on` batch is `DONE`. `SKIPPED` satisfies a dependency only when the dependency contract is optional and explicitly allows skip satisfaction.

## Verification gate
A batch passes only when:
- every required check exits successfully;
- every required artifact exists;
- every acceptance criterion has proof references;
- every proof reference resolves to passing evidence;
- no newly changed file violates allowed/forbidden scope;
- no unresolved blocking failure remains.

The executor's statement “done” is never evidence.

## Failure gate
A failed verification preserves:
- exact command/check;
- exit code;
- output tail;
- environment/cwd;
- failure signature;
- attempt number;
- affected batch.

Repair must re-run the original failing proof before nearby regressions.

## Blocked gate
`BLOCKED` is valid only with an exact blocker record and exact next action. “Could not finish” is invalid.

## Skip gate
Required batches are non-skippable by default. Optional skipping requires reason, impact, unresolved risk, and final-goal effect. Silent skipping is forbidden.

## Final gate
A project is complete only after all required batches are `DONE` and final goal checks pass.
