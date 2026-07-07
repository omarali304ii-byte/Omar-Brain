---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [model-routing, cost, latency, privacy, agents]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Adaptive Model Routing Policy

## Goal
Use the cheapest, fastest, most private model that can reliably satisfy the task.

## Routing factors
- task complexity,
- code/tool requirements,
- context size,
- privacy class,
- latency target,
- cost budget,
- prior eval performance,
- provider availability.

## Suggested tiers
- local/small: classification, formatting, low-risk extraction,
- mid: routine synthesis and code tasks,
- frontier: difficult planning, cross-domain reasoning, critical verification.

## Guardrail
Routing changes require eval evidence. Do not downgrade a critical task solely to save cost.

## Fallback
Provider/model failure should use a configured fallback only if privacy, capability, and tool constraints remain satisfied.
