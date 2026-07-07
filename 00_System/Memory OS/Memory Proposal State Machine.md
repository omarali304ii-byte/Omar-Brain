---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [memory-proposal, state-machine, queue]
ai_access: allowed
version: 1.0
---
# Memory Proposal State Machine

Allowed proposal states:

```text
proposed
  ↓
checking
  ↓
ready-for-critic
  ↓
critic-approved | critic-rejected | needs-evidence
  ↓
ready-for-curator
  ↓
committed | merged | episode-only | rejected | deferred
```

## Idempotency
`proposal_id` is stable. Re-running a proposal must update the same proposal, not create duplicates.

## Queue location
`01_Inbox/Memory Proposals/`

## Completion
A committed proposal records:
- target note,
- commit/hash or evidence of change,
- reindex status,
- evaluation status.
