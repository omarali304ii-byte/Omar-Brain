---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 12_delivery]
ai_access: allowed
---
# CI CD Release and Recovery Standard

## Pipeline minimum
- deterministic install
- compile/type/lint as applicable
- required tests
- dependency/security checks
- artifact/revision identity
- migration gate
- deployment
- smoke
- post-release health/business verification

## High-risk release
Consider:
- canary/staged rollout
- feature flag
- rollback/roll-forward
- compatibility window
- operator communication

## Evidence
Preserve revision, artifact, migrations, test results, runtime checks and known risks.
