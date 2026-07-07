#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
const args=process.argv.slice(2); const get=(n,f='')=>{const i=args.indexOf(`--${n}`);return i>=0?args[i+1]:f};
const vault=path.resolve(get('vault',process.cwd())); const title=get('title'); const status=get('status','completed-with-warnings'); const project=get('project','');
if(!title){console.error('Usage: node new-episode.mjs --title "..." [--project "[[Project X]]"] [--status ...]');process.exit(2)}
const now=new Date(); const iso=now.toISOString(); const day=iso.slice(0,10); const y=iso.slice(0,4), mon=iso.slice(5,7); const id='ep-'+day.replaceAll('-','')+'-'+crypto.randomBytes(4).toString('hex');
const safe=title.replace(/[<>:"/\\|?*]+/g,'-').slice(0,80); const dir=path.join(vault,'85_Episodes',y,mon); fs.mkdirSync(dir,{recursive:true}); const file=path.join(dir,`EP - ${iso.replace(/[:.]/g,'-')} - ${safe}.md`);
const projects=project?`[${JSON.stringify(project)}]`:'[]';
const body=`---\ntype: episode\nstatus: ${status}\ncreated: ${day}\nupdated: ${day}\nmemory_class: episodic\nepisode_id: ${id}\nrun_id:\nthread_id:\nstarted_at: ${iso}\nended_at: ${iso}\nagents: []\ntools_used: []\nprojects: ${projects}\nartifacts: []\nretrieval_keys: []\nhuman_feedback: none\npromote_candidates: []\nai_access: restricted\n---\n# ${title}\n\n## Goal\n\n## Initial state\n\n## Context loaded\n\n## Plan / task graph\n\n## Actions and tools\n\n## Decisions\n\n## Failures and repair attempts\n\n## Verification evidence\n\n## Outcome\n\n## Candidate lessons\n\n## Exact next action\n`;
fs.writeFileSync(file,body,{flag:'wx'}); console.log(file); console.log(id);
