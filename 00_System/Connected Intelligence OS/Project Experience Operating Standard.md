---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [connected-intelligence, project-experience, learning]
ai_access: allowed
---
# Project Experience Operating Standard

## Purpose
Every real project should make Omar Brain more experienced, not merely larger. Project experience becomes reusable only when identity, repository truth, evidence, causal graph links, learning candidates, applicability limits, retrieval proof, and validation all move together.

## Admission
When a project enters the Brain:
1. Resolve existing identity and ambiguous aliases.
2. Create or reuse a stable `project_id` and canonical project object.
3. Capture local path, repo URL, default branch, exact revision when available, and verification state.
4. Create/update the manifest and canonical packet without inventing unverified truth.
5. Mark imported context as `contextual` until repo/runtime evidence exists.

## Repository Study
Repository study must inspect the relevant profile, not a fixed note count. For software projects, inspect identity, architecture, domain model, data flow, API surfaces, UI surfaces, auth, authorization, integrations, workers, jobs, migrations, tests, CI, deployment, observability, Docker/local environment, security, privacy, technical debt, and Git evolution.

## Truth Levels
Do not collapse these:
- `contextual`
- `repo-observed`
- `test-verified`
- `runtime-verified`
- `deployment-verified`
- `inferred`
- `stale`
- `invalidated`
- `superseded`

## Run Contract
Every meaningful operation should create or update a run with objective, starting state, exact repo revision, work performed, files changed, commands executed, failures, repairs, evidence, result, uncertainty, next action, learning review, and cross-project implications.

## Evidence Contract
Every evidence object must state evidence ID, project ID, source run, kind, exact reference, what it proves, what it does not prove, authority, verification state, timestamp, revision when relevant, confidence, and supersession state.

## Learning Candidate Contract
Every active candidate must have candidate ID, kind, claim, source runs, source evidence, source projects, validation count, independent project count, applicability conditions, non-applicability conditions, transfer mode, confidence, status, promotion rule, and rejection/supersession fields when applicable. A candidate may point to a canonical pattern or failure object, but it is not promoted truth by itself.

## Pattern Contract
Reusable pattern objects should define stable object ID, title, problem solved, mechanism, invariants, tradeoffs, applicability, non-applicability, source projects, source evidence, supporting runs, required skills, conflicting patterns when known, validation state, and promotion state.

## Failure Signature Contract
Failure signature objects should define stable object ID, canonical name, symptom, detection clues, likely root causes, observed project, source runs, source evidence, failed approaches when known, repair/prevention, applicability boundary, status, and independent validations.

## Canonical Concept Identity
Durable concepts need one canonical object. Project notes, transfer candidates, learning candidates, runs, and evidence may explain the same concept for different audiences, but they must reference the canonical object instead of silently becoming competing truth sources.

## Impact Processing
Impact states are `pending`, `processing`, `processed`, `blocked`, `rejected`, and `superseded`. A processed impact must record processor, timestamp, source object, actions attempted, affected objects, changes made or no-change reason, resulting events, resulting transactions, errors, retry count, and blocker when applicable.

## Revision Freshness
For repo-grounded projects:
```text
recorded revision != current revision
  -> project.truth.stale event
  -> impact queued
  -> changed-file impact analysis
  -> targeted reinspection
```
Do not require a full re-study after every commit; use changed files and affected claims to decide scope.

## Future Project Transfer
Transfer planning must answer:
- What patterns might apply?
- What failure signatures resemble this architecture?
- What skills are relevant?
- What anti-copy warnings matter?
- What evidence supports these suggestions?
- What remains only one-project experience?

Every included item must carry `why_included` and a boundary. No silent context injection.
