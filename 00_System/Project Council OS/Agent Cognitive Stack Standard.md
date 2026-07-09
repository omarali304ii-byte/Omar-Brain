---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [agent-folders, cognition, documentation]
ai_access: allowed
version: 2.0
---
# Agent Cognitive Stack Standard

## Mandatory files
Every project specialist and control agent uses the same cognitive skeleton. Content differs by role.

| File | Question answered |
|---|---|
| `00_START_HERE.md` | How do I enter this role now? |
| `AGENT_HOME.md` | What do I own and not own? |
| `DOMAIN_MODEL.md` | How does my surface currently work? |
| `OWNED_SURFACE_MAP.md` | Where in repo/runtime/data/UI is my surface? |
| `CHANGE_IMPACT_MAP.md` | What changes activate me and affect others? |
| `RULES.md` | What current project rules apply? |
| `LEARNED_RULES.md` | What evidence-derived triggered rules did this project teach? |
| `CHECKLIST.md` | What do I actively inspect? |
| `FAILURE_PATTERNS.md` | What recurring signatures and root causes are known? |
| `EVAL_REGISTRY.md` | What proof prevents regressions? |
| `CURRENT_FINDINGS.md` | What is currently wrong/open? |
| `ACTIVE_WORK.md` | What am I doing now? |
| `OPEN_UNKNOWNS.md` | What is not proven? |
| `EVIDENCE_REQUIREMENTS.md` | What closes a claim? |
| `DECISIONS_TO_REVIEW.md` | What unresolved choice needs review? |
| `SELF_REVIEW.md` | Where is my own model weak/stale? |
| `NEXT_START.md` | Where exactly should next context begin? |
| `HANDOFF.md` | What does another role need? |

## File size discipline
- Keep startup files compact.
- Move detailed historical evidence to `Evidence/`.
- Move execution chronology to `Runs/`.
- Prefer IDs and links over duplicated prose.
- `NEXT_START.md` should normally fit on one screen.
- `CURRENT_FINDINGS.md` contains active truth only.

## Freshness metadata
Current-truth files should include or state:
```yaml
last_verified_revision:
last_verified_at:
verification_scope:
freshness: current | stale | partial | unknown
```

## Ownership discipline
An agent may reference another agent's finding. It must not silently rewrite another agent's owned model.
Use a cross-agent handoff or Supervisor merge.
