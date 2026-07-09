# Integration and Workflow Domain Model

## Freshness
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
last_verified_at: 2026-07-07
verification_scope: stored repo inspection and static verification; recheck before live claim
freshness: partial
```

## Current model
- Inbound Meta events are designed for raw-byte signature verification and idempotent persistence/normalization.
- Outbound send currently has a P0 uncertain-outcome risk: provider acceptance can precede local persistence failure.
- Temporary development adapters and final owned production endpoints can drift until cutover is complete.

## Model maintenance rule
When owned reality changes, rewrite this present-tense model and link evidence. Do not append a diary.
