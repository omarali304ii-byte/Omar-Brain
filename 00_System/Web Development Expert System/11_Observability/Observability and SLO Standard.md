---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 11_observability]
ai_access: allowed
---
# Observability and SLO Standard

## Signals
Use traces, metrics and logs with consistent resource identity where needed.

## Critical journey model
For each critical journey define:
- user outcome
- SLI
- SLO when impact warrants
- error taxonomy
- business signal
- dependency signal
- alert/runbook

## Logging rule
Logs are not a dumping ground. Structured, purposeful, protected and scrubbed.

## Release rule
Verify telemetry reaches the real backend after deployment.
