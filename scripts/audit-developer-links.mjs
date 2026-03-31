import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, 'content', 'docs');
const DEVELOPER_DOCS_ROOT = path.resolve(ROOT, '..', 'developer-docs');
const DEVELOPER_CONTENT_ROOT = path.join(DEVELOPER_DOCS_ROOT, 'content', 'docs');
const API_INDEX_PATH = path.join(DEVELOPER_DOCS_ROOT, 'public', 'api', 'index_data.html');

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

function toRoute(root, filePath) {
  const relative = path.relative(root, filePath).split(path.sep).join(path.posix.sep);
  if (relative === 'index.mdx' || relative === 'index.md') return '/docs';
  if (relative.endsWith('/index.mdx') || relative.endsWith('/index.md')) {
    return `/docs/${relative.replace(/\/index\.mdx?$/, '')}`;
  }

  return `/docs/${relative.replace(/\.mdx?$/, '')}`;
}

function buildReferenceRoutes(indexContent) {
  const routes = new Set();
  let api = null;
  let section = null;

  for (const line of indexContent.split('\n')) {
    if (line.includes('<h2>Admin API</h2>')) {
      api = 'admin';
      section = null;
      continue;
    }

    if (line.includes('<h2>Campaigns API</h2>')) {
      api = 'campaigns';
      section = null;
      continue;
    }

    const sectionMatch = line.match(/<h3>([^<]+)<\/h3>/);
    if (sectionMatch) {
      section = sectionMatch[1];
      continue;
    }

    const articleMatch = line.match(/<article id='(admin|campaigns)-([A-Za-z0-9]+)'>/);
    if (!articleMatch) continue;

    const [, prefix, operationId] = articleMatch;
    if (prefix === 'admin' && section) {
      routes.add(`/docs/admin-api/reference/${section}/${operationId}`);
      continue;
    }

    if (prefix === 'campaigns') {
      routes.add(`/docs/campaigns/api/${operationId}`);
    }
  }

  routes.add('/docs/admin-api/reference');
  routes.add('/docs/campaigns/api');
  return routes;
}

function normalizeDeveloperTarget(url) {
  const parsed = new URL(url);
  const hostname = parsed.hostname.replace(/^www\./, '');
  if (hostname !== 'developers.nextcommerce.com' && hostname !== 'developers.29next.com') {
    return null;
  }

  return parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\/+$/, '') || '/';
}

async function main() {
  const [migrationFiles, developerFiles, apiIndex] = await Promise.all([
    collectFiles(CONTENT_ROOT),
    collectFiles(DEVELOPER_CONTENT_ROOT),
    fs.readFile(API_INDEX_PATH, 'utf8'),
  ]);

  const validRoutes = new Set(['/']);
  for (const filePath of developerFiles) {
    validRoutes.add(toRoute(DEVELOPER_CONTENT_ROOT, filePath));
  }

  for (const route of buildReferenceRoutes(apiIndex)) {
    validRoutes.add(route);
  }

  const issues = [];
  const urlPattern = /https?:\/\/developers\.(?:29next|nextcommerce)\.com[^)\s>"']+/g;

  for (const filePath of migrationFiles) {
    const content = await fs.readFile(filePath, 'utf8');
    const matches = content.match(urlPattern) ?? [];

    for (const match of matches) {
      const normalized = normalizeDeveloperTarget(match);
      if (!normalized || validRoutes.has(normalized)) continue;

      issues.push({
        file: path.relative(CONTENT_ROOT, filePath),
        url: match,
        normalized,
      });
    }
  }

  if (issues.length > 0) {
    console.error(`Found ${issues.length} developer-doc links that do not match current routes:\n`);
    for (const issue of issues) {
      console.error(`- ${issue.file}: ${issue.url} -> ${issue.normalized}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Checked developer-doc links across ${migrationFiles.length} files. No stale developer URLs found.`);
}

await main();
