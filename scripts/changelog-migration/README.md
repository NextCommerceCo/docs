# Changelog Migration Scripts

One-time (but re-runnable) pipeline that pulled the full historical changelog
from `changelog.nextcommerce.com` (the legacy storefront blog) into
`content/changelog/` as fumadocs-compatible MDX.

## Order of operations

```sh
# 1. Dump every blog-post URL from the legacy sitemap into a flat list.
curl -s https://changelog.nextcommerce.com/sitemap-blog-posts.xml \
  | grep -oE '<loc>[^<]+</loc>' | sed -E 's|</?loc>||g' > /tmp/changelog-urls.txt

# 2. Fetch every page and persist structured JSON. Idempotent — cached entries
#    on successive runs, backs off on 429s. Writes /tmp/changelog-scraped.json.
python3 scripts/changelog-migration/scrape.py

# 3. (Optional — snapshots the Docs / Dev Docs targets used by the cross-link
#    pass. Only needed when the cross-link map is being rebuilt.)
python3 scripts/changelog-migration/index-crosslink-targets.py

# 4. Transform scraped JSON into MDX + emit the redirect slug map.
python3 scripts/changelog-migration/process.py
cp /tmp/redirect-slug-map.json redirects/changelog-legacy/slug-map.json

# 5. Build + deploy the main site. Deploy the redirect worker separately.
npm run build
cd redirects/changelog-legacy && npx wrangler deploy
```

## Terminology + editing rules

See [`editing-rules.md`](editing-rules.md) for the full rules baked into
`process.py` — terminology normalization (`29 Next` → `Next Commerce`,
`Campaigns app` → `Campaigns App`), legacy-app annotations (`Omnisend
(legacy email marketing app)`, `Rapid Fulfillment (legacy fulfillment app)`),
typo/grammar fixes, tag inference, and the cross-link map.

## Re-running the pipeline

Safe to re-run at any time. `process.py` clears
`content/changelog/*.mdx` before writing a fresh set, so manual edits to any
entry will be overwritten. If you hand-edit an entry, exclude it from
regeneration by renaming the generated slug away from the
`YYYY-MM-DD-{tags}` pattern and adding a guard in `process.py`.

Adding new entries going forward should happen as normal MDX PRs into
`content/changelog/`, not through this pipeline — the pipeline exists to
backfill the historical archive.
