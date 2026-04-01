const baseUrl = (process.argv[2] ?? process.env.SMOKE_BASE_URL ?? '').trim().replace(/\/+$/, '');

if (!baseUrl) {
  console.error('Usage: npm run smoke:cutover -- https://docs.nextcommerce.com');
  process.exit(1);
}

const checks = [
  {
    name: 'Homepage',
    path: '/',
    includes: ['Set up my store', 'Developer docs'],
  },
  {
    name: 'Docs landing page',
    path: '/docs',
    includes: ['Welcome to Next Commerce Docs', 'Developers Portal'],
  },
  {
    name: 'Legacy support redirect',
    path: '/manage/support',
    finalPath: '/docs/manage/support',
    includes: ['Support Guide'],
  },
  {
    name: 'Legacy about redirect',
    path: '/about-next',
    finalPath: '/docs/about-next',
    includes: ['About Next Commerce'],
  },
  {
    name: 'Static search index',
    path: '/api/search',
    includes: ['"type":"advanced"', '"/docs/about-next"'],
  },
];

async function runCheck(check) {
  const url = new URL(check.path, `${baseUrl}/`);
  const response = await fetch(url, { redirect: 'follow' });
  const body = await response.text();
  const finalUrl = new URL(response.url);
  const errors = [];

  if (!response.ok) {
    errors.push(`expected 2xx but got ${response.status}`);
  }

  if (check.finalPath && finalUrl.pathname !== check.finalPath) {
    errors.push(`expected final path ${check.finalPath} but got ${finalUrl.pathname}`);
  }

  for (const expected of check.includes ?? []) {
    if (!body.includes(expected)) {
      errors.push(`missing text ${JSON.stringify(expected)}`);
    }
  }

  return {
    ...check,
    ok: errors.length === 0,
    status: response.status,
    finalPath: finalUrl.pathname,
    errors,
  };
}

const results = [];

for (const check of checks) {
  results.push(await runCheck(check));
}

let failed = false;

for (const result of results) {
  if (result.ok) {
    console.log(`PASS ${result.name}: ${result.path} -> ${result.finalPath} (${result.status})`);
    continue;
  }

  failed = true;
  console.error(`FAIL ${result.name}: ${result.path} -> ${result.finalPath} (${result.status})`);
  for (const error of result.errors) {
    console.error(`  - ${error}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`\nAll ${results.length} cutover smoke checks passed for ${baseUrl}.`);
