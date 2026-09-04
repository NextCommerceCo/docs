// Fails the build when the static Orama search index (served at /api/search)
// grows past either its raw or expected Brotli transfer budget. Production
// serves it as application/json so Cloudflare can compress it on the wire.
import { readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants as zlibConstants } from 'node:zlib';

const DEFAULT_BUDGET_BYTES = 6_000_000;
const DEFAULT_BROTLI_BUDGET_BYTES = 750_000;
const LOCAL_BROTLI_QUALITY = 11;
const SEARCH_INDEX_BUDGET_BYTES = readBudget(
  process.env.SEARCH_INDEX_BUDGET_BYTES,
  DEFAULT_BUDGET_BYTES,
  'SEARCH_INDEX_BUDGET_BYTES',
);
const SEARCH_INDEX_BROTLI_BUDGET_BYTES = readBudget(
  process.env.SEARCH_INDEX_BROTLI_BUDGET_BYTES,
  DEFAULT_BROTLI_BUDGET_BYTES,
  'SEARCH_INDEX_BROTLI_BUDGET_BYTES',
);

// Unset or empty means the default. Anything else must be a positive integer;
// a typo should stop the check loudly rather than silently use the default.
function readBudget(raw, fallback, name) {
  if (raw === undefined || raw.trim() === '') return fallback;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    console.error(`check-search-budget: ${name} must be a positive integer, got ${JSON.stringify(raw)}`);
    process.exit(2);
  }
  return parsed;
}

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const candidates = [
  join(repoRoot, 'out', 'api', 'search'),
  join(repoRoot, 'out', 'api', 'search.body'),
  join(repoRoot, 'out', 'api', 'search', 'index.json'),
  join(repoRoot, 'out', 'api', 'search', 'index'),
];

const indexPath = candidates.find((p) => existsSync(p) && statSync(p).isFile());
if (!indexPath) {
  console.error(
    `check-search-budget: no built search index found. Looked at:\n  ${candidates.join('\n  ')}\n` +
      'If `npm run build` has already run, the static search route (app/api/search/route.ts) now writes to a different path; add it to the candidates list above.',
  );
  process.exit(1);
}

const size = statSync(indexPath).size;
// This is a deterministic, best-case local estimate. The Cloudflare edge can
// choose a different compression level, so the deployed transfer is verified
// separately by the cross-site live-surface check.
const brotliSize = brotliCompressSync(readFileSync(indexPath), {
  params: { [zlibConstants.BROTLI_PARAM_QUALITY]: LOCAL_BROTLI_QUALITY },
}).length;
const headers = readFileSync(join(repoRoot, 'public', '_headers'), 'utf8');
const mb = (n) => (n / 1_000_000).toFixed(2);
const overBudget = size > SEARCH_INDEX_BUDGET_BYTES;
const overBrotliBudget = brotliSize > SEARCH_INDEX_BROTLI_BUDGET_BYTES;
function parseHeaderBlocks(source) {
  const blocks = [];
  let block = null;
  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      block = { route: trimmed, headers: [] };
      blocks.push(block);
    } else if (block) {
      block.headers.push(trimmed);
    }
  }
  return blocks;
}

const searchBlocks = parseHeaderBlocks(headers).filter((block) => block.route === '/api/search');
const searchHeaders = searchBlocks[0]?.headers ?? [];
const deliveryHeadersPresent = [
  'Content-Type: application/json; charset=utf-8',
  'X-Content-Type-Options: nosniff',
  'Cache-Control: public, max-age=3600, stale-while-revalidate=86400',
].every((line) => searchHeaders.includes(line)) && searchBlocks.length === 1;

console.log(
  `check-search-budget: ${indexPath.replace(repoRoot + '/', '')} is ${size} bytes (${mb(size)} MB); budget ${SEARCH_INDEX_BUDGET_BYTES} bytes (${mb(SEARCH_INDEX_BUDGET_BYTES)} MB) — ${overBudget ? 'OVER BUDGET' : 'ok'}`,
);
console.log(
  `check-search-budget: local Brotli-${LOCAL_BROTLI_QUALITY} estimate is ${brotliSize} bytes (${mb(brotliSize)} MB); budget ${SEARCH_INDEX_BROTLI_BUDGET_BYTES} bytes (${mb(SEARCH_INDEX_BROTLI_BUDGET_BYTES)} MB) — ${overBrotliBudget ? 'OVER BUDGET' : 'ok'}`,
);
console.log(`check-search-budget: JSON, nosniff, and cache delivery headers — ${deliveryHeadersPresent ? 'ok' : 'MISSING'}`);
process.exit(overBudget || overBrotliBudget || !deliveryHeadersPresent ? 1 : 0);
