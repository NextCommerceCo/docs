// Checks that the static search index still answers common prospect and
// operator questions after any index-size or search-engine change.
import { readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { create, load, search } from '@orama/orama';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const candidates = [
  join(repoRoot, 'out', 'api', 'search'),
  join(repoRoot, 'out', 'api', 'search.body'),
  join(repoRoot, 'out', 'api', 'search', 'index.json'),
  join(repoRoot, 'out', 'api', 'search', 'index'),
];
const indexPath = candidates.find((path) => existsSync(path) && statSync(path).isFile());
if (!indexPath) {
  console.error('check-search-quality: build the site before running this check');
  process.exit(1);
}

const exported = JSON.parse(readFileSync(indexPath, 'utf8'));
if (exported.type !== 'advanced') {
  console.error(`check-search-quality: expected an advanced Orama index, got ${JSON.stringify(exported.type)}`);
  process.exit(1);
}

const database = create({ schema: { _: 'string' }, language: 'english' });
load(database, exported);

const probes = [
  { query: 'subscription', path: '/docs/manage/subscriptions-guide' },
  { query: 'payment gateway', path: '/docs/features/payments' },
  { query: 'webhook', path: '/docs/build-a-store/technical-settings/configure-webhooks' },
];
const failures = [];
for (const probe of probes) {
  const result = await search(database, {
    term: probe.query,
    properties: ['content'],
    limit: 10,
  });
  const urls = result.hits.map((hit) => String(hit.document.url));
  if (!urls.some((url) => url === probe.path || url.startsWith(`${probe.path}#`))) {
    failures.push(`${JSON.stringify(probe.query)} did not return ${probe.path} in its first 10 results`);
  }
}

if (failures.length > 0) {
  console.error('check-search-quality: FAIL');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`check-search-quality: ${probes.length} prospect queries passed`);
