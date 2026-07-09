---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [documentation, current-truth, no-history, project-council]
ai_access: allowed
version: 1.0
---
# Current Truth Documentation Rule

## Principle
Project agent folders are not history folders. They are operating surfaces.

The first question every file must answer is:
> What should an agent believe or do now?

## Current files
These files are current-truth files:
```text
00_COUNCIL_HOME.md
05_CURRENT_PROJECT_TRUTH.md
06_ENVIRONMENT_AND_REPO_READINESS.md
07_ACTIVE_WORK_BOARD.md
09_AGENT_FINDINGS_INDEX.md
Agents/*/RULES.md
Agents/*/CHECKLIST.md
Agents/*/CURRENT_FINDINGS.md
Agents/*/EVIDENCE_REQUIREMENTS.md
Agents/*/HANDOFF.md
```

They should be edited to reflect current state, not appended forever.

## Historical files
These files may preserve history:
```text
Runs/
Evidence/
Runtime/ACTIVATION_HISTORY.jsonl
project experience records under 40_Projects/Experience/
```

## Closeout behavior
When a finding is fixed and proven:
1. remove it from active blocking sections,
2. keep a short closed reference if still useful,
3. link to evidence or run record,
4. do not leave stale blockers in current files.

## Staleness labels
Use explicit labels:
```text
CURRENT
STALE
UNVERIFIED
REPO-VERIFIED
RUNTIME-VERIFIED
ACCEPTED-RISK
SUPERSEDED
```

## Forbidden documentation behavior
- Do not paste full conversations.
- Do not write “we did X” without evidence.
- Do not hide open risk because a build passed.
- Do not duplicate the same truth in many places; link instead.
- Do not make old notes look current.
