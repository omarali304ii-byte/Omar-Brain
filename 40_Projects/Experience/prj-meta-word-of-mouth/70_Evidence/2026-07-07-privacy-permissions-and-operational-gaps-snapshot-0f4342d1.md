---
type: evidence
status: validated
created: 2026-07-07
updated: 2026-07-07
topics: [evidence, real-project-experience, repo]
ai_access: allowed
project_id: prj-meta-word-of-mouth
evidence_id: evd-mrb1ocdf-0f4342d1
verification_state: observed
authority: observed
evidence_kind: repo
run_id: run-mrb1o0ob-731bc079
---
# Privacy permissions and operational gaps snapshot

## Claim supported
Supports both strengths and bounded gaps: workspace permissions and sensitive-field masking are explicit; Docker Compose contains only the app service; production migration from temporary Supabase adapters remains future work; the inspected latest commit exposed no combined CI statuses.

## Evidence reference
github files: src/lib/auth/permissions.ts; src/lib/auth/api-auth.ts; latest commit diff; docker-compose.yml; README.md; latest commit combined status

## Observation
Strengths:
- explicit role -> permission mapping
- API permission gate requires authenticated user + active workspace + permission
- latest commit adds permission-controlled provider ID and intelligence exposure

Observed gaps/boundaries:
- `docker-compose.yml` defines only `word-of-mouth`; DB is external through environment configuration
- README describes Supabase Edge adapters as temporary development infrastructure and owned-server production migration as future path
- Instagram publishing backend exists while user-facing content route is disabled
- `LeadDetails` is deprecated but retained
- GitHub combined status for `8c027fabf85fe46fa0395eb459c0289872fef491` returned no statuses

## Reproduction / verification
```text
Inspect src/lib/auth/permissions.ts
Inspect src/lib/auth/api-auth.ts
Inspect latest commit diff
Inspect docker-compose.yml
Inspect README.md
Get combined status for 8c027fabf85fe46fa0395eb459c0289872fef491
```

## Limits
- No-status result does not rule out every external or differently integrated CI system.
- A missing standard workflow path is not proof that no workflow file exists under another name.
- Runtime authorization coverage was not exhaustively tested here.
