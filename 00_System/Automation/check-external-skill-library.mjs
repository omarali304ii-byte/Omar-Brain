#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const vault=path.resolve(process.argv[2]||process.cwd());
const fullPath=path.join(vault,'50_Skills','Claude Skill Library','registry','skill-catalog.json');
const minPath=path.join(vault,'50_Skills','Claude Skill Library','registry','skill-catalog.min.json');
const manifestPath=path.join(vault,'00_System','Skill OS','external-skill-library.json');
const payloadPath=path.join(vault,'50_Skills','Claude Skill Library','registry','payload-manifest.json');
const errors=[],warnings=[];
let full,min,manifest,payload;
try{full=JSON.parse(fs.readFileSync(fullPath,'utf8'))}catch(e){errors.push(`invalid full catalog: ${e.message}`)}
try{min=JSON.parse(fs.readFileSync(minPath,'utf8'))}catch(e){errors.push(`invalid compact catalog: ${e.message}`)}
try{manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'))}catch(e){errors.push(`invalid library manifest: ${e.message}`)}
try{payload=JSON.parse(fs.readFileSync(payloadPath,'utf8'))}catch(e){errors.push(`invalid payload manifest: ${e.message}`)}
if(!full||!min||!manifest||!payload){console.log(`External skills: 0\nErrors: ${errors.length}\nWarnings: ${warnings.length}`);errors.forEach(e=>console.log(`- ${e}`));process.exit(1)}
const ids=new Set(),names=new Set(),paths=new Set();
for(const s of full.skills||[]){
  if(!s.skill_id)errors.push('missing skill_id'); else if(ids.has(s.skill_id))errors.push(`duplicate skill_id ${s.skill_id}`); else ids.add(s.skill_id);
  const nk=String(s.name||'').toLowerCase(); if(!nk)errors.push(`${s.skill_id}: missing name`); else if(names.has(nk))warnings.push(`duplicate display name ${s.name}`); else names.add(nk);
  if(!s.path)errors.push(`${s.skill_id}: missing path`); else {
    if(paths.has(s.path))errors.push(`duplicate path ${s.path}`); paths.add(s.path);
    const abs=path.resolve(vault,s.path); if(!abs.startsWith(vault+path.sep))errors.push(`${s.skill_id}: path escapes vault`);
    else if(!fs.existsSync(abs))errors.push(`${s.skill_id}: missing ${s.path}`);
    else {const h=crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex'); if(h!==s.sha256)errors.push(`${s.skill_id}: hash mismatch ${s.path}`)}
  }
  if(!['low','medium','high'].includes(s.risk_level))warnings.push(`${s.skill_id}: invalid risk_level`);
  if(s.maturity!=='S0_DISCOVERED')warnings.push(`${s.skill_id}: external maturity should remain S0_DISCOVERED`);
  if(s.status!=='on-demand')warnings.push(`${s.skill_id}: external status should remain on-demand`);
}
if((min.skills||[]).length!==(full.skills||[]).length)errors.push('compact/full catalog count mismatch');
if(manifest.skill_count!==(full.skills||[]).length)errors.push('manifest skill_count mismatch');
if(manifest.activation!=='lazy')errors.push('manifest activation must be lazy');
const payloadPaths=new Set();
for(const f of payload.files||[]){
  if(!f.path){errors.push('payload entry missing path');continue;}
  if(payloadPaths.has(f.path)){errors.push(`duplicate payload path ${f.path}`);continue;}
  payloadPaths.add(f.path);
  const abs=path.resolve(vault,f.path);
  if(!abs.startsWith(vault+path.sep))errors.push(`payload path escapes vault ${f.path}`);
  else if(!fs.existsSync(abs))errors.push(`missing payload file ${f.path}`);
  else {const h=crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');if(h!==f.sha256)errors.push(`payload hash mismatch ${f.path}`)}
}
const payloadRoot=path.join(vault,'50_Skills','Claude Skill Library','skills');
const actual=[];const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const x=path.join(d,e.name);if(e.isDirectory())walk(x);else actual.push(path.relative(vault,x).replaceAll('\\','/'))}};if(fs.existsSync(payloadRoot))walk(payloadRoot);
if(actual.length!==(payload.files||[]).length)errors.push(`payload file_count mismatch manifest=${(payload.files||[]).length} actual=${actual.length}`);
for(const x of actual)if(!payloadPaths.has(x))errors.push(`unmanifested payload file ${x}`);
if(manifest.payload_file_count!==(payload.files||[]).length)errors.push('library manifest payload_file_count mismatch');
console.log(`External skills: ${(full.skills||[]).length}`);console.log(`Errors: ${errors.length}`);console.log(`Warnings: ${warnings.length}`);
if(errors.length){console.log('\nERRORS');errors.slice(0,100).forEach(e=>console.log(`- ${e}`))}
if(warnings.length){console.log('\nWARNINGS');warnings.slice(0,100).forEach(e=>console.log(`- ${e}`))}
process.exit(errors.length?1:0);
