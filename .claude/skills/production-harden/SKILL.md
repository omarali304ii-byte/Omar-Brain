---
name: production-harden
description: Audit and harden a real software project to evidence-backed production readiness, closing P0/P1 blockers and requiring independent criticism before readiness claims.
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, production, hardening]
ai_access: allowed
---
# Production Harden

Use only for production-ready, final audit, before deploy, harden, check everything missing, or equivalent intent.

## Sequence
1. Resolve exact project and repository revision.
2. Read `Production Readiness Operating System` and applicable project readiness files.
3. Inspect real repository/runtime evidence.
4. Build applicability matrix; do not audit irrelevant domains mechanically.
5. Audit at minimum where applicable:
   - correctness and architecture boundaries
   - auth/session/authorization/tenant isolation
   - secrets/privacy/data minimization
   - validation/idempotency/concurrency/transactions
   - migrations/backup/recovery
   - webhooks/jobs/retries/dead letters/stale recovery
   - observability/SLOs/incidents
   - dependency/supply-chain risk
   - accessibility/performance/SEO/browser behavior
   - CI/CD/release/rollback
6. Classify findings P0-P3 with evidence.
7. Create dependency-aware hardening queue.
8. Fix P0/P1 first; verify after each batch.
9. Re-audit changed boundaries.
10. Hand candidate to `critic-verifier` agent for independent review.
11. Do not claim `PRODUCTION_READY` with open P0/P1 blockers or unproved required gates.

A build pass alone is insufficient.
