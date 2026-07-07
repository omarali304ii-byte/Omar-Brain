---
type: skill
status: active
created: 2026-07-07
skill_id: skill-release-notes
category: Execution
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Execution/release-notes.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# Release Notes

## Purpose

Turn verified shipped changes into accurate release communication without claiming unverified functionality.

## When to activate

- release notes
- changelog
- what shipped
- version notes

## Inputs required

- Verified change list
- Audience
- Version/date
- Known limitations
- Migration/action requirements

## Workflow

1. Read actual diff/issues/release evidence
2. Separate user-visible changes from internal work
3. Describe outcomes plainly
4. Include breaking changes, migration steps, deprecations, and known limitations
5. Link proof and docs
6. Do not include planned but unshipped items

## Outputs

- Release notes
- Upgrade/migration notes
- Known issues
- Internal evidence links

## Quality gates

- [ ] Every claimed change is verified
- [ ] Breaking changes are prominent
- [ ] Known limitations are not hidden
- [ ] No roadmap item is presented as shipped

## Capability graph

### Related skills
- `skill-launch-strategy`
- `skill-copy-editing`
- `skill-test-scenarios`

### Handoff signs
- `skill-launch-strategy`
- `skill-copy-editing`

## AI road signs

- **Enter here when:** the request matches the activation triggers and this skill owns the primary outcome.
- **Do not stay here when:** a handoff skill owns a distinct next responsibility.
- **Context rule:** load this skill first; load support skills only through the graph or a selected bundle.
- **Completion proof:** output exists + quality gates checked + evidence attached to a project or episode when work is real.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported/catalog-derived capability is guidance, not proof of Omar-specific mastery.
- Promotion requires [[00_System/Skill OS/Skill Maturity Ladder]] and evidence in the Skill Evidence Ledger.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/Execution/release-notes.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
