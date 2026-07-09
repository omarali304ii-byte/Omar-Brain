# Architecture Failure Patterns

Current reusable project failure signatures.

## ARCH-FP-001 — Transport layer absorbs business workflow
```yaml
pattern_id: ARCH-FP-001
status: active
signature: route/adapter starts pricing, persistence coordination, AI or downstream policy
root_cause: boundary erosion and ambiguous failure semantics
prevention: activate Architecture + Integration review; move orchestration to owned service/workflow
why_previous_checks_missed_it: route hardening prioritized delivery speed over boundary purity
detection: inspect route imports — if route imports Meta provider adapters, Prisma multi-table
  mutations, or AI feedback recording, flag hotspot
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```

## ARCH-FP-002 — Dedicated workflow exists but route bypasses it
```yaml
pattern_id: ARCH-FP-002
status: active
signature: dedicated lib/messaging or lib/intelligence module exists with clean API,
  but route directly calls provider adapter instead of delegating
root_cause: workflow module was added after route was hardened; route never refactored to delegate
why_previous_checks_missed_it: route tests passed without checking delegation boundaries
prevention: when adding a dedicated workflow module, verify all callers delegate to it;
  add architecture eval that checks route imports
detection: diff newly added lib/*/send-*.ts or lib/*/process-*.ts against route imports
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```
