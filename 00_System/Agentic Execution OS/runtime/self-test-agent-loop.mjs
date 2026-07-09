#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'omar-agent-loop-deep-test-'));
const repo = path.join(tmp, 'repo');
const loop = path.join(tmp, 'Agent Loop');
const specPath = path.join(tmp, 'spec.json');
const fail = (m) => { throw new Error(m); };
const run = (script, args, expect = 0) => {
  const r = spawnSync(process.execPath, [path.join(here, script), ...args], { encoding: 'utf8', timeout: 120000, windowsHide: true });
  if (r.status !== expect) fail(`${script} expected ${expect}, got ${r.status}: ${(r.stderr || r.stdout || '').slice(-2500)}`);
  return r;
};

try {
  fs.mkdirSync(path.join(repo, 'src'), { recursive: true });
  fs.writeFileSync(path.join(repo, 'src', 'a.txt'), 'ok\n');
  for (const args of [['init'], ['config', 'user.email', 'test@example.com'], ['config', 'user.name', 'Test'], ['add', '.'], ['commit', '-m', 'init']]) {
    const r = spawnSync('git', args, { cwd: repo, encoding: 'utf8', windowsHide: true });
    if (r.status !== 0) fail(`git ${args.join(' ')} failed: ${r.stderr}`);
  }
  const nodePass = `${JSON.stringify(process.execPath)} -e "process.exit(0)"`;
  const spec = {
    project: { project_id: 'prj-agent-loop-self-test', title: 'Agent Loop Self Test', repo_path: repo },
    final_goal: { goal_id: 'goal-self-test', objective: 'prove pass, fail, retry, handoff, and final gate', success_criteria: ['both batches done'], verification: [{ id: 'final', command: nodePass, cwd: 'repo', required: true }] },
    policy: { context_char_budget: 5000, max_batch_attempts: 3 },
    batches: [
      { id: 'B001', title: 'Pass batch', objective: 'pass', depends_on: [], required: true, skippable: false, read_first: ['src/a.txt'], scope: { allowed: ['src/**'], forbidden: [] }, acceptance_criteria: [{ id: 'ac1', text: 'check passes', proof_refs: ['check:ok'] }], verification: [{ id: 'ok', command: nodePass, cwd: 'repo', required: true }] },
      { id: 'B002', title: 'Repair batch', objective: 'fail once then repair', depends_on: ['B001'], required: true, skippable: false, read_first: ['src/a.txt'], scope: { allowed: ['src/**'], forbidden: [] }, acceptance_criteria: [{ id: 'ac2', text: 'flag exists', proof_refs: ['artifact:src/flag.txt'] }], verification: [], required_artifacts: [{ path: 'src/flag.txt', cwd: 'repo', required: true }] }
    ]
  };
  fs.writeFileSync(specPath, JSON.stringify(spec));
  run('plan-compiler.mjs', [specPath, loop]);
  run('validate-agent-loop.mjs', [loop]);
  run('agent-loop.mjs', ['boot', loop]);
  run('agent-loop.mjs', ['verify', loop]);
  run('agent-loop.mjs', ['boot', loop]);
  run('agent-loop.mjs', ['verify', loop], 1);
  run('agent-loop.mjs', ['boot', loop, '--retry']);
  fs.writeFileSync(path.join(repo, 'src', 'flag.txt'), 'fixed\n');
  run('agent-loop.mjs', ['verify', loop]);
  run('agent-loop.mjs', ['final', loop]);
  run('validate-agent-loop.mjs', [loop]);
  const st = JSON.parse(fs.readFileSync(path.join(loop, 'RUNTIME_STATE.json'), 'utf8'));
  if (st.loop_status !== 'COMPLETE') fail(`expected COMPLETE, got ${st.loop_status}`);
  if (st.batch_states.B001.status !== 'DONE' || st.batch_states.B002.status !== 'DONE') fail('batches not DONE');
  if (st.batch_states.B002.attempts !== 2) fail(`expected B002 attempts=2, got ${st.batch_states.B002.attempts}`);
  for (const f of ['B001.md', 'B002.md']) if (!fs.existsSync(path.join(loop, 'Handoffs', f))) fail(`missing handoff ${f}`);
  const failureLines = fs.readFileSync(path.join(loop, 'Ledgers', 'FAILURES.jsonl'), 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
  if (!failureLines.some(x => x.status === 'OPEN') || !failureLines.some(x => x.status === 'RESOLVED')) fail('failure lifecycle not recorded');
  const context = fs.readFileSync(path.join(loop, 'Runtime', 'CURRENT_CONTEXT.md'), 'utf8');
  if (context.length > 5500) fail(`context budget exceeded: ${context.length}`);
  console.log(JSON.stringify({ ok: true, loop_status: st.loop_status, B001: st.batch_states.B001.status, B002: st.batch_states.B002.status, B002_attempts: st.batch_states.B002.attempts, context_chars: context.length, failure_events: failureLines.length }, null, 2));
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
