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

const firstThree = slides.slice(0, 3).map((slide) => slide.html);
if (!firstThree[0]?.includes('class="canvas cover"')) errors.push('Slide 1 should be the cover page.');
if (!firstThree[1]?.includes('index-title')) errors.push('Slide 2 should be the index page.');
if (!firstThree[2]?.includes('section-page')) errors.push('Slide 3 should be the section page.');

const asciiCount = (html.match(/class="ascii-bg"/g) || []).length;
const sectionPageCount = slides.filter((slide) => slide.html.includes('section-page')).length;
const expectedAsciiCount = 1 + sectionPageCount;
if (asciiCount !== expectedAsciiCount) {
  errors.push(`Expected ${expectedAsciiCount} ASCII backgrounds (cover + section pages), found ${asciiCount}.`);
}
if (firstThree[1]?.includes('ascii-bg')) errors.push('Index page should stay static and must not contain ascii-bg.');

const allowed = new Set(Array.from({ length: 18 }, (_, i) => `C${String(i + 1).padStart(2, '0')}`));
const contentSlides = slides.slice(3);

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

if (!/\.summary\s*\{[\s\S]*?bottom:\s*43\.5px/.test(html)) {
  errors.push('CSS .summary must use bottom:43.5px.');
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
