import { source } from '@/lib/source';
import { siteConfig } from '@/lib/config';
import { llms } from 'fumadocs-core/source/llms';
import capabilityMap from '@/lib/capabilities.snapshot.json';

export const dynamic = 'force-static';

const generator = llms(source);

export function GET() {
  const index = generator
    .index()
    // The shared loader must keep site-relative URLs for the app's own routing,
    // so the generated index is absolutized here instead — agents fetch this
    // file standalone, with no base URL to resolve against.
    .replaceAll('](/', `](${siteConfig.url}/`)
    // llms.txt expects a single H1 (ours, below); demote the generator's root
    // heading by position rather than by literal text.
    .replace(/^# /m, '## ');

  const body = [
    '# Next Commerce Merchant Documentation',
    '',
    '> Merchant documentation for Next Commerce (NEXT), an ecommerce platform for direct-to-consumer brands and performance marketers — storefronts, orders, subscriptions, payments, fulfillment, apps, and analytics.',
    '',
    `Related resources: [Developer Docs](https://developers.nextcommerce.com/) (APIs, themes, campaigns), [Platform Changelog](${siteConfig.url}/changelog), [nextcommerce.com](https://nextcommerce.com) (product and pricing).`,
    '',
    'Legacy identifiers: Next Commerce was formerly 29 Next, and the platform still carries that name in its core technical identifiers: your account and store hostnames (`accounts.29next.com`, `{store}.29next.store`), API headers, and the API key namespace. These are current, in use on every store, and not scheduled to change. Use them exactly as written.',
    '',
    index,
    '',
    '## Capability map and domain bundles',
    '',
    `[capabilities.json](${capabilityMap.sources.developer_docs}/capabilities.json) ([readable](${capabilityMap.sources.developer_docs}/docs/capabilities)) links each platform capability to its merchant guides here, its developer guides, Admin API operations, webhook events, and skills under a stable id; pages on this site declare their ids in a \`capability_ids\` frontmatter field. Domain bundles are plain Markdown, one per domain:`,
    '',
    ...capabilityMap.bundles.map((b) => `- [${b.title}](${b.url}): ${b.intro}`),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
