---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [connected-intelligence, control, experience]
ai_access: allowed
---
# No Orphan Information Policy

No durable information may float without context.

A durable object must answer:
- What am I?
- Where is my canonical home, or why am I ledger-only?
- What produced me?
- Which project/entity do I affect?
- What supports or contradicts me?
- What is my verification state?
- Who may change me?
- When should I be reviewed?

## Exceptions
Temporary inbox/intake objects may be incomplete only while explicitly `status: inbox` and must retain provenance.

## Enforcement
`check-orphan-information.mjs` checks canonical paths, provenance, project references and graph endpoint integrity.
