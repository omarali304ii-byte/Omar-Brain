---
type: skill
status: active
created: 2026-07-07
skill_id: skill-cyberpanel-diagnostics
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/WOM-Custom/agency/cyberpanel-diagnostics.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# CyberPanel Diagnostics

## Purpose

Diagnose CyberPanel/OpenLiteSpeed hosting failures from service state, logs, vhost/runtime configuration, DNS/TLS, and resource constraints.

## When to activate

- cyberpanel problem
- cyberpanel diagnostics
- openlitespeed issue
- website down cyberpanel
- cyberpanel ssl

## Inputs required

- Symptom
- Affected domain
- Recent changes
- Service/log access
- Known maintenance window

## Workflow

1. Confirm blast radius and user-visible symptom
2. Check system/service/resource state
3. Inspect relevant logs before restart
4. Verify vhost, PHP handler, DNS, TLS, ports, and permissions
5. Reproduce with minimal diagnostic request
6. Apply smallest reversible fix
7. Verify domain, logs, and neighboring sites

## Outputs

- Root-cause hypothesis
- Evidence
- Safe fix
- Regression checks

## Quality gates

- [ ] No blind restart before logs
- [ ] Neighboring sites checked after shared config change
- [ ] Rollback path exists
- [ ] Credentials are not recorded

## Capability graph

### Related skills
- `skill-vps-audit-checklist`
- `skill-linux-security-hardening`
- `skill-wordpress-troubleshooting`

### Handoff signs
- `skill-vps-audit-checklist`
- `skill-linux-security-hardening`

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
- Source path: `WOM/11 Skills/WOM-Custom/agency/cyberpanel-diagnostics.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
