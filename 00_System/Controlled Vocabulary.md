---
type: system
status: active
created: 2026-07-07
topics: [vocabulary, taxonomy, governance]
ai_access: allowed
version: 4.0
---
# Controlled Vocabulary

## Note types

### System and governance
`system`, `template`, `change-proposal`, `architecture-profile`, `agent-role`, `tool-contract`, `capability`, `eval-case`, `eval-result`, `memory-proposal`, `episode`

### Life and planning
`area`, `goal`, `routine`, `idea`

### Projects and execution
`project`, `project-note`, `requirement`, `feature`, `task`, `decision`, `meeting`, `run`, `evidence`, `blocker`

### Business
`organization`, `product`, `client`, `offer`, `process`, `strategy`

### Learning
`skill`, `lesson`, `pattern`, `anti-pattern`, `failure-signature`

### Knowledge
`concept`, `how-to`, `problem-solution`, `playbook`, `research`, `source`, `standard`, `checklist`

### People
`person`

### Reviews
`daily`, `weekly-review`, `monthly-review`, `quarterly-review`, `yearly-review`

## Statuses by object family

### Durable lifecycle
`inbox`, `active`, `paused`, `waiting`, `completed`, `evergreen`, `deprecated`, `archived`, `superseded`

### Ideas and learning promotion
`candidate`, `validating`, `validated`, `rejected`, `promoted`

### Execution work
`proposed`, `ready`, `in-progress`, `blocked`, `verifying`, `done`, `cancelled`

Use only a status valid for that note type. Do not invent synonyms such as `doing`, `finished`, or `on-hold`.

## Project classes
`software`, `business`, `research`, `personal`, `learning`

## Architecture profiles
`software-standard-v1`, `business-project-v1`, `research-project-v1`, `personal-project-v1`, `learning-project-v1`

## Project health
`green`, `yellow`, `red`, `unknown`

## Priority
`P0`, `P1`, `P2`, `P3`, `P4`

## Domains
`life`, `career`, `business`

## AI access
`allowed`, `restricted`, `denied`

## Confidence
`high`, `medium`, `low`

## Source kind
`self`, `official`, `primary`, `secondary`, `conversation`, `repository`, `runtime`, `test`, `ai`

## Learning maturity
`observation`, `candidate`, `validated`, `pattern`, `standard`, `deprecated`

## Governance
Before adding a value:
1. prove existing values cannot represent it,
2. create a change proposal,
3. document compatibility and migration impact,
4. update this file and the metadata schema,
5. update templates, dashboards, validators, and prompts,
6. migrate existing notes consistently,
7. record the system change.


## Memory classes
`semantic`, `episodic`, `procedural`

## Memory proposal states
`proposed`, `checking`, `ready-for-critic`, `critic-approved`, `critic-rejected`, `needs-evidence`, `ready-for-curator`, `committed`, `merged`, `episode-only`, `deferred`, `rejected`

## Episode statuses
`completed`, `completed-with-warnings`, `failed`, `interrupted`, `blocked`

## Risk
`low`, `medium`, `high`, `critical`
