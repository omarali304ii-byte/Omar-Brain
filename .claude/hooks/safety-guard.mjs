#!/usr/bin/env node
import fs from 'node:fs';

let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch {}
const command = String(input?.tool_input?.command || '').trim();
if (!command) process.exit(0);

const checks = [
  { re: /(^|[;&|]\s*)rm\s+-[^\n]*r[^\n]*f[^\n]*(\/|~|\.)(\s|$)/i, reason: 'recursive force deletion of root/home/current path' },
  { re: /\bgit\s+reset\s+--hard\b/i, reason: 'git reset --hard can erase uncommitted work' },
  { re: /\bgit\s+clean\s+-[^\s]*[fdx][^\s]*\b/i, reason: 'git clean can erase untracked/ignored work' },
  { re: /\bgit\s+push\b[^\n]*(--force|-f\b)/i, reason: 'force push can rewrite remote history' },
  { re: /\bgit\s+(checkout|restore)\s+--?\s*\.\s*($|[;&|])/i, reason: 'bulk checkout/restore can erase worktree changes' },
  { re: /\bdocker\s+system\s+prune\b[^\n]*(-a|--all)/i, reason: 'global Docker prune is destructive' },
  { re: /\bdocker\s+(volume|builder)\s+prune\b/i, reason: 'Docker prune can destroy persistent/local state' },
  { re: /\bdocker\s+compose\s+down\b[^\n]*(-v|--volumes)/i, reason: 'compose down with volumes can destroy database state' },
  { re: /\b(drop\s+database|truncate\s+table)\b/i, reason: 'destructive database operation requires explicit human approval' },
  { re: /\bdelete\s+from\s+[a-z0-9_.]+\s*(;|$)/i, reason: 'unbounded SQL DELETE detected' },
  { re: /\b(diskpart|format\s+[a-z]:|clear-disk|remove-partition)\b/i, reason: 'disk-level destructive operation detected' },
  { re: /\bRemove-Item\b[^\n]*(-Recurse[^\n]*-Force|-Force[^\n]*-Recurse)[^\n]*(\s\.\s*$|:\\\?\s*$)/i, reason: 'recursive forced PowerShell deletion of broad path' }
];

const hit = checks.find((x) => x.re.test(command));
if (!hit) process.exit(0);
process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'deny',
    permissionDecisionReason: `Omar Brain safety guard blocked ${hit.reason}. Use a bounded non-destructive command or obtain explicit human approval for the exact destructive action.`
  }
}));
