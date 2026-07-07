---
type: skill
status: active
created: 2026-07-07
skill_id: skill-docker-patterns
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Docker-Patterns/SKILL.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Docker Patterns

## Purpose

Design reproducible Docker and Compose workflows with explicit environments, healthy service dependencies, secure images, networking, volumes, and production-aware builds.

## When to activate

- docker
- docker compose
- dockerfile
- container networking
- volume
- multi stage build
- containerize

## Inputs required

- Application stack
- Development vs production needs
- Ports and service dependencies
- Persistent data requirements
- Host/deployment target

## Workflow

1. Inventory services and persistent state first.
2. Separate development and production targets.
3. Use lockfile-based deterministic installs and multi-stage builds.
4. Use service names for internal networking and healthchecks for readiness.
5. Choose bind mounts only for dev code; named volumes for durable service data.
6. Run as non-root and minimize capabilities/secrets in images.
7. Add .dockerignore and exclude local secrets/artifacts.
8. Test clean build, startup, restart, dependency failure, and persistence.

## Outputs

- Dockerfile/Compose architecture
- Network and volume map
- Environment contract
- Operational commands
- Verification evidence

## Quality gates

- [ ] No database durability assumed without named/external volume plan
- [ ] No production container running as root without explicit accepted risk
- [ ] No secret baked into image
- [ ] No depends_on treated as readiness without health logic

## Road signs

- When **database change** dominates → go to **Database Migrations**.
- When **production release** dominates → go to **Production Readiness OS**.
- When **security** dominates → go to **Security and Hardening**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/Docker-Patterns/SKILL.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
