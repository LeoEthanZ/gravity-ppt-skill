---
name: gravity-ppt-skill
description: 生成“万有引力 / Gravitation”视觉风格的横向翻页 HTML PPT。封面、目录、小节页内置在 template.html；内容页从 references/content-layouts.md 选择 section 粘贴。适合需要北欧简约、无衬线、紫色主题、白色 ASCII 动态背景的网页演示稿。
---

# Gravity PPT Skill

生成单文件 HTML 横向翻页 PPT，视觉基于 Figma 的“PPT视觉设计”文件沉淀：

- 固定页：封面、目录、小节页，已写入 `assets/template.html`
- 内容页：18 个可复用版式，放在 `references/content-layouts.md`
- 动态背景：封面和小节页使用瑞士风白色 ASCII 字符呼吸场
- 检查方式：先浏览器逐页看，再运行 `scripts/validate-deck.mjs`

## 何时使用

用户要做“万有引力 / Gravitation”风格 PPT、横向翻页 HTML deck、北欧简约紫色主题演示稿、或要复用这套封面/目录/小节/内容页版式时使用。

## 工作流

### Step 1 · 新建项目

```bash
mkdir -p "项目/ppt/assets"
cp "<SKILL_ROOT>/assets/template.html" "项目/ppt/index.html"
cp "<SKILL_ROOT>/assets/"*.svg "项目/ppt/assets/"
```

`template.html` 已包含：

- 封面页
- 目录页
- 小节页
- 翻页 JS
- 导航圆点
- ASCII 动态背景
- 内容页公共 CSS
- 基于 1600×900 画布的整体缩放逻辑，浏览器窗口变小时同步等比例缩小，内容不溢出浏览器
- `<!-- SLIDES_HERE -->` 占位符

缩放实现要求：

- 画布基准尺寸为 `1600px × 900px`，通过 `--deck-scale` 等比例缩放。
- `.slide` 使用 `position: relative`，`.canvas` 使用 `position: absolute; left:50%; top:50%; transform: translate(-50%, -50%) scale(var(--deck-scale));`，不要用 grid 居中未缩放画布，否则小窗口会偏移。
- `resize` 时用 `Math.min(1, innerWidth / 1600, innerHeight / 900)` 更新 `--deck-scale`。

封面文案规则：

- 封面白色 `.lesson` 使用课程名；如果文件名里带 `Lesson01`、`Lesson02` 等编号，去掉编号，只保留课程名字。
- 封面主标题 `.cover-title` 是装饰英文，不要用课程中文标题替换。默认把 `Gravitation Introduction` 改为两行：第一行 `GRAVITATION`，第二行 `AIGC-COURSE`，不要让浏览器在连字符处自动断行。
- 封面主标题 `.cover-title` 的容器应贴合文字实际宽度，使用 `width: max-content; display: inline-block; max-width` 控制边界，不要用过大的固定百分比宽度撑开选区。
- 封面主标题需要按比例放大到右侧接近 `2026`，但保留小间距且不要重叠；如果放大后影响课程名 `.lesson` 的视觉距离，则自动把 `.lesson` 上移。
- 封面右侧年份和 logo 保持模板结构。

目录页规则：

- 目录条目数量超过 4 项时，必须缩小 `.index-row`、`.index-no`、`.index-name`、`.index-sub` 的字号和行高，并压缩行间距，确保所有条目都在白色画布内。
- 5 项目录建议使用紧凑目录样式：`.index-list.compact`，每行高度约 `118px`，编号/标题字号约 `52px`，副标题约 `16px`。
- 如果超过 6 项，继续降低字号或拆为两列目录；不要让最后一项贴底或溢出。

### Step 2 · 选择内容页

打开 `references/content-layouts.md`，按需要复制完整 `<section class="slide" data-layout="Cxx">...</section>`，粘贴到 `index.html` 的 `<!-- SLIDES_HERE -->` 位置。

内容页编号：

- `C01` 图文 · 左图右文
- `C02` 图文 · 左文右图
- `C03` 图文 · 上文下图
- `C04` 多栏论述
- `C05` 金句强调
- `C06` 时间线
- `C07` 流程
- `C08` 大数字
- `C09` 左文右表格
- `C10` 可视化图表
- `C11` 左右对比
- `C12` 观点矩阵
- `C13` 大图 · 主视觉
- `C14` 多观点 · 列表
- `C15` 案例拆解
- `C16` 收束结论
- `C17` 作业布置
- `C18` 图片聚焦 · 聚光灯

### Step 3 · 改内容

只改文字和图片占位内容，优先保持结构不变；原文内容优先级高于版式美化：

- 内容页四角元素不要改：左上章节、右上 logo、底部要点总结
- 主题色保持 `#9268f8`
- 字体保持无衬线
- 只有内容页标题 `.canvas.content .page-title` 使用 `#222222`；目录页和小节页保持模板原本颜色。
- `h2`、`h3`、`p` 相对模板默认值应略小，给图片留出更多空间；`h3` 默认使用主题紫色或深紫色。
- 多栏、步骤、流程页中的所有同级卡片默认保持一致样式，不要把最后一个 card 做成特殊紫底，除非用户明确要求强调。
- 尽量保留用户原文，不要改写、总结、替换措辞；只有当一页空间不够、需要拆页、标题过长、或为了建立目录/摘要时，才做必要压缩，并优先使用原文关键词。
- 原文过长时先拆成多页或多容器，仍然保留原句；不要为了版式把讲义改成另一套表达。
- 若用户明确要求紫色强调卡，紫色卡片中的 `pill` 应为白底紫字，`h3` 和 `p` 应为白色；不要出现紫底黑标题或灰正文。
- 每个一级小节开始前自动添加小节页，使用模板中第 3 页同样的紫色 ASCII 小节页效果；第 1 个小节可以复用模板自带小节页，后续小节需要在内容页前插入同结构 section page。
- 所有小节页标题 `.section-name` 必须在 16:9 画布中上下左右居中：`left:50%; top:50%; transform: translate(-50%, -50%);`。
- 插入额外小节页后，如果校验器限制固定页数量，可同步更新校验规则或在最终自检时人工确认结构正确，不要因此省略小节页。

### Step 3.1 · 图片与素材适配

处理带图片的文档时，必须先完整提取图片素材并建立清单，不能只挑少数图片：

- 从源文件提取全部媒体，保留原始文件名、顺序、尺寸和格式。
- 解析图片在源文档中的位置，记录图片前后的标题、段落、表格单元格和说明文字。
- 生成缩略图总览或读取尺寸清单，用来判断哪些图片适合放入单图页、图库页、案例页或流程页。
- 除非用户明确要求精简，否则输出中应覆盖源文档的主要图片素材；不能让图片“缺失”只是因为模板原本只有一个图片占位。
- 图片必须跟随源文档中相邻的文字内容；不要把不同小节的图片集中堆到一个“素材图库”页，除非原文就是图库/表格/多图案例。

图片与文字绑定规则：

- 图片出现在某个标题或段落之后时，默认归属这个标题或段落，优先与该文字放在同一页或相邻连续页。
- 图片出现在表格中时，保留表格的文字标签和图片对应关系；多张图来自同一个表格时，可以做成多图网格，但每张图必须保留原表格标签或相邻说明。
- 一个小节内有多张图片时，按源文档顺序分组；不要跨小节重排。
- 生成 PPT 时先按源文档结构建大纲，再选择模板；不要先按图片类型或视觉相似度重新分类。

图片显示规则：

- 图片容器必须使用 `object-fit: contain`，填满容器但不裁剪；多余区域用容器背景色显示。
- 图片容器背景使用白色或浅紫灰（如 `#f8f5ff`），不要透明露底。
- 禁止为了铺满画面使用 `object-fit: cover` 裁掉产品、界面、海报文字或案例细节。
- 所有 `<img>` 建议使用 `.fit-img`。
- 单张图片必须直接放入 `.photo-box.image-wrap` 内，不要再包 `.asset-frame`；避免“图片容器内再套图片容器”导致双重裁剪或尺寸计算错误。
- 只有多张图片组成网格时，才使用 `.asset-gallery > .asset-frame > .fit-img`。

可直接加入输出 HTML 的通用样式：

```css
.image-wrap,
.asset-frame {
  display: grid;
  place-items: center;
  background: #f8f5ff;
  border: 1.5px solid #ece8f6;
  overflow: hidden;
}
.image-wrap:after,
.asset-frame:after { display: none; }
.fit-img {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  object-fit: contain;
  display: block;
}
.asset-gallery {
  display: grid;
  gap: 18px;
  width: 100%;
  height: 100%;
  min-height: 0;
  max-height: 100%;
  overflow: hidden;
}
.asset-gallery[data-count="2"] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.asset-gallery[data-count="3"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.asset-gallery[data-count="4"] { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
.asset-gallery[data-count="5"],
.asset-gallery[data-count="6"] { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
.asset-gallery > * { min-width: 0; min-height: 0; }
.photo-box.image-wrap > .fit-img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
```

### Step 3.2 · 素材数量与版式不匹配

当图片素材数量和模板容器数量不一致时，按下面规则处理：

- 单张图片容器 + 单张图片素材：图片直接作为 `.photo-box.image-wrap` 的子元素，结构为 `.photo-box.image-wrap > .fit-img`。
- 单张图片容器 + 同一段落/表格/小节内的多张图片素材：把单容器替换为 `.asset-gallery`，按 2、3、4、6 宫格划分；每个子容器用 `.asset-frame` 包住一张 `.fit-img`。
- 单张图片容器 + 来自不同段落或不同小节的多张图片素材：不要合并；拆成连续页，分别绑定原文。
- 图片少于版式容器：删除最后一个多余容器，优先保留左上、主视觉或叙事最强的容器，不要留下空白占位文字。
- 图片多于版式容器：按既有规律新增容器；两栏继续加列或加行，流程页继续新增 step，列表页继续新增 list item，案例页继续新增案例卡。
- 图片过多时：新增同版式连续页，而不是把所有图片压在一页；每页以 4-6 张为宜，保证可读，并保持源文档顺序。
- 多栏、步骤、流程、时间线等结构性页面：条目少了就删掉最后一个；条目多了就按编号、间距、颜色规律新增，必要时拆成下一页。
- 大图页、聚光页、案例拆解页：优先放 1 张关键图；其余同段/同表相关素材另起连续案例页，不相关素材回到各自小节。

新增容器时保持现有 CSS 规律：

- `two-col` 变为 2 个同宽列；超过 2 项改为 `three-col`、`four-col` 或自定义 `grid-template-columns`。
- `process-grid` 新增步骤时继续使用 `card`、`pill`、`h3`、`p` 结构；最后一个强调步骤可以保留 `card purple`。
- `timeline` 新增或减少 `.step` 后同步调整 `grid-template-columns: repeat(N, 1fr)`。
- `list` 新增项目时延续 `<li><b>编号</b><span>文本</span></li>`，编号保持两位数。

### Step 4 · 检查

先读 `references/checklist.md`，再运行：

```bash
node "<SKILL_ROOT>/scripts/validate-deck.mjs" "项目/ppt/index.html"
```

如果在检查模板本身，使用：

```bash
node "<SKILL_ROOT>/scripts/validate-deck.mjs" "<SKILL_ROOT>/assets/template.html" --template
```

### Step 5 · 预览

直接用浏览器打开 `index.html`，不需要本地服务器。

逐页检查：

- 封面 logo / 右下装饰比例是否和 Figma 一致
- 封面和小节页是否只有白色字符动态背景
- 目录页是否保持白底静态
- 内容页四角元素是否稳定
- 每页内容是否没有压到底部要点总结

## 文件导览

```text
gravity-ppt-skill/
├── SKILL.md
├── assets/
│   ├── template.html
│   ├── cover-logo.svg
│   ├── cover-icons.svg
│   ├── logo-purple.svg
│   ├── logo-black.svg
│   ├── content-logo-a.svg
│   ├── content-logo-b.svg
│   └── content-logo-c.svg
├── references/
│   ├── content-layouts.md
│   └── checklist.md
└── scripts/
    └── validate-deck.mjs
```
