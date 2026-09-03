// Fails the build when the static Orama search index (served at /api/search)
// grows past the budget. Every visitor downloads this file on first search,
// so keep it bounded.
import { statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SEARCH_INDEX_BUDGET_BYTES = 6_000_000;

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const candidates = [
  join(repoRoot, 'out', 'api', 'search'),
  join(repoRoot, 'out', 'api', 'search.body'),
  join(repoRoot, 'out', 'api', 'search', 'index.json'),
  join(repoRoot, 'out', 'api', 'search', 'index'),
];

const indexPath = candidates.find((p) => existsSync(p) && statSync(p).isFile());
if (!indexPath) {
  console.error(`check-search-budget: no built search index found. Looked at:\n  ${candidates.join('\n  ')}\nRun \`npm run build\` first.`);
  process.exit(1);
}

const size = statSync(indexPath).size;
const mb = (n) => (n / 1_000_000).toFixed(2);
const overBudget = size > SEARCH_INDEX_BUDGET_BYTES;

console.log(
  `check-search-budget: ${indexPath.replace(repoRoot + '/', '')} is ${size} bytes (${mb(size)} MB); budget ${SEARCH_INDEX_BUDGET_BYTES} bytes (${mb(SEARCH_INDEX_BUDGET_BYTES)} MB) — ${overBudget ? 'OVER BUDGET' : 'ok'}`,
);
process.exit(overBudget ? 1 : 0);
