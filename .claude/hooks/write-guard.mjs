#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const vault = path.resolve(process.env.CLAUDE_PROJECT_DIR || path.join(scriptDir, '..', '..'));
let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch {}
const tool = String(input.tool_name || '');
const ti = input.tool_input || {};
const rawPath = ti.file_path || ti.path || ti.notebook_path || '';
if (!rawPath) process.exit(0);
const abs = path.resolve(rawPath);
const rel = path.relative(vault, abs).replaceAll('\\', '/');

const deny = (reason) => process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'deny',
    permissionDecisionReason: reason
  }
}));

if (rel.startsWith('../') || path.isAbsolute(rel) && rel !== '') process.exit(0);
if (rel === '.git' || rel.startsWith('.git/')) {
  deny('Direct writes inside .git are blocked. Use normal Git commands and preserve repository history.');
  process.exit(0);
}
if (/^(\.env($|\.)|.*\/(\.env($|\.)|secrets?\/|credentials?\b))/i.test(rel)) {
  deny('Direct writes to environment/secrets/credentials paths are blocked by Omar Brain policy.');
  process.exit(0);
}
if (/^00_System\/Runtime Index\//i.test(rel)) {
  deny('Runtime Index is derived. Change canonical sources and rebuild the index with the approved automation.');
  process.exit(0);
}
if (/\.jsonl$/i.test(rel) || rel === '00_System/Runtime State/OPERATION_LOG.md') {
  deny('Append-only ledgers/history cannot be rewritten directly. Use the designated append/transaction automation.');
  process.exit(0);
}
if (tool === 'Write' && fs.existsSync(abs) && !rel.startsWith('.claude/')) {
  deny(`Full overwrite of existing canonical file '${rel}' is blocked. Read it first and use a bounded Edit, merge, or governed transaction.`);
  process.exit(0);
}
