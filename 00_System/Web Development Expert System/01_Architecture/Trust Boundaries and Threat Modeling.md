---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 01_architecture]
ai_access: allowed
---
# Trust Boundaries and Threat Modeling

## Minimum model

Record:
- assets
- actors and roles
- entry points
- data stores
- external services
- browser/server/worker/admin/tenant boundaries
- privileged operations
- abuse cases
- mitigations
- residual risk
- tests

## Mandatory abuse cases

Consider where applicable:
- stolen session/token
- cross-tenant object ID
- privilege escalation
- duplicate request/webhook/job
- replay
- malformed/oversized input
- XSS/CSRF/injection
- SSRF/internal network access
- malicious upload
- dependency compromise
- admin misuse
- rate/resource exhaustion
- data export abuse
- privacy misuse

Map each critical abuse case to rule IDs and evidence.
