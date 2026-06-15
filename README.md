# Next Commerce Docs

Public source for [docs.nextcommerce.com](https://docs.nextcommerce.com) — the user
documentation and changelog for the Next Commerce platform.

**Primary audience for this public repo:** developers and AI agents who clone it
locally to reference accurate product docs while building stores, integrations,
and campaigns on Next Commerce. The live site remains the canonical rendered
experience.

API, SDK, webhook, and theme documentation lives separately at
[developers.nextcommerce.com](https://developers.nextcommerce.com).

AI agents: see [`AGENTS.md`](AGENTS.md) for which paths to read and which to skip.

## What lives here

| Path | Purpose |
|------|---------|
| `content/docs/` | Merchant and operator guides — **main reference surface** |
| `content/changelog/` | Published changelog entries |
| `app/`, `components/`, `lib/` | Next.js/Fumadocs site (maintainers only) |
| `scripts/` | Link validation and legacy migration utilities |
| `redirects/` | Legacy changelog redirect worker |

## Local development

Use Node.js 22 or newer.

```sh
npm install
npm run dev
```

The local site runs at `http://localhost:3000` by default.

## Validation (NEXT team)

Before merging changes to `main`, run:

```sh
npm run build
```

The build also runs docs link checks:

- `npm run audit-developer-links`
- `npm run validate-links`

Run `npm audit --omit=dev` when touching dependencies.

## Publishing

The production site is statically exported by Next.js and deployed to Cloudflare
Workers assets using `wrangler.jsonc`. See [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md)
for team workflow details.

## Contributing

This repository is **maintained by the NEXT team only**. External contributions
are not accepted. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Public clone safety

Do not commit:

- customer data, private merchant names, screenshots with account data, or support artifacts
- API keys, `.env` files, tokens, credentials, or private keys
- internal planning docs, private GitHub project exports, or sprint-only engineering notes
- staging-only URLs unless they are part of a documented public workflow

If a change depends on private operational context, keep that context in an
internal repository and link only to public, stable documentation here.
