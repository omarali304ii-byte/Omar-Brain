# Architecture Current Findings

```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
freshness: current
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
  - Route POST handler (line 298-448) creates SENDING message, calls sendMetaTextMessage directly,
    then does transaction-based finalization or reconciliation marking
  - sendConversationMessage (send-message.ts, line 59-202) provides identical orchestration
    with cleaner outcome model (SENT/FAILED/RECONCILIATION_REQUIRED)
  - Route also handles AI feedback recording inline (line 394-404)
  - Route is 450 lines, containing transport + provider + persistence + reconciliation + AI feedback
architecture_problem:
  Duplicated send orchestration. The route implements the same logic that the dedicated
  send-message.ts module already encapsulates. Route contains cross-domain coordination
  that belongs in a service layer.
root_cause:
  The route was hardened in-place during production gate work. The dedicated
  sendConversationMessage function was added later as a standalone workflow,
  but the route was never refactored to delegate to it.
why_it_matters:
  - Two sources of truth for send behavior diverge over time
  - Route directly couples to Meta adapter (hard to test)
  - Route owns reconciliation policy (should be in messaging boundary)
  - Any change to send behavior requires reading 450 lines of route code
blast_radius:
  - All outbound message sends go through this route
  - Reconciliation logic is split between route and send-reconciliation.ts
  - AI feedback recording is inlined in route (should be after-send concern)
current_behavior:
  Route creates message in SENDING, calls sendMetaTextMessage, then:
  - On success: multi-table transaction (message -> SENT, conversation -> WAITING_CUSTOMER, audit)
  - On local failure: marks RECONCILIATION_REQUIRED
  - Records AI suggestion feedback after successful send
desired_boundary:
  Route delegates to sendConversationMessage (or a service that wraps it),
  route becomes transport + validation + delegation.
  AI feedback recording moves to post-send hook or service layer.
recommended_action:
  Refactor route POST to delegate to sendConversationMessage.
  Move AI feedback to a post-send concern (not in route handler).
  Verify with existing send-integrity and route-security tests.
proof_required:
  - send-integrity tests pass with delegated workflow
  - route-security tests pass (permission boundaries unchanged)
  - reconciliation tests still pass
handoffs:
  - Integration & Workflow: verify Meta send behavior is preserved
  - Quality Engineer: define regression matrix for refactored route
```

### MWOM-ARCH-002 — Inbox messages route owns cross-domain orchestration
```yaml
finding_id: MWOM-ARCH-002
title: Route owns AI feedback + reconciliation marking
severity: P2
status: active
owner: Architecture
affected_surfaces:
  - app/api/inbox/conversations/[id]/messages/route.ts (POST)
current_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
evidence:
  - Route POST handler records AI suggestion feedback inline (lines 394-404)
  - Route POST handler marks RECONCILIATION_REQUIRED with inline try/catch (lines 417-448)
  - Route imports and uses classifyStoredSuggestionUsage, recordAISuggestionFeedback directly
architecture_problem:
  Cross-domain concerns (AI feedback, reconciliation) are embedded in the route handler
  instead of being delegated to their respective domain boundaries.
why_it_matters:
  Route grows with each cross-cutting concern. AI feedback recording failure should
  not be conflated with send success/failure.
recommended_action:
  Separate AI feedback from send route. Record feedback after verified send,
  not as part of the send handler's success path.
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
why_it_matters:
  Pre-emptive boundary planning avoids future emergency refactors.
recommended_action:
  Monitor. If OpenAI integration gains significant complexity or if
  a second AI provider is added, extract AI concerns into a separate module.
  Current structure is functional and well-organized.
```

### MWOM-ARCH-004 — AI Brain test lab is a placeholder
```yaml
finding_id: MWOM-ARCH-004
title: AI Brain test lab has no runtime execution
severity: P3
status: active
owner: Architecture
affected_surfaces:
  - app/api/ai-brain/test/route.ts
  - scripts/test-ai-brain-prompt-versioning.ts (may provide partial coverage)
current_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
evidence:
  - Route returns { available: false, message: "AI Brain Test Lab execution is not active in Batch 1." }
  - No actual AI call or test logic in the route
architecture_problem:
  Test lab is an architectural capability with no runtime implementation.
  It's correctly gated behind test_ai_brain permission and returns a controlled response.
  Not a production risk - this is a planned capability placeholder.
why_it_matters:
  Low. Placeholder is well-structured. When activated, must ensure:
  - AI calls do not leak into route handler
  - Test results are persisted properly
  - test_ai_brain permission is correctly enforced
```

## Fixed pending proof
None at current revision. All old claims have been reconciled.

## Closed
Previous architecture baseline concern about stale intelligence recovery not being wired:
resolved at 9a6b2f2 (worker now calls recoverStaleIntelligenceJobs at startup + periodic).
Previous concern about provider adapter drift: resolved through multi-profile Meta config.
