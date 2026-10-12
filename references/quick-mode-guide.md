# B｜轻量编排：内容聚合、分页与渲染回流

B 不执行 A 的三层层级映射、受控重排或完整 Step 0，但必须先把源材料拆成连续内容块，再将相邻内容块聚合成页面。禁止读取一个 Markdown 块就立即生成一页。

## 1. 适用边界

- 适用于结构清楚、原文顺序合理、图片归属明确且无需跨块重排的材料。
- 超过约 500 行、一级章节超过 6 个、图片超过 12 张、存在人物肖像归属、跨章关系或多个复杂长表格时，建议 A。用户坚持 B 时仍执行本指南全部步骤。
- B 保持原始内容块顺序；需要改变父节点、人物或图片归属时改用 A。

## 2. 建立内容块

先扫描全文，再输出 `content_blocks`。每块包含：

- `id`、`chapter`、`parent_topic`、`source_range`。
- `type`：`heading`、`text`、`list`、`table`、`process`、`image`、`task`、`comparison`、`data` 或 `caption`。
- `source_chars`、`item_count`、`image_ids`。

内容块应是可以完整移动到页面上的最小语义单元，不是 Markdown 单行。标题与紧随内容优先形成同一块；表格、流程、列表和图片保持完整关系。

## 3. 先预算，再候选合页

按一级章节建立 `page_budget`。每项必须包含 `chapter`、`estimated_pages`、`reason` 和：

```json
"evidence": {
  "source_chars": 3200,
  "table_rows": 18,
  "process_nodes": 15,
  "image_pages": 2
}
```

预算依据内容容量，不依据标题或 Markdown 块数量。然后按下列顺序组合页面：

1. 同一 `parent_topic` 下的引导语、解释和流程先合页。
2. 说明文字与对应表格、图片或列表先尝试同页。
3. 同级短块优先组成对比、多栏或流程页面。
4. 只有达到图片可读阈值、表格真实高度或页面上限时才拆页。

长篇材料的普通正文页应以每页约 `1.5–2.5` 个内容块为健康区间；这不是要求硬塞内容，而是用于识别“一块一页”的异常碎片化。连续三个同父主题的单块页必须重新组合，或逐页填写具体 `split_reason`。

## 4. quick-outline.json

```json
{
  "mode": "B｜轻量编排",
  "source": "源文件路径",
  "page_budget": [],
  "assets": [],
  "content_blocks": [],
  "pages": [],
  "render_audit": null
}
```

每页必须记录：

- `page_no`、`chapter`、`title`、`source_range`、`layout`；一级章节幕封使用 `section`，不计入正文页预算。
- `block_ids`：本页覆盖的内容块；每块在整稿中必须且只能出现一次。
- `content_types`、`source_chars`、`item_count`、`estimated_fill`。
- `image_ids`、`pure_image`。
- 流程页填写 `flow_layout`；表格拆页填写 `table_group` 和连续 `table_part`。
- 同标题连续 3 页以上时，每个非纯图片页填写具体 `split_reason`。
- 保留低密度页或单块页时填写具体 `density_exception`、`merge_reason` 或 `split_reason`，不能写“为了排版”。

写 HTML 前运行：

```bash
node scripts/validate-quick-outline.mjs quick-outline.json
```

## 5. 版式与拆页规则

- C10 只用于源文档存在真实可绘制数据的图表，并记录 `chart_source:true`；普通分类表不得转成 C10。
- 两组差异优先 C11；步骤与阶段优先 C07；普通表格优先 C09。
- 1–6 个短流程节点可单行；7–10 个节点使用多行或有理由地拆页。
- 六阶段短至中等任务链优先一页 `3×2`，以阶段名为卡片标题，不重复强调“链路步骤”。
- 表格行数只作风险提示。拆页取决于真实行高、单元格文字和渲染剩余高度，不能固定 `4+2`。
- 先换版式、扩大容器或合并相邻内容；确认超过可读容量后才拆页。

## 6. 图片规则

- 所有信息图、UI、海报和文字密集图使用 `contain`，并计算实际显示尺寸。
- 文字密集图建议显示宽度不低于 `624px`、最短边不低于 `312px`。
- 同页布局未达到阈值时，拆成相邻纯图片页。纯图片页可以包含 `1–4` 张图，但每张都必须达到阈值。
- 图片说明与图片优先同页；可读性不足时允许相邻说明页加纯图片页，且图片只出现一次。
- 横排、竖排、加权网格或拆页均先比较真实显示面积和最小图片可读性，不按图片数量或横竖比例固定方向。
- 内容页标题使用主 Skill 与模板的共用单行防重叠规则，不在 B 中另设样式。

详细图片容器结构和 CSS 只在处理多图、混合比例或长截图时读取 `references/media-layouts.md`。

## 7. 全页渲染回流

静态校验通过后生成 HTML，并完成至少一次：

```text
渲染全部内容页 → 记录问题 → 合并/拆分/换版式 → 更新 quick-outline → 再渲染
```

在 `render_audit.viewports` 中记录：

- 1920×1080：必须覆盖全部内容页。
- 不大于 1280×720：至少覆盖长标题、纯图片、最大表格、最多卡片和 7–10 节点流程页。
- 每页记录 `overflow:false`、`overlap:false`、`image_readable`、`issues`；修复过问题时记录 `resolution`。

回流完成后运行：

```bash
node scripts/validate-quick-outline.mjs quick-outline.json --post-render
node scripts/validate-deck.mjs index.html
```

无法渲染时明确报告未完成视觉验收，不得用结构校验代替。

## 8. 禁止的碎片化模式

- 一段正文一页、一个流程一页、一张图片再一页。
- 每个 Markdown 块或表格分块直接对应一页。
- 连续多个同父主题单块页，却没有容量或图片可读性理由。
- 7–10 个节点强塞单行，或六行任务表机械拆成 `4+2`。
- 用 C10 把普通分类表拆成多个伪图表页。
- 仅因模板占位数量不匹配而增加页面。
