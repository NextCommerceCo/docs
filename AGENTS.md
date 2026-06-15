# Agent Reference Guide

This repository is the **source of truth for Next Commerce user documentation**. It is
public so developers, agencies, and AI agents can clone it locally and reference
accurate product docs while building on the platform.

## What to read

| Need | Where to look |
|------|----------------|
| Merchant & operator guides (setup, payments, orders, campaigns, apps) | `content/docs/` |
| Published release history | `content/changelog/` |
| Live site (canonical rendered output) | [docs.nextcommerce.com](https://docs.nextcommerce.com) |
| Admin API, Campaigns SDK, webhooks, themes, GraphQL | [developers.nextcommerce.com](https://developers.nextcommerce.com) — separate repo |

Start with `content/docs/index.mdx` and `content/docs/about-next.mdx` for platform
overview, then follow the section structure under `content/docs/`.

## What to ignore

Unless you are maintaining the docs site itself, skip:

- `app/`, `components/`, `lib/` — Next.js/Fumadocs site implementation
- `scripts/changelog-migration/` — historical one-time migration tooling (deprecated)
- `redirects/` — legacy changelog redirect worker
- `docs/MAINTENANCE.md` — internal team publishing notes

## Conventions

- User docs paths use the `/docs/...` URL prefix on the live site (e.g.
  `/docs/features/payments/google-pay`).
- Link to Developer Docs for API, SDK, webhook, and theme implementation details
  rather than duplicating them here.
- Prefer current paths under `/docs/start-here/get-started/` (not legacy
  `get-started-on-29-next` URLs found in older changelog entries).

## Maintenance

This repository is maintained by the NEXT team only. External pull requests are
not accepted. See `README.md` and `docs/MAINTENANCE.md`.
