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
