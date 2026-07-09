# Integration and Workflow Active Work

```yaml
status: active
active_finding_ids: ["MWOM-INT-001", "MWOM-INT-002"]
current_objective: prove or design INT-EVAL-001 (transport failure → RECONCILIATION_REQUIRED fault-injection test)
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
next_proof: see EVAL_REGISTRY.md (INT-EVAL-001 priority)

integration_deliverables_completed:
  - full integration-surface code inspection at bd8a7a6
  - owned surface map verified with exact paths
  - workflow catalog (9 workflows)
  - external system registry (4 systems)
  - retry taxonomy (all failure classes)
  - idempotency registry (6 mechanisms + gaps)
  - MWOM-INT-001 revalidated with exact failure window
  - MWOM-INT-002 opened (no fetch timeouts)
  - MWOM-ARCH-001 provider-semantics acceptance contract defined
  - 6 cross-agent handoffs created
  - 4 learned rules extracted
  - 9 evals registered
  - freshness triggers defined

next_handoff:
  - Architecture: MWOM-ARCH-001 provider-semantics contract (complete)
  - Toolsmith: MWOM-INT-001 transport classification implementation (after Supervisor approval)
  - Runtime & Reliability: worker deployment topology verification
  - Quality Engineer: INT-EVAL-001 design, test coverage gaps
  - Data & Truth: audit log dedup, send idempotency
  - Logic & Performance: webhook throughput, inbox sync latency

blocked_by: Supervisor prioritization for MWOM-INT-001 fix batch
```

## Priority rule
Highest-severity owned finding with satisfied dependencies:
1. MWOM-INT-001 (P0) — requires Toolsmith implementation
2. MWOM-INT-002 (P1) — requires Toolsmith implementation
