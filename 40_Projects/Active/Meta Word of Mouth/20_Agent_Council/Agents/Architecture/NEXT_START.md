# Architecture Next Start

```yaml
status: active_work_defined
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-09
first_files_to_open:
  - app/api/inbox/conversations/[id]/messages/route.ts (lines 189-450)
  - src/lib/messaging/send-message.ts (lines 59-202)
  - src/lib/messaging/finalize-send.ts
active_finding_ids:
  - MWOM-ARCH-001
  - MWOM-ARCH-002
  - MWOM-ARCH-003
  - MWOM-ARCH-004
open_unknowns:
  - production deployment topology (workers, reconciliation)
  - AI Brain knowledge ingestion pipeline implementation
  - AI Brain prompt utilization in AI suggestions
first_action: >
  Resolve MWOM-ARCH-001: Refactor POST /api/inbox/conversations/[id]/messages
  to delegate to sendConversationMessage from src/lib/messaging/send-message.ts.
  The route must become transport + validation + delegation.
  AI feedback recording should move out of the route to a post-send concern.
  Verify all existing send-integrity, send-reconciliation, and route-security tests pass.
  Then update ARCH-EVAL-007 to passed.
do_not_repeat:
  - broad repository exploration before checking NEXT_START and OWNED_SURFACE_MAP
  - treating stored revision-bound claims as current without recheck
  - reinspecting AI Brain subsystem unless its boundary changes (ARCH-EVAL-003 passed)
  - re-verifying intelligence stale recovery (ARCH-EVAL-004 passed)
proof_needed_next:
  - Route delegates to sendConversationMessage (ARCH-EVAL-002, 007)
  - All send-integrity tests pass
  - All send-reconciliation tests pass
  - All route-security tests pass
handoffs_waiting:
  - Integration & Workflow: MWOM-ARCH-001 verification after refactor
  - Quality Engineer: regression matrix after refactor
  - Critic Verifier: final challenge after refactor
```
