---
type: skill
status: active
created: 2026-07-07
skill_id: skill-vps-audit-checklist
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/WOM-Custom/agency/vps-audit-checklist.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# VPS Audit Checklist

## Purpose

Run a structured VPS audit across system capacity, services, web server, PHP/runtime, database, security, backups, performance, and logs.

## When to activate

- vps audit
- server audit
- cyberpanel vps audit
- openlitespeed server check
- server health audit

## Inputs required

- Server type/OS
- Control panel
- Web server
- Access level
- Change window
- Business criticality

## Workflow

1. Collect read-only system baseline
2. Check control panel and service status
3. Inspect web/runtime configuration
4. Audit database capacity and exposure
5. Review firewall, SSH, open ports, fail2ban, certificates
6. Review backups and restore evidence
7. Inspect performance and error logs
8. Classify findings before making changes

## Outputs

- VPS audit report
- Severity-ranked findings
- Evidence/commands
- Safe remediation plan

## Quality gates

- [ ] Read-only audit precedes mutation
- [ ] Secrets are never copied into brain notes
- [ ] Backup/restore is checked
- [ ] High-risk changes require explicit approval

## Capability graph

### Related skills
- `skill-cyberpanel-diagnostics`
- `skill-linux-security-hardening`
- `skill-wordpress-server-optimization`
- `skill-security-and-hardening`

### Handoff signs
- `skill-cyberpanel-diagnostics`
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
- Source path: `WOM/11 Skills/WOM-Custom/agency/vps-audit-checklist.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
