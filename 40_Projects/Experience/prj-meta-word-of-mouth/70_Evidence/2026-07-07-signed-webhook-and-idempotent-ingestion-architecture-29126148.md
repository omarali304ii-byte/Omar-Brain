---
type: evidence
status: validated
created: 2026-07-07
updated: 2026-07-07
topics: [evidence, real-project-experience, repo]
ai_access: allowed
project_id: prj-meta-word-of-mouth
evidence_id: evd-mrb1ocbf-29126148
verification_state: observed
authority: observed
evidence_kind: repo
run_id: run-mrb1o0ob-731bc079
---
# Signed webhook and idempotent ingestion architecture

## Claim supported
Supports the observed pattern: verify signature against raw bytes before JSON parse, store provider event identity, use conflict-safe inserts, transaction locking, and serializable retries.

## Evidence reference
github files: supabase/functions/meta-webhook/index.ts; supabase/functions/_shared/webhook-ingestion.ts

## Observation
- Webhook reads `request.arrayBuffer()` into raw bytes.
- Signature verification occurs before JSON parsing.
- Invalid signatures are rejected with 401.
- Ingestion uses provider event identity, conflict-safe inserts, row locks, message-level unique provider IDs and serializable transaction retry.
- Ambiguous asset resolution is rejected instead of guessed.

## Reproduction / verification
```text
Inspect supabase/functions/meta-webhook/index.ts
Inspect supabase/functions/_shared/webhook-ingestion.ts
```

## Limits
- No replay/load/concurrency test executed in this assessment.
- This evidence covers the inspected development Edge adapter path.
