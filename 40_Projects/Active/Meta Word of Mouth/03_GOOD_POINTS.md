---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, strengths, lessons]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Good Points — Proven Strengths

## G1 — Evidence-first AI
AI-derived signals are tied to source messages and conversation context. The code rejects signals without source evidence and the prompt explicitly forbids invented operational facts.

**Why future projects should care:** AI outputs become auditable inputs to business logic rather than untraceable prose.

## G2 — Async AI outside webhooks
Inbound request handling stores/normalizes work and a worker performs model calls later.

**Why it matters:** webhook reliability is not directly coupled to model latency or model outages.

## G3 — Real idempotency and concurrency thinking
The project uses unique identities, conflict-safe inserts, row locking, `SKIP LOCKED`, stale-lock recovery and serializable retry.

**Why it matters:** this is the difference between a demo and a system that can survive retries and concurrent workers.

## G4 — Deterministic business layer after AI
AI extracts signals; opportunity scoring/stage/status are refreshed in an explicit engine. AI confidence, commercial score and priority are intentionally different concepts.

**Why it matters:** high-stakes business state is not reduced to one opaque model answer.

## G5 — Multi-tenant and permission boundaries are explicit
Workspace membership and role permissions are first-class. Latest code changes further hide AI intelligence and full provider IDs unless authorized.

## G6 — Sensitive integration handling
Meta calls are server-side, access tokens are encrypted at rest, secrets stay outside public environment variables and webhook signatures are verified before parsing.

## G7 — Migration discipline
The legacy `LeadDetails` model is being migrated into `Opportunity`, `Person` and `PersonSignal` with dry-run and idempotency expectations instead of destructive replacement.

## G8 — Broad regression intent
The repository exposes many targeted verification scripts for webhook idempotency, identity, permissions, intelligence jobs, worker behavior, memory compaction, opportunity logic, follow-up isolation/idempotency, migrations and Meta architecture.

## G9 — Documentation explains semantics, not only setup
The README documents architecture rules, data flow, score semantics, workers, migration behavior and production path. This reduces hidden tribal knowledge.
