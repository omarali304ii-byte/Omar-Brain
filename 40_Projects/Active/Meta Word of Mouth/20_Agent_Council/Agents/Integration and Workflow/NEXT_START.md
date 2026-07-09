# Integration and Workflow Next Start

```yaml
status: ready
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
verified_at: 2026-07-10
verification_scope: full integration-surface code inspection (messaging, webhooks, Meta clients, workers, reconciliation, API routes, Prisma schema, tests, scripts, Supabase adapters)
start_here: continue from this file; all owned surfaces verified and documented
first_files_to_open:
  - ./CURRENT_FINDINGS.md (MWOM-INT-001, MWOM-INT-002)
  - ./WORKFLOW_CATALOG.md (9 proven workflows)
  - ./EXTERNAL_SYSTEM_REGISTRY.md (4 systems cataloged)
  - ./RETRY_IDEMPOTENCY_MODEL.md (retry taxonomy, idempotency registry)
  - ./HANDOFF.md (pending handoffs to Architecture, Toolsmith, Runtime, Quality, Data, Logic)
active_finding_ids: ["MWOM-INT-001", "MWOM-INT-002"]
open_unknowns:
  - runtime deployment of 4 workers
  - Meta send timeout-after-accept resolution
  - production concurrency model for workers
  - whether CI successfully executes all tests at bd8a7a6
  - OAuth flow runtime behavior
  - inbox sync error recovery behavior
first_action: >
  If Toolsmith has implemented transport exception classification for MWOM-INT-001,
  re-verify meta-send-client.ts and test with INT-EVAL-001.
  Otherwise, verify the exact Meta Graph API behavior for the send endpoint: does Meta
  return a message_id that can be queried later? Can an ambiguous send be resolved via
  GET /{messageId}? Document findings and update RETRY_IDEMPOTENCY_MODEL.md.
do_not_repeat:
  - broad repository exploration before checking owned surface map
  - treating stored revision-bound claims as current without recheck
  - collapsing all transport failures into META_SEND_FAILED in analysis (report reality accurately)
proof_needed_next:
  - INT-EVAL-001: fault-injection transport timeout test (design or execute)
  - Meta API: can send messages be queried by ID for ambiguity resolution? (research)
  - Existing test execution verification (test-send-reconciliation, test-webhook-idempotency)
```

## Freshness triggers
Reinspect when ANY of these change:
- `src/lib/meta/**` — Meta provider contracts, retry matrix, error classification
- `src/lib/messaging/**` — send/reconciliation workflow truth
- `app/api/meta/webhooks/**` — webhook entry points
- `app/api/inbox/conversations/[id]/messages/route.ts` — send semantics, error mapping
- `src/lib/ai/suggestions.ts` — OpenAI integration
- `src/lib/intelligence/customer-intelligence.ts` — intelligence pipeline
- `scripts/outbound-send-reconciliation-worker.ts` — reconciliation timing
- `scripts/customer-intelligence-worker.ts` — intelligence worker behavior
- `prisma/schema.prisma` — message/job/event model changes
- `package.json` — worker script changes, new dependencies
- `supabase/functions/**` — edge adapter changes
- `.env.example` — new provider credentials or API versions
- `META_GRAPH_API_VERSION` env var — API version change
