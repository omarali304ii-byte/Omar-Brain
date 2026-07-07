---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [navigation, links, hubs, routing]
ai_access: allowed
---
# Intersection Sign Standard

Use this standard for important hubs, project packets, and operating maps.

## Minimum sign block

```markdown
## AI Road Signs

**You are here:** <what this note owns>.

| When the destination is... | Go to... |
|---|---|
| ... | [[Canonical Note]] |

**Do not stay here when:** <boundary>.
**Arrival proof:** <evidence>.
```

## Sign quality rules

A good sign:
- points to a real canonical file,
- states a trigger/condition,
- avoids circular "see also" noise,
- uses the smallest useful next hop,
- distinguishes information lookup from execution,
- distinguishes project documentation from repository truth,
- defines what proves arrival.

## Durable relationships

Prefer labeled relationships:
- `owned by`
- `depends on`
- `implemented in`
- `verified by`
- `blocked by`
- `derived from`
- `supersedes`
- `related to`

A link without a reason is weaker than a sign.
