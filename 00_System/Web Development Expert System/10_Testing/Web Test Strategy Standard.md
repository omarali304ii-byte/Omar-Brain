---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 10_testing]
ai_access: allowed
---
# Web Test Strategy Standard

## Layer selection by risk

- unit: dense deterministic rules
- integration: DB, migrations, queues, provider adapters
- contract: API/provider compatibility
- component/UI: user-visible behavior
- E2E: critical journeys
- accessibility: automated + manual
- security: ASVS/WSTG-derived
- performance: field/lab/load
- resilience: timeout/retry/duplicate/dependency failure

## Required negative thinking

For critical flows test:
- invalid input
- unauthorized
- wrong tenant
- duplicate
- concurrency
- timeout
- downstream 4xx/5xx
- partial failure
- restart/retry

No test layer is universal proof.
