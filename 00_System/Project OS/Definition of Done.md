---
type: system
status: active
created: 2026-07-07
topics: [done, quality, verification]
ai_access: allowed
---
# Definition of Done

No agent may claim completion until applicable gates pass.

## Universal gates
- acceptance criteria are explicit,
- implementation/result exists,
- verification evidence exists,
- known blockers are resolved or explicitly excluded from scope,
- current-state docs match reality,
- decisions are recorded,
- reusable learning extracted,
- no unresolved contradiction about completion.

## Software gates
- architecture boundaries respected or ADR override exists,
- permissions/security reviewed,
- data migrations/schema consistent,
- important state changes have event/audit evidence where applicable,
- happy path tested,
- important failure paths tested,
- regressions checked,
- lint/type/build/test commands pass when applicable,
- runtime/manual verification completed where automated tests are insufficient,
- no fake data or mock path is presented as production truth,
- secrets not exposed,
- docs updated,
- evidence pack linked.

## Feature completion formula

```text
Requirements
+ implementation
+ permissions
+ transaction/data integrity
+ events/audit when important
+ tests
+ runtime evidence when needed
+ docs
= done
```

Writing code alone is `in-progress`, not done.


## Production-readiness gates

When production readiness is in scope, all ordinary Software gates still apply plus:
- exact release revision and deployment target identified,
- production applicability matrix completed,
- open P0 blockers = 0,
- open P1 blockers = 0,
- authentication and authorization negative cases proven where applicable,
- production config/secrets inventory validated,
- data persistence/migrations/backup/recovery proven where applicable,
- abuse/rate-limit/input/upload controls reviewed,
- critical user journeys verified against real runtime,
- observability/health/alerting appropriate to risk,
- deployment and rollback/roll-forward path proven,
- applicable web security/performance/accessibility/SEO gates evidenced,
- remaining risks explicitly accepted with owner and review date,
- independent Critic approves the readiness claim,
- release evidence linked.

`build passed` is not a production Done definition.
