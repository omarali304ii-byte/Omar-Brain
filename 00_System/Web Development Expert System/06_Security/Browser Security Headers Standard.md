---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 06_security]
ai_access: allowed
---
# Browser Security Headers Standard

Evaluate in deployed responses:
- Content-Security-Policy
- Strict-Transport-Security after readiness review
- frame restrictions / `frame-ancestors`
- Referrer-Policy
- Permissions-Policy where relevant
- secure cookie attributes
- content type protections as applicable

Rules:
- verify through CDN/proxy
- avoid copying a header template without app-specific compatibility testing
- CSP exact directives follow architecture and browser support
- never place secrets in URLs expecting headers to save them
