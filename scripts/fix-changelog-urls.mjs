#!/usr/bin/env node
/**
 * One-time repair pass for changelog URLs broken during legacy blog migration.
 * Fixes spaced hostnames (docs.Next Commerce.com), legacy path prefixes, and
 * double-link artifacts ([[label](good)](bad)).
 *
 * Usage: node scripts/fix-changelog-urls.mjs
 * Safe to re-run — idempotent on already-fixed files.
 */
import fs from 'node:fs';
import path from 'node:path';

const CHANGELOG_DIR = path.join(process.cwd(), 'content/changelog');

const DEV_API_REFERENCE = 'https://developers.nextcommerce.com/docs/admin-api/reference';

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

  try {
    const parsed = new URL(fixed);
    let pathname = parsed.pathname;

    pathname = pathname.replace(
      '/start-here/get-started-on-29-next/',
      '/docs/start-here/get-started/',
    );

    const needsDocsPrefix =
      pathname.startsWith('/apps/') ||
      pathname.startsWith('/features/') ||
      pathname.startsWith('/manage/') ||
      pathname.startsWith('/analytics/') ||
      pathname.startsWith('/build-a-store/') ||
      pathname.startsWith('/start-here/');

    if (needsDocsPrefix && !pathname.startsWith('/docs/')) {
      pathname = `/docs${pathname}`;
    }

    parsed.pathname = pathname;
    return parsed.toString().replace(/\/$/, '') + (parsed.hash || '');
  } catch {
    return fixed;
  }
}

function fixUrl(url) {
  if (/docs\.Next Commerce\.com/.test(url)) return fixDocsUrl(url);
  if (/developers\.Next Commerce\.com|api-docs\.Next Commerce\.com/.test(url)) {
    return fixDeveloperUrl(url);
  }
  return url;
}

function fixDoubleLinks(content) {
  // [[Label](good)](bad) → [Label](good) — docs host
  content = content.replace(
    /\[\[([^\]]+)\]\((https:\/\/docs\.nextcommerce\.com[^)]+)\)\]\([^)]+\)/g,
    '[$1]($2)',
  );
  // [[Label](inner)](outer) → [Label](outer) — developer host (prefer outer/reference URL)
  content = content.replace(
    /\[\[([^\]]+)\]\((https:\/\/developers\.nextcommerce\.com[^)]+)\)\]\((https:\/\/developers\.nextcommerce\.com[^)]+)\)/g,
    (_, label, _inner, outer) => `[${label}](${fixDeveloperUrl(outer)})`,
  );
  return content;
}

function fixNestedDoubleLinks(content) {
  // [[Inner](good) trailing](bad) → [Inner trailing](bad-or-good)
  return content.replace(
    /\[\[([^\]]+)\]\((https:\/\/docs\.nextcommerce\.com[^)]+)\)\s*([^\]]*?)\]\((https:\/\/docs\.Next Commerce\.com[^)]+)\)/g,
    (_, inner, good, trailing, bad) => {
      const label = trailing ? `${inner}${trailing}` : inner;
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

  return content.replace(/https?:\/\/[^)\s"']+/g, (url) => {
    if (!/Next Commerce|api-docs\.Next|accounts\.Next|developers\.Next/.test(url)) {
      return url;
    }
    return fixUrl(url);
  });
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
