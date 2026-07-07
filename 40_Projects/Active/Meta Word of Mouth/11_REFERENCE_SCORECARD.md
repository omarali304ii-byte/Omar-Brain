---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, scorecard, assessment]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Reference Scorecard

Scores are a **repo-level plus local static-test assessment at one revision**, not runtime certification.

| Dimension | Score / 10 | Reason |
|---|---:|---|
| Architecture boundaries | 8.8 | clear server/provider/worker boundaries and explicit data flow |
| Data integrity/idempotency | 9.0 | unique identities, conflict-safe writes, locking, serializable retry |
| AI engineering | 8.8 | strict schema, evidence-first signals, durable memory, async jobs |
| Security/privacy design | 7.2 | encrypted tokens and masking exist, but static audit found Leads evidence exposure plus provider-ID fallback/search/Inbox fragment gaps |
| Domain modeling | 8.5 | person/identity/conversation/signal/opportunity separation is thoughtful |
| Test strategy intent | 8.4 | many targeted scripts; pure compatibility, Meta architecture, and intelligence privacy tests passed locally |
| Automated delivery proof | 4.0 | workflow exists, but static audit found critical scripts missing and successful full Actions run remains unproven |
| Local reproducibility | 5.7 | app container exists and local static gates pass; active DB URL was remote, so fixture tests still need disposable DB proof |
| Maintainability | 7.0 | good modules overall; intelligence orchestration is a growing hotspot |
| Production readiness | 3.8 | expanded static audit found P0 blockers around send uncertainty, intelligence privacy, stale recovery, provider privacy, AI feedback timing, and concurrency |

## Overall reference value
**9.0 / 10 as a learning source.**

Why the reference value is higher than production readiness: the brain needs projects that expose strong patterns **and** real imperfections. This repo contains both.

The project is especially valuable now because it teaches a realistic transition from good architecture to production hardening: side-effect uncertainty, privacy enforcement across query/evidence layers, worker recovery, and concurrency proof.

## Reference verdict
Use this project to teach future projects:
- evidence-first AI
- durable async work
- idempotent event processing
- permission-scoped exposure
- migration discipline
- explicit semantic score separation

Do not teach future projects to copy:
- temporary infrastructure split
- manual-only regression dependence
- weak commit messages
- dormant backend surfaces without product decision
- unresolved legacy models
