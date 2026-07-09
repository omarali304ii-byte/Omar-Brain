#!/usr/bin/env node
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const vault=path.resolve(process.argv[2]||process.cwd());
const router=path.join(vault,'00_System','Automation','external-skill-route.mjs');
const hook=path.join(vault,'.claude','hooks','prompt-router.mjs');
const errors=[],warnings=[];

function route(query){
  const r=spawnSync(process.execPath,[router,vault,query,'--top','5','--json'],{encoding:'utf8'});
  if(r.status!==0)throw new Error(`router failed: ${r.stderr||r.stdout}`);
  return JSON.parse(r.stdout||'{}');
}
function promptContext(query){
  const r=spawnSync(process.execPath,[hook],{encoding:'utf8',input:JSON.stringify({prompt:query,session_id:'external-skill-routing-test'}),env:{...process.env,CLAUDE_PROJECT_DIR:vault}});
  if(r.status!==0)throw new Error(`prompt hook failed: ${r.stderr||r.stdout}`);
  return JSON.parse(r.stdout||'{}')?.hookSpecificOutput?.additionalContext||'';
}
const cases=[
  {name:'agent-loop-debug',q:'debug my Claude agent because it keeps looping and wasting tokens without progress',expect:['agent-introspection-debugging']},
  {name:'flutter',q:'fix Flutter Android build dependency conflict and Kotlin plugin errors',expect:['dart-flutter-patterns','flutter-dart-code-review']},
  {name:'postgres',q:'optimize PostgreSQL query indexes and inspect slow execution plan',expect:['postgres-patterns','sql-optimization-patterns','postgresql-table-design']},
  {name:'accessibility',q:'audit my React checkout for WCAG 2.2 keyboard navigation and screen reader issues',expect:['accessibility-compliance','frontend-a11y','screen-reader-testing','wcag-audit-patterns']}
];
for(const c of cases){
  try{const r=route(c.q);const top=r.candidates?.[0]?.directory||r.candidates?.[0]?.name||'';if(!c.expect.includes(top))errors.push(`${c.name}: unexpected top candidate ${top||'none'}`)}catch(e){errors.push(`${c.name}: ${e.message}`)}
}
try{
  const ctx=promptContext('write a friendly birthday message to my friend');
  if(!ctx.includes('- none; do not force-fit a skill'))errors.push('generic-writing: prompt hook should return no external skill candidate');
}catch(e){errors.push(`generic-writing: ${e.message}`)}
try{
  const ctx=promptContext('debug my Claude agent because it keeps looping and wasting tokens without progress');
  if(!ctx.includes('agent-introspection-debugging'))errors.push('prompt-agent-debug: expected agent-introspection-debugging injection');
}catch(e){errors.push(`prompt-agent-debug: ${e.message}`)}
console.log(`Routing cases: ${cases.length+2}`);console.log(`Errors: ${errors.length}`);console.log(`Warnings: ${warnings.length}`);
if(errors.length){console.log('\nERRORS');errors.forEach(e=>console.log(`- ${e}`))}
if(warnings.length){console.log('\nWARNINGS');warnings.forEach(e=>console.log(`- ${e}`))}
process.exit(errors.length?1:0);
