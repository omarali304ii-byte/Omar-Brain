---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [capabilities, skills, dynamic-loading, agents]
ai_access: allowed
version: 1.0
---
# Capability Discovery and Skill Loading

## Purpose
Let the Brain grow expertise without permanently inflating every agent context.

## Capability sources
- global architecture standards,
- web expert profile,
- project architecture profile,
- skill notes,
- approved playbooks,
- tool contracts,
- failure signatures and anti-patterns.

## Dynamic loading
```text
Task intent
  + project profile
  + risk flags
      ↓
Capability Registry query
      ↓
Rank by applicability + validation score
      ↓
Load top minimal set
      ↓
Execute and evaluate
```

## Capability score inputs
- success count,
- failure count,
- distinct validated projects,
- recency,
- eval performance,
- version compatibility.

## Rule
A capability is a hypothesis until validated in the active context. Cross-project transfer must still verify.


## External Claude skill library

The imported pack lives at `50_Skills/Claude Skill Library/` and contains 559 on-demand skills. It is intentionally separate from the canonical validated skill registry.

```text
Task intent
  -> route/project truth
  -> canonical skill ownership check
  -> compact external catalog match
  -> zero/one primary candidate
  -> inspect SKILL.md
  -> compatibility + risk check
  -> narrow application
```

Rules:
- candidate metadata may be injected at prompt time; skill bodies are not;
- no external candidate is automatically trusted or activated;
- max active external set is three;
- exact repo truth outranks imported procedure text;
- scripts/references/assets are lazy-loaded only when needed;
- promotion into the canonical registry requires evidence through the Skill OS lifecycle.
