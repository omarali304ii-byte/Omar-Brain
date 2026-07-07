---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [connected-intelligence, control, experience]
ai_access: allowed
---
# Universal Ingestion Gateway

All new information should enter through `brain-ingest.mjs` or an equivalent adapter implementing the same contract.

## Sources
Chat, terminal output, GitHub changes, files, research, email, meeting notes, runtime results, test results, client information, decisions and ideas.

## Pipeline
1. Assign `input_id` and preserve source metadata.
2. Hash content for exact duplicate detection.
3. Resolve explicit project/entity identifiers first.
4. Resolve aliases; fail on ambiguity.
5. Classify primary information type.
6. Determine source authority and verification state.
7. Find exact and probable duplicates.
8. Find explicit conflicts where possible; never hide uncertainty.
9. Choose update/create/link/inbox/reject.
10. Stage or commit one transaction.
11. Append provenance and event.
12. Enqueue impact for affected objects.
13. Reindex only affected content when runtime supports it.

## Safety default
Unknown destination goes to `01_Inbox/Connected Intelligence/`; the gateway must not invent a canonical home.
