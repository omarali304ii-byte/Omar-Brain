---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [connected-intelligence, control, experience]
ai_access: allowed
---
# Query Planning Protocol

Retrieval is a plan, not a bag of similar chunks.

## Planning order
```text
intent -> exact identifiers -> project resolution -> entity resolution
-> authority requirement -> freshness requirement -> risk class -> route
-> primary skill -> graph expansion -> evidence selection -> compact pack
```

## Context item contract
Each included item carries:
- `object_id` or path
- `why_included`
- `authority`
- `verification_state`
- `freshness`
- optional relation path to the request

## Rules
- Current project truth before general memory.
- Exact failure match before broad conceptual similarity.
- Evidence before lesson when verifying a claim.
- One primary skill unless explicit handoff or validated bundle phase.
- Ambiguous project resolution stops project-specific write actions.
