#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
import {resolveProject,loadRegistry,ciPaths,readJsonl,jaccard} from './ci-lib.mjs';
const args=process.argv.slice(2); const vault=path.resolve(args[0]||process.cwd()); const query=args.slice(1).join(' ').trim(); if(!query){console.error('Usage: node context-plan.mjs <vault> "request"');process.exit(2)}
const resolution=resolveProject(vault,query), registry=loadRegistry(vault), edges=readJsonl(ciPaths(vault).edges); const items=[];
if(resolution.status==='resolved'){
  const po=(registry.objects||[]).find(o=>o.project_id===resolution.project.project_id&&o.object_type==='project'); if(po)items.push({object_id:po.object_id,path:po.canonical_path,why_included:'exact project identity and manifest',authority:po.authority,verification_state:po.verification_state});
  for(const o of (registry.objects||[]).filter(x=>x.project_id===resolution.project.project_id&&x.object_type!=='project').sort((a,b)=>jaccard(query,b.summary||b.title||'')-jaccard(query,a.summary||a.title||'')).slice(0,5))items.push({object_id:o.object_id,path:o.canonical_path,why_included:'project-scoped object relevant to request',authority:o.authority,verification_state:o.verification_state});
}
const system=[
 ['00_System/Connected Intelligence OS/Query Planning Protocol.md','query planning and context inclusion rules'],
 ['00_System/Operating Map.md','global startup and route authority']
];
for(const [p,why] of system)if(fs.existsSync(path.join(vault,...p.split('/'))))items.push({path:p,why_included:why,authority:'canonical',verification_state:'system-contract'});
const plan={request:query,project_resolution:resolution.status==='resolved'?{status:'resolved',project_id:resolution.project.project_id,title:resolution.project.title}:resolution,primary_route:resolution.status==='resolved'?'route-project-resume':'route-start',context_items:items,notes:resolution.status==='ambiguous'?['Project alias is ambiguous; do not perform project-specific writes.']:[]};
console.log(JSON.stringify(plan,null,2));
