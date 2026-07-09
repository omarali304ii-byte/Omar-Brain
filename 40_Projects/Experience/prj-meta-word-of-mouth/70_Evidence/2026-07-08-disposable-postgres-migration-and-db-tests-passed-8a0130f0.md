---
type: evidence
status: validated
created: 2026-07-08
updated: 2026-07-08
topics: [evidence, real-project-experience, test]
ai_access: allowed
project_id: prj-meta-word-of-mouth
evidence_id: evd-mrbvakli-8a0130f0
verification_state: observed
authority: observed
evidence_kind: test
run_id: run-mrbva97p-32dd019a
---
# Disposable Postgres migration and DB tests passed

## Claim supported
Started throwaway Postgres container on port 55432, Prisma migrate deploy applied all 12 migrations including 20260708102500_final_production_hardening, then DB-backed verify scripts passed: clean migration, people API, AI person context, AI suggestion feedback, intelligence worker/idempotency/jobs/schema, lead-details migration, followup assignment/idempotency/isolation, webhook idempotency, people identity, opportunity, attention, and Instagram content tests.

## Evidence reference
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:55432/wom_hardening_20260708111655?schema=public npm run db:migrate:deploy; verify scripts

## Observation

## Reproduction / verification
```text

```

## Limits
- This evidence proves only what is explicitly observed above.
