# Gravity PPT Skill

Generate single-file HTML slide decks in the "万有引力 / Gravitation" visual style for Codex.

This skill provides a reusable 16:9 HTML presentation template with a purple Nordic-minimal visual system, animated ASCII backgrounds, fixed cover/index/section pages, and 18 content slide layouts.

## What Is Included

- `SKILL.md` - Codex skill instructions and workflow.
- `assets/template.html` - Base horizontal HTML deck template.
- `assets/*.svg` - Cover, logo, and content-page visual assets.
- `references/content-layouts.md` - Reusable content slide sections `C01` through `C18`.
- `references/checklist.md` - Visual and structural QA checklist.
- `scripts/validate-deck.mjs` - Node.js deck validator.

## Install

Copy or clone this folder into your Codex skills directory:

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/YOUR_GITHUB_USERNAME/gravity-ppt-skill.git ~/.codex/skills/gravity-ppt-skill
```

Restart Codex after installation if the skill does not appear immediately.

## Use

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

## Style Notes

- Canvas base size is `1600px x 900px`.
- Theme color is `#9268f8`.
- Cover and section pages use the white ASCII animated background.
- Content pages use fixed chrome: chapter, section subtitle, rule, summary, and content logo.
- Deck images should use contain-style fitting so products, interfaces, posters, and case details are not cropped.

