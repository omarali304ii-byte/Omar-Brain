# Integration and Workflow Next Start

```yaml
status: ready
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
start_here: re-inspect current repo revision and changed owned surfaces
first_files_to_open:
  - app/api/inbox/conversations/[id]/messages/route.ts
active_finding_ids: ["MWOM-INT-001"]
open_unknowns:
  - current revision drift not reconciled
first_action: compare current revision and owned-file diffs against stored model, then continue highest-severity owned finding
do_not_repeat:
  - broad repository exploration before checking NEXT_START and OWNED_SURFACE_MAP
  - treating stored revision-bound claims as current without recheck
proof_needed_next:
  - run or design highest-priority missing eval in EVAL_REGISTRY.md
```
