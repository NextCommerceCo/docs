/**
 * Consistency between this site and the capability map snapshot
 * (lib/capabilities.snapshot.json, refreshed by `npm run sync-capabilities`).
 *
 *   1. every merchant page the map cites in operator_docs exists in content/docs
 *      (the map is published by the developer repo, which cannot check our tree)
 *   2. every page the map cites declares that id in frontmatter capability_ids
 *      (run with --write to insert them; the map is the source, the field is the
 *      derived copy that lets a page be filtered without the map)
 *   3. every capability_ids entry in frontmatter exists in the map
 *   4. audience / status / last_verified, when present, use the schema's values
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const map = JSON.parse(readFileSync(join(ROOT, 'lib', 'capabilities.snapshot.json'), 'utf8'));
const MERCHANT_SITE = map.sources.merchant_docs;
const knownIds = new Set(map.capabilities.map((c) => c.id));

const errors = [];

function pageExists(path) {
  if (path === '/changelog') return existsSync(join(ROOT, 'app', 'changelog'));
  const rel = path.replace(/^\/docs\/?/, '');
  const base = join(ROOT, 'content', 'docs', rel);
  return existsSync(`${base}.mdx`) || existsSync(`${base}.md`) || existsSync(join(base, 'index.mdx'));
}

const expectedIds = new Map();
for (const c of map.capabilities) {
  for (const url of c.operator_docs) {
    if (!url.startsWith(MERCHANT_SITE)) continue;
    const path = url.slice(MERCHANT_SITE.length);
    if (!pageExists(path)) errors.push(`capability ${c.id} cites ${path}, which does not exist on this site`);
    const set = expectedIds.get(path) ?? new Set();
    set.add(c.id);
    expectedIds.set(path, set);
  }
}

// Minimal frontmatter reader: the fields we check are flat scalars or flow lists.
function readFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, raw] = kv;
    const value = raw.trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value.slice(1, -1).split(',').map((v) => v.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      data[key] = value.replace(/^["']|["']$/g, '');
    }
  }
  return { raw: m[1], end: m[0].length, data };
}

const AUDIENCES = new Set(['merchant', 'developer']);
const STATUSES = new Set(['available', 'beta', 'deprecated']);

const files = execFileSync('git', ['ls-files', '--', 'content/docs/**/*.mdx', 'content/docs/*.mdx'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

let rewritten = 0;
for (const file of files) {
  const abs = join(ROOT, file);
  const text = readFileSync(abs, 'utf8');
  const fm = readFrontmatter(text);
  if (!fm) {
    errors.push(`${file}: no frontmatter`);
    continue;
  }
  const path = ('/docs/' + file.replace(/^content\/docs\//, '').replace(/\.mdx$/, '').replace(/(^|\/)index$/, '')).replace(/\/$/, '') || '/docs';
  const declared = Array.isArray(fm.data.capability_ids) ? fm.data.capability_ids : [];
  for (const id of declared) if (!knownIds.has(id)) errors.push(`${file}: unknown capability id ${id}`);
  if (fm.data.audience !== undefined && (!Array.isArray(fm.data.audience) || fm.data.audience.some((a) => !AUDIENCES.has(a))))
    errors.push(`${file}: audience must be a list drawn from merchant, developer`);
  if (fm.data.status !== undefined && !STATUSES.has(fm.data.status)) errors.push(`${file}: status must be one of available, beta, deprecated`);
  if (fm.data.last_verified !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(fm.data.last_verified)) errors.push(`${file}: last_verified must be YYYY-MM-DD`);

  const expected = expectedIds.get(path) ?? new Set();
  const missing = [...expected].filter((id) => !declared.includes(id));
  if (missing.length === 0) continue;
  if (!WRITE) {
    errors.push(`${file}: capability map cites this page for ${missing.join(', ')} but capability_ids does not declare it (run check-capabilities --write)`);
    continue;
  }
  const all = [...new Set([...declared, ...missing])];
  const line = `capability_ids: [${all.join(', ')}]`;
  const raw = fm.data.capability_ids === undefined
    ? fm.raw.replace(/^(description:[^\n]*)$/m, `$1\n${line}`)
    : fm.raw.replace(/^capability_ids:[^\n]*$/m, line);
  if (raw === fm.raw) {
    errors.push(`${file}: could not insert capability_ids (no description line to anchor on)`);
    continue;
  }
  // Keep the file's own line ending in the rewritten wrapper.
  const eol = text.slice(0, fm.end).includes('\r\n') ? '\r\n' : '\n';
  writeFileSync(abs, `---${eol}${raw}${eol}---${eol}` + text.slice(fm.end));
  rewritten += 1;
}

console.log(`check-capabilities: ${files.length} pages checked against ${map.capabilities.length} capabilities (map generated ${map.generated_at})${WRITE ? `, ${rewritten} rewritten` : ''}`);
if (errors.length > 0) {
  console.error(`check-capabilities: FAIL (${errors.length})`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('check-capabilities: OK');
