#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const vault = path.resolve(process.env.CLAUDE_PROJECT_DIR || path.join(scriptDir, '..', '..'));
let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch {}
const session = String(input.session_id || 'unknown').replace(/[^a-zA-Z0-9_-]/g, '_');
const tracker = path.join(os.tmpdir(), 'omar-brain-claude-tracker', `${session}.json`);
let touched = [];
try { touched = JSON.parse(fs.readFileSync(tracker, 'utf8')).touched || []; } catch {}

// Persistent Agent Loop gate. Bound full-loop sessions may not stop between unfinished batches.
const bindingFile = path.join(os.tmpdir(), 'omar-brain-agent-loop-bindings', `${session}.json`);
let binding = null;
try { binding = JSON.parse(fs.readFileSync(bindingFile, 'utf8')); } catch {}
if (binding && process.env.OMAR_AGENT_LOOP_HEADLESS !== '1' && !input.stop_hook_active) {
  try {
    const loopDir = path.resolve(binding.loop_dir);
    const state = JSON.parse(fs.readFileSync(path.join(loopDir, 'RUNTIME_STATE.json'), 'utf8'));
    const plan = JSON.parse(fs.readFileSync(path.join(loopDir, 'MASTER_PLAN.json'), 'utf8'));
    const current = state.current_batch;
    const currentState = current ? state.batch_states?.[current]?.status : null;
    const unfinishedStates = new Set(['BOOTING','RUNNING','VERIFYING','FAILED_VERIFICATION','REPAIRING']);
    if (current && unfinishedStates.has(currentState)) {
      const reason = [
        `Omar Agent Loop stop gate: ${current} is ${currentState}, not complete.`,
        `Exact next action: ${state.exact_next_action || 'continue current batch'}`,
        `Read ${path.join(loopDir, 'Runtime', 'CURRENT_CONTEXT.md')} first.`,
        `Run machine verification with: node \"00_System/Agentic Execution OS/runtime/agent-loop.mjs\" verify \"${loopDir}\"`,
        'If verification fails, repair the same batch. If genuinely blocked, record an exact blocker with the agent-loop block command.'
      ].join('\n');
      process.stdout.write(JSON.stringify({ decision: 'block', reason, hookSpecificOutput: { hookEventName: 'Stop', additionalContext: reason } }));
      process.exit(0);
    }
    if (binding.mode === 'full-loop' && state.loop_status === 'ACTIVE') {
      const next = (plan.batches || []).find((b) => {
        const bs = state.batch_states?.[b.id];
        if (!bs || !['PENDING','READY'].includes(bs.status)) return false;
        return (b.depends_on || []).every((d) => state.batch_states?.[d]?.status === 'DONE');
      });
      const requiredOpen = (plan.batches || []).filter((b) => b.required && state.batch_states?.[b.id]?.status !== 'DONE');
      let reason = null;
      if (next) reason = `Omar Agent Loop stop gate: ${next.id} is the next dependency-eligible batch. Boot it and continue; do not stop between batches in full-loop mode.`;
      else if (!requiredOpen.length) reason = 'Omar Agent Loop stop gate: all required batches are done but the final goal gate has not passed. Run agent-loop final.';
      if (reason) {
        process.stdout.write(JSON.stringify({ decision: 'block', reason, hookSpecificOutput: { hookEventName: 'Stop', additionalContext: reason } }));
        process.exit(0);
      }
    }
  } catch {}
}

const rels = touched.map((p) => path.relative(vault, p).replaceAll('\\', '/'));
const needsBrainGate = rels.some((r) => r === 'CLAUDE.md' || r.startsWith('.claude/') || r.startsWith('00_System/'));
if (!needsBrainGate) {
  try { fs.unlinkSync(tracker); } catch {}
  process.exit(0);
}

const checks = [
  ['00_System/Automation/brain-validator.mjs', '.'],
  ['00_System/Automation/check-agentic-execution-runtime.mjs', '.'],
  ['00_System/Automation/check-runtime-consistency.mjs', '.'],
  ['00_System/Automation/check-navigation-connectivity.mjs', '.']
];
const failures = [];
for (const [script, arg] of checks) {
  const r = spawnSync(process.execPath, [script, arg], { cwd: vault, encoding: 'utf8', timeout: 45000, windowsHide: true });
  if (r.status !== 0) failures.push({ script, output: `${r.stdout || ''}\n${r.stderr || ''}`.trim().slice(-3500) });
}

if (failures.length) {
  const reason = [
    'Omar Brain stop gate: control-plane changes are not valid yet.',
    ...failures.map((f) => `\n[${f.script}]\n${f.output}`),
    '\nRepair root causes and re-run the failing validation before stopping.'
  ].join('\n').slice(0, 9000);
  process.stdout.write(JSON.stringify({
    decision: 'block',
    reason,
    hookSpecificOutput: {
      hookEventName: 'Stop',
      additionalContext: reason
    }
  }));
  process.exit(0);
}

try { fs.unlinkSync(tracker); } catch {}
process.exit(0);
