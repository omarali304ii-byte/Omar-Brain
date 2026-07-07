---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, context, product]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Context

## Product mission
Turn customer conversations into an operational workspace where a team can reply, understand people across identities, detect commercial opportunities, prioritize attention and automate follow-up without allowing AI to invent facts.

## Active user surfaces observed
- `/inbox` — unified conversations and AI reply assistance.
- `/people`, `/people/[id]` — person profiles, identities, memory and AI reports.
- `/leads`, `/leads/[id]` — opportunities, scoring, stages and attention.
- `/settings/*` — Meta connections, workspace, team and permissions.

## Current stack observed
- Next.js 16 App Router
- React 19 + TypeScript
- PostgreSQL + Prisma 7.8
- TanStack Query + Zustand
- Tailwind CSS 4 + Radix/shadcn-style UI primitives
- OpenAI Responses API called server-side
- Supabase Postgres and Edge functions used as temporary development infrastructure for public webhook/OAuth endpoints

## Core business model
`Workspace -> Person -> platform identities/customers -> conversations -> messages -> evidence-backed signals -> durable intelligence snapshot -> opportunity -> attention/follow-up`

## Non-negotiable product distinctions
- AI lead confidence is not the deterministic opportunity score.
- Priority score is not sales likelihood.
- Identity merge requires evidence.
- AI intelligence must retain evidence links.
- Browser does not directly call Meta or the database.
