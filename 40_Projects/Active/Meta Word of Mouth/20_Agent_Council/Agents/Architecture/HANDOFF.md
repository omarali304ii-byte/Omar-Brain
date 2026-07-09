# Architecture Handoff

```yaml
status: active
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
summary: Architecture correction pass completed at bd8a7a6. 2 active findings (ARCH-001, ARCH-003),
  1 dormant watch trigger (ARCH-WATCH-001), 3 stale P0 findings reclassified as
  likely-fixed-pending-owner-proof, council truth contradictions resolved.
next_action: follow NEXT_START.md -> submit MWOM-ARCH-001 acceptance contract to Supervisor for review
required_context:
  - DOMAIN_MODEL.md
  - OWNED_SURFACE_MAP.md
  - CURRENT_FINDINGS.md
  - EVAL_REGISTRY.md
```

## Handoffs to other agents

### Supervisor
```yaml
from: Architecture
to: Supervisor
finding_ids: [MWOM-ARCH-001]
claim: Architecture acceptance contract for single outbound messaging orchestration
  ownership is ready for Supervisor review. Route must delegate to sendConversationMessage.
  Boundary, sub-risks, and proof requirements are documented in CURRENT_FINDINGS.md.
  Toolsmith is default implementer per Project Council law.
required_action: review and approve/prioritize MWOM-ARCH-001 implementation batch
acceptance_contract_state: ready-for-supervisor-review
```

### Toolsmith
```yaml
from: Architecture
to: Toolsmith
finding_ids: [MWOM-ARCH-001]
claim: inbox messages POST route must delegate to sendConversationMessage instead of
  directly importing and calling meta-send-client / meta-send-token.
  AI feedback recording should become post-send concern, not inline route logic.
  Route should become transport + validation + delegation.
evidence: route currently imports sendMetaTextMessage (line 10), resolveMetaSendToken (line 11);
  dedicated sendConversationMessage exists in src/lib/messaging/send-message.ts (lines 59-202)
required_action: implement route refactor after Supervisor approval
proof_needed: route no longer imports provider adapters; send-integrity + reconciliation + security tests pass
```

### Data & Truth
```yaml
from: Architecture
to: Data & Truth
finding_ids: [MWOM-DATA-001, MWOM-DATA-003]
claim:
  MWOM-DATA-001: Current leads routes conditionally include intelligence evidence only
    when hasPermission("view_intelligence") is true. Code appears to fix the original P0.
    Architecture cannot close this alone.
  MWOM-DATA-003: Intelligence snapshot updates use FOR UPDATE locking + deterministic
    source-order tiebreaking. Concurrency protections are stronger than original race model.
evidence:
  MWOM-DATA-001: app/api/leads/route.ts:48, app/api/leads/[id]/route.ts:31, opportunity-dto.ts
  MWOM-DATA-003: src/lib/intelligence/customer-intelligence.ts:571-710, source-order.ts
required_action: revalidate both findings against current revision
proof_needed:
  - route-level permission regression tests (MWOM-DATA-001)
  - concurrency regression test (MWOM-DATA-003)
```

### Product & UX
```yaml
from: Architecture
to: Product & UX
finding_ids: [MWOM-UX-001]
claim: AI suggestion feedback route explicitly rejects pre-send usage (USED_AS_IS,
  EDITED_BEFORE_SEND) with 409. Server-side recording occurs only after verified
  provider-accepted send. Architecture cannot close UX claims from static inspection.
evidence:
  - app/api/ai/suggestions/[id]/feedback/route.ts:39-49 (explicit rejection)
  - app/api/inbox/conversations/[id]/messages/route.ts:394-403 (post-send feedback)
required_action: revalidate finding against current revision
proof_needed: send-success attribution test, product acceptance of behavior
```

### Integration & Workflow
```yaml
from: Architecture
to: Integration & Workflow
finding_ids: [MWOM-ARCH-001]
claim: Route refactor to delegate to sendConversationMessage must preserve Meta provider
  send semantics. Dedicated workflow defines three-outcome model; route must not change behavior.
evidence: send-message.ts defines SENT/FAILED/RECONCILIATION_REQUIRED; route currently duplicates inline
required_action: after Toolsmith implementation, verify Meta provider semantics preserved
proof_needed: send-integrity tests pass with delegated workflow
```

### Quality Engineer
```yaml
from: Architecture
to: Quality Engineer
finding_ids: [MWOM-ARCH-001, MWOM-DATA-001, MWOM-DATA-003, MWOM-UX-001]
claim: Route refactor (ARCH-001) needs regression matrix. Stale P0 findings (DATA-001,
  DATA-003, UX-001) need owner revalidation with test evidence.
evidence: current route contains duplicated send orchestration; stale P0 findings re-evaluated
required_action:
  - design regression matrix for inbox messages POST route after MWOM-ARCH-001 refactor
  - verify test evidence for DATA-001, DATA-003, UX-001 revalidations
proof_needed: all send-integrity, send-reconciliation, route-security tests pass after refactor
```

### Runtime & Reliability
```yaml
from: Architecture
to: Runtime & Reliability
finding_ids: []
claim: Two worker scripts exist (customer-intelligence-worker, outbound-send-reconciliation-worker).
  Intelligence worker has stale recovery wired. Reconciliation worker recovers stale SENDING.
  Deployed production adapter topology and worker deployment are unknown.
  Provider adapter drift is partially-resolved: code topology reconciled, deployment unknown.
evidence: worker scripts + meta-config inspected at bd8a7a6
required_action: verify production deployment of workers, scheduler, provider adapter topology
proof_needed: production runtime verification or documented deployment configuration
```

### Critic Verifier
```yaml
from: Architecture
to: Critic Verifier
finding_ids: [MWOM-ARCH-001]
claim: MWOM-ARCH-001 acceptance contract -> Toolsmith implementation -> multi-agent verification
  meets architecture quality bar. Send integrity, reconciliation semantics, and AI feedback
  attribution must be preserved.
evidence: send-message.ts is canonical send workflow; route duplicates it
required_action: after implementation + verification, challenge whether route truly delegates,
  whether reconciliation marking is correctly preserved, whether provider adapter imports
  are cleared
proof_needed: send-integrity + reconciliation + route-security + AI feedback tests all pass
```
