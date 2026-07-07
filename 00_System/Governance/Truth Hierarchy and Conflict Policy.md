---
type: system
status: active
created: 2026-07-07
topics: [truth, conflicts, source-of-truth]
ai_access: allowed
---
# Truth Hierarchy and Conflict Policy

Different artifacts answer different truth questions. Never flatten them into one vague “source of truth.”

## Project truth map

| Question | Primary authority | Secondary evidence |
|---|---|---|
| What should the system do? | requirements + accepted decisions | user instruction |
| What architecture is intended? | current architecture doc + ADRs | standards/profile |
| What schema actually exists? | migrations/schema files | data model doc |
| What code actually exists? | repository at resolved revision | repo map/current state |
| What behavior is verified? | tests + runtime evidence | implementation notes |
| What is currently being worked on? | execution queue + current state | run records |
| Why was a choice made? | decision/ADR | meeting/run context |
| What is externally true? | current official/primary source | trusted secondary source |
| What did Omar previously decide? | explicit personal decision record | conversation/source evidence |
| What does AI think? | recommendation only | never authority by itself |

## Conflict resolution algorithm
1. Identify the exact claim in conflict.
2. Identify which truth question is being asked.
3. Compare authorities for that question.
4. Check timestamps and supersession links.
5. Inspect direct evidence.
6. Preserve the contradiction if unresolved.
7. Update current truth only after evidence.
8. Link superseded material instead of deleting history.

## Repository drift rule
If docs say a feature exists but code/tests do not prove it, mark drift. Do not call the feature done.

If code exists but architecture/current-state docs are stale, code may be implementation truth while docs are outdated intent. Update docs after verification; do not rewrite history.

## External facts
For unstable external facts, revalidate with current authoritative sources before promoting to durable truth. Record source date when material.
