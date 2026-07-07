#!/usr/bin/env node
import {spawnSync} from 'node:child_process'; import path from 'node:path';
const vault=path.resolve(process.argv[2]||process.cwd()); const base=path.join(vault,'00_System','Automation');
const steps=[
 ['check-runtime-consistency.mjs',[vault]],
 ['check-navigation-connectivity.mjs',[vault]],
 ['check-skill-registry.mjs',[vault]],
 ['check-skill-connectivity.mjs',[vault]],
 ['brain-validator.mjs',[vault]],
 ['check-orphan-information.mjs',[vault]],
 ['check-causal-integrity.mjs',[vault]],
 ['experience-compile.mjs',[vault]],
 ['reality-coverage.mjs',[vault]],
 ['build-retrieval-manifest.mjs',[vault]],
 ['eval-retrieval.mjs',[vault]],
 ['brain-health.mjs',[vault]],
 ['reality-eval.mjs',[vault]]
];
let failed=false;for(const [script,args] of steps){console.log(`\n=== ${script} ===`);const r=spawnSync(process.execPath,[path.join(base,script),...args],{stdio:'inherit'});if(r.status!==0){failed=true;console.error(`${script} failed with ${r.status}`);}}
process.exit(failed?1:0);
