---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [memory, procedural-memory, skills, policies, prompts]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Procedural Memory Standard

## Purpose
Store repeatable behavior: rules, skills, SOPs, prompts, checklists, architecture standards, tool contracts, and workflows.

## Required metadata
```yaml
memory_class: procedural
version: 1.0
owner: ...
applies_to: []
approval: none|critic|human
last_validated: YYYY-MM-DD
```

## Procedural write threshold
Promote a behavior only when:
- it is expected to recur,
- scope and applicability are explicit,
- evidence shows it improves outcomes or prevents a known failure,
- rollback/supersession is possible,
- tests or verification criteria exist.

## Skill format
Every reusable skill should define:
1. intent,
2. triggers,
3. preconditions,
4. inputs,
5. procedure,
6. tool permissions,
7. failure handling,
8. evidence required,
9. stopping criteria,
10. examples,
11. version and owner.

## Lazy loading
Agents must load only procedural memory applicable to the active task. Do not inject every standard into every prompt.

```text
Task classification
      ↓
Capability match
      ↓
Load minimal skill set
      ↓
Execute
      ↓
Verify
      ↓
Record outcome
```

## Change control
A procedural change that affects external actions, security, memory writes, release gates, or broad architecture requires a change proposal and review.
