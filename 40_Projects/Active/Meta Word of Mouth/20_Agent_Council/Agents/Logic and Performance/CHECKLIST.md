# Logic and Performance Checklist

- [x] Confirm current repo revision and owned-file drift. (bd8a7a6, diff from 8c027fab complete)
- [x] Read NEXT_START and ACTIVE_WORK before exploration.
- [x] Compare repo reality to DOMAIN_MODEL and OWNED_SURFACE_MAP.
- [x] Evaluate active findings only; do not preserve stale issues as current. (MWOM-DATA-003 reconciled)
- [x] Apply every matching trigger in LEARNED_RULES. (CONC-001 through CONC-004)
- [x] For a new problem, record root cause and why existing checks missed it. (MWOM-LOGIC-001, -002, -003)
- [x] Attach or register a regression/eval for testable failure modes. (LOGIC-EVAL-009 missing; others registered)
- [x] Record unproven claims in OPEN_UNKNOWNS.
- [x] Update SELF_REVIEW and NEXT_START before stopping.
- [x] Activation check: read-modify-write shared state.
- [x] Activation check: multiple workers touch same entity.
- [x] Activation check: loop/query added to growing dataset.
- [x] Activation check: matching/ranking/scoring changes.
