# Quality Engineer Owned Surface Map

## Known owned surfaces
- `package.json` test scripts
- `.github/workflows/verify.yml`
- route-security tests
- intelligence permission tests
- new fault-injection/concurrency/worker tests
- test DB setup

## Map status
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
freshness: partial
completeness: bootstrap_from_verified_assessment
```

## Rule
On revision drift, inspect changed files intersecting these surfaces first. Expand only when evidence shows a new owned surface.
