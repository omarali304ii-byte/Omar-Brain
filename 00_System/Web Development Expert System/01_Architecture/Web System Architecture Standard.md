---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 01_architecture]
ai_access: allowed
---
# Web System Architecture Standard

## Required architecture questions

Before code, answer:
- What is the user/business outcome?
- What are the authoritative state owners?
- Where are trust boundaries?
- What is synchronous vs asynchronous?
- Which external systems can fail?
- Which operations need atomicity?
- Which operations can duplicate?
- What scales independently and why?
- How is recovery performed?

## Default flow

```text
browser/UI
→ route/action/controller
→ input schema
→ authn context
→ authz/policy
→ use case/service
→ transaction boundary
→ repository/gateway
→ DB/provider
→ business event/audit/telemetry
→ stable response
```

## Architecture review triggers

Mandatory review when:
- new authoritative database/entity ownership
- cross-module cycle
- new external provider
- new background worker/queue
- new tenant model
- new auth model
- new public API
- >1000-line source file
- repeated transaction/concurrency failures
- material performance/reliability risk

## Forbidden shortcuts

- UI direct DB writes
- authorization only in UI
- provider SDK spread through business modules
- cache used as undeclared truth
- business-critical side effects hidden in callbacks/hooks
- manual production schema edits without migration record
