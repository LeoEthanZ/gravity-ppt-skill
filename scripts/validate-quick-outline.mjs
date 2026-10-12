#!/usr/bin/env node
import fs from 'node:fs';

const args=process.argv.slice(2);
const file=args.find(x=>!x.startsWith('--'));
const postRender=args.includes('--post-render');
if(!file){console.error('Usage: node scripts/validate-quick-outline.mjs <quick-outline.json> [--post-render]');process.exit(2);}

let data;
try{data=JSON.parse(fs.readFileSync(file,'utf8'));}
catch(e){console.error(`Cannot read quick outline: ${e.message}`);process.exit(2);}

const errors=[];
const layouts=new Set(['section',...Array.from({length:19},(_,i)=>`C${String(i+1).padStart(2,'0')}`)]);
const blockTypes=new Set(['heading','text','list','table','process','image','task','comparison','data','caption']);
const contentTypes=new Set(['section','text','list','table','process','image','task','comparison','chart']);

if(data.mode!=='B｜轻量编排')errors.push('mode must be "B｜轻量编排".');
if(!Array.isArray(data.page_budget)||!data.page_budget.length)errors.push('page_budget must be a non-empty array.');
if(!Array.isArray(data.assets))errors.push('assets must be an array.');
if(!Array.isArray(data.content_blocks)||!data.content_blocks.length)errors.push('content_blocks must be a non-empty array.');
if(!Array.isArray(data.pages)||!data.pages.length)errors.push('pages must be a non-empty array.');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}

const range=/^\d+(?:-\d+)?$/;
const budget=new Map();
for(const x of data.page_budget){
 if(!x.chapter||!Number.isInteger(x.estimated_pages)||x.estimated_pages<1||!x.reason)errors.push('Each page_budget item needs chapter, positive estimated_pages, and reason.');
 else budget.set(x.chapter,x.estimated_pages);
 if(!x.evidence||!Number.isInteger(x.evidence.source_chars)||!Number.isInteger(x.evidence.table_rows)||!Number.isInteger(x.evidence.process_nodes)||!Number.isInteger(x.evidence.image_pages))errors.push(`Budget "${x.chapter||'?'}" needs evidence: source_chars, table_rows, process_nodes, image_pages.`);
}

const assets=new Map();
for(const a of data.assets){
 if(!a.id||assets.has(a.id))errors.push(`Asset id is missing or duplicated: ${a.id||'?'}.`);
 else assets.set(a.id,a);
}

const blocks=new Map();
const blockOrder=[];
for(const [i,b] of data.content_blocks.entries()){
 if(!b.id||blocks.has(b.id))errors.push(`Content block ${i+1}: id is missing or duplicated.`);
 else {blocks.set(b.id,b);blockOrder.push(b.id);}
 if(!b.chapter||!budget.has(b.chapter))errors.push(`Content block ${b.id||i+1}: chapter is missing from page_budget.`);
 if(!b.parent_topic)errors.push(`Content block ${b.id||i+1}: parent_topic is required.`);
 if(!blockTypes.has(b.type))errors.push(`Content block ${b.id||i+1}: invalid type ${b.type}.`);
 if(!range.test(String(b.source_range||'')))errors.push(`Content block ${b.id||i+1}: invalid source_range.`);
 if(!Number.isInteger(b.source_chars)||b.source_chars<0)errors.push(`Content block ${b.id||i+1}: source_chars must be a non-negative integer.`);
 if(!Number.isInteger(b.item_count)||b.item_count<0)errors.push(`Content block ${b.id||i+1}: item_count must be a non-negative integer.`);
 if(!Array.isArray(b.image_ids))errors.push(`Content block ${b.id||i+1}: image_ids must be an array.`);
 else for(const id of b.image_ids)if(!assets.has(id))errors.push(`Content block ${b.id||i+1}: unknown image ${id}.`);
}

const coverage=new Map(blockOrder.map(id=>[id,0]));
const pageOfBlock=new Map();
const chapterCounts=new Map();
const tableGroups=new Map();
const titlePages=new Map();

data.pages.forEach((p,i)=>{
 const n=i+1;
 if(p.page_no!==n)errors.push(`Page ${n}: page_no must be ${n}.`);
 if(!p.chapter||!budget.has(p.chapter))errors.push(`Page ${n}: chapter is missing from page_budget.`);
 else if(p.layout!=='section')chapterCounts.set(p.chapter,(chapterCounts.get(p.chapter)||0)+1);
 if(!p.title)errors.push(`Page ${n}: title is required.`);
 else {const a=titlePages.get(p.title)||[];a.push(p);titlePages.set(p.title,a);}
 if(!range.test(String(p.source_range||'')))errors.push(`Page ${n}: invalid source_range.`);
 if(!layouts.has(p.layout))errors.push(`Page ${n}: invalid layout ${p.layout}.`);
 if(!Array.isArray(p.content_types)||!p.content_types.length||p.content_types.some(x=>!contentTypes.has(x)))errors.push(`Page ${n}: invalid content_types.`);
 if(!Array.isArray(p.block_ids)||!p.block_ids.length)errors.push(`Page ${n}: block_ids must be a non-empty array.`);
 else for(const id of p.block_ids){
   if(!blocks.has(id)){errors.push(`Page ${n}: unknown content block ${id}.`);continue;}
   coverage.set(id,(coverage.get(id)||0)+1);pageOfBlock.set(id,n);
   if(blocks.get(id).chapter!==p.chapter)errors.push(`Page ${n}: block ${id} belongs to another chapter.`);
 }
 if(!Number.isInteger(p.source_chars)||p.source_chars<0)errors.push(`Page ${n}: source_chars must be a non-negative integer.`);
 if(!Number.isInteger(p.item_count)||p.item_count<0)errors.push(`Page ${n}: item_count must be a non-negative integer.`);
 if(typeof p.estimated_fill!=='number'||p.estimated_fill<0||p.estimated_fill>1)errors.push(`Page ${n}: estimated_fill must be 0–1.`);
 else if((p.estimated_fill<.25||p.estimated_fill>.85)&&!p.density_exception)errors.push(`Page ${n}: fill ${p.estimated_fill} needs density_exception.`);
 if(!Array.isArray(p.image_ids))errors.push(`Page ${n}: image_ids must be an array.`);
 else for(const id of p.image_ids)if(!assets.has(id))errors.push(`Page ${n}: unknown image ${id}.`);
 if(p.pure_image&&(!p.image_ids||p.image_ids.length<1||p.image_ids.length>4))errors.push(`Page ${n}: pure_image page must contain 1–4 images.`);
 if(p.content_types?.includes('process')){
   if(!['single-row','multi-row','split'].includes(p.flow_layout))errors.push(`Page ${n}: process page needs flow_layout.`);
   if(p.item_count>6&&p.flow_layout==='single-row')errors.push(`Page ${n}: ${p.item_count} process items cannot use single-row.`);
 }
 if(p.layout==='C10'&&(!p.content_types?.includes('chart')||p.chart_source!==true))errors.push(`Page ${n}: C10 requires chart content and chart_source=true.`);
 if(p.content_types?.includes('table')&&p.table_group){
   if(!Number.isInteger(p.table_part)||p.table_part<1)errors.push(`Page ${n}: table_group needs positive table_part.`);
   const a=tableGroups.get(p.table_group)||[];a.push({page:n,part:p.table_part,items:p.item_count});tableGroups.set(p.table_group,a);
 }
 const sparseEligible=p.content_types?.every(x=>x==='text'||x==='list');
 const sparse=sparseEligible&&p.source_chars<180&&p.item_count<3;
 if(sparse&&!p.density_exception&&!p.merge_reason)errors.push(`Page ${n}: sparse page needs merge_reason or density_exception.`);
});

for(const [id,count] of coverage){if(count!==1)errors.push(`Content block ${id}: must appear exactly once; found ${count}.`);}
let last=-1;
for(const id of blockOrder){const p=pageOfBlock.get(id);if(p&&p<last)errors.push(`Content block ${id}: page order breaks source order.`);if(p)last=p;}

for(const [chapter,estimate] of budget){
 const actual=chapterCounts.get(chapter)||0;
 const max=Math.max(estimate+1,Math.ceil(estimate*1.2));
 if(actual>max)errors.push(`Chapter "${chapter}": ${actual} pages exceeds budget ${estimate} (max ${max}).`);
}

const ordinary=data.pages.filter(p=>p.layout!=='section'&&!p.pure_image&&!p.density_exception);
if(ordinary.length>=12){
 const singletons=ordinary.filter(p=>p.block_ids?.length===1).length;
 const ratio=singletons/ordinary.length;
 if(ratio>.45)errors.push(`Fragmentation: ${singletons}/${ordinary.length} ordinary pages are single-block pages (${(ratio*100).toFixed(0)}% > 45%).`);
 const average=ordinary.reduce((s,p)=>s+(p.block_ids?.length||0),0)/ordinary.length;
 if(average<1.5)errors.push(`Fragmentation: average blocks per ordinary page is ${average.toFixed(2)}; expected at least 1.50.`);
}

for(let i=0;i<data.pages.length;){
 const first=data.pages[i];let j=i+1;
 while(j<data.pages.length&&data.pages[j].title===first.title)j++;
 const run=data.pages.slice(i,j);
 if(first.layout!=='section'&&run.length>=3&&run.some(p=>!p.split_reason&&!p.pure_image))errors.push(`Pages ${i+1}–${j}: title "${first.title}" repeats ${run.length} times; each non-image page needs split_reason.`);
 i=j;
}

for(let i=0;i<data.pages.length-2;i++){
 const run=data.pages.slice(i,i+3);
 if(run.every(p=>p.layout!=='section'&&p.block_ids?.length===1&&!p.pure_image)){
   const topics=run.map(p=>blocks.get(p.block_ids[0])?.parent_topic);
   if(topics[0]&&topics.every(x=>x===topics[0])&&run.some(p=>!p.merge_reason&&!p.split_reason))errors.push(`Pages ${i+1}–${i+3}: three-page singleton fragment chain under "${topics[0]}".`);
 }
}

for(let i=1;i<data.pages.length;i++){
 const a=data.pages[i-1],b=data.pages[i];
 if(a.title===b.title&&a.estimated_fill<.45&&b.estimated_fill<.45&&!a.merge_reason&&!b.merge_reason&&!a.pure_image&&!b.pure_image)errors.push(`Pages ${i}–${i+1}: same-title low-density pages need merging or merge_reason.`);
}
for(const [group,parts] of tableGroups){
 parts.sort((a,b)=>a.part-b.part);
 parts.forEach((x,i)=>{if(x.part!==i+1)errors.push(`Table group ${group}: parts must be continuous from 1.`);});
 parts.slice(0,-1).forEach(x=>{if(x.items<4)errors.push(`Table group ${group}, page ${x.page}: non-final part has fewer than 4 rows.`);});
}

if(postRender){
 const audit=data.render_audit;
 if(!audit||!Number.isInteger(audit.iteration)||audit.iteration<1||!Array.isArray(audit.viewports))errors.push('Post-render validation needs render_audit with iteration and viewports.');
 else {
   const baseline=audit.viewports.find(v=>v.width===1920&&v.height===1080);
   const narrow=audit.viewports.find(v=>v.width<=1280&&v.height<=720);
   if(!baseline)errors.push('render_audit needs a 1920×1080 viewport.');
   if(!narrow)errors.push('render_audit needs a viewport no larger than 1280×720.');
   for(const v of audit.viewports){
     if(!Array.isArray(v.pages))errors.push(`Render viewport ${v.width}×${v.height}: pages must be an array.`);
     else {
       const nums=new Set(v.pages.map(x=>x.page_no));
       if(v===baseline&&data.pages.some(p=>!nums.has(p.page_no)))errors.push('Baseline render audit must cover every content page.');
       for(const x of v.pages){
         if(x.overflow!==false)errors.push(`Render ${v.width}×${v.height}, page ${x.page_no}: overflow not cleared.`);
         if(x.overlap!==false)errors.push(`Render ${v.width}×${v.height}, page ${x.page_no}: overlap not cleared.`);
         if(x.image_readable===false)errors.push(`Render ${v.width}×${v.height}, page ${x.page_no}: image is unreadable.`);
         if(Array.isArray(x.issues)&&x.issues.length&&!x.resolution)errors.push(`Render ${v.width}×${v.height}, page ${x.page_no}: issues need resolution.`);
       }
     }
   }
 }
}

if(errors.length){console.error(`Quick outline validation failed (${errors.length}):\n- ${errors.join('\n- ')}`);process.exit(1);}
console.log(`Quick outline validation passed: ${data.content_blocks.length} blocks → ${data.pages.length} pages across ${budget.size} chapters${postRender?' with render audit':''}.`);
