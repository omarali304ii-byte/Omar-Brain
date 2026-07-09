#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
const [projectPath, agentName, jsonFile]=process.argv.slice(2);
if(!projectPath||!agentName||!jsonFile){console.error('Usage: node record-learning-candidate.mjs <projectPath> <agentName> <candidate.json>');process.exit(1)}
let c; try{c=JSON.parse(fs.readFileSync(jsonFile,'utf8'))}catch(e){console.error(`Invalid candidate JSON: ${e.message}`);process.exit(2)}
for(const k of ['candidate_id','observation','possible_rule','trigger','applicability_boundary','evidence']) if(c[k]===undefined){console.error(`Missing ${k}`);process.exit(3)}
c.origin_agent=c.origin_agent||agentName; c.status=c.status||'proposed'; c.recorded_at=new Date().toISOString();
const out=path.resolve(process.cwd(),projectPath,'20_Agent_Council','Runtime','LEARNING_EVENTS.jsonl'); fs.mkdirSync(path.dirname(out),{recursive:true}); fs.appendFileSync(out,JSON.stringify(c)+'\n'); console.log(`Recorded ${c.candidate_id}`);
