#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
import {loadProjectManifests,walk,parseFrontmatter,ciPaths,readJsonl,readJson,writeJsonAtomic} from './ci-lib.mjs';
const vault=path.resolve(process.argv[2]||process.cwd()), p=ciPaths(vault), manifests=loadProjectManifests(vault); const files=walk(path.join(vault,'40_Projects')).filter(f=>f.endsWith('.md'));
const notes=files.map(f=>({f,...parseFrontmatter(fs.readFileSync(f,'utf8'))})); const credible=new Set(['observed','verified','runtime-verified','repo-verified']); const runs=notes.filter(x=>x.data.type==='run'&&credible.has(x.data.verification_state)), evidence=notes.filter(x=>x.data.type==='evidence'&&credible.has(x.data.verification_state));
const runProjects=new Set(runs.map(x=>x.data.project_id).filter(Boolean)), evidenceProjects=new Set(evidence.map(x=>x.data.project_id).filter(Boolean));
const verifiedProjects=new Set(manifests.filter(m=>['verified-repo','runtime-verified','verified'].includes(m.verification_state)).map(m=>m.project_id));
const edges=readJsonl(p.edges), events=readJsonl(p.events), causalRelations=new Set((readJson(p.vocabulary,{relations:[]}).relations||[]).filter(x=>x.causal).map(x=>x.id)), causalEdges=edges.filter(e=>causalRelations.has(e.relation));
const candidates=readJson(p.candidates,{candidates:[]}).candidates||[]; const promoted=candidates.filter(c=>['promoted','validated'].includes(c.status)); const n=manifests.length;
const ratio=(x,d=n)=>d?Math.min(1,x/d):0;
const runBreadth=ratio(runProjects.size), evidenceBreadth=ratio(evidenceProjects.size), verifiedBreadth=ratio(verifiedProjects.size);
const causalDensity=runs.length?Math.min(1,causalEdges.length/Math.max(1,runs.length*2)):0;
const learningDensity=runs.length?Math.min(1,candidates.length/Math.max(1,runs.length)):0;
const crossProjectPromoted=promoted.filter(c=>(c.projects||[]).length>=2).length;
const components={
  registered_project_presence:n?10:0,
  verified_repo_runtime_identity:20*verifiedBreadth,
  project_run_coverage:20*runBreadth,
  project_evidence_coverage:20*evidenceBreadth,
  causal_completeness:10*causalDensity*runBreadth,
  learning_from_runs:10*learningDensity*runBreadth,
  promoted_cross_project_learning:10*(promoted.length?Math.min(1,crossProjectPromoted/Math.max(1,promoted.length)):0)
};
const score=Object.values(components).reduce((a,b)=>a+b,0); const result={generated_at:new Date().toISOString(),score:Number(score.toFixed(1)),dimensions:{registered_projects:n,verified_repo_runtime_projects:verifiedProjects.size,projects_with_runs:runProjects.size,projects_with_evidence:evidenceProjects.size,runs:runs.length,evidence_notes:evidence.length,events:events.length,edges:edges.length,causal_edges:causalEdges.length,learning_candidates:candidates.length,promoted_candidates:promoted.length},components:Object.fromEntries(Object.entries(components).map(([k,v])=>[k,Number(v.toFixed(1))])),interpretation:score<25?'architecture-rich, experience-poor':score<55?'growing real experience':score<80?'strong experience coverage':'high experience coverage'};writeJsonAtomic(p.coverage,result);console.log(JSON.stringify(result,null,2));
