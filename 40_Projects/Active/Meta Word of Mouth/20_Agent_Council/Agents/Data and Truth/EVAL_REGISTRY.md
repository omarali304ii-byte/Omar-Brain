# Data and Truth Eval Registry

| Eval ID | Trigger/Rule | Scenario | Command/Procedure | Status | Last proven revision | Evidence |
|---|---|---|---|---|---|---|
| DATA-EVAL-001 | DATA-MWOM-001 | Lead route without view_intelligence cannot expose intelligence evidence | route-level permission test | designed | bd8a7a6 | Code gating verified; test execution pending. Test file: test-route-security.ts exists but execution not verified |
| DATA-EVAL-002 | DATA-MWOM-002 | Raw provider IDs stay masked across people/search/inbox defaults | centralized privacy regression suite | designed | bd8a7a6 | Centralized masking verified; cross-surface test execution pending |
| DATA-EVAL-003 | DATA-FP-002 | Concurrent same-person updates preserve all deltas | adversarial DB concurrency test | designed | bd8a7a6 | FOR UPDATE + ordering verified; concurrency test (test-intelligence-ordering-concurrency.ts) exists but execution not verified |
| DATA-EVAL-004 | MWOM-DATA-005 | Clean migration builds current schema with pgvector | run test-clean-migration.ts | designed | bd8a7a6 | Migration files inspected; test file exists but execution not verified |
| DATA-EVAL-005 | DATA-MWOM-004 | One published prompt per brain enforced at DB level | prompt versioning concurrency test | designed | bd8a7a6 | Partial unique index verified; test file (test-ai-brain-prompt-versioning.ts) exists but execution not verified |

## Status key
- `missing`: not yet designed
- `designed`: scenario and procedure documented, test file may exist
- `passed-static`: static code inspection passes
- `passed-local`: test executed locally and passed
- `passed-ci`: CI executed and passed
- `failed`: executed but failed
- `blocked`: dependencies not met
- `stale`: needs re-execution against current revision
