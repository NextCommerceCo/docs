# Docs Site Maintenance (NEXT Team)

Internal notes for maintaining the docs.nextcommerce.com site. AI agents and
external cloners can ignore this file — see [`AGENTS.md`](../AGENTS.md).

## Publishing workflow

1. Branch from `main`, edit content under `content/docs/` or `content/changelog/`.
2. Run `npm run build` (includes link validation).
3. Merge via internal PR with review.
4. Deploy the static export to Cloudflare Workers (`wrangler.jsonc`).

## Changelog entries

Add MDX files under `content/changelog/` with frontmatter matching
`source.config.ts`. See `content/changelog.README.md` for format rules.

New entries on `main` are picked up by internal release automation (Slack/social
fan-out). The stable watch path is `content/changelog/*.mdx`.

## Validation scripts

| Script | Purpose |
|--------|---------|
| `npm run validate-links` | Internal docs link integrity |
| `npm run audit-developer-links` | Stale developer-doc URL patterns |
| `npm audit --omit=dev` | Dependency advisories |
| `npm run check-dependency-compatibility` | Matching React/Fumadocs packages and Node types |

## Dependency updates

Dependabot proposes weekly lockfile updates within the release lines declared in
`package.json`. Next.js, React, and Fumadocs use patch-only (`~`) ranges. Their
minor and major upgrades require a migration PR with an explicit range change,
`npm run build`, and both search checks. Keep security alerts and security update
PRs enabled; a security fix outside these ranges needs an explicit range change
and the same validation rather than remaining blocked by the maintenance policy.

React and React DOM must resolve to exactly the same version and update together
with their type packages. Fumadocs core and UI must also match exactly; MDX has
its own version line and should be reviewed with the Fumadocs group. Update
Next.js and `@next/third-parties` together. Node types stay on the major declared
in `.node-version` (also used by CI), and TypeScript stays on the supported major
until a deliberate compiler migration. CI checks the installed package versions
so a green build alone cannot approve a mismatched pair.

## Deprecated: changelog migration scripts

`scripts/changelog-migration/` was a one-time pipeline to backfill historical
changelog entries from the legacy `changelog.nextcommerce.com` blog. **Do not
re-run** unless explicitly rebuilding the archive — it overwrites
`content/changelog/*.mdx`.

New changelog entries should be added as normal MDX files, not through the
migration pipeline.

## Legacy redirect worker

`redirects/changelog-legacy/` serves old changelog URLs. Deploy separately from
the main site when the slug map changes.

## Public repo hygiene

Before making the GitHub repository public (or on a periodic cadence):

- Run `npm audit --omit=dev` and `npm run build`
- Scan for credentials, customer data, and private GitHub links
- Keep internal automation skills and sprint workflows out of the tracked tree
- Keep generated folders untracked: `.next/`, `.source/`, `.wrangler/`, `out/`

GitHub settings checklist: private vulnerability reporting, Dependabot alerts,
secret scanning, branch protection on `main`.
