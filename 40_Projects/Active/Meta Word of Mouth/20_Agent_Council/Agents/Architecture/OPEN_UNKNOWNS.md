# Architecture Open Unknowns

```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```

Unknowns must not be guessed away.

## Active unknowns

### Runtime deployment topology
- What: deployed production adapter topology, worker deployment, scheduler ownership
- How to close: verify actual deployed configuration, runtime logs, or ops documentation
- Arch impact: affects reconciliation worker deployment, intelligence worker scaling

### Production reconciliation execution
- What: whether outbound-send-reconciliation-worker is deployed and running in production
- How to close: production runtime verification or ops handoff
- Arch impact: if not deployed, RECONCILIATION_REQUIRED messages remain stuck

### AI Brain knowledge ingestion pipeline
- What: how knowledge sources (PDF, DOCX, etc.) are ingested, chunked, embedded
- How to close: inspect or implement the ingestion pipeline
- Arch impact: repository interface exists but ingestion workflow is not yet inspected

### AI Brain prompt utilization in AI suggestions
- What: whether published prompts are actually injected into AI suggestion/reply generation
- How to close: trace AI suggestion prompt construction to check Brain prompt usage
- Arch impact: AI Brain may have no runtime effect on suggestions yet

## Closure rule
When an unknown is proven, update the owning current model and attach evidence;
do not merely delete uncertainty without proof.
