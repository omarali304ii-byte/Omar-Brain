---
type: project-note
status: active
created: "{{date:YYYY-MM-DD}}"
updated: "{{date:YYYY-MM-DD}}"
topics: [architecture]
ai_access: allowed
project:
last_reviewed: "{{date:YYYY-MM-DD}}"
---
# Architecture

## Architecture goal

## System context

## Primary flow
```text
UI → action/controller → service/use case → permission/policy → transaction → repository/gateway → DB/provider → event/audit → response
```

## Modules and responsibilities

## Trust boundaries

## Data flow

## External integrations

## Events and audit

## Failure handling

## Deployment shape

## Invariants
- UI never writes directly to DB.
- Services own business rules.
- Repositories own persistence mechanics.

## Accepted overrides
Link ADRs only.

## Architecture risks
