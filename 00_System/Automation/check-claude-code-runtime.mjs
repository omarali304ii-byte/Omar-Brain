#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const vault = path.resolve(process.argv[2] || process.cwd());
const errors = [];
const warnings = [];
const p = (...x) => path.join(vault, ...x);
const exists = (...x) => fs.existsSync(p(...x));
const read = (...x) => fs.readFileSync(p(...x), 'utf8');

const required = [
  'CLAUDE.md',
  '.claude/settings.json',
  '.claude/hooks/session-start.mjs',
  '.claude/hooks/prompt-router.mjs',
  '.claude/hooks/safety-guard.mjs',
  '.claude/hooks/write-guard.mjs',
  '.claude/hooks/change-tracker.mjs',
  '.claude/hooks/stop-gate.mjs',
  '.claude/skills/brain-start/SKILL.md',
  '.claude/skills/omar-think/SKILL.md',
  '.claude/skills/project-run/SKILL.md',
  '.claude/skills/production-harden/SKILL.md',
  '.claude/skills/brain-writeback/SKILL.md',
  '.claude/skills/brain-audit/SKILL.md',
  '.claude/agents/repo-scout.md',
  '.claude/agents/architecture-critic.md',
  '.claude/agents/critic-verifier.md',
  '.claude/agents/memory-curator.md'
];
for (const rel of required) if (!exists(...rel.split('/'))) errors.push(`missing ${rel}`);

if (exists('CLAUDE.md')) {
  const lines = read('CLAUDE.md').split(/\r?\n/).length;
  if (lines > 200) errors.push(`CLAUDE.md is ${lines} lines; target <= 200`);
}

let settings = null;
try { settings = JSON.parse(read('.claude', 'settings.json')); }
catch (e) { errors.push(`invalid .claude/settings.json: ${e.message}`); }
if (settings) {
  if (settings.autoMemoryEnabled !== false) errors.push('autoMemoryEnabled must be false to prevent shadow memory');
  for (const event of ['SessionStart','UserPromptSubmit','PreToolUse','PostToolUse','Stop']) {
    if (!settings.hooks?.[event]?.length) errors.push(`missing hook event ${event}`);
  }
}

let routes = null;
try { routes = JSON.parse(read('00_System','Navigation OS','route-registry.json')); }
catch (e) { errors.push(`invalid route registry: ${e.message}`); }
if (routes && !(routes.routes || []).some((r) => r.route_id === 'route-claude-code')) errors.push('route-claude-code missing');

const hookDir = p('.claude','hooks');
if (fs.existsSync(hookDir)) {
  for (const name of fs.readdirSync(hookDir).filter((n) => n.endsWith('.mjs'))) {
    const r = spawnSync(process.execPath, ['--check', path.join(hookDir, name)], { encoding: 'utf8', timeout: 10000, windowsHide: true });
    if (r.status !== 0) errors.push(`${name} syntax check failed: ${(r.stderr || r.stdout || '').trim()}`);
  }
}

function runHook(name, payload) {
  const file = p('.claude','hooks',name);
  const r = spawnSync(process.execPath, [file], {
    cwd: vault,
    input: JSON.stringify(payload),
    encoding: 'utf8',
    timeout: 15000,
    windowsHide: true,
    env: { ...process.env, CLAUDE_PROJECT_DIR: vault }
  });
  return r;
}
function parseOutput(r, label) {
  if (r.status !== 0) { errors.push(`${label} exited ${r.status}: ${(r.stderr || '').trim()}`); return null; }
  if (!r.stdout.trim()) return null;
  try { return JSON.parse(r.stdout); }
  catch (e) { errors.push(`${label} emitted invalid JSON: ${e.message}; output=${r.stdout.slice(0,500)}`); return null; }
}

const ss = parseOutput(runHook('session-start.mjs', { session_id:'claude-runtime-check', source:'startup', cwd:vault, hook_event_name:'SessionStart' }), 'session-start');
if (!ss?.hookSpecificOutput?.additionalContext?.includes('OMAR BRAIN LIVE SESSION SNAPSHOT')) errors.push('session-start did not inject live snapshot');

const pr = parseOutput(runHook('prompt-router.mjs', { session_id:'claude-runtime-check', prompt:'Use Claude Code to work like me and harden Omar Brain', cwd:vault, hook_event_name:'UserPromptSubmit' }), 'prompt-router');
const prText = pr?.hookSpecificOutput?.additionalContext || '';
if (!prText.includes('Route: route-claude-code')) errors.push(`prompt-router did not select route-claude-code; got ${prText.slice(0,250)}`);
if (!prText.includes('Project resolution')) errors.push('prompt-router missing project resolution section');

const sg = parseOutput(runHook('safety-guard.mjs', { session_id:'claude-runtime-check', tool_name:'Bash', tool_input:{ command:'git reset --hard HEAD' }, hook_event_name:'PreToolUse' }), 'safety-guard');
if (sg?.hookSpecificOutput?.permissionDecision !== 'deny') errors.push('safety-guard failed to deny destructive git reset');

const wg = parseOutput(runHook('write-guard.mjs', { session_id:'claude-runtime-check', tool_name:'Write', tool_input:{ file_path:p('START HERE.md'), content:'x' }, hook_event_name:'PreToolUse' }), 'write-guard');
if (wg?.hookSpecificOutput?.permissionDecision !== 'deny') errors.push('write-guard failed to deny full overwrite of existing canonical file');

const skillRoot = p('.claude','skills');
if (fs.existsSync(skillRoot)) {
  const skillDirs = fs.readdirSync(skillRoot, { withFileTypes:true }).filter((e) => e.isDirectory());
  for (const d of skillDirs) if (!fs.existsSync(path.join(skillRoot,d.name,'SKILL.md'))) errors.push(`skill ${d.name} missing SKILL.md`);
  if (skillDirs.length > 12) warnings.push(`high Claude-native skill count (${skillDirs.length}); review minimality`);
}

console.log(`Claude Code Runtime Check: ${errors.length} errors, ${warnings.length} warnings`);
for (const e of errors) console.log(`ERROR: ${e}`);
for (const w of warnings) console.log(`WARN: ${w}`);
if (!errors.length) console.log('PASS: native contract, route injection, hook syntax, destructive guard, overwrite guard, and shadow-memory boundary verified.');
process.exit(errors.length ? 1 : 0);
