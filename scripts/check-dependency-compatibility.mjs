// Catch coupled-package drift that a successful Next.js build can miss.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const version = (name) => require(`${name}/package.json`).version;
const failures = [];

for (const [left, right] of [['react', 'react-dom'], ['fumadocs-core', 'fumadocs-ui']]) {
  const leftVersion = version(left);
  const rightVersion = version(right);
  if (leftVersion !== rightVersion) {
    failures.push(`${left} ${leftVersion} and ${right} ${rightVersion} must match exactly`);
  }
}

const nodeMajor = readFileSync(new URL('../.node-version', import.meta.url), 'utf8').trim();
const typesVersion = version('@types/node');
if (typesVersion.split('.')[0] !== nodeMajor) {
  failures.push(`@types/node ${typesVersion} must match the supported Node ${nodeMajor} release line`);
}

if (failures.length > 0) {
  console.error('check-dependency-compatibility: FAIL');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log('check-dependency-compatibility: React, Fumadocs, and Node types are aligned');
