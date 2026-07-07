---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [production, state-machine, release]
ai_access: allowed
---
# Production Status State Machine

## States

```text
NOT_ASSESSED
    ↓
AUDIT_IN_PROGRESS
    ↓
BLOCKED
    ↓
HARDENING
    ↓
VERIFYING
    ├── failed gate → HARDENING
    └── gates pass → CANDIDATE_READY
                         ↓
                  INDEPENDENT_REVIEW
                    ├── reject → HARDENING
                    └── approve
                         ↓
        READY_WITH_ACCEPTED_RISKS or PRODUCTION_READY
                         ↓
                    RELEASED
                         ↓
                POST_RELEASE_VERIFIED
```

## Transition contracts

### `BLOCKED`
Any open P0/P1 production blocker.

### `HARDENING`
Fix queue is actively reducing findings.

### `VERIFYING`
Original failures plus nearby regressions are being re-run.

### `CANDIDATE_READY`
Requirements:
- open P0 = 0,
- open P1 = 0,
- required gates have evidence,
- remaining P2/P3 risks are recorded,
- release evidence draft exists.

### `READY_WITH_ACCEPTED_RISKS`
Requirements:
- all `CANDIDATE_READY` requirements,
- each remaining risk has owner, mitigation, acceptance authority, and review/expiry date,
- independent Critic approves the readiness claim,
- no policy forbids accepting the risk.

### `PRODUCTION_READY`
Requirements:
- all `CANDIDATE_READY` requirements,
- no unresolved blocker,
- no unaccepted material risk,
- independent Critic approves,
- release/recovery/observability evidence exists.

### `POST_RELEASE_VERIFIED`
Requires deployed smoke/canary evidence and no unresolved release blocker.

## Forbidden transitions

- `NOT_ASSESSED → PRODUCTION_READY`
- `BLOCKED → PRODUCTION_READY`
- `HARDENING → RELEASED` without verification
- `CANDIDATE_READY → PRODUCTION_READY` without independent review
