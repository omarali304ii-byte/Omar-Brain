---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 03_backend]
ai_access: allowed
---
# Backend Service Boundary Standard

## Route/controller
- parse transport
- authenticate context
- call use case
- translate result

## Use case/service
- business invariants
- authorization policy invocation
- transaction orchestration
- idempotency semantics
- side-effect intent

## Repository
- persistence mechanics
- query shape
- no hidden business decisions

## Gateway
- provider protocol
- timeouts/retries
- error translation
- observability

## Prohibited
- giant route handlers
- provider SDK calls from random UI/service files
- swallowed errors
- durable rule only in frontend
