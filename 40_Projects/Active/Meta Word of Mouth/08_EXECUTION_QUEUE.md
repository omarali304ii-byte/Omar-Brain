---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, queue, next-actions]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Execution Queue

## READY - Highest Leverage
1. **Meta send uncertainty model** - split provider-send success from local persistence success; add `RECONCILIATION_REQUIRED` or equivalent before allowing retry UX.
2. **Leads intelligence permission fix** - hide evidence/signals/source-message text unless the user has `view_intelligence`; add route-level tests for `VIEWER`.
3. **Wire stale intelligence recovery** - call `recoverStaleIntelligenceJobs(...)` from the worker loop and test crash/stale-lock recovery.
4. **Provider privacy closure** - fix People fallback leak, gate provider-ID search, centralize Inbox fragment policy, and update contradictory tests.
5. **Move AI usage feedback after verified send** - server-side attribution should happen after send success and understand base reply versus variants.
6. **Serialize/guard same-person AI snapshot updates** - prevent memory lost updates and older jobs overwriting newer snapshot fields.
7. **Stage-based intelligence errors** - replace brittle string classification with explicit process-stage errors.
8. **Disposable DB verification pass** - start/confirm local Postgres, apply migrations, then run DB-backed scripts without touching the remote Supabase pooler.
9. **CI baseline** - include all critical permission, intelligence, recovery, concurrency, migration, typecheck, lint, and build gates.
10. **Production integration cutover plan** - inventory Supabase Edge responsibilities, establish owned-server parity tests, migrate and retire adapters.
11. **Local reproducibility** - make clean-machine Postgres bootstrap explicit and one-command.
12. **Legacy retirement plan** - measure `LeadDetails` remaining usage and define deletion gate.
13. **Observability baseline** - worker queue age/failures, webhook errors, provider failures and alert ownership.

## Verify Before Scheduling
- Whether any CI workflow exists under a nonstandard name or external system.
- Current deployment target and actual runtime health.
- Current DB-backed test pass/fail state on a disposable database.
- Whether Leads evidence and Inbox identity display are acceptable under the final privacy policy.
- Whether Meta-send reconciliation should reuse the Instagram publishing uncertain-outcome pattern.
- Backup/restore procedure and last successful restore proof.
- Data retention/deletion requirements.

## Deferred Until Pressure
- Split intelligence module after the P0 gate is repaired.
- Data-driven custom roles.
- Re-enable Instagram content UI.

## Exact Next Action
Implement the P0 production gate in order: external-send uncertainty, Leads `view_intelligence` enforcement, stale recovery wiring, provider privacy closure, AI feedback-after-send, and same-person AI concurrency. Then prove the fixes with route-level and concurrency tests on a disposable database.
