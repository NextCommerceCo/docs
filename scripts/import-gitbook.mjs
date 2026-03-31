import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUTPUT_ROOT = path.join(ROOT, 'content', 'docs');
const PUBLIC_ROOT = path.join(ROOT, 'public', 'docs-assets');
const SUMMARY_FILE = path.join(ROOT, 'SUMMARY.md');
const SOURCE_ASSET_ROOT = path.join(ROOT, '.gitbook', 'assets');

const RESERVED_TOP_LEVEL = new Set([
  '.git',
  '.gitbook',
  '.next',
  '.source',
  'app',
  'components',
  'content',
  'lib',
  'node_modules',
  'out',
  'public',
  'scripts',
]);

const NAMED_ENTITIES = {
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  nbsp: ' ',
  quot: '"',
};

const HINT_TYPE_MAP = {
  danger: 'warn',
  info: 'info',
  success: 'success',
  warning: 'warning',
};

const unresolvedLinks = [];
const INTERNAL_HREF_ALIASES = new Map([
  ['/broken/pages/-MZgboj9cTKD5mWScYhE', '/docs/analytics/orders-reports'],
  ['/docs/build-a-store/catalogue#products', '/docs/build-a-store/catalogue#create-products'],
  ['/docs/build-a-store/catalogue/product-variants#create-product-variant-class', '/docs/build-a-store/catalogue/product-variants#create-product-variant-attributes'],
  ['/docs/build-a-store/storefront/funnels#creating-funnels', '/docs/build-a-store/storefront/funnels#creating-custom-pages'],
  ['/docs/build-a-store/technical-settings/cart-js-api#button-actions', '/docs/build-a-store/technical-settings/cart-js-api'],
  ['/docs/features/payments#paypal', '/docs/features/payments/paypal'],
  ['/docs/features/payments/3ds2-payments#id-3ds2-merchant-profiles', '/docs/features/payments/3ds2-payments#3ds2-merchant-profiles'],
  ['/docs/manage/customers#customer-detail-view', '/docs/manage/customers#customer-details-view'],
  ['/docs/manage/customers#support-tickets', '/docs/manage/customers#customer-details-view'],
  ['/docs/manage/customers/customer-carts#customer-details-view', '/docs/manage/customers#customer-details-view'],
  ['/docs/manage/customers/customer-carts#create-order-complete-link-for-a-cart', '/docs/manage/customers/customer-carts#create-check-out-link-for-a-cart'],
  ['/docs/manage/orders#fulfillment-statuses', '/docs/manage/orders/order-statuses#fulfillment-statuses'],
  ['/docs/manage/orders#order-actions', '/docs/manage/orders/order-management#order-actions'],
  ['/docs/manage/orders#order-details-view', '/docs/manage/orders/order-management#order-details-view'],
  ['/docs/manage/orders#order-management', '/docs/manage/orders/order-management'],
  ['/docs/manage/orders#status-changes', '/docs/manage/orders/order-statuses#fulfillment-statuses'],
  ['/docs/manage/orders#tags', '/docs/manage/orders/order-management#tags'],
  ['/docs/manage/orders/order-management#order-statuses', '/docs/manage/orders/order-statuses'],
  ['/docs/manage/subscriptions-guide#managing-subscriptions', '/docs/manage/subscriptions-guide#subscriptions-list-view'],
  ['/docs/manage/subscriptions-guide#subscription-cancellation-paths', '/docs/manage/subscriptions-guide/subscription-settings#cancel-reasons'],
  ['/docs/manage/subscriptions-guide#subscription-renewal-decline-salvage', '/docs/manage/subscriptions-guide/decline-salvage'],
  ['/docs/manage/subscriptions-guide#subscription-statuses', '/docs/manage/subscriptions-guide/subscription-statuses'],
  ['/docs/manage/subscriptions-guide#subscriptions-settings', '/docs/manage/subscriptions-guide/subscription-settings'],
  ['/docs/manage/support#support-content-categories-and-articles', '/docs/build-a-store/storefront/support-content'],
  ['/docs/manage/support#support-ticket-macros-setup', '/docs/manage/support#support-ticket-macros'],
  ['/docs/start-here/get-started/invite-team-members#permissions-groups', '/docs/start-here/get-started/invite-team-members#permissions'],
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toPosix(value) {
  return value.split(path.sep).join(path.posix.sep);
}

function decodeHtmlEntities(input) {
  return input.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (match, code) => {
    if (code.startsWith('#x')) {
      return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    }

    if (code.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    }

    return NAMED_ENTITIES[code] ?? match;
  });
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, ' ');
}

function collapseWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function titleCase(value) {
  return value
    .replace(/[-_]+/g, ' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function sanitizeTitle(value) {
  const decoded = collapseWhitespace(decodeHtmlEntities(stripHtml(value)));
  const withoutLeadingDecor = decoded.replace(/^[^A-Za-z0-9]+/u, '').trim();
  return withoutLeadingDecor || decoded;
}

function prettifySectionLabel(value) {
  const cleaned = collapseWhitespace(decodeHtmlEntities(stripHtml(value)));
  if (!/[a-z]/.test(cleaned) && /[A-Z]/.test(cleaned)) {
    return titleCase(cleaned);
  }

  return cleaned;
}

function parseFrontmatter(input) {
  if (!input.startsWith('---\n')) {
    return { data: {}, body: input };
  }

  const end = input.indexOf('\n---\n', 4);
  if (end === -1) {
    return { data: {}, body: input };
  }

  const raw = input.slice(4, end);
  const body = input.slice(end + 5);
  const data = {};

  for (const line of raw.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    data[match[1]] = decodeHtmlEntities(match[2]).trim();
  }

  return { data, body };
}

function extractFirstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? sanitizeTitle(match[1]) : null;
}

function removeFirstHeading(body) {
  return body.replace(/^#\s+.+\n+/m, '');
}

function canonicalFromSourceRel(sourceRel) {
  const posixRel = toPosix(sourceRel);

  if (posixRel === 'README.md') return '';
  if (posixRel.endsWith('/README.md')) {
    return posixRel.slice(0, -'/README.md'.length);
  }
  if (posixRel.endsWith('.md')) {
    return posixRel.slice(0, -'.md'.length);
  }

  return posixRel;
}

function outputRelFromSourceRel(sourceRel) {
  const posixRel = toPosix(sourceRel);
  if (posixRel === 'README.md') return 'index.mdx';
  if (posixRel.endsWith('/README.md')) {
    return `${posixRel.slice(0, -'/README.md'.length)}/index.mdx`;
  }
  return `${posixRel.slice(0, -'.md'.length)}.mdx`;
}

function urlFromCanonical(canonical) {
  return canonical ? `/docs/${canonical}` : '/docs';
}

function pageEntryFromCanonical(canonical) {
  return canonical || 'index';
}

function relativeMetaEntry(fromCanonical, targetCanonical) {
  const fromDir = fromCanonical || '.';
  const target = pageEntryFromCanonical(targetCanonical);
  const relative = toPosix(path.posix.relative(fromDir, target));
  return relative === '' ? 'index' : relative;
}

function markdownQuote(value) {
  return JSON.stringify(value);
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectMarkdownFiles(dir, prefix = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (prefix === '' && RESERVED_TOP_LEVEL.has(entry.name)) continue;
    if (entry.name.startsWith('.') && entry.name !== '.gitbook') continue;

    const nextRel = prefix ? path.posix.join(prefix, entry.name) : entry.name;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectMarkdownFiles(fullPath, nextRel));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'SUMMARY.md') {
      files.push(nextRel);
    }
  }

  return files.sort();
}

async function copyDirectory(sourceDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destPath);
      continue;
    }

    await fs.copyFile(sourcePath, destPath);
  }
}

function parseSummary(summaryContent) {
  const sections = [];
  let currentSection = { label: null, items: [] };
  sections.push(currentSection);
  const stack = [];

  for (const line of summaryContent.split('\n')) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      currentSection = {
        label: prettifySectionLabel(heading[1]),
        items: [],
      };
      sections.push(currentSection);
      stack.length = 0;
      continue;
    }

    const item = line.match(/^(\s*)\*\s+\[(.+?)\]\((.+?)\)/);
    if (!item) continue;

    const depth = Math.floor(item[1].length / 2);
    const node = {
      labelRaw: item[2],
      label: sanitizeTitle(item[2]),
      targetRaw: item[3],
      external: /^https?:\/\//i.test(item[3]),
      children: [],
    };

    if (node.external) {
      node.url = item[3];
    } else {
      node.canonical = canonicalFromSourceRel(normalizeSummaryTarget(item[3]));
    }

    stack[depth] = node;
    stack.length = depth + 1;

    if (depth === 0) {
      currentSection.items.push(node);
    } else {
      stack[depth - 1].children.push(node);
    }
  }

  return sections;
}

function normalizeSummaryTarget(target) {
  const [rawPath] = target.split('#');
  const cleaned = rawPath.replace(/^\.\//, '').replace(/\/$/, '');
  if (!cleaned) return 'README.md';
  if (cleaned.endsWith('.md')) return cleaned;
  return `${cleaned}/README.md`;
}

function buildSummaryMaps(sections) {
  const labelByCanonical = new Map();
  const nodeByCanonical = new Map();

  function visit(node) {
    if (node.canonical != null) {
      labelByCanonical.set(node.canonical, node.label);
      nodeByCanonical.set(node.canonical, node);
    }

    for (const child of node.children) {
      visit(child);
    }
  }

  for (const section of sections) {
    for (const node of section.items) {
      visit(node);
    }
  }

  return { labelByCanonical, nodeByCanonical };
}

function buildSourceInfo(sourceFiles, labelByCanonical, fileContents) {
  const sourceInfo = new Map();
  const oldPathToCanonical = new Map();

  for (const sourceRel of sourceFiles) {
    const canonical = canonicalFromSourceRel(sourceRel);
    const outputRel = outputRelFromSourceRel(sourceRel);
    const url = urlFromCanonical(canonical);
    const raw = fileContents.get(sourceRel);
    const { data, body } = parseFrontmatter(raw);
    const heading = extractFirstHeading(body);
    const title = sanitizeTitle(labelByCanonical.get(canonical) ?? heading ?? canonical.split('/').at(-1) ?? 'Docs');
    const description = data.description ? collapseWhitespace(data.description) : undefined;
    const dir = path.posix.dirname(outputRel);
    const info = {
      canonical,
      sourceRel,
      outputRel,
      outputDir: dir === '.' ? '' : dir,
      url,
      title,
      description,
      isIndex: outputRel === 'index.mdx' || outputRel.endsWith('/index.mdx'),
    };

    sourceInfo.set(canonical, info);
    oldPathToCanonical.set(canonical ? `/${canonical}` : '/', canonical);
  }

  return { sourceInfo, oldPathToCanonical };
}

function encodePublicAssetUrl(fileName) {
  return `/docs-assets/${encodeURIComponent(fileName).replace(/\(/g, '(').replace(/\)/g, ')')}`;
}

function rewriteAssetRefs(body) {
  let next = body.replace(
    /<(?:\.\.\/|\.\/|\/)?\.gitbook\/assets\/([^>]+)>/g,
    (_match, fileName) => `<${encodePublicAssetUrl(fileName)}>`,
  );

  next = next.replace(
    /"(?:\.\.\/|\.\/|\/)?\.gitbook\/assets\/([^"]+)"/g,
    (_match, fileName) => `"${encodePublicAssetUrl(fileName)}"`,
  );

  next = next.replace(
    /(?:\.\.\/|\.\/|\/)?\.gitbook\/assets\/([A-Za-z0-9._-]+)/g,
    (_match, fileName) => encodePublicAssetUrl(fileName),
  );

  return next;
}

function transformFigures(body) {
  let next = body.replace(
    /<figure>\s*<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>\s*<figcaption>\s*(?:<p>)?([\s\S]*?)(?:<\/p>)?\s*<\/figcaption>\s*<\/figure>/gi,
    (_match, src, alt, caption) => {
      const cleanCaption = collapseWhitespace(decodeHtmlEntities(stripHtml(caption)));
      const cleanAlt = collapseWhitespace(decodeHtmlEntities(alt)) || cleanCaption;
      const image = `![${cleanAlt}](<${src}>)`;
      return cleanCaption ? `${image}\n\n*${cleanCaption}*` : image;
    },
  );

  next = next.replace(
    /<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi,
    (_match, src, alt) => `![${collapseWhitespace(decodeHtmlEntities(alt))}](<${src}>)`,
  );

  return next;
}

function transformHints(body) {
  return body.replace(
    /\{% hint(?:\s+style="([^"]+)")?(?:\s+icon="[^"]*")? %\}\s*([\s\S]*?)\s*\{% endhint %\}/g,
    (_match, style = 'info', content) => {
      const type = HINT_TYPE_MAP[style] ?? 'info';
      return `\n<Callout type="${type}">\n\n${content.trim()}\n\n</Callout>\n`;
    },
  );
}

function transformEmbeds(body) {
  return body.replace(
    /\{% @arcade\/embed [^%]*url="([^"]+)"[^%]*%\}/g,
    (_match, url) => `\n<Callout type="info">\n\nInteractive walkthrough: [Open in Arcade](${url})\n\n</Callout>\n`,
  );
}

function transformPreCodeBlocks(body) {
  return body.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, (_match, code) => {
    const cleaned = decodeHtmlEntities(code)
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?strong>/gi, '')
      .trim();
    return `\n\`\`\`\n${cleaned}\n\`\`\`\n`;
  });
}

function transformStyledMarks(body) {
  return body.replace(/<mark\s+style="[^"]+"\s*>([\s\S]*?)<\/mark>/gi, (_match, content) => content);
}

function transformRemoteMarkdownImages(body) {
  let next = body.replace(/!\[([^\]]*)\]\(<(https?:\/\/[^>]+)>\)/g, (_match, alt, url) => {
    const cleanAlt = decodeHtmlEntities(alt);
    return `<img src="${url}" alt="${cleanAlt}" />`;
  });

  next = next.replace(/!\[([^\]]*)\]\((<https?:\/\/[^>]+>|https?:\/\/[^)\s]+)\)/g, (_match, alt, url) => {
    const cleanAlt = decodeHtmlEntities(alt);
    return `<img src="${url.replace(/^<|>$/g, '')}" alt="${cleanAlt}" />`;
  });

  return next;
}

function transformTemplateVariables(body) {
  return body.replace(/\\?\{\{([^{}]+)\}\}/g, (_match, inner) => `\`{{ ${inner.trim()} }}\``);
}

function stripLegacyAnchorTags(body) {
  return body.replace(/\s*<a href="#[^"]+" id="[^"]*"><\/a>/g, '');
}

const ADMIN_REFERENCE_PATHS_BY_OPERATION = new Map([
  ['giftCardsList', '/docs/admin-api/reference/gift-cards/giftCardsList'],
  ['usersNotesCreate', '/docs/admin-api/reference/customers/usersNotesCreate'],
]);

const ADMIN_REFERENCE_PATHS_BY_TAG = new Map([
  ['support', '/docs/admin-api/reference/support/ticketsList'],
  ['customers', '/docs/admin-api/reference/customers/usersList'],
]);

function cleanDeveloperHash(hash) {
  return hash.replace(/\\+$/g, '').replace(/^#\/?/, '');
}

function mapDeveloperReferencePath(pathname, hashToken) {
  if (pathname === '/docs/api/admin/reference' || pathname === '/docs/admin-api/redirect') {
    if (hashToken.startsWith('operations/')) {
      const operationId = hashToken.slice('operations/'.length);
      return ADMIN_REFERENCE_PATHS_BY_OPERATION.get(operationId) ?? '/docs/admin-api/reference';
    }

    if (hashToken.startsWith('tag/')) {
      const [, tag, maybeOperation, operationId] = hashToken.split('/');
      if (maybeOperation === 'operation' && operationId) {
        return ADMIN_REFERENCE_PATHS_BY_OPERATION.get(operationId)
          ?? ADMIN_REFERENCE_PATHS_BY_TAG.get(tag)
          ?? '/docs/admin-api/reference';
      }

      return ADMIN_REFERENCE_PATHS_BY_TAG.get(tag) ?? '/docs/admin-api/reference';
    }

    return '/docs/admin-api/reference';
  }

  if (pathname === '/docs/api/campaigns/redirect') {
    if (hashToken.startsWith('operations/')) {
      const operationId = hashToken.slice('operations/'.length);
      return `/docs/campaigns/api/${operationId}`;
    }

    return '/docs/campaigns/api';
  }

  return null;
}

function mapDeveloperDocsPath(pathname) {
  if (pathname === '/' || pathname === '') return '/';
  if (pathname === '/docs/api' || pathname === '/docs/api/admin') return '/docs/admin-api';
  if (pathname.startsWith('/docs/api/admin/')) {
    return `/docs/admin-api/${pathname.slice('/docs/api/admin/'.length)}`;
  }

  if (pathname === '/docs/api/campaigns') return '/docs/campaigns/api';
  if (pathname.startsWith('/docs/api/campaigns/')) {
    return `/docs/campaigns/api/${pathname.slice('/docs/api/campaigns/'.length)}`;
  }

  if (pathname === '/docs/campaign-cart' || pathname === '/docs/campaigns/campaign-cart') {
    return '/docs/campaigns/cart-system';
  }

  if (pathname.startsWith('/docs/campaign-cart/')) {
    return `/docs/campaigns/cart-system/${pathname.slice('/docs/campaign-cart/'.length)}`;
  }

  if (pathname.startsWith('/docs/campaigns/campaign-cart/')) {
    return `/docs/campaigns/cart-system/${pathname.slice('/docs/campaigns/campaign-cart/'.length)}`;
  }

  if (pathname === '/docs/themes/event-tracking') return '/docs/storefront/event-tracking';
  if (pathname === '/docs/themes' || pathname === '/themes') return '/docs/storefront/themes';

  if (pathname.startsWith('/docs/themes/')) {
    return `/docs/storefront/themes/${pathname.slice('/docs/themes/'.length)}`;
  }

  if (pathname === '/themes/guides/funnels' || pathname.startsWith('/themes/guides/funnels/')) {
    return '/docs/campaigns';
  }

  if (pathname === '/themes/theme-kit' || pathname.startsWith('/themes/theme-kit/')) {
    return '/docs/storefront/themes/theme-kit';
  }

  if (pathname.startsWith('/themes/')) {
    return `/docs/storefront/themes/${pathname.slice('/themes/'.length)}`;
  }

  return pathname;
}

function normalizeDeveloperDocsUrl(url) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, '');
    if (hostname !== 'developers.nextcommerce.com' && hostname !== 'developers.29next.com') {
      return null;
    }

    const pathname = parsed.pathname === '' ? '/' : parsed.pathname.replace(/\/+$/, '') || '/';
    const hashToken = cleanDeveloperHash(parsed.hash);
    const referencePath = mapDeveloperReferencePath(pathname, hashToken);
    const nextPath = referencePath ?? mapDeveloperDocsPath(pathname);
    const nextHash = referencePath ? '' : parsed.hash.replace(/\\+$/g, '');

    return `https://developers.nextcommerce.com${nextPath}${nextHash}`;
  } catch {
    return url;
  }
}

function normalizeExternalUrl(url) {
  const developerUrl = normalizeDeveloperDocsUrl(url);
  if (developerUrl) return developerUrl;

  return url
    .replace(/^https?:\/\/developers\.29next\.com/i, 'https://developers.nextcommerce.com')
    .replace(/^https?:\/\/docs\.29next\.com/i, 'https://docs.nextcommerce.com');
}

function mapOldDocsUrl(url, oldPathToCanonical, sourceInfo) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, '');
    if (hostname !== 'docs.nextcommerce.com' && hostname !== 'docs.29next.com') {
      return normalizeExternalUrl(url);
    }

    const oldPath = parsed.pathname === '' ? '/' : parsed.pathname.replace(/\/$/, '') || '/';
    const canonical = oldPathToCanonical.get(oldPath);
    if (!canonical && oldPath !== '/') {
      return normalizeExternalUrl(url);
    }

    const info = sourceInfo.get(canonical ?? '');
    if (!info) return normalizeExternalUrl(url);
    return `${info.url}${parsed.hash}`;
  } catch {
    return normalizeExternalUrl(url);
  }
}

function resolveInternalTarget(rawHref, currentSourceRel, sourceInfo, oldPathToCanonical) {
  const href = rawHref.replace(/^<|>$/g, '');
  if (!href || href.startsWith('#')) return href;
  if (/^(mailto:|tel:)/i.test(href)) return href;
  if (/^https?:\/\//i.test(href)) {
    return mapOldDocsUrl(href, oldPathToCanonical, sourceInfo);
  }

  const [pathPart, hash = ''] = href.split('#');
  const cleaned = normalizeExternalUrl(pathPart);
  if (/^https?:\/\//i.test(cleaned)) {
    return `${cleaned}${hash ? `#${hash}` : ''}`;
  }

  if (cleaned.startsWith('/')) {
    const canonical = oldPathToCanonical.get(cleaned.replace(/\/$/, '') || '/');
    if (canonical != null) {
      const info = sourceInfo.get(canonical);
      return `${info.url}${hash ? `#${hash}` : ''}`;
    }
    return href;
  }

  const baseDir = toPosix(path.posix.dirname(currentSourceRel));
  const resolvedPath = toPosix(path.posix.normalize(path.posix.join(baseDir === '.' ? '' : baseDir, cleaned)));
  const canonical = canonicalFromSourceRel(
    resolvedPath.endsWith('.md') || resolvedPath.endsWith('/README.md')
      ? resolvedPath
      : `${resolvedPath}${resolvedPath.endsWith('/') ? '' : resolvedPath ? '/' : ''}README.md`,
  );

  if (sourceInfo.has(canonical)) {
    return `${sourceInfo.get(canonical).url}${hash ? `#${hash}` : ''}`;
  }

  const fileCanonical = canonicalFromSourceRel(
    resolvedPath.endsWith('.md') ? resolvedPath : `${resolvedPath}.md`,
  );

  if (sourceInfo.has(fileCanonical)) {
    return `${sourceInfo.get(fileCanonical).url}${hash ? `#${hash}` : ''}`;
  }

  unresolvedLinks.push({ source: currentSourceRel, href });
  return href;
}

function rewriteMarkdownLinks(body, currentSourceRel, sourceInfo, oldPathToCanonical) {
  return body.replace(/(?<!!)\[([^\]]+)\]\((<[^>]+>|[^)\n]+)\)/g, (match, text, rawHref) => {
    const mapped = resolveInternalTarget(rawHref, currentSourceRel, sourceInfo, oldPathToCanonical);
    return `[${text}](${mapped})`;
  });
}

function transformContentRefs(body, currentSourceRel, sourceInfo, oldPathToCanonical) {
  return body.replace(
    /\{% content-ref url="([^"]+)" %\}\s*([\s\S]*?)\s*\{% endcontent-ref %\}/g,
    (_match, rawTarget, inner) => {
      const innerLink = inner.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const resolvedHref = resolveInternalTarget(rawTarget, currentSourceRel, sourceInfo, oldPathToCanonical);
      const targetCanonical = !/^https?:\/\//i.test(rawTarget)
        ? (() => {
            const baseDir = toPosix(path.posix.dirname(currentSourceRel));
            const cleanTarget = rawTarget.replace(/^\.\//, '');
            const candidate = toPosix(path.posix.normalize(path.posix.join(baseDir === '.' ? '' : baseDir, cleanTarget)));
            const normalized = cleanTarget.endsWith('/') || !path.posix.extname(candidate)
              ? `${candidate.replace(/\/$/, '')}/README.md`
              : candidate;
            return canonicalFromSourceRel(normalized);
          })()
        : null;

      const targetInfo = targetCanonical ? sourceInfo.get(targetCanonical) : null;
      const payload = {
        title: targetInfo?.title ?? sanitizeTitle(innerLink?.[1] ?? rawTarget),
        description: targetInfo?.description ?? '',
        href: resolvedHref,
        external: /^https?:\/\//i.test(resolvedHref),
      };

      return `\n<!--CONTENT-REF:${encodeURIComponent(JSON.stringify(payload))}-->\n`;
    },
  );
}

function groupContentRefPlaceholders(body) {
  const lines = body.split('\n');
  const output = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^<!--CONTENT-REF:(.+)-->$/);

    if (!match) {
      output.push(line);
      continue;
    }

    const items = [];
    let cursor = index;

    while (cursor < lines.length) {
      const placeholder = lines[cursor].match(/^<!--CONTENT-REF:(.+)-->$/);
      if (!placeholder) break;
      items.push(JSON.parse(decodeURIComponent(placeholder[1])));
      cursor += 1;
      while (cursor < lines.length && lines[cursor].trim() === '') cursor += 1;
    }

    output.push('<Cards>');
    for (const item of items) {
      const attrs = [
        `title=${markdownQuote(item.title)}`,
        item.description ? `description=${markdownQuote(item.description)}` : null,
        `href=${markdownQuote(item.href)}`,
        item.external ? 'external' : null,
      ].filter(Boolean);

      output.push(`  <Card ${attrs.join(' ')} />`);
    }
    output.push('</Cards>');
    index = cursor - 1;
  }

  return output.join('\n');
}

function cleanupBody(body) {
  return body
    .replace(/<br>/gi, '<br />')
    .replace(/\)\*\*([.,:;!?])\*\*/g, ')$1')
    .replace(/\*\*([.,:;!?])\*\*/g, '$1')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function stripFrontmatterBlock(content) {
  return parseFrontmatter(content).body;
}

function normalizeHeadingText(value) {
  return collapseWhitespace(
    decodeHtmlEntities(
      stripHtml(
        value
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/[*_`~]/g, '')
          .replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1'),
      ),
    ),
  );
}

function slugifyHeading(value) {
  return normalizeHeadingText(value)
    .replace(/^[^A-Za-z0-9]+/u, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractHeadingSlugs(content) {
  const body = stripFrontmatterBlock(content).replace(/```[\s\S]*?```/g, '');
  const seen = new Map();
  const hashes = [];

  for (const line of body.split('\n')) {
    const match = line.match(/^#{1,6}\s+(.+)$/);
    if (!match) continue;

    const base = slugifyHeading(match[1]);
    if (!base) continue;

    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    hashes.push(count === 0 ? base : `${base}-${count}`);
  }

  return hashes;
}

function normalizeHashToken(value) {
  return value.replace(/^#/, '').replace(/^id-/, '');
}

function tokenSet(value) {
  return new Set(normalizeHashToken(value).split('-').filter(Boolean));
}

function findBestHashMatch(hash, hashes) {
  const target = normalizeHashToken(hash);
  if (!target) return null;

  let best = null;
  let bestScore = 0;
  const targetTokens = tokenSet(hash);

  for (const candidate of hashes) {
    const normalized = normalizeHashToken(candidate);
    if (normalized === target) return candidate;

    let score = 0;
    if (normalized.includes(target) || target.includes(normalized)) {
      score = 0.9;
    } else {
      const candidateTokens = tokenSet(candidate);
      const overlap = Array.from(targetTokens).filter((token) => candidateTokens.has(token)).length;
      const union = new Set([...targetTokens, ...candidateTokens]).size;
      score = union > 0 ? overlap / union : 0;
    }

    if (score > bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  return bestScore >= 0.6 ? best : null;
}

function repairInternalHref(href, pageHashesByUrl) {
  const directAlias = INTERNAL_HREF_ALIASES.get(href);
  if (directAlias) return directAlias;
  if (!href.startsWith('/')) return href;

  const [pathPart, rawHash] = href.split('#');
  const pathAlias = INTERNAL_HREF_ALIASES.get(pathPart);

  if (!rawHash) {
    return pathAlias ?? href;
  }

  const hashes = pageHashesByUrl.get(pathPart);
  if (!hashes || hashes.size === 0) {
    return pathAlias ?? pathPart;
  }

  if (hashes.has(rawHash)) return href;

  const normalized = normalizeHashToken(rawHash);
  if (hashes.has(normalized)) {
    return `${pathPart}#${normalized}`;
  }

  const best = findBestHashMatch(rawHash, hashes);
  if (best) {
    return `${pathPart}#${best}`;
  }

  return pathAlias ?? pathPart;
}

async function repairInternalLinks(sourceInfo) {
  const pageHashesByUrl = new Map();
  const files = [];

  for (const info of sourceInfo.values()) {
    const outputPath = path.join(OUTPUT_ROOT, info.outputRel);
    const content = await fs.readFile(outputPath, 'utf8');
    pageHashesByUrl.set(info.url, new Set(extractHeadingSlugs(content)));
    files.push({ outputPath, content });
  }

  for (const file of files) {
    const repaired = file.content
      .replace(/(?<!!)\[([^\]]+)\]\((\/[^)\s]+)\)/g, (_match, text, href) => {
        return `[${text}](${repairInternalHref(href, pageHashesByUrl)})`;
      })
      .replace(/href=(["'])(\/[^"']+)\1/g, (_match, quote, href) => {
        return `href=${quote}${repairInternalHref(href, pageHashesByUrl)}${quote}`;
      });

    if (repaired !== file.content) {
      await fs.writeFile(file.outputPath, repaired);
    }
  }
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function ensureCleanOutput() {
  await fs.rm(OUTPUT_ROOT, { recursive: true, force: true });
  await fs.rm(PUBLIC_ROOT, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });
  await copyDirectory(SOURCE_ASSET_ROOT, PUBLIC_ROOT);
}

function buildRootMeta(sections, sourceInfo) {
  const pages = [];

  for (const section of sections) {
    if (section.label) {
      pages.push(`---${section.label}---`);
    }

    for (const node of section.items) {
      if (node.external) {
        pages.push(`external:[${node.label}](${normalizeExternalUrl(node.url)})`);
        continue;
      }

      if (!sourceInfo.has(node.canonical)) continue;
      pages.push(pageEntryFromCanonical(node.canonical));
    }
  }

  return { pages };
}

function collectTreeDirectories(sourceInfo) {
  const directories = new Map();

  for (const info of sourceInfo.values()) {
    const dir = info.outputDir;
    if (!directories.has(dir)) {
      directories.set(dir, { pages: new Set(), title: null });
    }

    const pageName = info.isIndex ? 'index' : path.posix.basename(info.outputRel, '.mdx');
    directories.get(dir).pages.add(pageName);

    let current = dir;
    while (current) {
      const parent = path.posix.dirname(current);
      const parentKey = parent === '.' ? '' : parent;
      if (!directories.has(parentKey)) {
        directories.set(parentKey, { pages: new Set(), title: null });
      }
      directories.get(parentKey).pages.add(path.posix.basename(current));
      current = parentKey;
      if (!current) break;
    }
  }

  return directories;
}

function buildFolderMeta(node, sourceInfo) {
  const info = sourceInfo.get(node.canonical);
  if (!info || !info.isIndex) return null;

  const pages = ['index'];

  for (const child of node.children) {
    if (child.external) {
      pages.push(`external:[${child.label}](${normalizeExternalUrl(child.url)})`);
      continue;
    }

    if (!sourceInfo.has(child.canonical)) continue;
    pages.push(relativeMetaEntry(node.canonical, child.canonical));
  }

  return {
    title: info.title,
    pages,
  };
}

function buildFallbackMeta(dir, entry, labelByCanonical) {
  const pages = Array.from(entry.pages).sort((left, right) => {
    if (left === 'index') return -1;
    if (right === 'index') return 1;
    return left.localeCompare(right);
  });

  return {
    title: labelByCanonical.get(dir) ?? titleCase(path.posix.basename(dir)),
    pages,
  };
}

async function main() {
  const summaryContent = await fs.readFile(SUMMARY_FILE, 'utf8');
  const sections = parseSummary(summaryContent);
  const { labelByCanonical, nodeByCanonical } = buildSummaryMaps(sections);

  const sourceFiles = await collectMarkdownFiles(ROOT);
  const fileContents = new Map();

  for (const sourceRel of sourceFiles) {
    const absolute = path.join(ROOT, sourceRel);
    fileContents.set(sourceRel, await fs.readFile(absolute, 'utf8'));
  }

  const { sourceInfo, oldPathToCanonical } = buildSourceInfo(sourceFiles, labelByCanonical, fileContents);

  await ensureCleanOutput();

  for (const info of sourceInfo.values()) {
    const raw = fileContents.get(info.sourceRel);
    const { data, body } = parseFrontmatter(raw);
    const description = data.description ? collapseWhitespace(data.description) : info.description;

    let nextBody = removeFirstHeading(body);
    nextBody = decodeHtmlEntities(nextBody);
    nextBody = stripLegacyAnchorTags(nextBody);
    nextBody = transformTemplateVariables(nextBody);
    nextBody = transformEmbeds(nextBody);
    nextBody = transformPreCodeBlocks(nextBody);
    nextBody = transformFigures(nextBody);
    nextBody = transformStyledMarks(nextBody);
    nextBody = transformRemoteMarkdownImages(nextBody);
    nextBody = rewriteAssetRefs(nextBody);
    nextBody = transformHints(nextBody);
    nextBody = transformContentRefs(nextBody, info.sourceRel, sourceInfo, oldPathToCanonical);
    nextBody = rewriteMarkdownLinks(nextBody, info.sourceRel, sourceInfo, oldPathToCanonical);
    nextBody = groupContentRefPlaceholders(nextBody);
    nextBody = cleanupBody(nextBody);

    const output = [
      '---',
      `title: ${markdownQuote(info.title)}`,
      description ? `description: ${markdownQuote(description)}` : null,
      '---',
      '',
      nextBody,
      '',
    ].filter(Boolean).join('\n');

    const outputPath = path.join(OUTPUT_ROOT, info.outputRel);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, output);
  }

  await writeJson(path.join(OUTPUT_ROOT, 'meta.json'), buildRootMeta(sections, sourceInfo));

  for (const [canonical, node] of nodeByCanonical.entries()) {
    if (!canonical) continue;
    const meta = buildFolderMeta(node, sourceInfo);
    if (!meta) continue;
    const dir = path.join(OUTPUT_ROOT, canonical);
    await writeJson(path.join(dir, 'meta.json'), meta);
  }

  const directories = collectTreeDirectories(sourceInfo);
  for (const [dir, entry] of directories.entries()) {
    if (!dir) continue;
    const metaPath = path.join(OUTPUT_ROOT, dir, 'meta.json');
    if (await pathExists(metaPath)) continue;
    await writeJson(metaPath, buildFallbackMeta(dir, entry, labelByCanonical));
  }

  await repairInternalLinks(sourceInfo);

  console.log(`Imported ${sourceInfo.size} Markdown files into ${path.relative(ROOT, OUTPUT_ROOT)}.`);
  console.log(`Copied assets into ${path.relative(ROOT, PUBLIC_ROOT)}.`);

  if (unresolvedLinks.length > 0) {
    console.log(`\nUnresolved links (${unresolvedLinks.length}):`);
    for (const issue of unresolvedLinks.slice(0, 20)) {
      console.log(`- ${issue.source}: ${issue.href}`);
    }

    if (unresolvedLinks.length > 20) {
      console.log(`- ...and ${unresolvedLinks.length - 20} more`);
    }
  }
}

await main();
