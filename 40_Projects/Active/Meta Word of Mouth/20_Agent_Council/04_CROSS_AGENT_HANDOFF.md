---
type: handoff
status: active
created: 2026-07-09
updated: 2026-07-09
ai_access: allowed
project_id: prj-meta-word-of-mouth
---
# Cross-Agent Handoff

## Handoff envelope
```yaml
handoff_id:
from_agent:
to_agent:
repo_revision:
scope:
files_inspected:
current_findings:
required_change:
required_proof:
blockers:
confidence:
```

## Current handoff rule
All specialist findings go through Supervisor before implementation. Toolsmith does not accept scattered edits from multiple agents.

## Latest project-level handoff
```yaml
handoff_id: mwom-council-initial-20260709
from_agent: project-council-bootstrap
to_agent: supervisor
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
scope: bootstrap local project council from current Brain assessment
required_next_action: inspect current repository revision, then start P0-1 Meta send uncertainty batch
confidence: medium-high
limit: repo may have changed after the stored 2026-07-07 assessment
```
