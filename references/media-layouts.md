# 图片与多媒体布局

仅在多图、混合比例、长截图或图文同页可读性不足时读取。

## 1. 结构

- 单图：`.photo-box.image-wrap > .fit-img`，不要嵌套 `.asset-frame`。
- 多图：`.asset-gallery > .asset-frame > .fit-img`。
- 图片与容器都设置 `min-width:0; min-height:0; max-width:100%; max-height:100%`。
- 信息图、UI、海报和文字密集图使用 `object-fit:contain`；背景使用白色或浅紫灰。
- 短文字卡使用 `text-compact`，取消默认最小高度，避免挤压图片。

## 2. 候选布局评分

对左右排、上下排、均分网格、加权网格和拆页至少比较三种可行方案。图片宽高比为 `r`、容器为 `cw × ch` 时：

```text
dw = min(cw, ch × r)
dh = min(ch, cw ÷ r)
display_area = dw × dh
```

依次判断：

1. 每张文字密集图片宽度是否至少约 `624px`、最短边是否至少约 `312px`。
2. 最小图片显示面积是否过度小于最大图片；无明确主次时建议不低于最大图的 `35%`。
3. 总显示面积、源顺序、页数和版面均衡。

可读阈值优先于总面积。没有一种同页方案达标时拆成相邻页，不按横图、竖图或图片数量预设固定方向。

## 3. 排列方式

- 同高排列：列宽按图片 `width / height` 加权。
- 同宽排列：行高按图片 `height / width` 加权。
- 混合比例优先使用加权行列；均分网格导致明显失衡时禁止使用。
- 纯图片页可放 1–4 张图，但每张都必须达到可读阈值。
- 图片说明优先同页；说明挤压图片时可放相邻说明页，图片只展示一次。

## 4. 最小 CSS

```css
.image-wrap,.asset-frame{display:grid;place-items:center;overflow:hidden;background:#f8f5ff;box-sizing:border-box}
.fit-img{display:block;width:100%;height:100%;min-width:0;min-height:0;max-width:100%;max-height:100%;object-fit:contain}
.asset-gallery{display:grid;gap:21.6px;width:100%;height:100%;min-width:0;min-height:0;overflow:hidden}
.asset-gallery>*{min-width:0;min-height:0}
.card.text-compact,.text-compact{min-height:0;height:auto;align-self:start}
.weighted-row{grid-template-columns:var(--cols);grid-template-rows:1fr}
.weighted-stack{grid-template-columns:1fr;grid-template-rows:var(--rows)}
```
