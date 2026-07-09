# Data and Truth Failure Patterns

Current reusable project failure signatures.

## DATA-FP-001 — Parent permission leaks nested sensitive evidence
```yaml
pattern_id: DATA-FP-001
status: fixed
signature: route authorizes entity but serializer includes richer evidence
root_cause: authorization boundary modeled at page/entity level instead of field meaning
prevention: add explicit DTO exposure option and route-level tests
detection: DTO inspection for evidence/signal/message content in output
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```
Status: Leads routes at bd8a7a6 conditionally include evidence based on view_intelligence at both Prisma include and DTO output layers. Prevention is in place.

## DATA-FP-002 — Read-modify-write snapshot loses deltas
```yaml
pattern_id: DATA-FP-002
status: fixed
signature: two jobs load same snapshot then overwrite
root_cause: no concurrency control around shared derived state
prevention: require version/lock/atomic/merge-safe mechanism + concurrent proof
detection: FOR UPDATE locking audit, source-order comparison check
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```
Status: Snapshot updates use FOR UPDATE on job + person + snapshot within single $transaction. Source-order comparison rejects stale updates. Deterministic three-way tiebreak (observedAt → createdAt → messageId). Prevention is in place.

## DATA-FP-003 — Migration adds constraint without safe backfill
```yaml
pattern_id: DATA-FP-003
status: active
signature: migration adds NOT NULL, unique, or enum constraint on existing table
root_cause: migration authored against empty/small dataset, not production volumes
prevention: use ADD COLUMN IF NOT EXISTS, ADD VALUE IF NOT EXISTS; validate nullable first
detection: migration review for constraint changes on populated tables
last_proven_revision: null
```
Status: Current migration chain at bd8a7a6 uses safe patterns (IF NOT EXISTS, nullable columns). No NOT NULL on existing tables. Monitoring for future migrations.

## DATA-FP-004 — External ID leaks through DTO fallback chain
```yaml
pattern_id: DATA-FP-004
status: fixed
signature: display name fallback resolves to raw provider ID
root_cause: DTO fallback chain returns providerCustomerId without masking
prevention: centralized masking function at every fallback point
detection: DTO audit for providerCustomerId usage without resolveProviderIdDisplay
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```
Status: All DTO fallback chains (people-dto, inbox-dto, opportunity-dto) now route providerCustomerId through resolveProviderIdDisplay(). Prevention is in place.
