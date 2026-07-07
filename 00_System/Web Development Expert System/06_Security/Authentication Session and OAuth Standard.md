---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 06_security]
ai_access: allowed
---
# Authentication Session and OAuth Standard

## Sessions
- secure unpredictable IDs
- secure cookie attributes
- rotation after auth/privilege changes
- expiry and idle behavior
- revocation/logout
- reauthentication for risky operations
- no session IDs in URLs

## Passwords
Use current OWASP password-storage guidance; never reversible storage or fast hashing.

## OAuth
Review against RFC 9700. Document:
- client type
- redirect URIs
- PKCE/flow
- state/CSRF protections
- scopes/audience
- token storage
- refresh/revocation
- logout expectations

Do not invent an OAuth flow from memory.
