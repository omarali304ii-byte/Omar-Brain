---
type: system
status: active
created: 2026-07-07
topics: [ai, evidence, verification]
ai_access: allowed
---
# Evidence and Verification Protocol

## Evidence classes
- test output,
- build/type/lint output,
- runtime response,
- database query/result,
- screenshot/manual check,
- provider response,
- diff/revision reference,
- official source,
- user acceptance.

## Evidence record must say
- what claim is being proven,
- environment,
- exact action/command,
- result,
- timestamp/date,
- relevant revision/config,
- limitations.

## Rule
Evidence is scoped. A successful health endpoint does not prove the whole product. A screenshot does not prove authorization. A unit test does not prove provider integration.
