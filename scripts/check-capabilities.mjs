/**
 * Consistency between this site and the capability map snapshot
 * (lib/capabilities.snapshot.json, refreshed by `npm run sync-capabilities`).
 *
 *   1. every merchant page the map cites in operator_docs exists in content/docs
 *      (the map is published by the developer repo, which cannot check our tree)
 *   2. page relationships are derived from operator_docs rather than copied into
 *      page frontmatter
 *   3. audience / status / last_verified, when present, use the schema's values
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const map = JSON.parse(readFileSync(join(ROOT, 'lib', 'capabilities.snapshot.json'), 'utf8'));
const MERCHANT_SITE = map.sources.merchant_docs;

const errors = [];

function pageExists(path) {
  if (path === '/changelog') return existsSync(join(ROOT, 'app', 'changelog'));
  const rel = path.replace(/^\/docs\/?/, '');
  const base = join(ROOT, 'content', 'docs', rel);
  return existsSync(`${base}.mdx`) || existsSync(`${base}.md`) || existsSync(join(base, 'index.mdx'));
}

for (const c of map.capabilities) {
  for (const url of c.operator_docs) {
    if (!url.startsWith(MERCHANT_SITE)) continue;
    const path = url.slice(MERCHANT_SITE.length);
    if (!pageExists(path)) errors.push(`capability ${c.id} cites ${path}, which does not exist on this site`);
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
  return data;
}

const AUDIENCES = new Set(['merchant', 'developer']);
const STATUSES = new Set(['available', 'beta', 'deprecated']);

const files = execFileSync('git', ['ls-files', '--', 'content/docs/**/*.mdx', 'content/docs/*.mdx'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

for (const file of files) {
  const abs = join(ROOT, file);
  const text = readFileSync(abs, 'utf8');
  const frontmatter = readFrontmatter(text);
  if (!frontmatter) {
    errors.push(`${file}: no frontmatter`);
    continue;
  }
  if (frontmatter.audience !== undefined && (!Array.isArray(frontmatter.audience) || frontmatter.audience.some((a) => !AUDIENCES.has(a))))
    errors.push(`${file}: audience must be a list drawn from merchant, developer`);
  if (frontmatter.status !== undefined && !STATUSES.has(frontmatter.status)) errors.push(`${file}: status must be one of available, beta, deprecated`);
  if (frontmatter.last_verified !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.last_verified)) errors.push(`${file}: last_verified must be YYYY-MM-DD`);

}

console.log(`check-capabilities: ${files.length} pages checked against ${map.capabilities.length} capabilities (map generated ${map.generated_at})`);
if (errors.length > 0) {
  console.error(`check-capabilities: FAIL (${errors.length})`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('check-capabilities: OK');
