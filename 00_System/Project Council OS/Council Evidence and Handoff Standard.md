---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [handoff, evidence, project-council]
ai_access: allowed
version: 1.0
---
# Council Evidence and Handoff Standard

## Handoff goal
A later agent should be able to continue without rereading the whole repository.

## Handoff envelope
```yaml
handoff_id:
project_id:
agent_id:
source_task:
repo_revision:
files_inspected:
current_claims:
open_findings:
closed_findings:
recommended_next_action:
required_proof:
blockers:
confidence:
links:
```

## Evidence levels
```text
L0 claim only              not accepted
L1 file/path inspected     weak proof
L2 static command passed   useful proof
L3 test passed             stronger proof
L4 runtime smoke passed    strong proof
L5 production/real-user evidence  strongest proof
```

## Evidence rule
Every important completion claim must name its evidence level and limitation.

Example:
```text
Typecheck passed is L2 static evidence. It does not prove webhook runtime behavior, database concurrency, provider delivery, or production readiness.
```

## Cross-agent handoff
Specialists hand off to Supervisor, not directly into uncontrolled implementation.

Allowed:
```text
Architecture -> Supervisor -> Toolsmith
Data -> Supervisor -> Toolsmith
Quality -> Critic
Observer -> Memory Curator proposal
```

Avoid:
```text
Architecture edits code while Data edits same code while UX edits same code.
```
