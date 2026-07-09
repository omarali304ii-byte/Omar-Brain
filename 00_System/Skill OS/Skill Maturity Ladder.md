---
type: standard
status: active
created: 2026-07-07
topics: [skills, maturity, evidence]
ai_access: allowed
---
# Skill Maturity Ladder

Maturity measures evidence, not file count.

| Level | Name              | Meaning                                               | Promotion evidence                         |
| ----- | ----------------- | ----------------------------------------------------- | ------------------------------------------ |
| S0    | DISCOVERED        | Skill name/candidate found                            | catalog/source reference                   |
| S1    | IMPORTED          | Operational skill package exists in Omar Brain        | provenance + activation + workflow + gates |
| S2    | REVIEWED          | Compared against current brain/projects and corrected | review record + conflicts resolved         |
| S3    | APPLIED           | Used on a real task                                   | linked episode/project evidence            |
| S4    | VERIFIED          | Result passed explicit tests or independent review    | verification evidence                      |
| S5    | PRODUCTION_PROVEN | Used successfully in a real production outcome        | release/operations evidence                |
| S6    | ADAPTIVE          | Improved from repeated outcomes and regression tests  | cross-project evidence + updated evals     |

## Rules

- Never promote because a note sounds sophisticated.
- One success may justify `S3_APPLIED`, not `S5_PRODUCTION_PROVEN`.
- Failures are evidence and should improve the skill.
- A regression reopens maturity claims when the underlying method no longer works.
- Imported upstream skills remain source-attributed.

## Promotion path

```text
S1 imported
 -> S2 reviewed
 -> use on real work
 -> S3 applied
 -> independent tests/review
 -> S4 verified
 -> production evidence
 -> S5 production proven
 -> repeated cross-project learning
 -> S6 adaptive
```

---

# Skill Registry & Maturity Protocol
*Hardened spec for agents. Reverse-engineered from `_harness_Ya_Eslam`. Deterministic — follow literally.*

## 0. Agent instructions (read first)

If you are an agent operating on the skill catalog:
1. Treat this file as the **single source of truth** for skill maturity. Do not infer a level from prose.
2. Every skill has exactly **one record** and **one level** (S0–S6). No skill is level-less.
3. You may **only** change a `level` by appending a ledger line (§3). No ledger line = no level change.
4. Before adding, building, or installing any skill, run the three gates in §4 in order. A failed gate blocks the action.
5. On any upstream sync (`pass-knowledge` / harness update), run the reconciliation in §5.

## 1. Platform key

| Icon | Platform |
| ---- | -------- |
| C    | Claude Code |
| O    | OpenCode |
| X    | Codex |
| G    | Gemini / Antigravity |

## 2. Skill record (one row per skill — canonical schema)

| Field | Type | Rule |
| ----- | ---- | ---- |
| `name` | string | Canonical skill name / invocation. Unique. Lowercase-with-hyphens. |
| `category` | string | Thematic bucket from the harness (e.g. `Market Research — Digital`). |
| `when_to_use` | string | Exact trigger condition. Used as the `S3_APPLIED` activation signal. |
| `platforms` | enum[C O X G] | Space-separated icons where the package is installed. Empty = not installed. |
| `workflow` | string | One-line condensed step summary. |
| `level` | enum[S0..S6] | Current maturity. **Derived only via the algorithm in §2.1.** |
| `evidence` | string | Pointer to the ledger line that authorized the current `level`. |
| `last_promoted` | date `YYYY-MM-DD` | Date of the latest ledger line for this skill. |
| `source` | string | Provenance (e.g. `harness:Ya_Eslam` or `authored:Omar`). |

### 2.1 Level-assignment algorithm (deterministic)

Evaluate in order; stop at the first match:

```text
IF name appears in catalog AND platforms == ""            -> S0_DISCOVERED
IF name in catalog AND platforms != "" AND no review rec  -> S1_IMPORTED
IF review record exists AND conflicts resolved            -> S2_REVIEWED
IF a real task used it AND episode logged in ledger       -> S3_APPLIED
IF passed explicit test / independent review (logged)     -> S4_VERIFIED
IF used in a real production outcome (logged)             -> S5_PRODUCTION_PROVEN
IF repeated cross-project use + regression evals updated  -> S6_ADAPTIVE
```

Rules locked by the ladder (do not override):
- A single success authorizes **at most `S3_APPLIED`**, never `S5`.
- A catalog row with no ledger line is **never** above `S1`.
- A regression (method no longer works) reopens the claim → drop one level and log it.
- Imported upstream skills stay `source`-attributed; never claim authorship.

## 3. Maturity Ledger (only valid proof of promotion)

Append exactly one line per level change. Format is fixed and machine-parseable:

```text
LEDGER | YYYY-MM-DD | name | from=Sx | to=Sy | evidence=<path-or-id> | note=<short>
```

Example:
```text
LEDGER | 2026-07-08 | sql-queries | from=S1 | to=S2 | evidence=reviews/sql-conventions.md | note=aligned dialect list
```

Hard rules:
- The ledger is the **only** accepted proof of a level change. A catalog row alone implies nothing above `S1`.
- `evidence` must point to a real artifact (file, episode id, test run, release note). Vague text is rejected.
- Update `level`, `evidence`, and `last_promoted` in the skill record to match the latest ledger line.

## 4. Catalog overlay gates (run before add/build/install)

Evaluate in order. **Stop and block** if any gate fails.

1. **Install gate** — Block if adding a package without a `S1_IMPORTED` record + `source` provenance.
2. **Learn-before-build gate** — Before authoring a new skill, search the catalog for an existing `name` whose `when_to_use` overlaps. If found, reuse it; do not duplicate.
3. **Build-readiness gate** — Block promotion to `S3_APPLIED` unless a real task invoked the skill and produced a logged episode.

## 5. Sync reconciliation (run on every upstream update)

1. Diff the catalog against the ledger.
2. Any skill removed upstream or with `platforms` emptied → set `level=S0`, append:
   `LEDGER | <today> | <name> | from=<prev> | to=S0 | evidence=sync-reconcile | note=removed/unsynced`
3. Any duplicate `name` with conflicting `workflow` → must be resolved (merge or rename) before it may reach `S2_REVIEWED`.

## 6. Worked examples

| name | category | platforms | level | evidence |
| ---- | -------- | --------- | ----- | -------- |
| `sql-queries` | Analytics & Data | C O X G | S2_REVIEWED | LEDGER 2026-07-08 sql-queries S1->S2 |
| `frontend-design` | Frontend & Design | C O X G | S1_IMPORTED | provenance:harness:Ya_Eslam |
| `wom-client-intake-to-strategy` | WOM Agency | O | S0_DISCOVERED | catalog reference only |
