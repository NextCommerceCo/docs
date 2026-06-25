# Changelog Content

Source of truth for `docs.nextcommerce.com/changelog`. Every entry is an MDX file
committed to git — no CMS, no database.

## Path convention

All entries live directly in this folder (flat, no subdirectories):

```
content/changelog/YYYY-MM-DD-kebab-case-slug.mdx
```

- `YYYY-MM-DD-` prefix keeps files sorted on disk but is stripped from the URL
  (the route is `/changelog/[slug]` using the filename stem as the slug).
- Use kebab-case for the title portion. The slug is what appears in the URL, so
  make it readable and stable — don't rename after publishing.

## Frontmatter

```yaml
---
title: Short, sentence-case entry title
publishedAt: 2026-04-20        # Required. YYYY-MM-DD.
tags:                          # Required. At least one.
  - Payments
  - Webhooks
summary: One or two sentences shown on the index and used as meta description.
authors:                       # Optional.
  - Devin Michael
---
```

Schema is enforced in `source.config.ts`. A malformed frontmatter fails the build.

## Body

Standard MDX. Recommended structure:

```md
## New Features
- ...

## Improvements
- ...

## Bug Fixes
- ...
```

Use any MDX/fumadocs components — the same `getMDXComponents` map that powers
`/docs` is applied.

## Publishing (NEXT team)

Add entries as MDX files under `content/changelog/` on `main`. New files are
picked up by internal release automation. See `docs/MAINTENANCE.md` for the
full team workflow.

Use stable public URLs when linking to docs pages (`https://docs.nextcommerce.com/docs/...`)
and developer docs (`https://developers.nextcommerce.com/docs/...`).
