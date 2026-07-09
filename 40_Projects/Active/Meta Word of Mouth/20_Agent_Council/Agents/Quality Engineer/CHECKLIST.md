# Quality Engineer Checklist

- [ ] Confirm current repo revision and owned-file drift.
- [ ] Read NEXT_START and ACTIVE_WORK before exploration.
- [ ] Compare repo reality to DOMAIN_MODEL and OWNED_SURFACE_MAP.
- [ ] Evaluate active findings only; do not preserve stale issues as current.
- [ ] Apply every matching trigger in LEARNED_RULES.
- [ ] For a new problem, record root cause and why existing checks missed it.
- [ ] Attach or register a regression/eval for testable failure modes.
- [ ] Record unproven claims in OPEN_UNKNOWNS.
- [ ] Update SELF_REVIEW and NEXT_START before stopping.
- [ ] Activation check: any P0/P1 fix.
- [ ] Activation check: new invariant.
- [ ] Activation check: new provider side effect.
- [ ] Activation check: new concurrency mechanism.
