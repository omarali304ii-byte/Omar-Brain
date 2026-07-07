---
type: system
status: active
created: 2026-07-07
topics: [ai, repository, inspection]
ai_access: allowed
---
# Repo Inspection Protocol

Before non-trivial code changes:
1. inspect Git status and branch,
2. read repo-level agent/instruction docs,
3. inspect package manifests/workspaces,
4. map entry points,
5. map feature/module boundary,
6. map data/schema/migrations,
7. map auth/permissions,
8. map external integrations,
9. map tests and verification commands,
10. inspect recent relevant changes when useful,
11. identify generated/vendor files,
12. record drift against project docs.

Never assume a framework version, folder layout, or architecture from memory when the repository is available.
