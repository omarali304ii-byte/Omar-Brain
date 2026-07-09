#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const vault = path.resolve(process.env.CLAUDE_PROJECT_DIR || path.join(scriptDir, '..', '..'));

let input = {};
try {
  const raw = fs.readFileSync(0, 'utf8').trim();
  if (raw) input = JSON.parse(raw);
} catch {}

const read = (rel, fallback = '') => {
  try { return fs.readFileSync(path.join(vault, ...rel.split('/')), 'utf8'); }
  catch { return fallback; }
};
const stripFm = (s) => s.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();

let state = {};
try { state = JSON.parse(read('00_System/Runtime State/brain-state.json', '{}')); } catch {}
const hot = stripFm(read('00_System/Runtime State/HOT.md')).slice(0, 1800);
const gapLines = read('00_System/Runtime State/GAP_REGISTER.md').split(/\r?\n/)
  .filter((line) => /^\|\s*G-\d+\s*\|/.test(line))
  .map((line) => line.split('|').slice(1, -1).map((x) => x.trim()))
  .filter((cols) => ['OPEN', 'IN_PROGRESS'].includes(cols[4]) && ['P0', 'P1'].includes(cols[1]));


const activeLoops = [];
const activeBase = path.join(vault, '40_Projects', 'Active');
const scanLoops = (dir, depth = 0) => {
  if (depth > 5 || !fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const d = path.join(dir, e.name);
    if (e.name === 'Agent Loop' && fs.existsSync(path.join(d, 'RUNTIME_STATE.json'))) {
      try {
        const st = JSON.parse(fs.readFileSync(path.join(d, 'RUNTIME_STATE.json'), 'utf8'));
        if (['ACTIVE', 'BLOCKED', 'PAUSED'].includes(st.loop_status)) activeLoops.push({ path: path.relative(vault, d).replaceAll('\\', '/'), state: st });
      } catch {}
    } else scanLoops(d, depth + 1);
  }
};
scanLoops(activeBase);

const git = spawnSync('git', ['status', '--short', '--branch'], {
  cwd: vault, encoding: 'utf8', timeout: 2500, windowsHide: true
});
const gitSnapshot = git.status === 0 ? git.stdout.trim().split(/\r?\n/).slice(0, 15).join('\n') : 'Git snapshot unavailable';

const lines = [
  'OMAR BRAIN LIVE SESSION SNAPSHOT',
  `Brain version: ${state.brain_version ?? 'unknown'}`,
  `Brain status: ${state.status ?? 'unknown'}`,
  `Session source: ${input.source ?? 'unknown'}`,
  `Current focus: ${state.current_focus ?? 'none'}`,
  `Active project: ${state.active_project_id ?? 'none'}`,
  `Next system action: ${state.next_system_action ?? 'not recorded'}`,
  '',
  'Current HOT context:',
  hot || '(empty)',
  '',
  `Open P0/P1 system gaps: ${gapLines.length}`,
  ...gapLines.slice(0, 8).map((g) => `- ${g[0]} ${g[1]}: ${g[2]} [${g[4]}]`),
  '',
  `Active Agent Loops: ${activeLoops.length}`,
  ...activeLoops.slice(0, 5).map((x) => `- ${x.state.project_id}: ${x.state.loop_status}; batch=${x.state.current_batch ?? 'none'}; next=${x.state.exact_next_action ?? 'unknown'}; path=${x.path}`),
  ...(activeLoops.length ? ['', 'Agentic fact: for a bound plan, read Runtime/CURRENT_CONTEXT.md first and execute only current_batch.'] : []),
  '',
  'Git snapshot:',
  gitSnapshot || '(clean/empty)',
  '',
  'Operating fact: every non-trivial request is routed through route-registry.json before edits; named projects are resolved through manifests; live software claims require repo inspection; completion claims require executed evidence.',
  'Use the minimum sufficient context. Do not load the whole vault.'
];

const output = {
  hookSpecificOutput: {
    hookEventName: 'SessionStart',
    additionalContext: lines.join('\n').slice(0, 9000),
    sessionTitle: input.session_title || `Omar Brain ${state.brain_version ?? ''}`.trim()
  }
};
process.stdout.write(JSON.stringify(output));
