import fs from 'node:fs';

const file=process.argv[2];
if(!file){console.error('Usage: node scripts/validate-page-plan.mjs <page-plan.json>');process.exit(2);}
const plan=JSON.parse(fs.readFileSync(file,'utf8'));
const errors=[];
const layouts=new Set(['section',...Array.from({length:18},(_,i)=>`C${String(i+1).padStart(2,'0')}`)]);
const semanticRoles=new Set(['chapter','topic','subtopic','label','example','note','person','case']);
const presentationRoles=new Set(['toc_chapter','section','page_title','group_title','body']);

for(const key of ['source_units','images','allowed_titles','hierarchy_map','reorder_log','pages']){
  if(!Array.isArray(plan[key]))errors.push(`${key} must be an array.`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}

const duplicateValues=a=>[...new Set(a.filter((x,i)=>a.indexOf(x)!==i))];
const unitIds=plan.source_units.map(x=>x.id);
const imageIds=plan.images.map(x=>x.id);
const hierarchyIds=plan.hierarchy_map.map(x=>x.id);
for(const id of duplicateValues(unitIds))errors.push(`Duplicate source unit id: ${id}`);
for(const id of duplicateValues(imageIds))errors.push(`Duplicate image id: ${id}`);
for(const id of duplicateValues(hierarchyIds))errors.push(`Duplicate hierarchy id: ${id}`);

const unitById=new Map(plan.source_units.map(x=>[x.id,x]));
const hierarchyById=new Map(plan.hierarchy_map.map(x=>[x.id,x]));
const unitCount=new Map(unitIds.map(id=>[id,0]));
const imageCount=new Map(imageIds.map(id=>[id,0]));

const originalOrders=[];
const plannedOrders=[];
for(const unit of plan.source_units){
  if(!Number.isInteger(unit.original_order)||unit.original_order<1)errors.push(`Source unit ${unit.id}: original_order must be a positive integer.`);
  else originalOrders.push(unit.original_order);
  if(!Number.isInteger(unit.planned_order)||unit.planned_order<1)errors.push(`Source unit ${unit.id}: planned_order must be a positive integer.`);
  else plannedOrders.push(unit.planned_order);
  if(typeof unit.top_level_id!=='string'||!unit.top_level_id)errors.push(`Source unit ${unit.id}: top_level_id is required.`);
}
for(const n of duplicateValues(originalOrders))errors.push(`Duplicate original_order: ${n}`);
for(const n of duplicateValues(plannedOrders))errors.push(`Duplicate planned_order: ${n}`);

const headingUnits=plan.source_units.filter(x=>x.type==='heading');
const mappedHeadingCounts=new Map(headingUnits.map(x=>[x.id,0]));
for(const node of plan.hierarchy_map){
  if(!unitById.has(node.source_unit_id))errors.push(`Hierarchy ${node.id}: unknown source_unit_id ${node.source_unit_id}.`);
  else if(unitById.get(node.source_unit_id).type!=='heading')errors.push(`Hierarchy ${node.id}: source_unit_id must reference a heading.`);
  else mappedHeadingCounts.set(node.source_unit_id,(mappedHeadingCounts.get(node.source_unit_id)||0)+1);
  if(!Number.isInteger(node.source_level)||node.source_level<1||node.source_level>6)errors.push(`Hierarchy ${node.id}: source_level must be an integer from 1 to 6.`);
  if(!semanticRoles.has(node.semantic_role))errors.push(`Hierarchy ${node.id}: invalid semantic_role ${node.semantic_role}.`);
  if(!presentationRoles.has(node.presentation_role))errors.push(`Hierarchy ${node.id}: invalid presentation_role ${node.presentation_role}.`);
  if(node.parent_id!==null&&!hierarchyById.has(node.parent_id))errors.push(`Hierarchy ${node.id}: unknown parent_id ${node.parent_id}.`);
  if(typeof node.top_level_id!=='string'||!hierarchyById.has(node.top_level_id))errors.push(`Hierarchy ${node.id}: invalid top_level_id ${node.top_level_id}.`);
  if(!node.reason||typeof node.reason!=='string')errors.push(`Hierarchy ${node.id}: reason is required.`);
}
for(const unit of headingUnits){
  const count=mappedHeadingCounts.get(unit.id)||0;
  if(count!==1)errors.push(`Heading source unit ${unit.id} must appear exactly once in hierarchy_map; found ${count}.`);
}

const resolvedTopLevel=new Map();
function topLevelOf(id,trail=new Set()){
  if(id===null||id===undefined)return null;
  if(resolvedTopLevel.has(id))return resolvedTopLevel.get(id);
  if(trail.has(id)){errors.push(`Hierarchy cycle detected at ${id}.`);return null;}
  const node=hierarchyById.get(id);
  if(!node)return null;
  trail.add(id);
  const top=node.parent_id===null?id:topLevelOf(node.parent_id,trail);
  trail.delete(id);
  resolvedTopLevel.set(id,top);
  return top;
}
for(const node of plan.hierarchy_map){
  const resolved=topLevelOf(node.id);
  if(resolved&&node.top_level_id!==resolved)errors.push(`Hierarchy ${node.id}: top_level_id ${node.top_level_id} does not match ancestor ${resolved}.`);
  const sourceUnit=unitById.get(node.source_unit_id);
  if(sourceUnit&&sourceUnit.top_level_id!==node.top_level_id)errors.push(`Hierarchy ${node.id}: source unit top_level_id does not match hierarchy.`);
}
for(const unit of plan.source_units){
  if(unit.top_level_id&&!hierarchyById.has(unit.top_level_id))errors.push(`Source unit ${unit.id}: unknown top_level_id ${unit.top_level_id}.`);
}

const reorderByUnit=new Map();
for(const move of plan.reorder_log){
  if(!unitById.has(move.unit_id)){errors.push(`Reorder log: unknown unit_id ${move.unit_id}.`);continue;}
  if(reorderByUnit.has(move.unit_id))errors.push(`Reorder log: duplicate record for ${move.unit_id}.`);
  reorderByUnit.set(move.unit_id,move);
  const unit=unitById.get(move.unit_id);
  if(move.original_order!==unit.original_order)errors.push(`Reorder ${move.unit_id}: original_order does not match source unit.`);
  if(move.planned_order!==unit.planned_order)errors.push(`Reorder ${move.unit_id}: planned_order does not match source unit.`);
  if(!move.move_type||typeof move.move_type!=='string')errors.push(`Reorder ${move.unit_id}: move_type is required.`);
  if(!move.move_reason||typeof move.move_reason!=='string')errors.push(`Reorder ${move.unit_id}: move_reason is required.`);
  else if(/^(为了)?(美观|排版|空间不足|填满页面)[。.!！]?$/u.test(move.move_reason.trim()))errors.push(`Reorder ${move.unit_id}: move_reason must state a semantic basis, not only visual convenience.`);
  for(const key of ['source_parent','planned_parent']){
    if(move[key]!==null&&!hierarchyById.has(move[key]))errors.push(`Reorder ${move.unit_id}: unknown ${key} ${move[key]}.`);
  }
  const sourceTop=move.source_parent===null?unit.top_level_id:topLevelOf(move.source_parent);
  const plannedTop=move.planned_parent===null?unit.top_level_id:topLevelOf(move.planned_parent);
  if(sourceTop&&plannedTop&&sourceTop!==plannedTop)errors.push(`Reorder ${move.unit_id}: moving across top-level chapters is forbidden (${sourceTop} -> ${plannedTop}).`);
  if(sourceTop&&unit.top_level_id!==sourceTop)errors.push(`Reorder ${move.unit_id}: source_parent is outside the unit's top-level chapter.`);
  if(plannedTop&&unit.top_level_id!==plannedTop)errors.push(`Reorder ${move.unit_id}: planned_parent is outside the unit's top-level chapter.`);
  if(move.original_order===move.planned_order&&move.source_parent===move.planned_parent)errors.push(`Reorder ${move.unit_id}: record does not describe an order or parent change.`);
}
for(const unit of plan.source_units){
  if(unit.original_order!==unit.planned_order&&!reorderByUnit.has(unit.id))errors.push(`Source unit ${unit.id}: changed order requires a reorder_log record.`);
}

const encounteredUnits=[];
plan.pages.forEach((page,index)=>{
  const n=index+1;
  if(page.page_no!==n)errors.push(`Page ${n}: page_no must be ${n}.`);
  if(!layouts.has(page.layout))errors.push(`Page ${n}: invalid layout ${page.layout}.`);
  if(!plan.allowed_titles.includes(page.title))errors.push(`Page ${n}: title is not in allowed_titles: ${page.title}`);
  if(/[（(]\s*续\s*[）)]|续\s*$|continu(ed|ation)/i.test(page.title))errors.push(`Page ${n}: continuation suffix is forbidden.`);
  if(!Array.isArray(page.source_unit_ids))errors.push(`Page ${n}: source_unit_ids must be an array.`);
  else for(const id of page.source_unit_ids){
    if(!unitCount.has(id))errors.push(`Page ${n}: unknown source unit ${id}.`);
    else{unitCount.set(id,unitCount.get(id)+1);encounteredUnits.push({id,page:n});}
  }
  if(!Array.isArray(page.image_ids))errors.push(`Page ${n}: image_ids must be an array.`);
  else for(const id of page.image_ids){if(!imageCount.has(id))errors.push(`Page ${n}: unknown image ${id}.`);else imageCount.set(id,imageCount.get(id)+1);}
  if(typeof page.estimated_fill!=='number'||page.estimated_fill<0||page.estimated_fill>1)errors.push(`Page ${n}: estimated_fill must be between 0 and 1.`);
  else if(!page.density_exception&&(page.estimated_fill<0.25||page.estimated_fill>0.85))errors.push(`Page ${n}: estimated_fill ${page.estimated_fill} is outside 0.25–0.85 without an exception.`);
  if(!page.reason||typeof page.reason!=='string')errors.push(`Page ${n}: reason is required.`);
});

let lastPlannedOrder=0;
for(const item of encounteredUnits){
  const order=unitById.get(item.id)?.planned_order;
  if(Number.isInteger(order)&&order<=lastPlannedOrder)errors.push(`Page ${item.page}: source unit ${item.id} is not in planned_order sequence.`);
  if(Number.isInteger(order))lastPlannedOrder=order;
}
for(const unit of plan.source_units){
  const count=unitCount.get(unit.id)||0;
  if(unit.required!==false&&count!==1)errors.push(`Source unit ${unit.id} must appear exactly once; found ${count}.`);
  if(unit.required===false&&count>1)errors.push(`Optional source unit ${unit.id} appears ${count} times.`);
}
for(const id of imageIds){const count=imageCount.get(id)||0;if(count!==1)errors.push(`Image ${id} must appear exactly once; found ${count}.`);}

if(errors.length){console.error(`Page plan validation failed (${errors.length}):\n- ${errors.join('\n- ')}`);process.exit(1);}
console.log(`Page plan validation passed: ${plan.pages.length} pages, ${unitIds.length} source units, ${imageIds.length} images, ${plan.hierarchy_map.length} hierarchy nodes, ${plan.reorder_log.length} moves.`);
