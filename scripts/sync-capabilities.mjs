/**
 * Refreshes lib/capabilities.snapshot.json from the developer site's published
 * capability map. The developer repo owns the map (its source is
 * developer-docs/content/capabilities.yaml); this site derives page relationships
 * and developer links from it, and a committed snapshot keeps the build deterministic
 * and offline. Run when the map changes, then review the diff and commit.
 *
 *   npm run sync-capabilities
 *   CAPABILITY_MAP_URL=https://deploy-preview.../capabilities.json npm run sync-capabilities
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const URL = process.env.CAPABILITY_MAP_URL ?? 'https://developers.nextcommerce.com/capabilities.json';
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'lib', 'capabilities.snapshot.json');

const res = await fetch(URL, {
  headers: { 'user-agent': 'nextcommerce-docs-sync/1' },
  signal: AbortSignal.timeout(30_000),
});
if (!res.ok) {
  console.error(`sync-capabilities: ${URL} returned ${res.status}`);
  process.exit(1);
}
const map = await res.json();
// Shape the site depends on: llms.txt renders bundles, and contextual links and
// checks read capabilities.
const shapeErrors = [];
if (!Array.isArray(map.capabilities)) {
  shapeErrors.push('capabilities must be an array');
} else {
  for (const [index, capability] of map.capabilities.entries()) {
    const label = `capabilities[${index}]${capability?.id ? ` (${capability.id})` : ''}`;
    if (typeof capability?.id !== 'string') shapeErrors.push(`${label}.id must be a string`);
    if (typeof capability?.title !== 'string') shapeErrors.push(`${label}.title must be a string`);
    for (const field of ['audiences', 'operator_docs', 'developer_docs']) {
      if (!Array.isArray(capability?.[field])) shapeErrors.push(`${label}.${field} must be an array`);
      else if (capability[field].some((value) => typeof value !== 'string')) shapeErrors.push(`${label}.${field} must contain only strings`);
    }
  }
}
if (map.version !== 1 || shapeErrors.length > 0 || !Array.isArray(map.bundles) || !map.sources?.developer_docs || !map.sources?.merchant_docs) {
  console.error('sync-capabilities: response is not a version 1 capability map');
  for (const error of shapeErrors) console.error(`  - ${error}`);
  process.exit(1);
}
writeFileSync(OUT, JSON.stringify(map, null, 2) + '\n');
console.log(`sync-capabilities: wrote ${map.capabilities.length} capabilities from ${URL} (generated ${map.generated_at})`);
