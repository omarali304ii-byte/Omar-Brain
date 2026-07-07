---
type: system
status: active
created: 2026-07-07
topics: [release, quality, deployment]
ai_access: allowed
---
# Release Gate

Before release/deployment when applicable:
- intended revision identified,
- required tests/build pass,
- migrations reviewed and ordered,
- rollback/recovery considered,
- secrets/config validated without exposure,
- environment differences checked,
- monitoring/error visibility available,
- critical user journey verified,
- known risks recorded,
- current state and runbook updated.

Release is an operational state change and deserves evidence.


## Production candidate hard stop

For a production-readiness claim, release is forbidden when:
- `16_PRODUCTION_READINESS.md` shows open P0/P1,
- required hardening matrix rows lack evidence,
- `18_RELEASE_EVIDENCE.md` is missing,
- the independent Critic rejected or has not reviewed the claim,
- exact revision/environment is unknown,
- data recovery/rollback assumptions are unresolved for a stateful release.

After deployment, run critical smoke/canary checks and transition to `POST_RELEASE_VERIFIED` only with evidence.
