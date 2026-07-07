---
type: evidence
status: validated
created: 2026-07-07
updated: 2026-07-07
topics: [evidence, real-project-experience, repo]
ai_access: allowed
project_id: prj-meta-word-of-mouth
evidence_id: evd-mrb1oc94-40290714
verification_state: observed
authority: observed
evidence_kind: repo
run_id: run-mrb1o0ob-731bc079
---
# Evidence-first AI and worker architecture

## Claim supported
Supports the observed architecture: webhook/request paths avoid direct OpenAI work; intelligence jobs are claimed asynchronously; AI output is schema-validated; derived signals retain source-message evidence; stale locks are recoverable.

## Evidence reference
github files: README.md; src/lib/intelligence/customer-intelligence.ts; scripts/customer-intelligence-worker.ts

## Observation
- `README.md` documents webhook -> durable event/message -> intelligence job -> worker -> signals/snapshot -> opportunity -> attention flow.
- `customer-intelligence.ts` uses conflict-safe job enqueue, `FOR UPDATE SKIP LOCKED`, stale-lock recovery, strict JSON schema, Zod validation and source-message linkage.
- The worker handles SIGINT/SIGTERM and disconnects Prisma in `finally`.
- Job completion occurs after opportunity refresh succeeds.

## Reproduction / verification
```text
Inspect README.md
Inspect src/lib/intelligence/customer-intelligence.ts
Inspect scripts/customer-intelligence-worker.ts
```

## Limits
- Code path inspected but not executed.
- External OpenAI behavior, cost and latency were not measured.
