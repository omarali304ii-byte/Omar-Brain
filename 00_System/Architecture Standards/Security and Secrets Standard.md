---
type: standard
status: active
created: 2026-07-07
topics: [security, secrets, permissions]
ai_access: allowed
maturity: standard
---
# Security and Secrets Standard

## Baseline
- secrets server-side only,
- least privilege,
- authorization at trusted business boundaries,
- tenant/organization isolation when applicable,
- secure token storage and rotation plan,
- no raw secret logging,
- validate untrusted input,
- output encoding where relevant,
- audit sensitive actions,
- deletion/revocation flows for integrations,
- official provider flows for external platforms.

A hidden button is not authorization. A client-side check is not a security boundary.
