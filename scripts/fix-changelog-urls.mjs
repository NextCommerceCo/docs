#!/usr/bin/env node
/**
 * Repair pass for changelog URLs broken during legacy blog migration.
 * Fixes spaced hostnames (docs.Next Commerce.com), legacy path prefixes,
 * double-link artifacts ([[label](good)](bad)), duplicated hash fragments,
 * and missing /docs/ path prefixes.
 *
 * Usage: node scripts/fix-changelog-urls.mjs
 * Safe to re-run — idempotent on already-fixed files.
 */
import fs from 'node:fs';
import path from 'node:path';

const CHANGELOG_DIR = path.join(process.cwd(), 'content/changelog');

/** @type {Record<string, string>} */
const EXACT_URL_MAP = {
  'https://api-docs.Next Commerce.com/api/docs/admin/#operation/orders_create':
    'https://developers.nextcommerce.com/docs/admin-api',
  'https://developers.Next Commerce.com/apps/':
    'https://developers.nextcommerce.com/docs/apps',
  'https://developers.Next Commerce.com/docs/api/campaigns/':
    'https://developers.nextcommerce.com/docs/campaigns',
  'https://developers.Next Commerce.com/docs/apps/guides/fulfillment-service/':
    'https://developers.nextcommerce.com/docs/apps/guides/fulfillment-service',
  'https://developers.Next Commerce.com/docs/themes/event-tracking/':
    'https://developers.nextcommerce.com/docs/themes/event-tracking',
  'https://developers.Next Commerce.com/docs/themes/templates/filters/#math':
    'https://developers.nextcommerce.com/docs/themes/templates/filters/#math',
};

function joinLinkLabel(inner, trailing) {
  if (!trailing) return inner;
  return trailing.startsWith(' ') ? `${inner}${trailing}` : `${inner} ${trailing}`;
}

function dedupeHash(url) {
  return url.replace(/(#[^#\s?]+)\1/g, '$1');
}

function normalizeDocsPathname(pathname) {
  let normalized = pathname.replace(
    '/start-here/get-started-on-29-next/',
    '/docs/start-here/get-started/',
  );

  const needsDocsPrefix =
    normalized.startsWith('/apps/') ||
    normalized.startsWith('/features/') ||
    normalized.startsWith('/manage/') ||
    normalized.startsWith('/analytics/') ||
    normalized.startsWith('/build-a-store/') ||
    normalized.startsWith('/start-here/');

  if (needsDocsPrefix && !normalized.startsWith('/docs/')) {
    normalized = `/docs${normalized}`;
  }

  return normalized;
}

function normalizeDocsHostUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'docs.nextcommerce.com') return dedupeHash(url);

    parsed.pathname = normalizeDocsPathname(parsed.pathname);
    return dedupeHash(parsed.toString().replace(/\/$/, ''));
  } catch {
    return dedupeHash(url);
  }
}

function fixDeveloperUrl(url) {
  if (EXACT_URL_MAP[url]) return EXACT_URL_MAP[url];

  let fixed = url
    .replace(/developers\.Next Commerce\.com/g, 'developers.nextcommerce.com')
    .replace(/api-docs\.Next Commerce\.com/g, 'developers.nextcommerce.com');

  fixed = fixed.replace(
    '/docs/api/admin/reference/',
    '/docs/admin-api/reference/',
  );
  fixed = fixed.replace('/docs/api/campaigns/', '/docs/campaigns');

  return fixed;
}

function fixDocsUrl(url) {
  let fixed = url.replace(/docs\.Next Commerce\.com/g, 'docs.nextcommerce.com');
  return normalizeDocsHostUrl(fixed);
}

function fixUrl(url) {
  if (/docs\.Next Commerce\.com/.test(url)) return fixDocsUrl(url);
  if (/developers\.Next Commerce\.com|api-docs\.Next Commerce\.com/.test(url)) {
    return fixDeveloperUrl(url);
  }
  if (/^https:\/\/docs\.nextcommerce\.com\//.test(url)) {
    return normalizeDocsHostUrl(url);
  }
  if (/^https:\/\/developers\.nextcommerce\.com\//.test(url)) {
    return fixDeveloperUrl(url);
  }
  return url;
}

function fixDoubleLinks(content) {
  content = content.replace(
    /\[\[([^\]]+)\]\((https:\/\/docs\.nextcommerce\.com[^)]+)\)\]\([^)]+\)/g,
    '[$1]($2)',
  );
  content = content.replace(
    /\[\[([^\]]+)\]\((https:\/\/developers\.nextcommerce\.com[^)]+)\)\]\((https:\/\/developers\.nextcommerce\.com[^)]+)\)/g,
    (_, label, _inner, outer) => `[${label}](${fixDeveloperUrl(outer)})`,
  );
  return content;
}

function fixNestedDoubleLinks(content) {
  return content.replace(
    /\[\[([^\]]+)\]\((https:\/\/docs\.nextcommerce\.com[^)]+)\)\s*([^\]]*?)\]\((https:\/\/docs\.Next Commerce\.com[^)]+)\)/g,
    (_, inner, _good, trailing, bad) => {
      const label = joinLinkLabel(inner, trailing);
      const url = fixDocsUrl(bad);
      return `[${label}](${url})`;
    },
  );
}

function fixAllUrls(content) {
  content = content.replace(
    /developers\.nextcommerce\.com\/docs\/api\/admin\/reference/g,
    'developers.nextcommerce.com/docs/admin-api/reference',
  );
  content = content.replace(
    /https:\/\/docs\.nextcommerce\.com\/apps\//g,
    'https://docs.nextcommerce.com/docs/apps/',
  );

  return content.replace(/https?:\/\/[^)\s"']+/g, (url) => fixUrl(url));
}

function fixProseDomains(content) {
  return content
    .replace(/accounts\.Next Commerce\.com/g, 'accounts.29next.com')
    .replace(/developers\.Next Commerce\.com/g, 'developers.nextcommerce.com')
    .replace(/docs\.Next Commerce\.com/g, 'docs.nextcommerce.com');
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let content = original;
  content = fixNestedDoubleLinks(content);
  content = fixDoubleLinks(content);
  content = fixAllUrls(content);
  content = fixProseDomains(content);

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

function main() {
  const files = fs.readdirSync(CHANGELOG_DIR).filter((f) => f.endsWith('.mdx'));
  let changed = 0;

  for (const file of files) {
    if (processFile(path.join(CHANGELOG_DIR, file))) changed += 1;
  }

  console.log(`Fixed URLs in ${changed}/${files.length} changelog files.`);
}

main();
