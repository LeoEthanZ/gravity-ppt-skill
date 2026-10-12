# Gravity PPT Skill

Generate single-file HTML slide decks in the "万有引力 / Gravitation" visual style for Codex.

This skill provides a reusable 16:9 HTML presentation template with a purple Nordic-minimal visual system, animated ASCII backgrounds, fixed cover/index/section pages, and 18 content slide layouts.

## What Is Included

- `SKILL.md` - Codex skill instructions and workflow.
- `assets/template.html` - Base horizontal HTML deck template.
- `assets/*.svg` - Cover, logo, and content-page visual assets.
- `references/content-layouts.md` - Reusable content slide sections `C01` through `C18`.
- `references/checklist.md` - Visual and structural QA checklist.
- `references/planning-guide.md` - Source understanding and page planning for intelligent mode A.
- `references/quick-mode-guide.md` - Content grouping and page budgets for quick mode B.
- `references/media-layouts.md` - Image ownership, contain fitting, and multi-image layout guidance.
- `scripts/validate-deck.mjs` - Node.js deck validator.
- `scripts/validate-page-plan.mjs` - Intelligent-mode page plan validator.
- `scripts/validate-quick-outline.mjs` - Quick-mode outline and render-audit validator.

## Install

Copy or clone this folder into your Codex skills directory:

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/LeoEthanZ/gravity-ppt-skill.git ~/.codex/skills/gravity-ppt-skill
```

Restart Codex after installation if the skill does not appear immediately.

## Use

Choose **A (intelligent planning)** or **B (quick arrangement)** before generating a deck. Both modes preserve source text and image associations; mode A uses `page-plan.json`, while mode B uses `quick-outline.json` with content grouping and page budgets. Follow `SKILL.md` and the corresponding guide.

Start a new deck from the bundled template:

```bash
mkdir -p my-deck/ppt/assets
cp assets/template.html my-deck/ppt/index.html
cp assets/*.svg my-deck/ppt/assets/
```

Then copy complete slide sections from `references/content-layouts.md` into the `<!-- SLIDES_HERE -->` placeholder in `my-deck/ppt/index.html`.

## Validate

Validate the bundled template:

```bash
node scripts/validate-deck.mjs assets/template.html --template
```

Validate a generated deck:

```bash
node scripts/validate-deck.mjs my-deck/ppt/index.html
```

Validate the selected generation mode before writing HTML:

```bash
# Mode A
node scripts/validate-page-plan.mjs my-deck/ppt/page-plan.json

# Mode B: before generation and after full-page browser QA
node scripts/validate-quick-outline.mjs my-deck/ppt/quick-outline.json
node scripts/validate-quick-outline.mjs my-deck/ppt/quick-outline.json --post-render
```

Structural validation does not replace browser QA for overflow, overlapping elements, image readability, and page density.

## Style Notes

- Canvas base size is `1920px x 1080px`.
- Theme color is `#9268f8`.
- Cover and section pages use the white ASCII animated background.
- The decorative cover title stays `GRAVITATION INTRODUCTION` unless explicitly changed; the white course name follows the source.
- Bottom navigation appears on pointer hover and remains visible on touch devices.
- Long chapter labels fit on one line with font adjustment and ellipsis.
- Content pages use fixed chrome: chapter, section subtitle, rule, summary, and content logo.
- Deck images should use contain-style fitting so products, interfaces, posters, and case details are not cropped.

