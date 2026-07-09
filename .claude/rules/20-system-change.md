---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, governance, system-change]
ai_access: allowed
paths:
  - "00_System/**/*"
---
# Brain System Change Rules

Changes under `00_System/` are control-plane changes.

Before editing:
1. read `Brain Constitution`;
2. read `System Change Control`;
3. inspect current state, gaps, and relevant registries;
4. search for existing mechanism before creating another.

Requirements:
- No duplicate OS, registry, taxonomy, status, or rule family.
- No silent schema expansion.
- Machine-readable and human-readable control files must remain consistent.
- Derived indexes are rebuilt, not hand-maintained as truth.
- New behavior needs a deterministic entrypoint, failure mode, and validation path.
- Run brain validators after meaningful system changes.
