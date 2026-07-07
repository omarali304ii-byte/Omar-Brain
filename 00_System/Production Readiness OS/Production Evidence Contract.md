---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [production, evidence, audit]
ai_access: allowed
---
# Production Evidence Contract

A production-readiness claim must be replayable.

## Minimum audit header

- project ID,
- repository path/URL,
- branch,
- exact commit/revision,
- working-tree state,
- stack/runtime,
- deployment target,
- audit timestamp,
- auditor/agent,
- scope exclusions.

## Finding record

```yaml
id: PROD-F-###
matrix_id: PROD-###
severity: P0 | P1 | P2 | P3
status: OPEN | IN_PROGRESS | VERIFYING | FIXED | ACCEPTED_RISK | NOT_APPLICABLE
title:
evidence:
risk:
affected_surfaces: []
fix:
verification:
dependencies: []
owner:
accepted_by:
review_by:
```

## Fixed means proven

A finding is `FIXED` only when:
1. change exists,
2. original failure no longer reproduces,
3. nearby regression checks pass,
4. evidence is linked,
5. current audit/queue state is updated.

## Release evidence

Final evidence should include:
- command results with exit status,
- tests and counts where meaningful,
- negative authorization/security cases,
- runtime URLs/responses without secrets,
- migration/backup/recovery proof,
- critical journey smoke,
- known risks,
- Critic verdict,
- exact release revision.

"Looks good" is not evidence.
