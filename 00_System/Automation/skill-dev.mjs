#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path'; const args=process.argv.slice(2);const vault=path.resolve(args.shift()||process.cwd());const cmd=args.shift()||'list';const p=path.join(vault,'00_System','Skill OS','skill-candidates.json');const r=JSON.parse(fs.readFileSync(p,'utf8'));
function val(flag,def=null){const i=args.indexOf(flag);return i>=0?args[i+1]:def}
if(cmd==='list'){console.log(JSON.stringify(r,null,2));process.exit(0)}
if(cmd!=='propose'){console.error('Usage: skill-dev.mjs <vault> list | propose "Name" --category X --reason "..."');process.exit(2)}
const name=args[0];if(!name){console.error('Candidate name required');process.exit(2)} const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');const id=`candidate-${slug}`;
if(r.candidates.some(x=>x.candidate_id===id)){console.error('Candidate already exists');process.exit(1)}
r.candidates.push({candidate_id:id,name,category:val('--category','Other'),reason:val('--reason','unmatched or repeated capability need'),status:'S0_DISCOVERED',created:new Date().toISOString(),dedup_status:'PENDING',provenance_status:'PENDING',contract_status:'PENDING',sandbox_status:'PENDING'});r.updated=new Date().toISOString();fs.writeFileSync(p,JSON.stringify(r,null,2)+'\n');console.log(`Proposed ${id}. Not active. Next: deduplicate and build evidence-backed contract.`);
