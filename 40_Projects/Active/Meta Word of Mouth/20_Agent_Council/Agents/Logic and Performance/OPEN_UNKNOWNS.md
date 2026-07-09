# Logic and Performance Open Unknowns

Unknowns must not be guessed away.

## Production unknowns
- Actual same-person concurrency frequency at production load unknown
- Deployed worker count and topology unknown
- Production connection pool configuration unknown
- Representative data volume (people, conversations, messages, signals, jobs per workspace) unknown
- p95 query latency baselines unknown
- Query plans at scale unknown (no EXPLAIN ANALYZE available)
- Production DB index coverage and effectiveness unknown
- Multi-worker intelligence processing concurrency frequency unknown
- Manual opportunity refresh concurrency frequency unknown

## Code-level unknowns
- Whether localeCompare behavior for UUIDs is identical across all target Node runtimes (confirmed deterministic for ASCII UUIDs locally)
- Whether `test-intelligence-worker.ts` passes in a non-exhausted connection pool environment (blocked by environment, not code)

## Scale assumptions (unverified)
- Workspace person count: assumed tens-to-hundreds (people search acceptable)
- Concurrent workers: assumed 1-3 (job claiming contention low)
- PROCESSING job count: assumed < worker count (stale recovery scan small)
- Identity count per person: assumed 1-3 (opportunity refresh expansion bounded)

## Closure rule
When an unknown is proven, update the owning current model and attach evidence; do not merely delete uncertainty without proof.
