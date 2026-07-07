---
type: system
status: active
created: 2026-07-07
topics: [quality, gates, verification]
ai_access: allowed
---
# Quality Gate Matrix

Apply gates based on project risk and feature type.

| Gate | Trigger | Minimum proof |
|---|---|---|
| Requirements | all non-trivial work | acceptance criteria |
| Architecture | cross-module/state changes | boundary review/ADR |
| Data integrity | schema/state writes | migration + transaction tests |
| Permission | protected behavior | authorization verification |
| Idempotency | retries/webhooks/orders/jobs | duplicate/retry test |
| Security | secrets/untrusted input/integration | targeted review/test |
| Build/type/lint | compiled typed projects | passing commands |
| Unit | dense rules | relevant passing tests |
| Integration | DB/provider boundaries | integrated passing tests |
| E2E | critical journeys | end-to-end evidence |
| Runtime | real integration/ops | actual response/manual evidence |
| Regression | bug fix | original failure no longer reproduces |
| Documentation | durable behavior change | current docs updated |
| Learning | meaningful batch | lesson/failure extraction considered |
| Production applicability | production hardening requested | completed PROD-001..032 applicability |
| Production blockers | candidate release | open P0=0 and P1=0 |
| Recovery | stateful/risky release | backup/restore + rollback/roll-forward evidence |
| Observability | production service | health/error/critical-signal visibility |
| Independent readiness | production claim | Critic verdict against release evidence |

A gate marked not applicable should have a reason for high-risk work.
