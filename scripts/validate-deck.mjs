#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const file = process.argv[2];
const isTemplate = process.argv.includes('--template');

if (!file) {
  console.error('Usage: node scripts/validate-deck.mjs <index.html> [--template]');
  process.exit(2);
}

const html = readFileSync(file, 'utf8');
const root = dirname(file);
const errors = [];
const warnings = [];

function lastCssValue(selector, property) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blockRe = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, 'g');
  let value = null;
  for (const block of html.matchAll(blockRe)) {
    const propRe = new RegExp(`(?:^|;)\\s*${property.replace('-', '\\-')}\\s*:\\s*([^;!}]+)(?:\\s*!important)?`, 'i');
    const match = block[1].match(propRe);
    if (match) value = match[1].trim().toLowerCase();
  }
  return value;
}

const slideRe = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>[\s\S]*?<\/section>/g;
const slides = [...html.matchAll(slideRe)].map((match, idx) => ({
  idx: idx + 1,
  html: match[0],
  tag: match[0].match(/<section\b[^>]*>/)?.[0] ?? '',
}));

if (!slides.length) errors.push('No <section class="slide"> pages found.');
if (!isTemplate && html.includes('<!-- SLIDES_HERE -->')) {
  errors.push('Template placeholder <!-- SLIDES_HERE --> is still present.');
}

if (!slides[0]?.html.includes('class="canvas cover"')) errors.push('Slide 1 should be the cover page.');
const hasLessonPage =
  slides[1]?.html.includes('section-page') &&
  slides[1]?.html.includes('section-name') &&
  /Lesson\s*\d+/i.test(slides[1]?.html ?? '');
const indexSlide = slides[hasLessonPage ? 2 : 1];
const firstSectionSlide = slides[hasLessonPage ? 3 : 2];
if (!indexSlide?.html.includes('index-title')) {
  errors.push(hasLessonPage ? 'Slide 3 should be the index page when an optional Lesson page is inserted after the cover.' : 'Slide 2 should be the index page.');
}
if (!firstSectionSlide?.html.includes('section-page')) {
  errors.push(hasLessonPage ? 'Slide 4 should be the first section page when an optional Lesson page is inserted after the cover.' : 'Slide 3 should be the section page.');
}

const asciiCount = (html.match(/class="ascii-bg"/g) || []).length;
const sectionPageCount = slides.filter((slide) => slide.html.includes('section-page')).length;
const expectedAsciiCount = 1 + sectionPageCount;
if (asciiCount !== expectedAsciiCount) {
  errors.push(`Expected ${expectedAsciiCount} ASCII backgrounds (cover + section pages), found ${asciiCount}.`);
}
if (indexSlide?.html.includes('ascii-bg')) errors.push('Index page should stay static and must not contain ascii-bg.');

const allowed = new Set(Array.from({ length: 18 }, (_, i) => `C${String(i + 1).padStart(2, '0')}`));
const fixedSlideCount = hasLessonPage ? 4 : 3;
const contentSlides = slides.slice(fixedSlideCount);

if (!isTemplate && contentSlides.length === 0) {
  errors.push('Final deck has no content slides after the fixed cover/index/section pages.');
}

contentSlides.forEach((slide) => {
  if (slide.html.includes('section-page')) {
    if (!slide.html.includes('ascii-bg')) errors.push(`Slide ${slide.idx}: section page must contain .ascii-bg.`);
    if (!slide.html.includes('section-name')) errors.push(`Slide ${slide.idx}: section page must contain .section-name.`);
    return;
  }

  const layout = slide.tag.match(/\bdata-layout="([^"]+)"/)?.[1];
  if (!layout) {
    errors.push(`Slide ${slide.idx}: missing data-layout.`);
  } else if (!allowed.has(layout)) {
    errors.push(`Slide ${slide.idx}: invalid data-layout="${layout}". Expected C01-C18.`);
  }

  for (const required of ['chapter', 'section-sub', 'title-rule', 'summary', 'content-logo', 'page-title']) {
    if (!slide.html.includes(required)) errors.push(`Slide ${slide.idx}: missing .${required}.`);
  }
});

if (!html.includes('--deck-width: 1920px') || !html.includes('--deck-height: 1080px')) {
  errors.push('Gravity canvas must use 1920x1080.');
}
if (!html.includes('const baseW = 1920') || !html.includes('const baseH = 1080')) {
  errors.push('Resize scaling must use a 1920x1080 base canvas.');
}
if (!/\.summary\s*\{[\s\S]*?bottom:\s*52\.2px/.test(html)) {
  errors.push('CSS .summary must use bottom:52.2px.');
}

for (const selector of ['.chapter', '.section-sub']) {
  const nowrap = lastCssValue(selector, 'white-space');
  const overflow = lastCssValue(selector, 'overflow');
  const ellipsis = lastCssValue(selector, 'text-overflow');
  if (nowrap !== 'nowrap') errors.push(`CSS ${selector} must end with white-space:nowrap.`);
  if (overflow !== 'hidden') errors.push(`CSS ${selector} must end with overflow:hidden.`);
  if (ellipsis !== 'ellipsis') errors.push(`CSS ${selector} must end with text-overflow:ellipsis.`);
}
if (!/function\s+fitChromeTitles\s*\(/.test(html)) {
  errors.push('Gravity deck must retain fitChromeTitles() for long single-line chapter titles.');
}
if (!/size\s*>\s*34/.test(html) || !/fontSize\s*=\s*['"]40px['"]/.test(html)) {
  errors.push('fitChromeTitles() must fit .chapter titles from 40px down to 34px before ellipsis.');
}

if (!html.includes('#9268f8')) warnings.push('Theme color #9268f8 not found.');
if (/data-motion-bg|FS_DARK|FS_LIGHT/.test(html)) {
  warnings.push('Legacy WebGL background code found; this skill should use ASCII backgrounds.');
}

const refs = [...html.matchAll(/\bsrc="([^"]+)"/g)].map((match) => match[1].split('?')[0]);
refs.forEach((ref) => {
  if (!ref.startsWith('assets/')) return;
  const copiedDeckPath = join(root, ref);
  const skillTemplatePath = join(root, basename(ref));
  if (!existsSync(copiedDeckPath) && !(isTemplate && existsSync(skillTemplatePath))) {
    errors.push(`Missing asset: ${ref}`);
  }
});

if (warnings.length) {
  console.warn('Warnings:');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (errors.length) {
  console.error('Deck validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Deck validation passed: ${slides.length} slide(s).`);
