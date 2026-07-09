#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';

let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch {}
const session = String(input.session_id || 'unknown').replace(/[^a-zA-Z0-9_-]/g, '_');
const rawPath = input?.tool_input?.file_path || input?.tool_input?.path || input?.tool_input?.notebook_path;
if (!rawPath) process.exit(0);
const dir = path.join(os.tmpdir(), 'omar-brain-claude-tracker');
const file = path.join(dir, `${session}.json`);
fs.mkdirSync(dir, { recursive: true });
let state = { touched: [] };
try { state = JSON.parse(fs.readFileSync(file, 'utf8')); } catch {}
const abs = path.resolve(rawPath);
if (!state.touched.includes(abs)) state.touched.push(abs);
state.updated_at = new Date().toISOString();
fs.writeFileSync(file, JSON.stringify(state, null, 2));


// If this session is bound to an Agent Loop, persist an append-only edit event and refresh exact file hash intelligence.
try {
  const bindingFile = path.join(os.tmpdir(), 'omar-brain-agent-loop-bindings', `${session}.json`);
  if (fs.existsSync(bindingFile)) {
    const binding = JSON.parse(fs.readFileSync(bindingFile, 'utf8'));
    const loopDir = path.resolve(binding.loop_dir);
    const statePath = path.join(loopDir, 'RUNTIME_STATE.json');
    const goalPath = path.join(loopDir, 'FINAL_GOAL.json');
    if (fs.existsSync(statePath) && fs.existsSync(goalPath)) {
      const st = JSON.parse(fs.readFileSync(statePath, 'utf8'));
      const goal = JSON.parse(fs.readFileSync(goalPath, 'utf8'));
      const repo = goal.project?.repo_path ? path.resolve(goal.project.repo_path) : null;
      const rel = repo && !path.relative(repo, abs).startsWith('..') ? path.relative(repo, abs).replaceAll('\\', '/') : abs.replaceAll('\\', '/');
      let hash = null, size = null;
      if (fs.existsSync(abs) && fs.statSync(abs).isFile()) {
        const h = crypto.createHash('sha256'); h.update(fs.readFileSync(abs)); hash = h.digest('hex'); size = fs.statSync(abs).size;
      }
      const event = { at: new Date().toISOString(), project_id: st.project_id, batch_id: st.current_batch || binding.batch_id || null, session_id: input.session_id || 'unknown', tool: input.tool_name || 'unknown', path: rel, absolute_path: abs.replaceAll('\\', '/'), exists: fs.existsSync(abs), hash, size_bytes: size };
      const ledger = path.join(loopDir, 'Ledgers', 'EDIT_EVENTS.jsonl'); fs.mkdirSync(path.dirname(ledger), { recursive: true }); fs.appendFileSync(ledger, JSON.stringify(event) + '\n');
      const idxPath = path.join(loopDir, 'Intelligence', 'file-index.json'); let idx = { version: '1.0', project_id: st.project_id, repo_path: repo, files: {} };
      try { idx = JSON.parse(fs.readFileSync(idxPath, 'utf8')); } catch {}
      idx.files ||= {}; const prev = idx.files[rel] || {};
      idx.files[rel] = { ...prev, path: rel, exists: fs.existsSync(abs), hash, size_bytes: size, last_changed_by_batch: event.batch_id, last_edit_at: event.at, summary: prev.summary_for_hash === hash ? prev.summary : null, summary_for_hash: prev.summary_for_hash === hash ? hash : null, summary_stale: Boolean(prev.summary && prev.summary_for_hash !== hash) };
      idx.updated_at = event.at; fs.mkdirSync(path.dirname(idxPath), { recursive: true }); fs.writeFileSync(idxPath, JSON.stringify(idx, null, 2) + '\n');
    }
  }
} catch {}
