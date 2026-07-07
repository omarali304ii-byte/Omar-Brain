---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 06_security]
ai_access: allowed
---
# Web Security Baseline

## Baseline selection

- ASVS Level 2: default for most production web applications.
- ASVS Level 3: high-value, high-assurance or high-safety.
- OWASP Top 10 is awareness only, not a complete verification checklist.
- WSTG informs test methodology.

## Mandatory categories

- input/output safety
- identity/authentication
- sessions/tokens
- authorization
- data protection
- browser security
- APIs/webhooks
- files
- SSRF/injection
- secrets
- logging
- dependencies/supply chain
- configuration/deployment
- business-logic abuse

Every applicable blocker rule needs evidence.
