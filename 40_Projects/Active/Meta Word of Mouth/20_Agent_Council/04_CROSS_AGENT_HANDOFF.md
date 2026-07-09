---
type: handoff
status: active
created: 2026-07-09
updated: 2026-07-10
ai_access: allowed
project_id: prj-meta-word-of-mouth
---
# Cross-Agent Handoff

## Handoff envelope
```yaml
handoff_id:
from_agent:
to_agent:
repo_revision:
scope:
files_inspected:
current_findings:
required_change:
required_proof:
blockers:
confidence:
```

## Current handoff rule
All specialist findings go through Supervisor before implementation. Toolsmith does not accept scattered edits from multiple agents.

## Data & Truth handoff (2026-07-10)

### Data & Truth -> Quality Engineer
```yaml
handoff_id: mwom-dt-qe-20260710
from_agent: Data and Truth
to_agent: Quality Engineer
repo_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
scope: Execute regression evals for closed P0 Data findings
files_inspected: leads routes, people DTO/query/API, inbox DTO/API, opportunity DTO, customer-intelligence.ts, source-order.ts, provider-id.ts, permissions.ts
current_findings: MWOM-DATA-001/002/003 closed from static verification
required_change: Execute DATA-EVAL-001, DATA-EVAL-002, DATA-EVAL-003; report pass/fail
required_proof: Test passing/execution output linked to each eval
confidence: high (code inspection consistent and comprehensive)
```

### Data & Truth -> Runtime & Reliability
```yaml
handoff_id: mwom-dt-rr-20260710
from_agent: Data and Truth
to_agent: Runtime and Reliability
repo_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
scope: Document pgvector prerequisite and add startup check
files_inspected: ai_brain_foundation migration
current_findings: MWOM-DATA-005
required_change: Add pgvector to deployment prerequisites; add runtime startup verification
required_proof: Deployment docs include pgvector step
confidence: high
```

### Data & Truth -> Logic & Performance
```yaml
handoff_id: mwom-dt-lp-20260710
from_agent: Data and Truth
to_agent: Logic and Performance
repo_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
scope: Execute concurrency regression test for snapshot updates
files_inspected: customer-intelligence.ts:571-710, source-order.ts
current_findings: MWOM-DATA-003 closed pending concurrency proof
required_change: Execute test-intelligence-ordering-concurrency.ts under realistic load
required_proof: Concurrent test execution passing with evidence
confidence: medium-high (locking inspected, runtime behavior not proven)
```

### Data & Truth -> Architecture
```yaml
handoff_id: mwom-dt-arch-20260710
from_agent: Data and Truth
to_agent: Architecture
repo_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
scope: Note MWOM-DATA-004 low-risk finding
files_inspected: customer-intelligence.ts:623-633
current_findings: MWOM-DATA-004
required_change: None immediate; note in architecture assessment
required_proof: Monitor first production intelligence run after migration
confidence: high (self-healing pattern, P3 severity)
```

## Previous project-level handoff
```yaml
handoff_id: mwom-council-initial-20260709
from_agent: project-council-bootstrap
to_agent: supervisor
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
scope: bootstrap local project council from current Brain assessment
required_next_action: inspect current repository revision, then start P0-1 Meta send uncertainty batch
confidence: medium-high
limit: repo may have changed after the stored 2026-07-07 assessment
```
