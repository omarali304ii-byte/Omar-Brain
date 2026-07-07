---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, current-state, truth]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Current State

## Repo/test-verified at
`8c027fabf85fe46fa0395eb459c0289872fef491` on `main`.

Local checkout verification on 2026-07-07:
- branch `main`, tracking `origin/main`
- clean worktree
- `npm run db:validate` passed
- `npm run test:compat` passed
- `npm run test:meta-architecture` passed
- `npm run test:intelligence-permissions` passed
- `npm run typecheck` passed
- `npm run lint` passed
- `npm run build` passed

## Observed active capabilities
- unified inbox
- people identity/profile model
- evidence-linked AI intelligence
- opportunity/lead engine
- attention and follow-up automation
- Meta connection and messaging architecture
- backend Instagram publishing infrastructure
- workspace roles/permissions
- legacy lead migration tooling

## Observed implementation maturity
- Architecture: strong
- Security/privacy intent: strong and improving
- Data/idempotency discipline: strong
- Test intent: strong
- Static verification: passed locally for schema/type/lint/build and pure compatibility/architecture/privacy tests
- Automated delivery evidence: weak/not proven
- Reproducible local infrastructure: partial
- Production cutover: incomplete
- Runtime status: not verified in this assessment
- Database-backed tests: intentionally skipped because configured `DATABASE_URL` pointed to a non-local Supabase pooler
- Production-gate audit: expanded static audit on 2026-07-07 found P0 blockers around external send uncertainty, Leads intelligence exposure, stale job recovery wiring, provider-ID privacy, AI feedback timing, and same-person intelligence concurrency.

## Known temporary state
- Supabase Edge used for development webhook/OAuth public endpoints.
- Instagram content user surface disabled while backend infrastructure remains.
- `LeadDetails` deprecated but retained pending full migration.

## Truth boundary
Any future AI must re-resolve current branch/revision and inspect changed files before treating this note as current code truth. Database-backed test claims require a confirmed disposable/local database; live Meta/OpenAI/deployment claims require separate runtime evidence. Do not call this project production-ready while the expanded production gate in `04_BAD_POINTS_AND_RISKS.md` remains open.
