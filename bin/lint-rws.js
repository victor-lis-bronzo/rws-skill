#!/usr/bin/env node
/**
 * lint-rws.js — Health check mecânico de uma base RWS (Raw Sources, Wiki & Schema).
 *
 * Uso:
 *   node lint-rws.js [raiz-do-projeto] [--json]
 *
 * Checagens:
 *   ERRO    estrutura ausente (wiki/, index.md, log.md)
 *   ERRO    wikilink quebrado
 *   ERRO    página da wiki ausente do index.md
 *   ERRO    slug duplicado
 *   ERRO    frontmatter sem title/type
 *   ERRO    cabeçalho de log fora do padrão "## [AAAA-MM-DD] operação | título"
 *   ERRO    sources: aponta para arquivo inexistente
 *   AVISO   frontmatter sem status/created/updated
 *   AVISO   página órfã (sem links de entrada além do index)
 *   AVISO   log fora de ordem cronológica
 *   AVISO   raw source não referenciada por nenhuma página da wiki
 *
 * Sem dependências. Node >= 18. Sai com código 1 se houver erros.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const root = path.resolve(args.find((a) => !a.startsWith('--')) || process.cwd());

const SPECIAL = new Set(['index', 'log']);
const EXEMPT_ORPHAN = new Set(['overview']);
const LOG_HEADER = /^## \[(\d{4}-\d{2}-\d{2})\] [a-z][a-z0-9:-]* \| .+$/;

const issues = [];
const add = (level, file, message) =>
  issues.push({ level, file: file ? path.relative(root, file).replace(/\\/g, '/') : null, message });

// ---------- helpers ----------
function walk(dir, filter = () => true) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out;
}

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  const data = {};
  let currentKey = null;
  for (const raw of m[1].split(/\r?\n/)) {
    const line = raw.replace(/\s+#.*$/, '');
    if (!line.trim()) continue;
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(unquote(item[1].trim()));
      continue;
    }
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      const value = kv[2].trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        const inner = value.slice(1, -1).trim();
        data[currentKey] = inner ? splitInlineList(inner).map(unquote) : [];
      } else {
        data[currentKey] = value === '' ? '' : unquote(value);
      }
    }
  }
  return data;
}

function splitInlineList(s) {
  // separa por vírgula respeitando aspas e [[ ]]
  const parts = [];
  let buf = '';
  let depth = 0;
  let quote = null;
  for (const ch of s) {
    if (quote) {
      if (ch === quote) quote = null;
      buf += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      buf += ch;
    } else if (ch === '[') {
      depth++;
      buf += ch;
    } else if (ch === ']') {
      depth--;
      buf += ch;
    } else if (ch === ',' && depth === 0) {
      parts.push(buf.trim());
      buf = '';
    } else buf += ch;
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

function unquote(s) {
  return s.replace(/^["'](.*)["']$/, '$1');
}

function stripCode(text) {
  return text
    .replace(/^(```|~~~)[\s\S]*?^\1/gm, '') // blocos cercados
    .replace(/<!--[\s\S]*?-->/g, '') // comentários HTML
    .replace(/`[^`\n]*`/g, ''); // código inline
}

function extractLinks(text) {
  const links = [];
  const re = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g;
  let m;
  while ((m = re.exec(text))) links.push(path.basename(m[1].trim()).replace(/\.md$/i, ''));
  return links;
}

// ---------- estrutura ----------
const wikiDir = path.join(root, 'wiki');
const rawDir = path.join(root, 'raw');
const schemaDir = path.join(root, 'schema');
const indexPath = path.join(wikiDir, 'index.md');
const logPath = path.join(wikiDir, 'log.md');

if (!fs.existsSync(wikiDir)) add('error', null, `Pasta wiki/ não encontrada em ${root}`);
if (!fs.existsSync(rawDir)) add('warning', null, 'Pasta raw/ não encontrada');
if (!fs.existsSync(schemaDir)) add('warning', null, 'Pasta schema/ não encontrada');
else if (!fs.existsSync(path.join(schemaDir, 'schema.md'))) add('warning', null, 'schema/schema.md não encontrado');
if (fs.existsSync(wikiDir) && !fs.existsSync(indexPath)) add('error', null, 'wiki/index.md não encontrado');
if (fs.existsSync(wikiDir) && !fs.existsSync(logPath)) add('error', null, 'wiki/log.md não encontrado');

// ---------- páginas ----------
const pageFiles = walk(wikiDir, (f) => f.toLowerCase().endsWith('.md'));
const pages = new Map(); // slug -> { file, text, body, fm }

for (const file of pageFiles) {
  const slug = path.basename(file, path.extname(file));
  const text = fs.readFileSync(file, 'utf8');
  if (pages.has(slug)) {
    add('error', file, `Slug duplicado "${slug}" (também em ${path.relative(root, pages.get(slug).file)})`);
    continue;
  }
  pages.set(slug, { file, text, fm: parseFrontmatter(text) });
}

// ---------- frontmatter + sources ----------
for (const [slug, page] of pages) {
  if (SPECIAL.has(slug)) continue;
  const fm = page.fm;
  if (!fm) {
    add('error', page.file, 'Frontmatter YAML ausente');
    continue;
  }
  for (const key of ['title', 'type']) if (!fm[key]) add('error', page.file, `Frontmatter sem "${key}"`);
  for (const key of ['status', 'created', 'updated']) if (!fm[key]) add('warning', page.file, `Frontmatter sem "${key}"`);

  const sources = Array.isArray(fm.sources) ? fm.sources : fm.sources ? [fm.sources] : [];
  for (const src of sources) {
    if (!src || /^https?:\/\//.test(src)) continue;
    const clean = src.split('#')[0];
    if (!fs.existsSync(path.join(root, clean))) add('error', page.file, `sources: "${src}" não existe`);
  }
}

// ---------- links ----------
const inbound = new Map([...pages.keys()].map((s) => [s, new Set()]));
const indexLinks = new Set();

for (const [slug, page] of pages) {
  const body = stripCode(page.text);
  const fmLinks = page.fm && Array.isArray(page.fm.related) ? page.fm.related.join(' ') : '';
  const links = extractLinks(body + '\n' + fmLinks);
  for (const target of links) {
    if (!pages.has(target)) {
      add('error', page.file, `Wikilink quebrado: [[${target}]]`);
      continue;
    }
    if (slug === 'index') indexLinks.add(target);
    else if (target !== slug) inbound.get(target).add(slug);
  }
}

for (const [slug, page] of pages) {
  if (SPECIAL.has(slug)) continue;
  if (fs.existsSync(indexPath) && !indexLinks.has(slug)) add('error', page.file, `Página ausente do index.md: [[${slug}]]`);
  if (!EXEMPT_ORPHAN.has(slug) && page.fm?.type !== 'task' && inbound.get(slug).size === 0)
    add('warning', page.file, `Página órfã: nenhuma outra página linka [[${slug}]]`);
}

// ---------- log ----------
if (fs.existsSync(logPath)) {
  const lines = stripCode(fs.readFileSync(logPath, 'utf8')).split(/\r?\n/);
  let last = null;
  lines.forEach((line, i) => {
    if (!line.startsWith('## ')) return;
    const m = line.match(LOG_HEADER);
    if (!m) {
      add('error', logPath, `Linha ${i + 1}: cabeçalho fora do padrão "## [AAAA-MM-DD] operação | título" → ${line}`);
      return;
    }
    if (last && m[1] < last) add('warning', logPath, `Linha ${i + 1}: data ${m[1]} anterior à entrada anterior (${last})`);
    last = m[1];
  });
}

// ---------- raw não ingeridas ----------
if (fs.existsSync(rawDir)) {
  const allWikiText = [...pages.values()].map((p) => p.text).join('\n').replace(/\\/g, '/');
  const rawFiles = walk(rawDir, (f) => {
    const rel = path.relative(rawDir, f).replace(/\\/g, '/');
    return !rel.startsWith('_archive/') && !rel.startsWith('assets/') && !rel.endsWith('.meta.md');
  });
  for (const f of rawFiles) {
    const rel = path.relative(root, f).replace(/\\/g, '/');
    if (!allWikiText.includes(rel)) add('warning', f, 'Raw source não referenciada por nenhuma página da wiki (não ingerida?)');
  }
}

// ---------- saída ----------
const errors = issues.filter((i) => i.level === 'error');
const warnings = issues.filter((i) => i.level === 'warning');
const summary = {
  root,
  pages: [...pages.keys()].filter((s) => !SPECIAL.has(s)).length,
  errors: errors.length,
  warnings: warnings.length,
};

if (asJson) {
  console.log(JSON.stringify({ summary, issues }, null, 2));
} else {
  console.log(`RWS lint — ${root}`);
  console.log(`${summary.pages} páginas · ${summary.errors} erro(s) · ${summary.warnings} aviso(s)\n`);
  for (const i of [...errors, ...warnings]) {
    const tag = i.level === 'error' ? 'ERRO ' : 'AVISO';
    console.log(`${tag}  ${i.file ? i.file + ': ' : ''}${i.message}`);
  }
  if (!issues.length) console.log('✔ Base saudável.');
}

process.exit(errors.length ? 1 : 0);
