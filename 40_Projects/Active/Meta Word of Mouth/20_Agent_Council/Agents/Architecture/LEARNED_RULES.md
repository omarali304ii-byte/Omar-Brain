# Architecture Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## ARCH-MWOM-001 — Ingress must remain decoupled from failure-prone intelligence
```yaml
id: ARCH-MWOM-001
status: project-local
trigger: provider webhook path adds AI/enrichment work
rule: persist/normalize/enqueue first; downstream intelligence remains asynchronous
boundary: Does not forbid fast deterministic validation in ingress
evidence_required: Static boundary inspection + failure-path test
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```

## ARCH-MWOM-002 — Routes must delegate to owned service/workflow boundaries
```yaml
id: ARCH-MWOM-002
status: project-local
trigger: route gains provider orchestration, cross-domain mutation, or reconciliation policy
rule: routes own auth + validation + transport mapping + delegation; business orchestration
  belongs in lib/messaging, lib/intelligence, or a service layer
boundary: Route may do fast deterministic checks (conversation exists, status check)
  before delegating
evidence_required: Static boundary inspection — route must not import Meta provider
  adapters or Prisma for multi-table mutation
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
evidence: MWOM-ARCH-001 demonstrates violation in inbox messages route
```

## ARCH-MWOM-003 — New subsystems must preserve route/module separation with explicit persistence ownership
```yaml
id: ARCH-MWOM-003
status: project-local
trigger: new bounded subsystem is added (AI Brain, new provider, new intelligence domain)
rule: route -> domain module. Routes never directly access Prisma for the subsystem.
  Repository abstraction is required for boundaries where swappable persistence matters
  (knowledge/vector), but profile/prompt lifecycle modules may use Prisma directly
  when no swappable persistence boundary is needed.
boundary: Fast reads for auth/validation context are permitted
evidence_required: Static boundary inspection
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
evidence: AI Brain routes are thin (no Prisma); knowledge access uses repository abstraction;
  brain-profile.ts and prompt-versions.ts use Prisma directly for lifecycle persistence.
```
