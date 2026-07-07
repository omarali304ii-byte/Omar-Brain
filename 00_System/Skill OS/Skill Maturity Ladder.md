---
type: standard
status: active
created: 2026-07-07
topics: [skills, maturity, evidence]
ai_access: allowed
---
# Skill Maturity Ladder

Maturity measures evidence, not file count.

| Level | Name | Meaning | Promotion evidence |
|---|---|---|---|
| S0 | DISCOVERED | Skill name/candidate found | catalog/source reference |
| S1 | IMPORTED | Operational skill package exists in Omar Brain | provenance + activation + workflow + gates |
| S2 | REVIEWED | Compared against current brain/projects and corrected | review record + conflicts resolved |
| S3 | APPLIED | Used on a real task | linked episode/project evidence |
| S4 | VERIFIED | Result passed explicit tests or independent review | verification evidence |
| S5 | PRODUCTION_PROVEN | Used successfully in a real production outcome | release/operations evidence |
| S6 | ADAPTIVE | Improved from repeated outcomes and regression tests | cross-project evidence + updated evals |

## Rules

- Never promote because a note sounds sophisticated.
- One success may justify `S3_APPLIED`, not `S5_PRODUCTION_PROVEN`.
- Failures are evidence and should improve the skill.
- A regression reopens maturity claims when the underlying method no longer works.
- Imported upstream skills remain source-attributed.

## Promotion path

```text
S1 imported
 -> S2 reviewed
 -> use on real work
 -> S3 applied
 -> independent tests/review
 -> S4 verified
 -> production evidence
 -> S5 production proven
 -> repeated cross-project learning
 -> S6 adaptive
```
