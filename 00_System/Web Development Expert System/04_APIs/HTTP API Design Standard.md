---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 04_apis]
ai_access: allowed
---
# HTTP API Design Standard

## Semantics

Use HTTP according to RFC semantics:
- GET/HEAD safe
- idempotency understood for PUT/DELETE and application commands
- status code communicates protocol outcome
- cache behavior deliberate

## Contract

For consumed APIs define:
- authentication
- authorization
- resource/action model
- request/response schemas
- errors
- pagination
- filtering/sorting
- idempotency
- concurrency
- rate/abuse behavior
- versioning/deprecation

Prefer one error model; RFC 9457 is default candidate.
