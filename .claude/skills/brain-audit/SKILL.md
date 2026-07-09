---
name: brain-audit
description: Validate Omar Brain after architecture, routing, memory, registry, skill, or control-plane changes and repair consistency failures before completion.
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, validation, brain]
ai_access: allowed
---
# Brain Audit

Run after meaningful Brain-system changes.

## Required commands
Execute from vault root:
1. `node 00_System/Automation/brain-validator.mjs .`
2. `node 00_System/Automation/check-runtime-consistency.mjs .`
3. `node 00_System/Automation/check-navigation-connectivity.mjs .`
4. `node 00_System/Automation/check-skill-registry.mjs .`
5. `node 00_System/Automation/check-skill-connectivity.mjs .`
6. `node 00_System/Automation/check-orphan-information.mjs .`
7. `node 00_System/Automation/brain-cycle.mjs .`

## Discipline
- Capture exact failure output.
- Repair root cause, not validator symptoms.
- Re-run failed and dependent checks.
- Never update `last_validation` to passing values before commands actually pass.
- Report executed evidence and remaining warnings separately.
