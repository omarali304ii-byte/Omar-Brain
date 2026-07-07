---
type: skill
status: active
created: 2026-07-07
skill_id: skill-security-and-hardening
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Security-And-Hardening/SKILL.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Security and Hardening

## Purpose

Apply security-first development: treat external input as hostile, secrets as protected, and authorization as mandatory at every protected operation.

## When to activate

- security
- hardening
- authentication
- authorization
- input validation
- file upload
- webhook
- pii
- secret
- rate limit
- owasp

## Inputs required

- Threat surface
- Auth/session model
- Protected resources
- External inputs/integrations
- Sensitive data/PII
- Deployment boundary

## Workflow

1. Map assets, actors, trust boundaries, and attacker goals.
2. Validate every external input at the system boundary.
3. Review authentication, session integrity, cookie flags, expiry, and recovery.
4. Review authorization per endpoint/action and object ownership.
5. Audit injection, XSS, CSRF, SSRF, upload, webhook signature, path traversal, and command execution paths.
6. Audit secrets, logs, error exposure, CORS, headers, dependency risk, and rate limits.
7. Create exploit-oriented tests for critical findings.
8. Fix highest severity first and rerun the original exploit path.

## Outputs

- Threat model
- Finding register with severity
- Concrete fixes
- Exploit/regression evidence
- Accepted-risk list

## Quality gates

- [ ] No plaintext password storage
- [ ] No secret committed or logged
- [ ] No protected mutation relying only on client/UI checks
- [ ] No auth token in localStorage for high-risk session without explicit accepted risk
- [ ] No unsigned webhook processed when signatures are expected

## Road signs

- When **full production audit** dominates → go to **Production Readiness OS**.
- When **performance tradeoff** dominates → go to **Performance Optimization**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/Security-And-Hardening/SKILL.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
