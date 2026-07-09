---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, software, repo-truth]
ai_access: allowed
paths:
  - "40_Projects/**/*.md"
  - "40_Projects/Manifests/*.json"
---
# Software Truth Rules

For software projects:
- Inspect Git status, branch/revision, repo instructions, manifests/workspaces, entrypoints, module boundaries, schema/migrations, auth/permissions, integrations, tests, and verification commands.
- Never assume framework version or architecture from memory when files are available.
- Frontend does not bypass server trust boundaries.
- Preserve service/domain/repository boundaries unless evidence justifies a controlled architecture change.
- Webhooks require authenticity validation before ingestion, idempotency, retry safety, and observable failure handling.
- Multi-tenant access requires server-side authorization and cross-tenant isolation evidence.
- Mocks/fixtures never count as production truth.
