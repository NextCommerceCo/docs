import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, 'content', 'docs');

const STALE_PATTERNS = [
  {
    label: 'legacy developers.29next.com host',
    pattern: /https?:\/\/developers\.29next\.com\b/gi,
  },
  {
    label: 'legacy admin api path family',
    pattern: /https?:\/\/developers\.nextcommerce\.com\/docs\/api\/admin\b/gi,
  },
  {
    label: 'legacy campaigns api path family',
    pattern: /https?:\/\/developers\.nextcommerce\.com\/docs\/api\/campaigns\b/gi,
  },
  {
    label: 'legacy campaign cart path',
    pattern: /https?:\/\/developers\.nextcommerce\.com\/docs\/campaign-cart\b/gi,
  },
  {
    label: 'legacy theme root path family',
    pattern: /https?:\/\/developers\.nextcommerce\.com\/themes\b/gi,
  },
  {
    label: 'legacy docs themes path family',
    pattern: /https?:\/\/developers\.nextcommerce\.com\/docs\/themes\b/gi,
  },
  {
    label: 'legacy hash-based api reference link',
    pattern: /https?:\/\/developers\.nextcommerce\.com\/docs\/(?:admin-api|campaigns\/api)\/reference\/?#/gi,
  },
];

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
      continue;
    }

    if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function collectMatches(content) {
  const matches = [];

  for (const { label, pattern } of STALE_PATTERNS) {
    for (const match of content.matchAll(pattern)) {
      matches.push({
        label,
        value: match[0],
      });
    }
  }

  return matches;
}

async function main() {
  const files = await collectFiles(CONTENT_ROOT);
  const issues = [];

  for (const filePath of files) {
    const content = await fs.readFile(filePath, 'utf8');
    const matches = collectMatches(content);

    for (const match of matches) {
      issues.push({
        file: path.relative(CONTENT_ROOT, filePath),
        ...match,
      });
    }
  }

  if (issues.length > 0) {
    console.error(`Found ${issues.length} stale developer-doc link patterns:\n`);
    for (const issue of issues) {
      console.error(`- ${issue.file}: ${issue.label} -> ${issue.value}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Checked developer-doc links across ${files.length} files. No stale developer URL patterns found.`);
}

await main();
