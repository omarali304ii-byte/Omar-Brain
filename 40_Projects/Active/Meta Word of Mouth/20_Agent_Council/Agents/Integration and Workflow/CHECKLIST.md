# Integration and Workflow Checklist

- [x] Confirm current repo revision and owned-file drift. (bd8a7a6, no drift on owned surfaces)
- [x] Read NEXT_START and ACTIVE_WORK before exploration.
- [x] Compare repo reality to DOMAIN_MODEL and OWNED_SURFACE_MAP.
- [x] Evaluate active findings only; do not preserve stale issues as current.
- [x] Apply every matching trigger in LEARNED_RULES.
- [x] For a new problem, record root cause and why existing checks missed it.
- [x] Attach or register a regression/eval for testable failure modes.
- [x] Record unproven claims in OPEN_UNKNOWNS.
- [x] Update SELF_REVIEW and NEXT_START before stopping.
- [x] Activation check: external API call added/changed.
- [x] Activation check: retry/timeout behavior changes.
- [x] Activation check: webhook event changes.
- [x] Activation check: provider version change.
- [x] Verify MWOM-INT-001 against live code (confirmed active with controls).
- [x] Verify MWOM-ARCH-001 integration context (provider-semantics contract defined).
- [x] Create cross-agent handoffs for required coordination.
- [x] Extract learned rules from confirmed findings.
- [x] Map freshness triggers for all owned surfaces.

## New checks for future sessions
- [ ] Verify transport timeout classification if meta-send-client.ts has changed since bd8a7a6
- [ ] Check if fetch() calls have AbortController timeouts added
- [ ] Verify Meta Graph API version if env is newer than v25.0
- [ ] Check for new external providers in package.json or .env.example
- [ ] Verify worker scripts if package.json worker commands have changed
