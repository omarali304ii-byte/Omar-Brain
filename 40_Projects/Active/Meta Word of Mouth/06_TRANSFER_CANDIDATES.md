---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, learning-candidates, transfer]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Bounded Transfer Candidates

These are **proposed patterns learned from one repo**. They are guidance, not global law. Validate in another project before promotion.

## C1 — Evidence-first AI decision pipeline
**Claim:** When AI-derived facts affect CRM/business state, persist the exact source evidence, validate structured output and keep deterministic downstream decisions separate from model confidence.

**Good fit:** CRM, support intelligence, lead extraction, document extraction, moderation assistance.

**Boundary:** Not every creative or low-stakes generation flow needs durable evidence rows.

## C2 — Durable async side-effect pipeline
**Claim:** External events should commit durable work before expensive AI/provider side effects; workers should use idempotent claims, bounded retries and stale-lock recovery.

**Good fit:** webhooks, AI analysis, publishing, email, payments, imports.

**Boundary:** trivial synchronous operations may not justify a queue.

## C3 — Raw-byte signed webhook verification
**Claim:** Verify provider signatures over the exact expected bytes before parsing or transforming the body, then normalize only after authenticity is established.

**Good fit:** signed webhooks.

**Boundary:** follow the provider's exact signature contract; do not cargo-cult Meta-specific headers.

## C4 — Permission-scoped DTO exposure
**Claim:** Sensitive fields should default to hidden/masked and be exposed only when authorization explicitly permits it; query loading should also avoid fetching sensitive intelligence when unnecessary.

**Good fit:** multi-tenant apps, provider IDs, AI intelligence, PII.

**Boundary:** masking is not a substitute for access control.

## C5 — Idempotent legacy migration
**Claim:** Legacy-to-new-model migrations should support dry-run, repeated safe execution, audit markers and tests for both full migration and idempotency.

**Good fit:** live schema/domain transitions.

**Boundary:** large migrations may additionally require batching, checkpoints and rollback/roll-forward plans.

## C6 — Separate confidence, business score and urgency
**Claim:** AI confidence, deterministic commercial strength and operational priority should be modeled separately.

**Good fit:** lead systems, risk queues, support prioritization.

**Boundary:** define semantics per domain; do not copy score formulas.

## Anti-transfer warnings
- Do not copy temporary Supabase adapters as permanent architecture.
- Do not copy Meta-specific permissions or reply-window rules to unrelated providers.
- Do not copy one large intelligence module into future systems; copy the behavioral contracts.
- Do not copy static roles when custom permissions are already known requirements.
