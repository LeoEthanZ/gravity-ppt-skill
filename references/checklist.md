# Checklist

Run this after generating or editing a deck.

## P0 · Must Pass

- `<!-- SLIDES_HERE -->` has been replaced in the final deck.
- Cover, Index, and Section pages are still the first three slides.
- Cover and Section pages use `canvas.ascii-bg`; Index page does not.
- Each major section starts with a purple ASCII section page matching the first section page.
- Section page titles are centered both horizontally and vertically in the 16:9 canvas.
- The deck has browser resize scaling based on a 16:9 canvas, so the canvas shrinks proportionally when the viewport is smaller.
- Cover `.lesson` contains the course name without the Lesson number; cover `.cover-title` remains decorative English, normally `GRAVITATION AIGC-COURSE`.
- Index entries fit inside the white canvas. For 5+ entries, use a compact index style with smaller row height and font size.
- Content pages use `data-layout="C01"` through `C18`.
- Content pages keep the fixed chrome:
  - `.chapter`
  - `.section-sub`
  - `.title-rule`
  - `.summary`
  - `.content-logo`
- Bottom summary uses `bottom:43.5px`, matching the chapter top margin.
- Theme color remains `#9268f8`.
- Fonts are sans-serif only.
- No content overlaps the footer summary or navigation dots.
- Source-document images are extracted into the output asset folder and referenced by the final deck.
- Deck images use contain-style fitting (`.fit-img` or equivalent), not cropping cover-style fitting.
- Multi-image source material is represented with gallery grids or additional repeated slides; it is not silently dropped because a template block has only one image slot.
- If repeated content has fewer items than the layout, remove trailing empty containers; if it has more items, add matching containers or split to a continuation slide.
- Source text is preserved as much as possible; wording is changed only for space, pagination, or generated navigation/summary.
- Images remain associated with their source paragraph/table/section and are not pooled into unrelated gallery pages.
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
- Purple cards keep black `h3` unless the layout explicitly says otherwise.
- `C18` spotlight uses one semi-transparent purple mask with a single circular cutout.
- Image containers show full product/interface/poster content with background-color letterboxing where proportions differ.

## P2 · Content Quality

- One slide should carry one dominant idea.
- Use large type for claims and lighter grey for explanation.
- Prefer empty space over decorative clutter.
- Keep image placeholders and charts aligned to the existing grid.
