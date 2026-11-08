#!/usr/bin/env node
/**
 * check-links.js — validates relative markdown links inside skills/rws/.
 * Ignores code spans/blocks, URLs and anchors-only links. Anchors on files are not checked.
 * Also fails if any link escapes the skill folder (the skill must stay self-contained).
 * Usage: node scripts/check-links.js [skill-dir]   (default: skills/rws)
 */
'use strict';
const fs = require('fs');
const path = require('path');

const skill = path.resolve(process.argv[2] || path.join(__dirname, '..', 'skills', 'rws'));
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md')) files.push(p);
  }
})(skill);

let errors = 0;
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8').replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  for (const m of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const href = m[1];
    if (/^([a-z]+:|#|mailto:)/i.test(href)) continue;
    const target = path.resolve(path.dirname(f), href.split('#')[0]);
    const rel = path.relative(skill, f);
    if (path.relative(skill, target).startsWith('..')) {
      console.error(`ERROR ${rel}: link escapes the skill folder -> ${href}`); errors++;
    } else if (!fs.existsSync(target)) {
      console.error(`ERROR ${rel}: broken link -> ${href}`); errors++;
    }
  }
}
console.log(`${files.length} files checked, ${errors} error(s)`);
process.exit(errors ? 1 : 0);
