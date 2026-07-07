---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 03_backend]
ai_access: allowed
---
# Async Jobs Schedulers and Webhooks

Every important async flow documents:
- trigger
- durable job/event ID
- payload schema/version
- idempotency key
- retryable vs terminal errors
- max attempts/backoff
- ordering assumptions
- concurrency control
- dead-letter/failed state
- visibility and age
- reconciliation
- operator runbook

Webhook receipt is not proof of business completion. Preserve receipt, authenticity evidence, deduplication and downstream outcome separately when needed.
