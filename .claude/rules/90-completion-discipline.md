---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, completion, evidence]
ai_access: allowed
---
# Completion Discipline

A good-looking diff is not completion.

Before stopping:
- compare result to the user's exact request;
- verify every changed boundary that can fail;
- run applicable checks rather than naming them;
- inspect failures, repair root cause, and re-run;
- state what was actually verified and what remains unverified;
- update brain/project state only when the evidence changed reality.

Valid exits:
1. requested outcome verified;
2. explicit user scope boundary reached;
3. real blocker with exact missing dependency/access/evidence;
4. safety boundary.

“First attempt failed,” “looks correct,” and “build passed” are not universal stop conditions.
