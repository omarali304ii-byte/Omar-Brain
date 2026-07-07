---
type: architecture-profile
status: active
created: 2026-07-07
topics: [architecture-profile, software]
ai_access: allowed
---
# software-standard-v1

## Required packet
Full software project packet from [[00_System/Project OS/Project Folder Blueprint v2]].

## Required standards
- [[00_System/Architecture Standards/Universal Software Architecture Baseline]]
- [[00_System/Architecture Standards/Data and Source of Truth Standard]]
- [[00_System/Architecture Standards/Module and File Boundary Standard]]
- [[00_System/Architecture Standards/UI and Shared Component Standard]]
- [[00_System/Architecture Standards/Mock Data Isolation Standard]]
- [[00_System/Architecture Standards/Security and Secrets Standard]]
- [[00_System/Architecture Standards/Idempotency Concurrency and Transaction Standard]]
- [[00_System/Architecture Standards/Business Events and Audit Standard]]
- [[00_System/Architecture Standards/Testing and Verification Standard]]
- [[00_System/Architecture Standards/Documentation Standard]]

## Default delivery shape
Modular monolith unless evidence justifies otherwise.

## Override
Project-specific deviations require ADRs.
