---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [context, tokens, retrieval, packing]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Context Assembly and Token Budget

## Goal
Spend tokens on decision-relevant evidence, not vault size.

## Default pack order
1. task objective and acceptance criteria,
2. applicable constitutional/procedural rules,
3. canonical current truth,
4. top retrieved evidence,
5. recent run state when resuming,
6. only then optional broader context.

## Budgets
Use dynamic budgets by task risk and complexity. A default retrieval pack should usually stay in a few thousand useful tokens rather than loading the vault.

## Compression
- prefer section excerpts with source pointers,
- collapse duplicate evidence,
- summarize low-priority history only with citations,
- preserve exact code/error strings verbatim when technically important.

## Cacheable context
Stable procedural packets and project boot packets may be cached, but freshness checks must invalidate them on source changes.
