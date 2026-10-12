# Checklist

Run this after generating or editing a deck.

## P0 · Must Pass

- 生成模式已经由用户明确指定或选择；未指定时已先询问 A｜智能规划或 B｜轻量编排。
- 选择 A 时，`page-plan.json` 已通过 `validate-page-plan.mjs`，最终页面与规划的顺序、素材归属和版式一致；内容页从空白模板生成，不是旧稿复制品。
- A 的生成器只按 `page-plan.json.pages` 渲染，没有按标题级别、Markdown 块、图片、表格、代码块或字符阈值运行第二套机械分页算法；任何渲染后分页调整都已先回写规划并重新校验。
- A 已在 1920×1080 用模板真实导航逐页渲染，并同时审计溢出和实际低密度；没有用不受模板支持的 hash 跳页方式制造虚假的“全页检查”。
- A 的渲染审计检查了正文区可见兄弟元素的边界相交；页内标题、段落、列表、表格和图片之间没有重叠，不能仅以 `scrollHeight <= clientHeight` 判定页面正常。
- 选择 B 时，没有声称执行过 Step 0；`quick-outline.json` 已覆盖全部 `content_blocks`，并在写 HTML 前通过校验。
- B 已用内容证据设定章节预算；普通页单块比例、平均块数和连续碎片链均通过校验。
- B 中 7–10 节点流程使用多行或有理由地拆页；六阶段任务链优先一页 3×2，不机械拆成 4+2。
- C10 仅承载源文档真实可绘制数据；普通分类、对比和任务表使用对应版式。
- B 已在 1920×1080 渲染全部内容页，并在较窄视口复查风险页；修复记录已写回 `render_audit` 并通过 `--post-render` 校验。
- `<!-- SLIDES_HERE -->` has been replaced in the final deck.
- Fixed opening pages are ordered as Cover, optional Lesson-name page, Index, then first Section page. If the optional Lesson page is absent, Index remains slide 2 and the first Section page remains slide 3.
- Cover and Section pages use `canvas.ascii-bg`; Index page does not.
- Each major section starts with a purple ASCII section page matching the first section page.
- Section page titles are centered both horizontally and vertically in the 16:9 canvas.
- The deck has browser resize scaling based on a 16:9 canvas, so the canvas shrinks proportionally when the viewport is smaller.
- Cover `.lesson` contains the course name without the Lesson number; cover `.cover-title` remains fixed decorative English, normally `GRAVITATION INTRODUCTION`, and is not rewritten from the course topic unless the user explicitly asks.
- Cover `.cover-title` and the year do not overlap; if spacing is tight, adjust size or position rather than changing the black title text.
- Index entries fit inside the white canvas. For 5+ entries, use a compact index style with smaller row height and font size.
- Content pages use `data-layout="C01"` through `C18`.
- Content pages keep the fixed chrome:
  - `.chapter`
  - `.section-sub`
  - `.title-rule`
  - `.summary`
  - `.content-logo`
- Gravity `.chapter` uses the template's single-line guard (`white-space:nowrap; overflow:hidden; text-overflow:ellipsis`), stays within the area left of the logo, and retains `fitChromeTitles()` with a 40–34px fitting range. `.section-sub` is also single-line and does not overlap `.chapter` or `.title-rule`.
- Bottom summary uses `bottom:52.2px`, matching the chapter top margin.
- Theme color remains `#9268f8`.
- Fonts are sans-serif only.
- No content overlaps the footer summary or navigation dots.
- Gravity navigation dots stay hidden while the pointer is outside the bottom hover zone, fade in when the pointer enters that zone, remain keyboard-focusable while visible, and stay visible on devices without hover support.
- Source-document images are extracted into the output asset folder and referenced by the final deck.
- Deck images use contain-style fitting (`.fit-img` or equivalent), not cropping cover-style fitting.
- Multi-image source material is represented with gallery grids or additional repeated slides; it is not silently dropped because a template block has only one image slot.
- Image groups have been checked by aspect ratio, and the chosen layout maximizes the actual rendered image area while preserving `contain`.
- Image groups have been compared against candidate layouts using actual contain-rendered image area, not only container area.
- If a candidate layout makes a text-heavy image, UI screenshot, report, poster, or long screenshot fall below the minimum readable display size, the group has been re-laid out or split into continuation slides.
- Mixed-aspect image groups avoid equal grids when aspect ratios differ sharply; they use weighted rows/columns or continuation slides instead.
- Left/right media layouts let the image column start near the title edge when it improves image area; short text cards do not push images downward or shrink them.
- Multi-image stacks follow the matching-edge rule on the actual rendered image, not only the container: vertical landscape stacks keep equal image width with row heights proportional to `height / width`; horizontal portrait rows keep equal image height with column widths proportional to `width / height`.
- Image direction and count do not prescribe a fixed layout; candidate layouts are compared by actual displayed area and minimum readability.
- Short `card fill text-compact` blocks override the template card minimum height and shrink to their text content; one-line cards do not leave large empty bottoms.
- C03 top explanation cards use `text-compact` when followed by image galleries, so the lower image region receives the saved vertical space.
- Text color has sufficient contrast against colored or dark backgrounds; purple/dark cards use white or high-contrast text.
- If repeated content has fewer items than the layout, remove trailing empty containers; if it has more items, add matching containers or split to a continuation slide.
- Source text is preserved verbatim except for unambiguous typo or punctuation corrections; space, pagination, navigation, summaries, and visual design are not valid reasons to rewrite or shorten it.
- No source paragraph, list item, table row, table column, caption, biography, notice, or quotation has been summarized, merged, reorganized, polished, or omitted.
- Long source content is split across continuation slides without deleting or compressing any original text.
- Directory `.index-name` entries use existing source-document headings with only the leading chapter number removed when `.index-no` already displays it; section titles, page titles, and chapter labels otherwise preserve the source headings.
- Directory `.index-sub` entries contain concise, faithful English translations of their corresponding directory headings and do not repeat the Chinese title; English translations do not appear in section pages, content-page titles, chapter labels, or body copy.
- Course hierarchy is rendered consistently: level-1 headings drive chapters/section pages, level-2 headings appear once as black `.page-title`, and level-3 headings appear as purple in-body group titles. A level-3 heading is not duplicated as the black page title when its level-2 parent exists, and the level-2 title is not repeated again inside the body.
- Each `.summary` either quotes a complete source sentence verbatim or remains empty; it never contains a model-generated summary.
- Tables preserve every source row, column, field, and cell verbatim, splitting into continuation pages when required.
- Any typo correction is minimal and unambiguous; uncertain wording, names, brands, tool names, and colloquial expressions remain unchanged.
- Pagination is based on actual content volume and usable layout area, not one slide per Markdown heading, paragraph, line, or image group.
- Adjacent source blocks within the same subsection share a page when compatible, while preserving their original order and wording.
- Headings stay attached to their following text, table, list, or images; no short heading, label, table field, or one-to-two-word fragment occupies a slide by itself.
- Only top-level source chapters automatically receive purple ASCII section pages; second-level and lower headings do not automatically create section or transition slides.
- Low-density pages occupying less than roughly 25% of the usable body area have been merged with compatible adjacent source content, except intentional quotes, main visuals, section pages, or user-requested whitespace pages.
- Low-density status is based on rendered body bounds or screenshots, not only `estimated_fill` declared in JSON; no isolated `##`/`###`/`####` heading page or consecutive fragment chain remains.
- Overfull pages exceeding roughly 85% of the usable body area, requiring unreadably small text, or making images/tables unreadable have been split into continuation pages.
- Continuation pages keep exactly the same source title; no “续”, “（续）”, English suffix, or generated qualifier has been added.
- Tables and lists were split only after checking actual rendered remaining height; no continuation page exists when its rows could fit legibly on the previous page.
- Uneven card groups use available horizontal space: a substantially longer card spans columns or expands before its font is reduced, and no card text is clipped.
- Arrow-linked source text such as `👉` or `→` is recognized as an ordered process and uses C07 when the nodes express sequence.
- Ordered lists preserve their original start number across source blocks, pages, and interleaved screenshots using `<ol start="N">` or explicit source numbering; no later step block silently restarts at 1.
- Obsidian embeds in tables parse `![[name.svg|64]]` and `![[name.svg\|64]]` before table splitting; the size separator is not treated as a column delimiter. Every referenced SVG is copied, loaded with `naturalWidth > 0`, and visibly rendered as an image.
- Long code, Instructions, specification, or appendix content is truncated only with explicit user authorization; the plan records the authorized display range and the slide does not imply that the excerpt is complete.
- Small logos, tool icons, and similar images use a horizontal arrangement when vertical stacking would make them tiny or leave large empty space.
- Person portraits and biographies have been checked against both preceding and following headings; no teacher/team image is shifted to the wrong person.
- Text, list, table, and image quantities have been checked against the content-volume guidelines before pagination; page count is not mechanically derived from block count.
- Every selected C01–C18 layout matches the source content type; no layout requires invented claims, steps, metrics, comparisons, dimensions, conclusions, or captions.
- Image labels and descriptions remain on the same page as their images whenever readability permits; they are not separated into short text-only pages.
- Images remain associated with their source paragraph/table/section and are not pooled into unrelated gallery pages.
- UI tutorial steps preserve atomic text–screenshot pairing: each screenshot appears with its actual step text, no next-step heading is stranded on the preceding page, and “one step per page” requests expose neither the next step nor its screenshot early.
- Adjacent short concept/feature/use subsections under the same level-2 heading have been tested for consolidation; avoid leaving a sparse concept page beside another compatible short text page.
- C04/C07 and similar repeated card layouts keep all peer cards visually consistent unless the user explicitly requests a highlighted card.
- If a purple card is explicitly used, it uses white `h3`/`p` text and white pill background with purple pill text.
- Normal content `h3` uses theme purple/deep purple, while purple-card `h3` stays white.
- `h2`, `h3`, and `p` are slightly smaller than the original template default, leaving more space for images.

## P1 · Visual Compare

Compare against the template in a browser, not only by reading code:

- Cover logo should be small, wide, and top-left, matching the Figma ratio.
- Cover right-bottom icon group should sit fully inside the purple canvas.
- Index page should be white and static.
- Section page should be purple with white ASCII dynamic characters.
- Content page logo should match the original Figma logo composition.
- Purple/dark cards use white or high-contrast text.
- `C18` spotlight uses one semi-transparent purple mask with a single circular cutout.
- Image containers show full product/interface/poster content with background-color letterboxing where proportions differ.

## P2 · Content Quality

- One slide should carry one dominant idea.
- One dominant idea may contain multiple adjacent source paragraphs, lists, labels, tables, and images when they belong to the same subsection; do not confuse “one idea” with “one source block”.
- Avoid sparse slides containing only a short heading, label, or one-to-two-word fragment.
- Prefer the layout that naturally carries the existing source structure, even when that means reusing the same layout on consecutive slides.
- Use large type for claims and lighter grey for explanation.
- Prefer empty space over decorative clutter.
- Keep image placeholders and charts aligned to the existing grid.
