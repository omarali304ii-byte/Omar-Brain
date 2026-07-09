---
type: rule-promotion-queue
status: active
created: 2026-07-09
updated: 2026-07-09
ai_access: allowed
project_id: prj-meta-word-of-mouth
---
# Rule Promotion Queue

## Candidate LC-MWOM-001 — Provider send uncertainty is a first-class state
```yaml
candidate_id: LC-MWOM-001
origin_agent: Integration and Workflow
observation: A provider may accept outbound delivery while local persistence/audit fails, creating duplicate-retry risk.
possible_rule: External outbound sends must distinguish provider outcome from local persistence outcome and define reconciliation before allowing human retry.
applicability_boundary: Applies to external messaging/payment/order providers where side effects can succeed outside local transaction control.
evidence: P0-1 stored static finding; needs implemented fix and regression proof.
confidence: medium
status: proposed
```

## Candidate LC-MWOM-002 — Intelligence evidence exposure needs a separate permission gate
```yaml
candidate_id: LC-MWOM-002
origin_agent: Data and Truth
observation: Lead access and intelligence access are different powers.
possible_rule: AI-derived evidence/signals/source-message text must be gated separately from ordinary lead/customer visibility.
applicability_boundary: Applies to CRM/intelligence products where AI evidence may reveal sensitive customer content or provider identifiers.
evidence: P0-2 stored static finding; needs route-level tests and policy decision.
confidence: medium
status: proposed
```

## Candidate LC-MWOM-003 — Current project council prevents rediscovery
```yaml
candidate_id: LC-MWOM-003
origin_agent: Project Observer
observation: Project work improves when current agent-specific rules, findings, and evidence requirements live inside the project packet.
possible_rule: Active software projects should maintain a local `20_Agent_Council/` when multiple specialist surfaces are repeatedly touched.
applicability_boundary: Medium/large active projects; not required for tiny scripts.
evidence: council bootstrap; needs repeated real use.
confidence: low
status: proposed
```
