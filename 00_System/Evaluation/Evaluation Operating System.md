---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [evaluation, agents, retrieval, regression]
ai_access: allowed
version: 4.0
---
# Evaluation Operating System

## Rule
The Brain is not allowed to call itself smarter because a prompt sounds better. Improvement requires measured evidence.

## Eval layers
1. retrieval,
2. grounded answer quality,
3. task completion,
4. tool correctness,
5. memory write quality,
6. project release quality,
7. cost/latency.

## Dataset sources
- curated important tasks,
- real failures,
- user corrections,
- high-risk project journeys,
- regression cases after incidents.

## Promotion
A change is promoted only when:
- target metric improves or remains acceptable,
- no critical safety/privacy regression,
- cost/latency tradeoff is understood,
- result is reproducible.
