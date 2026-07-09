---
type: findings-index
status: active
created: 2026-07-09
updated: 2026-07-09
ai_access: allowed
project_id: prj-meta-word-of-mouth
---
# Agent Findings Index

Current active findings only. Detailed ownership lives inside each agent folder.

| ID | Severity | Owner Agent | Status | Summary | Required proof |
|---|---:|---|---|---|---|
| MWOM-INT-001 | P0 | Integration & Workflow | open | Meta send can be accepted externally while local state marks failed, inviting duplicate retry. | retry/reconciliation regression test |
| MWOM-DATA-001 | P0 | Data & Truth | open | Leads routes can expose intelligence evidence without `view_intelligence`. | route-level permission tests |
| MWOM-RUN-001 | P0 | Runtime & Reliability | open | stale intelligence recovery exists but is not wired into worker runtime. | worker stale-lock recovery test |
| MWOM-DATA-002 | P0 | Data & Truth | open | provider-ID privacy inconsistent across people/search/inbox surfaces. | centralized privacy tests |
| MWOM-UX-001 | P0 | Product & UX | open | AI suggestion usage may be recorded before send success. | send-success attribution test |
| MWOM-DATA-003 | P0 | Data & Truth / Logic & Performance | open | same-person intelligence snapshot updates can race. | concurrency regression test |
| MWOM-QUAL-001 | P1 | Quality Engineer | open | CI/test suite does not prove all production gate blockers. | CI includes critical gates |
| MWOM-RUN-002 | P1 | Runtime & Reliability | open | local reproducibility/deployment/observability proof incomplete. | reproducible setup + runtime proof |
