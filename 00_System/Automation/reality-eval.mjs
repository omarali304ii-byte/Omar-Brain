#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
import {loadProjectManifests,resolveProject,ciPaths,readJson,readJsonl,loadRegistry} from './ci-lib.mjs';
const vault=path.resolve(process.argv[2]||process.cwd()), p=ciPaths(vault), manifests=loadProjectManifests(vault), coverage=readJson(p.coverage,{score:0,dimensions:{}}), health=readJson(path.join(vault,'00_System','Runtime State','last-brain-health.json'),{score:0,dimensions:{}}), registry=loadRegistry(vault), provenance=readJsonl(p.provenance); const cases=[];
function test(id,condition,details){cases.push({eval_id:id,pass:Boolean(condition),details})}
const exact=resolveProject(vault,'Meta Word of Mouth');test('reality-project-exact-resolution',exact.status==='resolved'&&exact.project.project_id==='prj-meta-word-of-mouth',exact);
const amb=resolveProject(vault,'OVX Smart Inbox');test('reality-project-ambiguity-refusal',amb.status==='ambiguous'&&(amb.candidates||[]).length>=2,amb);
const contextualStates=new Set(['context-import-needs-repo-check','scaffold-created-needs-repo-check']);
const verifiedStates=new Set(['verified-repo','runtime-verified','verified']);
const projectObjects=(registry.objects||[]).filter(o=>o.object_type==='project');
const importEvidenceChecks=manifests.map(m=>{
  if(contextualStates.has(m.verification_state)) return {project_id:m.project_id,verification_state:m.verification_state,pass:true,reason:'context remains non-evidence'};
  if(verifiedStates.has(m.verification_state)){
    const obj=projectObjects.find(o=>o.project_id===m.project_id);
    const hasProv=Boolean(obj&&provenance.some(pr=>pr.object_id===obj.object_id&&verifiedStates.has(pr.verification_state)));
    const hasRevision=m.verification_state==='verified-repo'?Boolean(m.repo_revision):true;
    return {project_id:m.project_id,verification_state:m.verification_state,pass:hasProv&&hasRevision,has_verified_provenance:hasProv,has_revision:hasRevision};
  }
  return {project_id:m.project_id,verification_state:m.verification_state,pass:false,reason:'unknown verification state'};
});
test('reality-imports-not-fake-evidence',manifests.length>0&&importEvidenceChecks.every(x=>x.pass),importEvidenceChecks);
const noExperience=(coverage.dimensions?.runs||0)===0&&(coverage.dimensions?.evidence_notes||0)===0;test('reality-empty-experience-cannot-score-high',!noExperience||coverage.score<30,{score:coverage.score,runs:coverage.dimensions?.runs||0,evidence:coverage.dimensions?.evidence_notes||0});
test('reality-health-not-100-with-empty-experience',!noExperience||health.score<45,{score:health.score,interpretation:health.interpretation});
test('reality-project-manifest-paths-exist',manifests.every(m=>fs.existsSync(path.join(vault,...m.__path.split('/')))),{count:manifests.length});
test('reality-project-identities-registered',projectObjects.length===manifests.length,{objects:projectObjects.length,manifests:manifests.length});
test('reality-learning-destinations-exist',manifests.every(m=>m.learning?.runs&&m.learning?.evidence&&fs.existsSync(path.join(vault,...m.learning.runs.split('/')))&&fs.existsSync(path.join(vault,...m.learning.evidence.split('/')))),manifests.map(m=>({project_id:m.project_id,learning:m.learning})));
const passed=cases.filter(c=>c.pass).length,report={generated_at:new Date().toISOString(),suite_id:'connected-reality-v2',cases:cases.length,passed,pass_rate:cases.length?Number((passed/cases.length).toFixed(3)):0,results:cases};fs.writeFileSync(path.join(vault,'00_System','Evaluation','last-reality-eval.json'),JSON.stringify(report,null,2)+'\n','utf8');console.log(JSON.stringify(report,null,2));process.exit(passed===cases.length?0:1);
