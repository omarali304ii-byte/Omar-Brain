# Architecture Active Work

```yaml
status: active
active_finding_ids:
  - MWOM-ARCH-001
  - MWOM-ARCH-003
current_objective: submit MWOM-ARCH-001 acceptance contract to Supervisor for review
acceptance_contract_state: ready-for-supervisor-review
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7

architecture_deliverables:
  - route responsibility contract (transport + validation + delegation only)
  - owned messaging workflow contract (single canonical send orchestration)
  - preserved behavior list (send integrity, reconciliation lifecycle, AI feedback attribution)
  - reconciliation invariant list
  - proof requirements for each verifying agent

implementation_owner:
  - Supervisor (prioritization/approval)
  - Toolsmith (integrated application edit)

verifying_agents:
  - Integration & Workflow — Meta provider semantics preserved
  - Quality Engineer — regression matrix, all send/reconciliation/security tests pass
  - Architecture — route no longer imports provider adapters, single workflow ownership

next_deliverable: >
  Submit MWOM-ARCH-001 acceptance contract to Supervisor for review.
  Contract is documented in CURRENT_FINDINGS.md (desired boundary, sub-risks, proof requirements)
  and HANDOFF.md (verifying agents, per-agent proof list).
  Do not edit application code.

next_handoff:
  - Supervisor: MWOM-ARCH-001 acceptance contract for approval
  - Toolsmith: MWOM-ARCH-001 implementation (after Supervisor approval)
  - Data & Truth: MWOM-DATA-001, MWOM-DATA-003 revalidation
  - Product & UX: MWOM-UX-001 revalidation
  - Integration & Workflow: MWOM-ARCH-001 post-implementation semantics verification
  - Quality Engineer: MWOM-ARCH-001 regression matrix definition
  - Runtime & Reliability: production worker/deployment topology verification
  - Critic Verifier: final closure challenge after implementation + verification

cross_agent_handoffs_created:
  - Data & Truth: MWOM-DATA-001, MWOM-DATA-003 revalidation requests
  - Product & UX: MWOM-UX-001 revalidation request
  - Runtime & Reliability: provider adapter topology + production worker verification request

## Priority rule
Select the highest-severity owned current finding whose dependencies are satisfied by Supervisor.
Current priority: MWOM-ARCH-001 (P1) > MWOM-ARCH-003 (P3, monitor only)
