---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [tokens, context, cache, handoff]
ai_access: allowed
version: 11.0
---
# Token Economy and Context Capsule Policy

The Brain persists execution truth so Claude does not pay to rediscover it.

## Context order
For an active batch, include only:
1. compact final goal;
2. exact active batch contract;
3. dependency handoff outcomes;
4. current state and exact next action;
5. repo path, Git revision, and drift warning;
6. exact read-first/relevant files;
7. valid cached file summaries whose hashes still match;
8. open failures for this batch;
9. verification commands and stop conditions;
10. pointers to relevant rules, not copies of the whole Brain.

## Hard exclusions
Do not inject by default:
- the whole vault;
- whole project transcripts;
- all previous batch reports;
- unrelated skills;
- unrelated architecture standards;
- entire repo trees;
- stale cached summaries.

## Hash-aware intelligence
For each relevant file, store path, hash, size, last-seen time, related batches, and optional summary. Reuse a summary only when `summary_for_hash == current_hash`. A changed hash invalidates the summary and triggers targeted re-read.

## Fresh-context strategy
Preferred long-plan execution:
- same batch: continue only while context remains coherent;
- between batches: fresh Claude context + structured handoff;
- interruption: resume from Brain state, then verify repo drift;
- never use conversation history as the only checkpoint.

## Budget
The context compiler enforces a character budget and records an estimated token count. When over budget, preserve contract, proof, failures, and exact paths first; trim narrative history first.
