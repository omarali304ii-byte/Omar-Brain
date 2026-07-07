---
type: system
status: active
created: 2026-07-07
topics: [backup, recovery]
ai_access: allowed
---
# Backup and Recovery

## Required principle
Sync is not backup. Keep recoverable history independent from device synchronization.

## Recommended layers
1. Local vault on primary device.
2. Device sync method chosen deliberately.
3. Versioned backup with history.
4. Periodic offline or separate-provider copy.

## Recovery test
Quarterly:
1. restore a copy to a temporary folder,
2. open it as a separate Obsidian vault,
3. verify Markdown, attachments, links, and critical notes,
4. confirm sensitive files retained their intended access controls.

## Git note
Git can be useful for text history, but secrets, large binaries, and sensitive personal notes require careful exclusion and repository privacy.
