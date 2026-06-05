# Next Commerce Docs

This repository powers [docs.nextcommerce.com](https://docs.nextcommerce.com), the public user documentation and changelog for the Next Commerce platform.

Developer API documentation lives separately at [developers.nextcommerce.com](https://developers.nextcommerce.com).

## What lives here

- `content/docs/` contains merchant and operator guides.
- `content/changelog/` contains published changelog entries.
- `app/`, `components/`, and `lib/` contain the Next.js/Fumadocs site.
- `scripts/` contains content validation and historical migration utilities.
- `redirects/` contains the legacy changelog redirect worker.

## Local development

Use Node.js 22 or newer.

```sh
npm install
npm run dev
```

The local site runs at `http://localhost:3000` by default.

## Validation

Before opening a pull request, run:

```sh
npm run build
```

The build also runs the docs link checks:

- `npm run audit-developer-links`
- `npm run validate-links`

Run `npm audit --omit=dev` when touching dependencies.

## Publishing

The production site is statically exported by Next.js and deployed to Cloudflare Workers assets using `wrangler.jsonc`.

Normal content changes should land through pull requests. Changelog entries should be added as MDX files under `content/changelog/` with frontmatter matching `source.config.ts`.

## Public Repository Notes

This repo is intended to be safe for public cloning by agencies, developers, merchants, and AI agents. Do not commit:

- customer data, private merchant names, screenshots with account data, or support artifacts
- API keys, `.env` files, tokens, credentials, or private keys
- internal planning docs, private GitHub project exports, or sprint-only engineering notes
- staging-only URLs unless they are part of a documented public workflow

If a change depends on private operational context, keep that context in an internal repository and link only to public, stable documentation here.
