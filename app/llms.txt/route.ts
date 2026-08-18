import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source/llms';

export const dynamic = 'force-static';

const BASE_URL = 'https://docs.nextcommerce.com';

const generator = llms(source);

export function GET() {
  const body = [
    '# Next Commerce Merchant Documentation',
    '',
    '> Merchant documentation for Next Commerce (NEXT), an ecommerce platform for direct-to-consumer brands and performance marketers — storefronts, orders, subscriptions, payments, fulfillment, apps, and analytics.',
    '',
    'Related resources: [Developer Docs](https://developers.nextcommerce.com/) (APIs, themes, campaigns), [Platform Changelog](/changelog), [nextcommerce.com](https://nextcommerce.com) (product and pricing).',
    '',
    generator.index(),
    '',
  ]
    .join('\n')
    // The generator emits site-relative links; agents fetch this file standalone,
    // so links must resolve without a base URL.
    .replaceAll('](/', `](${BASE_URL}/`)
    // llms.txt expects a single H1; demote the generator's root heading.
    .replace(/^# Docs$/m, '## Docs');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
