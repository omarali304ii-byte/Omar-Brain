---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [brain, upgrade, v12, claude-code, skills, lazy-loading, token-economy]
ai_access: allowed
version: 12.0
---
# Omar Brain v12 — Lazy Claude Skill Library Upgrade Report

## Goal

Integrate Omar's uploaded Claude skill pack into Omar Brain so Claude can use specialized procedures when they are materially relevant, without preloading hundreds of skills, polluting project retrieval, or allowing imported instructions to override Brain governance.

## Imported capability surface

Observed from `skills.zip`:

- external skills: **559**,
- exact duplicate `SKILL.md` groups: **0**,
- preserved payload files: **1,913**,
- source archive SHA-256: `ccec1af5cbf33bc8c2895356eb57224c1322e76f262219950fd859b4f3afc00e`.

The original imported payload is preserved under:

`50_Skills/Claude Skill Library/skills/`

## Core architecture

```text
User task
  -> route/project/Agent Loop resolution
  -> canonical Brain skill ownership check
  -> compact external catalog match
  -> stack-aware conflict filtering
  -> zero/one primary external candidate
  -> inspect selected SKILL.md
  -> compatibility + risk check
  -> narrow application
  -> optional 0-2 support skills for real handoff only
```

The library is not registered as 559 native startup skills. Claude receives only small candidate metadata at prompt time. Skill body content is loaded only after selection.

## Added indexes and integrity controls

`50_Skills/Claude Skill Library/registry/`

- `skill-catalog.json` — full catalog with provenance, hashes, risk flags, activation phrases, categories, and search terms,
- `skill-catalog.min.json` — compact prompt-time matcher,
- `payload-manifest.json` — SHA-256 manifest for every imported payload file,
- `risk-report.json` — static review flags,
- `duplicate-report.json` — exact-content duplicate report,
- `library-summary.json` — counts and distribution.

Static risk classification observed:

- low: 282,
- medium: 221,
- high: 56.

Risk classification is advisory. It does not grant or deny authority by itself.

## Claude-native integration

Added:

- `/skill-find`,
- `.claude/rules/50-external-skill-library.md`,
- prompt-time external skill candidates in `.claude/hooks/prompt-router.mjs`,
- `external-skill-route.mjs`,
- `check-external-skill-library.mjs`,
- `check-external-skill-routing.mjs`.

Updated:

- root `CLAUDE.md`,
- Dynamic Brain capability loading policy,
- canonical skill router,
- Brain cycle,
- retrieval manifest builder.

## Token-economy law

1. Start with zero external skills.
2. Route the task and resolve repository truth first.
3. Candidate metadata only at prompt time.
4. Read one selected `SKILL.md` before claiming use.
5. Load references/examples/assets only for the active step.
6. Maximum external active set: one primary plus at most two support skills.
7. No material match is a valid outcome; never force-fit.

## Stack-aware matching

The matcher applies compatibility logic rather than raw keyword overlap.

Examples covered by regression:

- agent looping/token burn -> `agent-introspection-debugging`,
- Flutter task -> Flutter/Dart candidates outrank Kotlin/Android-only procedures,
- PostgreSQL task -> PostgreSQL/query-optimization candidates; MySQL-only mismatch penalized,
- React web accessibility -> WCAG/frontend accessibility candidates; React Native penalized when mobile is not requested,
- ordinary birthday-message writing -> no external skill candidate.

## Security and authority boundary

Imported skills are `S0_DISCOVERED`, `on-demand`, and imported-untrusted until inspected.

Authority order remains:

1. explicit user request and constraints,
2. `CLAUDE.md` and scoped `.claude/rules/`,
3. active Agent Loop contract and repository truth,
4. canonical Omar Brain standards and decisions,
5. imported skill procedure.

Imported instructions cannot override Brain rules, hooks, permissions, user constraints, or current repository truth.

Bundled scripts, installers, shell commands, network actions, secret-access instructions, and destructive examples are never auto-executed merely because a skill recommends them.

## Retrieval isolation

The first full regression exposed a real failure: indexing all 559 external skill payloads in default Brain retrieval displaced canonical project, runtime, and skill notes and broke existing retrieval evals.

The fix was architectural, not an eval bypass:

- external skill payloads are excluded from default Brain retrieval,
- the library remains searchable through its dedicated compact catalog and router,
- library policy/index notes remain visible to default retrieval.

This preserves project memory quality while keeping 559 capabilities available on demand.

Health scoring uses the same narrow boundary: imported payload Markdown is not counted as malformed canonical Brain metadata, while payload integrity remains independently verified.

## Governance boundary

The imported payload preserves upstream bytes/frontmatter. It is intentionally excluded from canonical Brain-note metadata validation and instead governed by:

- full payload SHA-256 manifest,
- external library catalog validation,
- path containment checks,
- missing/extra payload detection,
- skill-entrypoint hash checks,
- dedicated routing regression.

This avoids rewriting third-party skill sources merely to satisfy native Brain-note metadata conventions.

## Honest boundary

v12 proves local import integrity, lazy routing behavior, stack-aware selection tests, prompt-hook behavior, retrieval isolation, and complete Brain regression.

It does not prove that every one of the 559 imported procedures is correct, current, safe for every environment, or effective on real projects. External skill promotion into the canonical Skill OS still requires review and evidence.
