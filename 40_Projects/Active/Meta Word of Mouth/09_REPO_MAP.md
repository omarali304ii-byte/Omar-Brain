---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, repo-map, repository]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Repository Map

## Identity
- Repo: `omarali304ii-byte/Meta-Word-of-mouth`
- Visibility observed: private
- Default branch: `main`
- Revision assessed: `8c027fabf85fe46fa0395eb459c0289872fef491`
- Local path known from Omar context: `D:\Marketing 777\Meta Dev Project\Meta Word of mouth`

## Important entry points observed
- `package.json` — scripts, dependencies and worker commands.
- `README.md` — architecture semantics, data flow, workers, migration and production path.
- `prisma/schema.prisma` — multi-tenant domain schema.
- `app/api/*` — authenticated application API routes.
- `src/lib/auth/*` — session/API permission enforcement.
- `src/lib/intelligence/*` — AI job orchestration, evidence, durable memory.
- `src/lib/opportunities/*` — deterministic opportunity logic.
- `src/lib/attention/*` — follow-up/attention engine.
- `src/lib/privacy/*` — provider ID exposure policy.
- `src/lib/migrations/*` — executable legacy migration logic.
- `scripts/*` — workers, migrations and regression checks.
- `supabase/functions/meta-webhook/*` — development public webhook adapter.
- `supabase/functions/_shared/webhook-ingestion.ts` — transactional normalization/idempotency.
- `docker-compose.yml`, `Dockerfile.dev` — app development container.

## Verification commands declared by the repo
The package exposes targeted tests plus:
- `npm run db:validate`
- `npm run db:generate`
- `npm run typecheck`
- `npm run build`
- `npm run lint`

## Repo-history note
Recent commit history is active, but many commit messages are `.`; future work should use meaningful messages for learning provenance.
