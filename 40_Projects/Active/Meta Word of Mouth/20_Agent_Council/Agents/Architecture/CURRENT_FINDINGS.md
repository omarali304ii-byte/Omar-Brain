# Architecture Current Findings

```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
freshness: current_for_verified_scope
rule: re-inspect current repo before closing or adding live claims
```

## Active

### MWOM-ARCH-001 — Outbound send route duplicates send-message.ts workflow
```yaml
finding_id: MWOM-ARCH-001
title: Route duplicates dedicated send workflow
severity: P1
status: active
owner: Architecture
affected_surfaces:
  - app/api/inbox/conversations/[id]/messages/route.ts (POST)
  - src/lib/messaging/send-message.ts
current_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
evidence:
  Route POST handler (lines 189-450):
  - Imports sendMetaTextMessage directly from meta-send-client (line 10)
  - Imports resolveMetaSendToken directly (line 11)
  - Creates SENDING message (lines 297-311)
  - Calls sendMetaTextMessage directly (lines 313-355)
  - Handles transaction-based finalization inline (lines 357-449)
  - Records AI suggestion feedback inline after send (lines 394-404)
  - Marks RECONCILIATION_REQUIRED inline (lines 407-449)

  sendConversationMessage (send-message.ts, lines 59-202) provides the same orchestration
  with a cleaner outcome model (SENT/FAILED/RECONCILIATION_REQUIRED) and injectable deps.

architecture_problem:
  Duplicated send orchestration. The route implements the same logic that the dedicated
  send-message.ts module already encapsulates. Route directly imports Meta provider adapters.

sub_risks (supersedes MWOM-ARCH-002):
  - Route directly owns provider interaction (imports meta-send-client, meta-send-token)
  - Route directly owns reconciliation marking (inline try/catch for RECONCILIATION_REQUIRED)
  - Route directly coordinates AI feedback after send (recordServerSideAIFeedback inline)
  - Route is 450 lines covering transport + provider + persistence + reconciliation + AI feedback

root_cause:
  The route was hardened in-place during production gate work. The dedicated
  sendConversationMessage function was added later as a standalone workflow,
  but the route was never refactored to delegate to it.

current_behavior:
  Route creates message in SENDING, calls sendMetaTextMessage directly, then:
  - On success: multi-table transaction (message -> SENT, conversation -> WAITING_CUSTOMER, audit)
  - On local failure: marks RECONCILIATION_REQUIRED
  - Records AI suggestion feedback after successful send

desired_boundary:
  Route delegates to sendConversationMessage (or a service wrapping it).
  Route becomes transport + validation + delegation.
  AI feedback recording moves to post-send hook or service layer.

implementation_owner:
  Toolsmith (after Supervisor approval). Architecture defines boundary and acceptance contract.

recommended_action:
  Architecture: finalize acceptance contract -> handoff to Supervisor/Toolsmith.
  Toolsmith: refactor route POST to delegate to sendConversationMessage.
  Integration & Workflow: verify Meta provider semantics preserved.
  Quality Engineer: regression matrix.

proof_required:
  - send-integrity tests pass with delegated workflow
  - route-security tests pass (permission boundaries unchanged)
  - reconciliation tests still pass
  - route no longer imports meta-send-client or meta-send-token directly
```

### MWOM-ARCH-003 — intelligence module is at size pressure threshold
```yaml
finding_id: MWOM-ARCH-003
title: customer-intelligence.ts approaching split threshold
severity: P3
status: active (monitor, do not split yet)
owner: Architecture
affected_surfaces:
  - src/lib/intelligence/customer-intelligence.ts
current_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
evidence:
  - 865 lines with clear internal concerns: job lifecycle (enqueue/claim/recover),
    OpenAI integration (prompt building, API call, response parsing),
    persistence (snapshot merge, signal store, source-order),
    opportunity refresh
  - Internal boundaries between functions are clean (each function has single purpose)
  - No external callers are coupled to internal implementation details
architecture_problem:
  Module may reach size where change isolation becomes difficult.
  Currently internal boundaries are sufficient; no emergency.
recommended_action:
  Monitor. If OpenAI integration gains significant complexity or if
  a second AI provider is added, extract AI concerns into a separate module.
```

## Superseded

### MWOM-ARCH-002 — Inbox messages route owns cross-domain orchestration
```yaml
finding_id: MWOM-ARCH-002
title: Route owns AI feedback + reconciliation marking (sub-risk of ARCH-001)
severity: P2
status: superseded
reason: Cross-domain orchestration (AI feedback inline, reconciliation inline) is a
  sub-risk of MWOM-ARCH-001. No independent remediation path exists. Resolves when
  route delegates to sendConversationMessage and AI feedback becomes post-send concern.
```

## Fixed — pending owner revalidation (cross-agent)

### MWOM-DATA-001 — Leads routes intelligence evidence gating
```yaml
finding_id: MWOM-DATA-001
owner: Data & Truth
architecture_observation:
  Current leads routes conditionally include evidence only when
  hasPermission("view_intelligence") is true, at both Prisma include level
  and DTO level. Code appears to gate evidence correctly.
status_from_architecture_view: likely-fixed-pending-data-and-quality-proof
code_evidence:
  - app/api/leads/route.ts:48 — evidence: exposeIntelligence ? {...} : false
  - app/api/leads/[id]/route.ts:31 — same pattern
  - mapOpportunityDto receives exposeIntelligence flag for DTO-level masking
required_proof:
  - route-level permission regression tests
  - DTO masking verification
  - Data & Truth owner confirmation
```

### MWOM-UX-001 — AI suggestion usage before send success
```yaml
finding_id: MWOM-UX-001
owner: Product & UX
architecture_observation:
  - Feedback route (app/api/ai/suggestions/[id]/feedback/route.ts:39-49) explicitly
    rejects USED_AS_IS and EDITED_BEFORE_SEND with 409 ("recorded only after a
    successful message send")
  - Server-side feedback recording (recordServerSideAIFeedback in inbox messages
    route:394-403) occurs only after verified successful provider send
  - Standalone feedback route cannot attribute pre-send usage
status_from_architecture_view: likely-fixed-pending-product-and-quality-proof
required_proof:
  - send-success attribution test
  - Product & UX owner confirmation
  - Quality Engineer regression verification
```

### MWOM-DATA-003 — Same-person intelligence concurrency race
```yaml
finding_id: MWOM-DATA-003
owner: Data & Truth / Logic & Performance
architecture_observation:
  - storeIntelligenceResult uses single $transaction with FOR UPDATE on job,
    person, and person_intelligence_snapshots rows
  - Deterministic source-order comparison (observedAt -> createdAt -> messageId)
    rejects stale concurrent updates
  - Newer snapshot detection merges summary only, preserving fresher analysis
  - Concurrency protections are materially stronger than original race claim
status_from_architecture_view: likely-fixed-pending-data-logic-quality-proof
code_evidence:
  - src/lib/intelligence/customer-intelligence.ts:571-710
  - src/lib/intelligence/source-order.ts
required_proof:
  - concurrency regression test
  - Logic & Performance closure confirmation
  - Data & Truth schema/invariant verification
```

## Moved to watch (dormant)

### MWOM-ARCH-WATCH-001 — AI Brain test lab (deferred capability trigger)
```yaml
finding_id: MWOM-ARCH-WATCH-001
title: AI Brain test lab deferred capability trigger
status: dormant
former_id: MWOM-ARCH-004
reason: Endpoint is a deliberate Batch 1 placeholder, permission-gated (test_ai_brain),
  returning controlled response ({ available: false }). Not a production risk or
  architectural defect.
trigger: AI Brain test execution becomes active
architecture_checks_on_activation:
  - no AI execution inside route
  - owned service/workflow boundary for test execution
  - persistence ownership (test results)
  - test_ai_brain permission enforcement
```

## Closed
- Previous architecture baseline concern about stale intelligence recovery not being wired:
  resolved at 9a6b2f2 (worker now calls recoverStaleIntelligenceJobs at startup + periodic).
