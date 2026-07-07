---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 02_frontend]
ai_access: allowed
---
# Forms and Mutation UX Standard

## Form contract

- explicit labels and constraints
- client validation for UX, server validation for trust
- preserve safe user input on failure
- associate errors with controls
- summary/focus strategy for large forms
- pending state prevents accidental duplicate action without trapping user
- server conflict handling
- success only after trusted confirmation

## Dangerous actions

Require deliberate confirmation pattern based on reversibility and impact. Prefer undo for reversible low-risk actions. High-risk actions may require reauthentication or typed confirmation when justified.
