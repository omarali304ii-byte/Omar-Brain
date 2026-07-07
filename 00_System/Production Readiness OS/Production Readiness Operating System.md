---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [production, hardening, audit, release, projects]
ai_access: allowed
version: 1.0
---
# Production Readiness Operating System

This system activates when Omar asks to:

- make a project ready for production,
- harden a website/app/backend,
- check what is missing before deploy,
- run a final production audit,
- finish a project to production level.

## Core law

**Feature complete is not production ready.**

A successful build is evidence for one gate only. It does not prove authorization, data safety, abuse resistance, deployment recovery, observability, performance, accessibility, SEO, backup/restore, or runtime correctness.

## Mandatory route

```text
Resolve project
   ↓
Inspect actual repo + revision
   ↓
Detect stack and deployment target
   ↓
Load applicable standards
   ↓
Create baseline production audit
   ↓
Classify P0 / P1 / P2 / P3 findings
   ↓
Build dependency-aware hardening queue
   ↓
Fix smallest coherent blocker batch
   ↓
Re-run original proof
   ↓
Run nearby regressions
   ↓
Update audit + evidence
   ↓
Independent Critic review
   ↓
Any open P0/P1 or failed required gate?
   ├── YES → continue hardening loop
   └── NO  → release gate
                 ↓
          runtime smoke/canary
                 ↓
      production status transition
```

## Mandatory first actions

1. Resolve the canonical project.
2. Read project current state and execution queue.
3. Inspect the actual repository; never infer current code from notes.
4. Record exact revision/branch/worktree state.
5. Detect stack, packages, services, data stores, queues, integrations, auth surfaces, uploads, background jobs, deployment target, and critical journeys.
6. Build an applicability matrix from [[00_System/Production Readiness OS/Universal Production Hardening Matrix]].
7. Run the preliminary automation:

```powershell
node .\00_System\Automation\production-readiness.mjs "<repo-path>"
```

The script is only a baseline scanner. It **cannot certify production readiness**.

## Severity

- **P0 blocker** — immediate severe security/data-loss/compliance/release risk; production must not proceed.
- **P1 blocker** — high-likelihood/high-impact defect or missing gate; production must not proceed without explicit owner override allowed by policy.
- **P2 warning** — important weakness; fix before normal production where practical, or accept with owner/date/mitigation.
- **P3 improvement** — non-blocking enhancement.

## Hardening queue rules

Every finding must have:
- stable ID,
- category,
- severity,
- evidence,
- risk,
- affected files/surfaces,
- fix plan,
- dependency,
- owner,
- verification command/check,
- status.

Fix in dependency order. Security/session/data foundations usually precede polish.

## Anti-stopping rules

Do not stop because:
- `npm run build` passes,
- lint has zero errors,
- the UI looks complete,
- happy-path smoke works,
- the user said "just check quickly",
- one audit document was created,
- all known features exist.

Do not call the project production-ready while:
- any open P0/P1 blocker remains,
- required auth/authorization checks are unproven,
- production data/persistence/backup assumptions are unresolved,
- secrets/config requirements are unknown,
- rollback/recovery is absent for a risky release,
- critical journeys have no evidence,
- the Critic has not reviewed the final claim.

## Completion formula

```text
Feature completeness
+ security/authorization proof
+ data integrity/persistence proof
+ configuration/secrets proof
+ test/build/runtime proof
+ deployment/recovery proof
+ observability proof
+ applicable web/accessibility/performance/SEO proof
+ accepted-risk register
+ independent critic verdict
= production readiness
```

## Required project artifacts

Software projects use:
- `16_PRODUCTION_READINESS.md`
- `17_PRODUCTION_HARDENING_QUEUE.md`
- `18_RELEASE_EVIDENCE.md`

These are control surfaces, not substitutes for repo/runtime evidence.

## Final statuses

Use [[00_System/Production Readiness OS/Production Status State Machine]].

No agent may invent `PRODUCTION_READY`.
