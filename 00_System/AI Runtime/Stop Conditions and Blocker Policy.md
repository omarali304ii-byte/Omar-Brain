---
type: system
status: active
created: 2026-07-07
topics: [ai, blockers, stop-conditions]
ai_access: allowed
---
# Stop Conditions and Blocker Policy

“Never stop” is operationally unsafe unless exit conditions are explicit. This policy makes persistence objective.

## Valid successful exit
- requested acceptance criteria proven,
- applicable Definition of Done gates pass,
- evidence linked,
- queue/current state updated.

## Valid blocked exit
Only when progress truly requires one of:
1. unavailable credential/secret/account access,
2. unavailable external system or provider capability,
3. a consequential human product/business decision with no authoritative answer in brain/repo,
4. destructive action requiring approval,
5. legal/safety restriction,
6. tool/runtime failure after reasonable diagnosis and retry with evidence,
7. contradictory requirements that cannot be resolved by truth hierarchy.

## Before declaring blocked
The agent must:
- search brain,
- inspect repo/config/docs,
- search exact failure signature,
- inspect related decisions,
- try safe non-destructive alternatives,
- record attempts and evidence,
- isolate the smallest missing dependency,
- continue independent ready work when possible.

## Invalid blockers
- “I need more context” when context exists,
- “please confirm” for facts already stored,
- first failed command,
- unfamiliar code,
- lack of perfect certainty,
- task size alone.
