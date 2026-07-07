---
type: skill
status: active
created: 2026-07-07
skill_id: skill-wordpress-server-optimization
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/WOM-Custom/agency/wordpress-server-optimization.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# WordPress Server Optimization

## Purpose

Optimize WordPress hosting from measured bottlenecks across PHP workers, opcode/cache layers, database, assets, plugins, and web server configuration.

## When to activate

- wordpress server optimization
- slow wordpress server
- optimize wordpress hosting
- openlitespeed wordpress performance
- php workers wordpress

## Inputs required

- Baseline metrics
- Hosting stack
- Traffic pattern
- WordPress/plugin inventory
- Cache configuration
- Resource limits

## Workflow

1. Measure before changing
2. Identify CPU, memory, IO, PHP, database, network, or frontend bottleneck
3. Check cache correctness before adding layers
4. Tune one layer at a time
5. Optimize large assets and expensive queries/plugins
6. Load test safely where permitted
7. Compare before/after and add regression monitoring

## Outputs

- Bottleneck diagnosis
- Optimization plan
- Before/after metrics
- Rollback notes

## Quality gates

- [ ] No optimization without baseline
- [ ] Cache changes verify correctness
- [ ] One-variable-at-a-time where possible
- [ ] Before/after evidence exists

## Capability graph

### Related skills
- `skill-wordpress-troubleshooting`
- `skill-performance-optimization`
- `skill-vps-audit-checklist`
- `skill-cyberpanel-diagnostics`

### Handoff signs
- `skill-performance-optimization`
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
- Source path: `WOM/11 Skills/WOM-Custom/agency/wordpress-server-optimization.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
