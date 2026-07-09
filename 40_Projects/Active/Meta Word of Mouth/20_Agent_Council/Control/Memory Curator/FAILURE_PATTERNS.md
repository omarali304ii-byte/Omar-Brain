# Memory Curator Failure Patterns

## CTRL-FP-001 — Context restart causes rediscovery
```yaml
signature: new agent begins with broad exploration despite existing project state
root_cause: no exact restart pointer or pointer ignored
prevention: deterministic entry + NEXT_START + validation
```
