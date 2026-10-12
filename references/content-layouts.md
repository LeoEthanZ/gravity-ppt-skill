# Content Layouts

Use these complete slide sections by copying one or more blocks into `assets/template.html` at `<!-- SLIDES_HERE -->`. Keep `data-layout` unchanged so the validator can check the deck.

## C01 · 01 图文 · 左图右文

```html
<section class="slide" data-layout="C01">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">01 图文 · 左图右文</h2>
      <div class="short-rule"></div>
      <div class="content-grid two-col" style="grid-template-columns: 1.05fr .95fr"><div class="photo-box"><span>Image Area</span></div><div class="card fill"><h3>标题与叙事</h3><p>左侧承载图片、产品截图或场景照片；右侧用于解释背景、洞察和结论，适合案例开场。</p></div></div>
    </div>
  </div>
</section>
```

## C02 · 02 图文 · 左文右图

```html
<section class="slide" data-layout="C02">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">02 图文 · 左文右图</h2>
      <div class="short-rule"></div>
      <div class="content-grid two-col" style="grid-template-columns: .95fr 1.05fr"><div class="card fill"><h3>观点先行</h3><p>左侧先给出核心判断，右侧用一张视觉证据支撑。适合汇报、产品说明和方案解读。</p></div><div class="photo-box"><span>Visual Proof</span></div></div>
    </div>
  </div>
</section>
```

## C03 · 03 图文 · 上文下图

```html
<section class="slide" data-layout="C03">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">03 图文 · 上文下图</h2>
      <div class="short-rule"></div>
      <div class="content-grid" style="grid-template-rows: auto 1fr"><div class="card" style="min-height:0"><h3>先把问题讲清楚</h3><p>上方放一段简洁说明，底部用宽图承接重点画面，适合截图、流程图、产品图。</p></div><div class="photo-box" style="min-height:396px"><span>Wide Image</span></div></div>
    </div>
  </div>
</section>
```

## C04 · 04 多栏论述

```html
<section class="slide" data-layout="C04">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">04 多栏论述</h2>
      <div class="short-rule"></div>
      <div class="content-grid four-col"><div class="card fill"><h3>背景</h3><p>为什么现在需要讨论这个问题。</p></div><div class="card"><h3>判断</h3><p>核心观点和主要方向。</p></div><div class="card"><h3>证据</h3><p>关键数据、案例或观察。</p></div><div class="card purple"><h3>行动</h3><p>下一步应该怎么做。</p></div></div>
    </div>
  </div>
</section>
```

## C05 · 05 金句强调

```html
<section class="slide" data-layout="C05">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">05 金句强调</h2>
      <div class="short-rule"></div>
      <div class="content-grid two-col" style="grid-template-columns: 1.28fr .72fr"><p class="quote">越简单的画面，越需要明确的判断。</p><div class="card fill"><h3>使用方式</h3><p>用于章节转折、观点强化或演讲中的停顿页，避免塞入过多解释。</p></div></div>
    </div>
  </div>
</section>
```

## C06 · 06 时间线

```html
<section class="slide" data-layout="C06">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">06 时间线</h2>
      <div class="short-rule"></div>
      <div class="timeline"><div class="step"><h3>发现</h3><p>识别信号</p></div><div class="step"><h3>定义</h3><p>收敛问题</p></div><div class="step"><h3>设计</h3><p>建立方案</p></div><div class="step"><h3>验证</h3><p>小步试验</p></div><div class="step"><h3>扩展</h3><p>沉淀机制</p></div></div>
    </div>
  </div>
</section>
```

## C07 · 07 流程

```html
<section class="slide" data-layout="C07">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">07 流程</h2>
      <div class="short-rule"></div>
      <div class="content-grid four-col process-grid"><div class="card"><span class="pill">STEP 01</span><h3>输入</h3><p>收集材料与限制条件。</p></div><div class="card"><span class="pill">STEP 02</span><h3>整理</h3><p>分类、删减、建立层级。</p></div><div class="card"><span class="pill">STEP 03</span><h3>表达</h3><p>选择版式并形成画面。</p></div><div class="card purple"><span class="pill">STEP 04</span><h3>交付</h3><p>检查、演示、迭代。</p></div></div>
    </div>
  </div>
</section>
```

## C08 · 08 大数字

```html
<section class="slide" data-layout="C08">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">08 大数字</h2>
      <div class="short-rule"></div>
      <div class="metric-board"><div class="metric-card hero"><div><div class="num">72%</div><p class="small">关键指标或阶段占比，适合做主结论。</p></div><p class="small">Primary metric</p></div><div class="metric-card thin"><div class="num">3.4x</div><p class="small">效率提升倍数</p></div><div class="metric-card compact"><div class="num">18</div><p class="small">内容模块数量</p></div><div class="metric-card compact"><div class="num">6</div><p class="small">可复用场景</p></div><div class="metric-card thin"><div class="num">24h</div><p class="small">完成周期示例</p></div></div>
    </div>
  </div>
</section>
```

## C09 · 09 左文右表格

```html
<section class="slide" data-layout="C09">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">09 左文右表格</h2>
      <div class="short-rule"></div>
      <div class="content-grid two-col" style="grid-template-columns:.8fr 1.2fr"><div class="card fill"><h3>表格用于比较结构化信息</h3><p>左侧解释表格的阅读方式，右侧放关键维度，保持线条轻、文字少。</p></div><table class="table"><tr><th>维度</th><th>当前</th><th>目标</th></tr><tr><td>速度</td><td>手动</td><td>自动</td></tr><tr><td>质量</td><td>不稳定</td><td>可复用</td></tr><tr><td>协同</td><td>分散</td><td>统一</td></tr></table></div>
    </div>
  </div>
</section>
```

## C10 · 10 可视化图表

```html
<section class="slide" data-layout="C10">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">10 可视化图表</h2>
      <div class="short-rule"></div>
      <div class="content-grid two-col" style="grid-template-columns:1.15fr .85fr"><div class="mini-chart"><div style="height:48%" data-label="A"></div><div style="height:72%" data-label="B"></div><div style="height:64%" data-label="C"></div><div style="height:86%" data-label="D"></div><div style="height:58%" data-label="E"></div><div style="height:92%" data-label="F"></div></div><div class="card fill"><h3>图表说明</h3><p>紫色作为唯一强调色，浅灰负责承载结构，适合趋势、对比和阶段表现。</p></div></div>
    </div>
  </div>
</section>
```

## C11 · 11 左右对比

```html
<section class="slide" data-layout="C11">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">11 左右对比</h2>
      <div class="short-rule"></div>
      <div class="content-grid two-col"><div class="card compare-card before"><h3>Before</h3><ul class="list"><li><b>01</b><span>信息散落，读者难以定位重点</span></li><li><b>02</b><span>每页都重新设计，效率偏低</span></li><li><b>03</b><span>视觉语言不统一</span></li></ul></div><div class="card compare-card after"><h3>After</h3><ul class="list"><li><b>01</b><span>结构清晰，阅读路径稳定</span></li><li><b>02</b><span>版式复用，快速扩展</span></li><li><b>03</b><span>统一主题与品牌感</span></li></ul></div></div>
    </div>
  </div>
</section>
```

## C12 · 12 观点矩阵

```html
<section class="slide" data-layout="C12">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">12 观点矩阵</h2>
      <div class="short-rule"></div>
      <div class="content-grid"><div class="matrix"><div class="card fill"><h3>高价值 / 高确定</h3><p>优先推进，直接转为行动。</p></div><div class="card"><h3>高价值 / 低确定</h3><p>小范围验证，降低风险。</p></div><div class="card"><h3>低价值 / 高确定</h3><p>流程化或自动化处理。</p></div><div class="card purple"><h3>低价值 / 低确定</h3><p>暂缓，避免消耗注意力。</p></div></div></div>
    </div>
  </div>
</section>
```

## C13 · 13 大图 · 主视觉

```html
<section class="slide" data-layout="C13">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">13 大图 · 主视觉</h2>
      <div class="short-rule"></div>
      <div class="content-grid" style="grid-template-rows:1fr auto"><div class="photo-box" style="min-height:600px"><span>Main Visual</span></div><p class="small muted">用于承载核心截图、产品场景、主视觉照片或证据图，画面尽量留白。</p></div>
    </div>
  </div>
</section>
```

## C14 · 14 多观点 · 列表

```html
<section class="slide" data-layout="C14">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">14 多观点 · 列表</h2>
      <div class="short-rule"></div>
      <div class="content-grid two-col"><ul class="list"><li><b>01</b><span>先给结论，而不是先堆背景。</span></li><li><b>02</b><span>每个观点只保留一层解释。</span></li><li><b>03</b><span>用留白建立节奏，而不是靠装饰。</span></li></ul><ul class="list"><li><b>04</b><span>关键词使用主题紫色点亮。</span></li><li><b>05</b><span>同类信息保持同一种版式。</span></li><li><b>06</b><span>收束页只留下可行动内容。</span></li></ul></div>
    </div>
  </div>
</section>
```

## C15 · 15 案例拆解

```html
<section class="slide" data-layout="C15">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">15 案例拆解</h2>
      <div class="short-rule"></div>
      <div class="content-grid split-heavy"><div class="purple-panel"><h3>Case Study</h3><p class="small" style="color:#fff">用一个真实案例说明方法如何落地，并展示关键转折点。</p></div><div class="card"><h3>拆解维度</h3><ul class="list"><li><b>01</b><span>背景与目标</span></li><li><b>02</b><span>关键动作</span></li><li><b>03</b><span>结果与启发</span></li></ul></div></div>
    </div>
  </div>
</section>
```

## C16 · 16 收束结论

```html
<section class="slide" data-layout="C16">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">16 收束结论</h2>
      <div class="short-rule"></div>
      <div class="content-grid" style="display:block"><p class="quote" style="max-width:1584px">最后只留下一个判断、三个行动和一个能被记住的短语。</p><div class="hairline" style="margin:62.4px 0"></div><div class="content-grid three-col" style="position:static"><div class="card"><h3>判断</h3><p>一句话说明方向。</p></div><div class="card"><h3>行动</h3><p>列出下一步动作。</p></div><div class="card purple"><h3>记忆点</h3><p>留下可传播表达。</p></div></div></div>
    </div>
  </div>
</section>
```

## C17 · 17 作业布置

```html
<section class="slide" data-layout="C17">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">17 作业布置</h2>
      <div class="short-rule"></div>
      <div class="content-grid assignment"><div class="card fill"><h3>本周任务</h3><div class="task"><b>1</b><span>选择一个真实主题，套用 3 种内容页。</span></div><div class="task"><b>2</b><span>把每页文字压缩到 30 秒内可读。</span></div><div class="task"><b>3</b><span>用同一主题色检查视觉一致性。</span></div></div><div class="photo-box"><span>Homework</span></div></div>
    </div>
  </div>
</section>
```

## C18 · 18 图片聚焦 · 聚光灯

```html
<section class="slide" data-layout="C18">
  <div class="canvas content nordic">
        <div class="content-chrome">
          <p class="chapter">章节名称</p>
          <p class="section-sub">Section ｜ 小节名称</p>
          <div class="title-rule"></div>
          <p class="summary"></p>
          <div class="content-logo" aria-label="万有引力 Natural Solution"><img class="a" src="assets/content-logo-a.svg" alt=""><img class="b" src="assets/content-logo-b.svg" alt=""><img class="c" src="assets/content-logo-c.svg" alt=""></div>
        </div>
    <div class="main">
      <h2 class="page-title">18 图片聚焦 · 聚光灯</h2>
      <div class="short-rule"></div>
      <div class="spotlight spotlight-focus"><div class="photo-box"><span>Focus Image</span></div><div class="card fill"><h3>聚光说明</h3><p>遮罩使用半透明主题色，只保留聚光区域完全可见，适合强调一张最关键的图。</p></div></div>
    </div>
  </div>
</section>
```
