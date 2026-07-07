#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
import {ciPaths,loadRegistry,saveRegistry,resolveProject,sha256,slug,jaccard,id,now,dateOnly,appendEvent,appendProvenance,enqueueImpact} from './ci-lib.mjs';
const args=process.argv.slice(2); const vault=path.resolve(args[0]||process.cwd()); const get=(n,f='')=>{const i=args.indexOf(`--${n}`);return i>=0?args[i+1]:f}; const has=n=>args.includes(`--${n}`);
let text=get('text'); const inFile=get('file'); if(!text&&inFile)text=fs.readFileSync(path.resolve(inFile),'utf8');
if(!text){console.error('Usage: node brain-ingest.mjs <vault> --text "..." [--source terminal|chat|file] [--project id-or-alias] [--type failure|decision|idea|evidence|run|research|fact] [--commit]');process.exit(2)}
const source=get('source',inFile?'file':'manual'); const explicitType=get('type'); const lower=text.toLowerCase();
const classify=()=>explicitType||(/error|failed|exception|econnrefused|invalid_signature|target.*closed/.test(lower)?'failure':/decided|decision|choose|chosen/.test(lower)?'decision':/idea|what if|could build/.test(lower)?'idea':/test passed|verified|evidence|proof/.test(lower)?'evidence':/run completed|run failed|execution/.test(lower)?'run':/research|source|paper/.test(lower)?'research':'fact');
const type=classify(), contentHash=sha256(text.trim()), registry=loadRegistry(vault); const exact=(registry.objects||[]).find(o=>o.content_hash===contentHash);
const projectHint=get('project')||text; const resolution=resolveProject(vault,projectHint);
const probable=(registry.objects||[]).map(o=>({object_id:o.object_id,title:o.title||'',score:jaccard(text,`${o.title||''} ${o.summary||''}`)})).filter(x=>x.score>=0.55).sort((a,b)=>b.score-a.score).slice(0,5);
const destMap={idea:'15_Ideas/Incubator',research:'60_Knowledge/Research'}; let dest=destMap[type]||'01_Inbox/Connected Intelligence';
if(resolution.status==='resolved'){
  if(type==='run'&&resolution.project.learning?.runs)dest=resolution.project.learning.runs;
  else if(type==='evidence'&&resolution.project.learning?.evidence)dest=resolution.project.learning.evidence;
  else { const packet=resolution.project.canonical_packet_path; if(packet){const base=packet.replace(/\/$/,''); const sub={decision:'20_Decisions',failure:'60_Problems'}[type]; if(sub)dest=`${base}/${sub}`;} }
}
const plan={input_id:id('int'),source,type,content_hash:contentHash,project_resolution:resolution.status==='resolved'?{status:'resolved',project_id:resolution.project.project_id,title:resolution.project.title,method:resolution.method}:resolution,exact_duplicate:exact?{object_id:exact.object_id,canonical_path:exact.canonical_path}:null,probable_duplicates:probable,destination:dest,action:exact?'link-existing':resolution.status==='ambiguous'?'hold-for-resolution':'create-intake',commit_requested:has('commit')};
if(!has('commit')){console.log(JSON.stringify(plan,null,2));process.exit(0)}
if(exact){appendEvent(vault,{event_type:'information.duplicate_detected',object_id:exact.object_id,project_id:exact.project_id});console.log(JSON.stringify({...plan,committed:false,reason:'exact duplicate detected'},null,2));process.exit(0)}
if(resolution.status==='ambiguous'){console.error(JSON.stringify({...plan,committed:false,reason:'ambiguous project; refusing project-specific write'},null,2));process.exit(1)}
const objectId=id('obj-intake'), stamp=new Date().toISOString().replace(/[:.]/g,'-'), name=`${dateOnly()}-${slug(type+'-'+text.slice(0,60))}-${stamp.slice(11,19)}.md`; const rel=path.posix.join(dest,name); const abs=path.join(vault,...rel.split('/')); fs.mkdirSync(path.dirname(abs),{recursive:true});
const projectId=resolution.status==='resolved'?resolution.project.project_id:null;
const note=`---\ntype: project-note\nstatus: inbox\ncreated: ${dateOnly()}\nupdated: ${dateOnly()}\ntopics: [connected-intelligence, intake, ${type}]\nai_access: allowed\nobject_id: ${objectId}\nproject_id: ${projectId||''}\nverification_state: unverified-intake\nsource_type: ${JSON.stringify(source)}\n---\n# ${type[0].toUpperCase()+type.slice(1)} Intake\n\n## Raw information\n${text.trim()}\n\n## Routing\n- Project: ${projectId||'unresolved'}\n- Destination: ${rel}\n- Verification: unverified-intake\n\n## Required next control\nDedupe, contradiction and authority review before promotion to durable verified knowledge.\n`;
fs.writeFileSync(abs,note,'utf8');
registry.objects.push({object_id:objectId,object_type:'intake',title:`${type} intake`,canonical_path:rel,status:'inbox',authority:'contextual',verification_state:'unverified-intake',project_id:projectId,content_hash:contentHash,summary:text.trim().slice(0,240),created_at:now(),updated_at:now()}); saveRegistry(vault,registry);
const prov=appendProvenance(vault,{object_id:objectId,source_type:source,source_ref:inFile?path.resolve(inFile):'manual-input',authority:'contextual',verification_state:'unverified-intake'});
const evt=appendEvent(vault,{event_type:'information.ingested',object_id:objectId,project_id:projectId||undefined,payload:{information_type:type,canonical_path:rel,provenance_id:prov.provenance_id}});
if(projectId)enqueueImpact(vault,{source_object:objectId,project_id:projectId,reason:'new project-scoped intake requires impact review',affected_objects:[`obj-${projectId.slice(4)}`],actions:['review-project-truth','check-learning-relevance']});
console.log(JSON.stringify({...plan,committed:true,object_id:objectId,canonical_path:rel,event_id:evt.event_id},null,2));
