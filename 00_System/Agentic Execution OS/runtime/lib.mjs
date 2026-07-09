import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

export const RUNTIME_DIR = path.dirname(fileURLToPath(import.meta.url));
export const BRAIN_ROOT = path.resolve(RUNTIME_DIR, '..', '..', '..');
export const now = () => new Date().toISOString();
export const norm = (p) => String(p || '').replaceAll('\\', '/');
export const readJson = (p, fallback=null) => { try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch(e) { if (fallback !== null) return fallback; throw e; } };
export const writeJson = (p, v) => { fs.mkdirSync(path.dirname(p),{recursive:true}); fs.writeFileSync(p, JSON.stringify(v,null,2)+'\n'); };
export const appendJsonl = (p, v) => { fs.mkdirSync(path.dirname(p),{recursive:true}); fs.appendFileSync(p, JSON.stringify(v)+'\n'); };
export const readText = (p, fallback='') => { try { return fs.readFileSync(p,'utf8'); } catch { return fallback; } };
export const writeText = (p, v) => { fs.mkdirSync(path.dirname(p),{recursive:true}); fs.writeFileSync(p,v); };
export const sha256File = (p) => { const h=crypto.createHash('sha256'); h.update(fs.readFileSync(p)); return h.digest('hex'); };
export const safeId = (s) => String(s||'').replace(/[^a-zA-Z0-9_.-]/g,'_');
export const loopPaths = (loopDir) => {
  const d=path.resolve(loopDir);
  return {dir:d, goal:path.join(d,'FINAL_GOAL.json'), plan:path.join(d,'MASTER_PLAN.json'), state:path.join(d,'RUNTIME_STATE.json'), batches:path.join(d,'Batches'), runtime:path.join(d,'Runtime'), intelligence:path.join(d,'Intelligence'), ledgers:path.join(d,'Ledgers'), handoffs:path.join(d,'Handoffs'), reports:path.join(d,'Reports'), skips:path.join(d,'Skips'), context:path.join(d,'Runtime','CURRENT_CONTEXT.md')};
};
export function ensureLoopDirs(loopDir){ const p=loopPaths(loopDir); for(const k of ['batches','runtime','intelligence','ledgers','handoffs','reports','skips']) fs.mkdirSync(p[k],{recursive:true}); fs.mkdirSync(path.join(p.runtime,'CLAUDE_RUNS'),{recursive:true}); return p; }
export function loadLoop(loopDir){ const p=ensureLoopDirs(loopDir); return {p, goal:readJson(p.goal), plan:readJson(p.plan), state:readJson(p.state)}; }
export const batchContractPath = (p,id) => path.join(p.batches,id,'CONTRACT.json');
export const loadContract = (p,id) => readJson(batchContractPath(p,id));
export function gitSnapshot(repo){
  if(!repo || !fs.existsSync(repo)) return {available:false, reason:'repo_missing', repo_path:repo||null};
  const run=(args)=>spawnSync('git',args,{cwd:repo,encoding:'utf8',timeout:5000,windowsHide:true});
  const head=run(['rev-parse','HEAD']); const branch=run(['branch','--show-current']); const status=run(['status','--porcelain']);
  if(head.status!==0) return {available:false,reason:'not_git_repo',repo_path:repo};
  const lines=String(status.stdout||'').split(/\r?\n/).filter(Boolean);
  const files=lines.map(l=>l.slice(3).trim()).filter(Boolean);
  return {available:true,repo_path:repo,revision:head.stdout.trim(),branch:branch.stdout.trim(),dirty:lines.length>0,status_lines:lines,changed_files:files,observed_at:now()};
}
export function globToRegExp(glob){
  let s=norm(glob).replace(/[.+^${}()|[\]\\]/g,'\\$&');
  s=s.replace(/\*\*/g,'§§DOUBLE§§').replace(/\*/g,'[^/]*').replace(/\?/g,'[^/]').replace(/§§DOUBLE§§/g,'.*');
  return new RegExp('^'+s+'$','i');
}
export const matchesAny=(file,patterns=[])=>patterns.some(p=>globToRegExp(p).test(norm(file)));
export function resolveCwd(value, repo){ if(!value || value==='repo') return repo; if(value==='brain') return BRAIN_ROOT; if(path.isAbsolute(value)) return value; return path.resolve(repo||BRAIN_ROOT,value); }
export function runCheck(check, repo){
  const cwd=resolveCwd(check.cwd,repo); const started=Date.now();
  if(!cwd || !fs.existsSync(cwd)) return {id:check.id,required:check.required!==false,passed:false,reason:'cwd_missing',cwd,command:check.command,duration_ms:0};
  const r=spawnSync(check.command,{cwd,encoding:'utf8',shell:true,timeout:check.timeout_ms||120000,windowsHide:true,maxBuffer:5*1024*1024});
  const out=String(r.stdout||''); const err=String(r.stderr||'');
  return {id:check.id,required:check.required!==false,passed:r.status===0 && !r.error,exit_code:r.status,signal:r.signal||null,error:r.error?.message||null,cwd,command:check.command,duration_ms:Date.now()-started,stdout_tail:out.slice(-5000),stderr_tail:err.slice(-5000),checked_at:now()};
}
export function transition(loopDir,state,to,extra={}){
  const p=loopPaths(loopDir); const from=state.current_batch ? state.batch_states?.[state.current_batch]?.status : state.loop_status;
  if(state.current_batch && state.batch_states?.[state.current_batch]) Object.assign(state.batch_states[state.current_batch],{status:to,updated_at:now()},extra);
  else Object.assign(state,{loop_status:to,updated_at:now()},extra);
  appendJsonl(path.join(p.ledgers,'TRANSITIONS.jsonl'),{at:now(),project_id:state.project_id,batch_id:state.current_batch||null,from,to,...extra});
  writeJson(p.state,state); return state;
}
export function eligibleBatch(plan,state){
  for(const b of plan.batches||[]){
    const bs=state.batch_states?.[b.id]; if(!bs || !['PENDING','READY'].includes(bs.status)) continue;
    const deps=b.depends_on||[]; const ok=deps.every(id=>{
      const dep=state.batch_states?.[id]; if(!dep) return false;
      if(dep.status==='DONE') return true;
      const db=(plan.batches||[]).find(x=>x.id===id); return dep.status==='SKIPPED' && db && db.required===false && db.skip_satisfies_dependency===true;
    });
    if(ok) return b;
  }
  return null;
}
export function parseArgs(argv){ const out={_:[]}; for(let i=0;i<argv.length;i++){ const a=argv[i]; if(a.startsWith('--')){ const k=a.slice(2); const n=argv[i+1]; if(n && !n.startsWith('--')){out[k]=n;i++;} else out[k]=true; } else out._.push(a); } return out; }
export function bindingPath(session){ const dir=path.join(os.tmpdir(),'omar-brain-agent-loop-bindings'); fs.mkdirSync(dir,{recursive:true}); return path.join(dir,`${safeId(session||'unknown')}.json`); }
export function findActiveLoops(base=path.join(BRAIN_ROOT,'40_Projects','Active')){
  const hits=[]; const walk=(d,depth=0)=>{ if(depth>5||!fs.existsSync(d)) return; for(const e of fs.readdirSync(d,{withFileTypes:true})){ if(!e.isDirectory()) continue; const p=path.join(d,e.name); if(e.name==='Agent Loop' && fs.existsSync(path.join(p,'RUNTIME_STATE.json'))){ const s=readJson(path.join(p,'RUNTIME_STATE.json'),{}); if(['ACTIVE','BLOCKED','PAUSED'].includes(s.loop_status)) hits.push({loop_dir:p,state:s}); } else walk(p,depth+1); }}; walk(base); return hits;
}
export function relativeRepoPath(repo,abs){ if(!repo) return norm(abs); const r=path.relative(repo,abs); return r.startsWith('..')?norm(abs):norm(r); }
