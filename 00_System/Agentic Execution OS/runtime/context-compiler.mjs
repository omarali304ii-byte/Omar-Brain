#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadLoop,loadContract,readJson,readText,writeText,now,norm} from './lib.mjs';
import {refreshRepoIntelligence} from './repo-intelligence.mjs';
const clip=(s,n)=>String(s||'').length>n?String(s).slice(0,n)+`\n...[trimmed ${String(s).length-n} chars]`:String(s||'');
export function compileContext(loopDir,batchId=null){
 const {p,goal,plan,state}=loadLoop(loopDir); const id=batchId||state.current_batch; if(!id) throw new Error('No active batch. Run agent-loop boot first.'); const c=loadContract(p,id); const {repoState}=refreshRepoIntelligence(loopDir,id); const idx=readJson(path.join(p.intelligence,'file-index.json'),{files:{}}); const budget=Number(plan.policy?.context_char_budget||12000);
 const deps=(c.depends_on||[]).map(d=>({id:d,status:state.batch_states?.[d]?.status,handoff:clip(readText(path.join(p.handoffs,`${d}.md`),'(no handoff)'),1400)}));
 const failureEvents=readText(path.join(p.ledgers,'FAILURES.jsonl'),'').split(/\r?\n/).filter(Boolean).map(x=>{try{return JSON.parse(x)}catch{return null}}).filter(Boolean); const resolvedFailures=new Set(failureEvents.filter(x=>x.status==='RESOLVED').map(x=>x.resolves_failure_id||x.failure_id).filter(Boolean)); const failures=failureEvents.filter(x=>x.batch_id===id&&x.status!=='RESOLVED'&&!resolvedFailures.has(x.failure_id)).slice(-5);
 const fileLines=[...(c.read_first||[]),...(c.relevant_files||[])].filter((v,i,a)=>a.indexOf(v)===i).map(f=>{const e=idx.files?.[norm(f)]; const status=!e?'unknown':!e.exists?'missing':e.summary&&e.summary_for_hash===e.hash?`hash=${e.hash.slice(0,10)} cached-summary=${clip(e.summary,350)}`:`hash=${e.hash?.slice(0,10)||'unknown'} summary=READ_REQUIRED`; return `- ${f} :: ${status}`;});
 const checks=(c.verification||[]).map(v=>`- ${v.id}: ${v.command} [cwd=${v.cwd||'repo'} required=${v.required!==false}]`);
 const criteria=(c.acceptance_criteria||[]).map(a=>`- ${a.id}: ${a.text} :: proof ${JSON.stringify(a.proof_refs||[])}`);
 let sections=[
 '# OMAR BRAIN — ACTIVE BATCH CONTEXT CAPSULE',
 `Generated: ${now()}`,
 '', '## Non-negotiable execution rule','Work only this batch. Do not explore the whole Brain or whole repository. Start with exact paths below, expand only when evidence requires it. External verification, not prose, decides completion.',
 '', '## Final goal',goal.objective||'', ...(goal.success_criteria||[]).slice(0,8).map(x=>`- ${x}`),
 '', '## Project',`- project_id: ${state.project_id}`,`- repo: ${goal.project?.repo_path||'(missing)'}`,`- observed revision: ${repoState.revision||'(unavailable)'}`,`- branch: ${repoState.branch||'(unavailable)'}`,`- repo dirty: ${repoState.dirty??'unknown'}`,
 '', '## Active batch',`- id: ${id}`,`- title: ${c.title}`,`- objective: ${c.objective}`,`- attempt: ${state.batch_states?.[id]?.attempts||0}`,`- state: ${state.batch_states?.[id]?.status}`,`- exact next action: ${state.exact_next_action||'execute batch'}`,
 '', '## Scope',`Allowed: ${JSON.stringify(c.scope?.allowed||[])}`,`Forbidden: ${JSON.stringify(c.scope?.forbidden||[])}`,
 '', '## Acceptance criteria',...criteria,
 '', '## Read first / known relevant files',...(fileLines.length?fileLines:['- No exact files recorded. Perform bounded discovery inside discovery_roots only.',`- discovery_roots: ${JSON.stringify(c.discovery_roots||[])}`]),
 '', '## Dependency handoffs',...(deps.length?deps.flatMap(d=>[`### ${d.id} [${d.status}]`,d.handoff]):['- none']),
 '', '## Open failures for this batch',...(failures.length?failures.map(f=>`- ${f.failure_id||'failure'}: ${f.signature||f.reason||'unknown'} [${f.status||'OPEN'}]`):['- none']),
 '', '## Verification that will decide PASS',...checks,...(c.required_artifacts||[]).map(a=>`- required artifact: ${typeof a==='string'?a:a.path}`),
 '', '## Rules by pointer — load only when needed','- CLAUDE.md','- .claude/rules/10-project-execution.md','- .claude/rules/15-agentic-plan-execution.md','- 00_System/Agentic Execution OS/Batch State Machine and Gates.md',
 '', '## Exit behavior','- Do not mark DONE yourself.','- If implementation is ready, let the verifier run.','- If blocked, record exact blocker and exact next action.','- If a check fails, preserve signature, repair the root cause, and re-run original proof.'
 ];
 let text=sections.join('\n'); if(text.length>budget){ const fixed=text.split('## Dependency handoffs')[0]; const tail=text.includes('## Verification that will decide PASS')?'## Verification that will decide PASS'+text.split('## Verification that will decide PASS')[1]:''; text=clip(fixed,Math.floor(budget*.72))+'\n\n## Dependency handoffs\n- Trimmed to preserve token budget; open exact handoff only if dependency evidence is needed.\n\n'+clip(tail,Math.floor(budget*.27)); }
 text=text.slice(0,budget)+`\n\n---\nContext budget: ${budget} chars; emitted: ${Math.min(text.length,budget)} chars; estimated tokens: ~${Math.ceil(Math.min(text.length,budget)/4)}.\n`;
 writeText(p.context,text); return {context_path:p.context,batch_id:id,chars:text.length,estimated_tokens:Math.ceil(text.length/4),repo_state:repoState};
}
if(process.argv[1] && path.resolve(process.argv[1])===path.resolve(fileURLToPath(import.meta.url))){const loop=process.argv[2],id=process.argv[3]||null;if(!loop){console.error('Usage: node context-compiler.mjs <Agent Loop dir> [batch-id]');process.exit(2);}console.log(JSON.stringify(compileContext(loop,id),null,2));}
