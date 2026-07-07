---
type: decision
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [qdrant, pgvector, vector-database, retrieval]
ai_access: allowed
memory_class: semantic
confidence: high
source_kind: official
last_reviewed: 2026-07-07
---
# Retrieval Backend Decision Framework

## Default candidate
Qdrant for a dedicated self-hostable retrieval layer with hybrid/multistage query capabilities.

## Strong alternative
PostgreSQL + pgvector + FTS when reducing system count and joining relational metadata matter more than dedicated retrieval features.

## Selection criteria
- local-first privacy,
- hybrid sparse+dense support,
- metadata filtering,
- reranking/multistage support,
- backup/restore maturity,
- auth/TLS/network hardening,
- embedding migration,
- operational burden,
- cost.

## Critical rule
Self-hosted does not mean secure by default. Authentication, TLS, network binding, backups, and least privilege are deployment requirements.
