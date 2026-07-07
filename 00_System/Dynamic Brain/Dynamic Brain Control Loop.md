---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [dynamic-brain, control-loop, learning, evaluation]
ai_access: allowed
version: 4.0
---
# Dynamic Brain Control Loop

## Meaning of dynamic
Dynamic does **not** mean “AI freely edits everything”. It means the Brain senses changes, updates derived indexes, routes tasks by capability, measures outcomes, and proposes governed improvements.

## Loop
```text
SENSE
- vault changes
- repo changes
- new episodes
- user corrections
- eval failures
- stale memory
      ↓
INTERPRET
- classify
- resolve entities/projects
- detect contradictions
- measure risk
      ↓
PLAN
- choose workflow/agents
- choose capabilities/tools
- define acceptance and budget
      ↓
ACT
- retrieve
- execute
- verify
      ↓
RECORD
- checkpoint
- episode
- evidence
      ↓
LEARN
- memory proposals
- new eval cases
- failure signatures
- capability score updates
      ↓
GOVERN
- critic
- curator
- human approval where needed
      ↓
ADAPT
- promote patterns
- change routing only after eval
- reindex changed content
```

## Hard rule
Self-improvement must be measurable and reversible. No agent may change its own constitution, memory write policy, or high-risk tool permissions merely because it believes the change is better.
