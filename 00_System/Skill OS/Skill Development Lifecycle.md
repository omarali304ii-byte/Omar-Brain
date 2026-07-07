---
type: system
status: active
created: 2026-07-07
topics: [skills, learning, development]
ai_access: allowed
---
# Skill Development Lifecycle

This is how Omar Brain grows capability without becoming a junk drawer.

```text
Observed gap or repeated workflow
        ↓
S0 candidate
        ↓
Deduplicate against registry + graph
        ↓
Collect provenance and examples
        ↓
Draft capability contract
        ↓
Sandbox application
        ↓
Critic review
        ↓
S1/S2 active only if useful
        ↓
Real project applications
        ↓
Evidence ledger
        ↓
Maturity promotion
        ↓
Periodic adaptation / deprecation
```

## Candidate gate

Create a candidate when:
- a request repeatedly has no confident skill route,
- the same verified workflow appears across projects,
- a new stack/domain creates a stable capability need, or
- a production incident reveals a missing reusable procedure.

Do **not** create a skill for:
- one tiny task,
- a fact that belongs in Knowledge,
- a project-specific decision,
- a duplicate with different wording.

## Promotion gate

A candidate needs:
1. unique responsibility,
2. triggers and non-triggers,
3. inputs, workflow, outputs, gates,
4. provenance,
5. graph neighbors/handoffs,
6. a sandbox application plan,
7. review.

## Development commands

- propose candidate: `node 00_System/Automation/skill-dev.mjs . propose "Name" --category Research --reason "..."`
- inspect candidate queue: `node 00_System/Automation/skill-dev.mjs . list`
- record evidence: `node 00_System/Automation/skill-evidence.mjs . <skill-id> <project-id> <verdict> "note"`

## Learning law

The brain gets smarter when a reusable capability improves measured outcomes or reliability. File count is not intelligence.
