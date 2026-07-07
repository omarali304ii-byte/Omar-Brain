---
type: system
status: active
created: 2026-07-07
topics: [naming]
ai_access: allowed
---
# Naming Standard

## General rules
1. Human-readable names first.
2. Status never belongs in filenames.
3. Do not use `final`, `final2`, `new`, `latest`, or `v2` as lifecycle management.
4. Avoid duplicate filenames when practical.
5. Acronyms may appear if they are the name people actually use; add aliases.
6. No decorative emoji in filenames.

## Entity notes
Use the canonical entity name:
- `OVX.md`
- `OVX Smart Inbox.md`
- `PostgreSQL.md`

## Dated event notes
Use ISO dates first:
- `2026-07-07 - Meta App Review Meeting.md`

## Decision notes
- `DEC - 2026-07-07 - Choose Instagram First.md`

## Problem-solution notes
Name by observable failure:
- `Docker - no such service postgres.md`
- `Meta Webhook - invalid_signature.md`

## Knowledge notes
Use the concept or procedure people will search for:
- `Retrieval-Augmented Generation.md`
- `Verify Webhook HMAC Using Raw Request Bytes.md`

## Project folders
`40_Projects/Active/<Project Name>/`

The canonical project overview inside is:
`<Project Name>.md`

Never use generic `_Project.md` because external retrieval systems and backlinks benefit from unique filenames.
