---
type: skill
status: active
created: 2026-07-07
skill_id: skill-linux-security-hardening
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/WOM-Custom/agency/linux-security-hardening.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# Linux Security Hardening

## Purpose

Harden Linux servers through evidence-based access, patching, firewall, service minimization, logging, and recovery controls without locking out operations.

## When to activate

- linux hardening
- server security
- ssh hardening
- firewall hardening
- fail2ban
- secure vps

## Inputs required

- Distribution/version
- Exposure
- Access method
- Services
- Backup/recovery
- Change window

## Workflow

1. Create baseline and preserve recovery path
2. Patch with compatibility awareness
3. Harden SSH progressively and verify alternate access
4. Restrict firewall to required services
5. Remove/disable unnecessary services
6. Review users, sudo, keys, secrets, file permissions
7. Configure logging/alerting and brute-force controls
8. Re-scan exposure and verify application availability

## Outputs

- Hardening plan
- Change evidence
- Open-risk register
- Rollback/recovery notes

## Quality gates

- [ ] No access hardening without recovery path
- [ ] No blanket port closure without service map
- [ ] Production availability verified
- [ ] Secrets are not stored in notes

## Capability graph

### Related skills
- `skill-vps-audit-checklist`
- `skill-security-and-hardening`
- `skill-cyberpanel-diagnostics`

### Handoff signs
- `skill-vps-audit-checklist`

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
- Source path: `WOM/11 Skills/WOM-Custom/agency/linux-security-hardening.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
