#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadLoop,loadContract,writeJson,readJson,sha256File,gitSnapshot,now,norm} from './lib.mjs';
export function refreshRepoIntelligence(loopDir,batchId=null){
  const {p,goal,state}=loadLoop(loopDir); const repo=goal.project?.repo_path; const git=gitSnapshot(repo); const old=readJson(path.join(p.intelligence,'file-index.json'),{files:{}}); const files={...old.files};
  const ids=batchId?[batchId]:Object.keys(state.batch_states||{}); const targets=new Set();
  for(const id of ids){ let c; try{c=loadContract(p,id);}catch{continue;} for(const f of [...(c.read_first||[]),...(c.relevant_files||[])]) targets.add(f); }
  for(const rel of targets){ const abs=path.isAbsolute(rel)?rel:path.resolve(repo||'',rel); const key=norm(rel); if(!repo||!fs.existsSync(abs)||!fs.statSync(abs).isFile()){files[key]={...(files[key]||{}),path:key,exists:false,last_checked_at:now()};continue;} const hash=sha256File(abs),st=fs.statSync(abs),prev=files[key]||{}; files[key]={...prev,path:key,exists:true,hash,size_bytes:st.size,mtime:new Date(st.mtimeMs).toISOString(),last_checked_at:now(),summary:prev.summary_for_hash===hash?prev.summary:null,summary_for_hash:prev.summary_for_hash===hash?hash:null,summary_stale:Boolean(prev.summary&&prev.summary_for_hash!==hash)}; }
  const repoState={...git,project_id:state.project_id,updated_at:now()}; writeJson(path.join(p.intelligence,'repo-state.json'),repoState); writeJson(path.join(p.intelligence,'file-index.json'),{version:'1.0',project_id:state.project_id,repo_path:repo||null,updated_at:now(),files}); return {repoState,fileIndex:{files}};
}
if(process.argv[1] && path.resolve(process.argv[1])===path.resolve(fileURLToPath(import.meta.url))){ const loopDir=process.argv[2],batch=process.argv[3]||null;if(!loopDir){console.error('Usage: node repo-intelligence.mjs <Agent Loop dir> [batch-id]');process.exit(2);} console.log(JSON.stringify(refreshRepoIntelligence(loopDir,batch),null,2)); }
