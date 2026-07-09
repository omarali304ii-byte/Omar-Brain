# Architecture Handoff

```yaml
status: active
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
summary: Full architecture reconciliation at bd8a7a6. 4 active findings, 3 new learned rules,
  7 evals, AI Brain subsystem fully mapped.
next_action: follow NEXT_START.md -> resolve MWOM-ARCH-001
required_context:
  - DOMAIN_MODEL.md
  - OWNED_SURFACE_MAP.md
  - CURRENT_FINDINGS.md
  - EVAL_REGISTRY.md
```

## Handoffs to other agents

### Integration & Workflow
```yaml
from: Architecture
to: Integration & Workflow
finding_ids: [MWOM-ARCH-001]
claim: Route refactor to delegate to sendConversationMessage must preserve Meta send behavior
evidence: send-message.ts defines three-outcome model; route currently duplicates it inline
required_action: verify Meta provider semantics are preserved when route delegates to send-message.ts
proof_needed: send-integrity tests pass after refactor
```

### Data & Truth
```yaml
from: Architecture
to: Data & Truth
finding_ids: []
claim: AI Brain schema is well-bounded with proper workspace isolation. KnowledgeDomain,
  KnowledgeSource, KnowledgeSourceVersion, KnowledgeChunk form a coherent persistence
  boundary. pgvector embedding column exists but ingestion pipeline not yet inspected.
evidence: schema inspection at bd8a7a6
required_action: verify AI Brain schema ownership boundaries, tenant scoping, and
  whether intelligence evidence gating in leads routes is correct (MWOM-DATA-001)
proof_needed: route-level permission tests for intelligence evidence
```

### Runtime & Reliability
```yaml
from: Architecture
to: Runtime & Reliability
finding_ids: []
claim: Two worker scripts exist (customer-intelligence-worker, outbound-send-reconciliation-worker).
  Intelligence worker has stale recovery wired. Reconciliation worker recovers stale SENDING.
  Deployment topology and production runtime behavior are unknown to Architecture.
evidence: worker scripts inspected at bd8a7a6
required_action: verify production deployment of both workers, scheduler configuration,
  observability setup (MWOM-RUN-001, MWOM-RUN-002)
proof_needed: production runtime verification or documented deployment configuration
```

### Quality Engineer
```yaml
from: Architecture
to: Quality Engineer
finding_ids: [MWOM-ARCH-001, MWOM-ARCH-002]
claim: Route refactor (MWOM-ARCH-001) requires regression matrix.
  ARCH-EVAL-007 is failed and needs proof after refactor.
evidence: current route contains duplicated send orchestration
required_action: design regression matrix for inbox messages POST route after
  delegation to sendConversationMessage
proof_needed: CI should continue passing all 30+ test steps including
  send-integrity, send-reconciliation, route-security
```

### Critic Verifier
```yaml
from: Architecture
to: Critic Verifier
finding_ids: [MWOM-ARCH-001]
claim: Route refactor to delegate to sendConversationMessage will resolve MWOM-ARCH-001.
  Send integrity must be preserved.
evidence: send-message.ts was designed as the canonical send workflow; route duplicates it
required_action: after refactor, challenge whether route truly delegates and whether
  reconciliation marking is correctly preserved
proof_needed: send-integrity + reconciliation + route-security tests all pass
```
