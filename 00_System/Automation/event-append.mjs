#!/usr/bin/env node
import path from 'node:path';
import {appendEvent} from './ci-lib.mjs';
const args=process.argv.slice(2); const vault=path.resolve(args[0]||process.cwd());
const get=(n,f='')=>{const i=args.indexOf(`--${n}`);return i>=0?args[i+1]:f};
const eventType=get('type'); if(!eventType){console.error('Usage: node event-append.mjs <vault> --type run.completed [--project prj-x] [--run run-x] [--correlation corr-x] [--causation evt-x] [--object obj-x]');process.exit(2)}
const e=appendEvent(vault,{event_type:eventType,project_id:get('project')||undefined,run_id:get('run')||undefined,correlation_id:get('correlation')||undefined,causation_id:get('causation')||undefined,object_id:get('object')||undefined});
console.log(JSON.stringify(e,null,2));
