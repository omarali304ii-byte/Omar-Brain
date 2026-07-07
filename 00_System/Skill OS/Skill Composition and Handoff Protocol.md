---
type: system
status: active
created: 2026-07-07
topics: [skills, composition, handoff]
ai_access: allowed
---
# Skill Composition and Handoff Protocol

## Default context budget

```text
1 primary skill
+ 0-2 support skills
= default maximum 3 active skill contracts
```

A bundle may list more optional skills, but they are lazy-loaded only when the current evidence says they are needed.

## Selection order

1. Resolve the brain route.
2. Select the primary skill that owns the requested outcome.
3. Read its inputs and gates.
4. Add a support skill only when:
   - a distinct responsibility appears,
   - a graph handoff says to transfer,
   - project-stack evidence activates it, or
   - a bundle's current phase requires it.
5. Drop a skill from active context after its responsibility is complete.

## Anti-skill-soup rule

Do not activate several similar skills merely because all have keyword overlap. Prefer the narrowest owner and preserve alternatives as candidates.

## Handoff packet

A handoff carries:
- current objective,
- completed evidence,
- unresolved gap,
- constraints,
- exact reason the next skill owns the work.

## Completion

Skill execution ends with one of:
- `DONE_WITH_EVIDENCE`,
- `HANDOFF_REQUIRED`,
- `BLOCKED`,
- `NOT_APPLICABLE`.
