#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
const project=path.resolve(process.argv[2]||process.cwd()); const vault=path.resolve(process.argv[3]||path.join(project,'..'));
function exists(p){return fs.existsSync(path.join(project,p))} function readJson(p){try{return JSON.parse(fs.readFileSync(path.join(project,p),'utf8'))}catch{return null}}
const evidence=[];const ids=new Set();const add=(id,why)=>{ids.add(id);evidence.push({skill_id:id,evidence:why})};
const pkg=readJson('package.json'); const deps={...(pkg?.dependencies||{}),...(pkg?.devDependencies||{})};
if(deps.next||exists('next.config.js')||exists('next.config.mjs')||exists('next.config.ts'))add('skill-nextjs-best-practices','Next.js marker');
if(deps.react||deps['react-dom'])add('skill-frontend-patterns','React dependency');
if(deps.express||deps['@nestjs/core']||deps.fastify||deps.hono)add('skill-backend-patterns','API/backend framework dependency');
if(deps.prisma||deps['@prisma/client']||exists('prisma'))add('skill-database-migrations','Prisma/database marker');
if(deps.drizzle||deps['drizzle-orm'])add('skill-database-migrations','Drizzle marker');
if(exists('Dockerfile')||exists('docker-compose.yml')||exists('compose.yml')||exists('docker-compose.yaml'))add('skill-docker-patterns','Docker marker');
if(exists('wp-config.php')||exists('wp-content'))add('skill-wordpress-troubleshooting','WordPress marker');
if(exists('wp-config.php')||exists('wp-content'))add('skill-wordpress-server-optimization','WordPress production marker');
if(deps['next-auth']||deps['@auth/core']||deps.bcrypt||deps.argon2||deps.helmet)add('skill-security-and-hardening','Auth/security dependency');
if(pkg?.scripts?.build)add('skill-performance-optimization','Buildable application: performance verification applicable');
if(exists('.github/workflows'))evidence.push({skill_id:null,evidence:'CI workflows detected'});
const result={project,detected_at:new Date().toISOString(),recommendation_mode:'candidates-only',context_rule:'do not load all recommendations; choose primary by task and add support only from explicit need',recommended_skill_ids:[...ids],evidence};
console.log(JSON.stringify(result,null,2));
