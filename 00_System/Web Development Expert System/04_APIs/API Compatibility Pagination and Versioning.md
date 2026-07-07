---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 04_apis]
ai_access: allowed
---
# API Compatibility Pagination and Versioning

## Breaking-change analysis

Check:
- removed/renamed fields
- required field added
- enum widened/narrowed and client behavior
- nullability changes
- semantic changes
- status code changes
- ordering changes
- pagination cursor changes
- auth/scope changes

## Pagination

Choose based on data and consistency:
- offset for simple bounded/admin cases
- cursor/keyset for large changing datasets

Always bound page size and define stable order/tie-breaker.
