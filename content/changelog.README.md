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

## Content Factory integration

The Factory watches this folder for new files on `main`. When a PR lands that
adds `content/changelog/*.mdx`, the Factory picks up the frontmatter + body and
fans it out to Slack, social, and email. The webhook contract is documented in
`next-mind/designs/content-factory-above-layer1.md` — this migration's only job
was to put entries on a stable git-watchable path.

**Stable path for Factory:** `content/changelog/*.mdx` on the default branch of
`NextCommerceCo/docs`.
