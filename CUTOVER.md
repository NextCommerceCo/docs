# Docs Cutover Runbook

This runbook covers the production switch from GitBook on `docs.nextcommerce.com`
to the Cloudflare Worker deployment for `nextcommerce-docs`.

Current state on April 1, 2026:

- GitHub-connected Cloudflare deployment is building from `fumadocs-migration`
- static export build is handled by `npm run build`
- Worker deploy is driven by `wrangler.jsonc`
- current live verification URL is:
  `https://nextcommerce-docs.next-commerce.workers.dev`

## Preconditions

Before scheduling cutover, confirm all of the following:

- the latest `fumadocs-migration` commit is deployed successfully in Cloudflare
- Cloudflare build config uses:
  - Build command: `npm run build`
  - Deploy command: `npx wrangler deploy --experimental-autoconfig=false`
- the Worker deployment is healthy at:
  `https://nextcommerce-docs.next-commerce.workers.dev`
- GitBook remains live and unchanged on `docs.nextcommerce.com`
- rollback owner is identified
- DNS access is available for the cutover window

## Pre-Cutover Verification

Run the smoke test against the Worker URL:

```bash
cd /Users/devin/Developer/docs-fumadocs-migration
npm run smoke:cutover -- https://nextcommerce-docs.next-commerce.workers.dev
```

Expected coverage:

- homepage renders
- `/docs` renders
- legacy redirects resolve
- `/api/search` returns the static search index

Also do a short manual pass in a browser:

- `/`
- `/docs`
- `/manage/support`
- `/about-next`
- `/docs/build-a-store/storefront/storefront-redirects`
- `/docs/features/payments/stripe-apms`

## Cutover Window

1. Confirm there is no active content update happening in GitBook.
2. In Cloudflare Workers, add the custom domain `docs.nextcommerce.com`.
3. If Cloudflare reports a conflicting DNS record, remove the existing `docs`
   DNS record that points to GitBook.
4. Wait for Cloudflare to validate the custom domain and provision the cert.
5. Open `https://docs.nextcommerce.com`.
6. Run the smoke test against production:

```bash
cd /Users/devin/Developer/docs-fumadocs-migration
npm run smoke:cutover -- https://docs.nextcommerce.com
```

7. Do a fast human check for:
   - header and homepage rendering
   - search modal opens and returns results
   - one old URL redirects into `/docs/...`
   - images load on a couple of imported pages

## Rollback

If production fails during the cutover window:

1. Remove the Worker custom domain `docs.nextcommerce.com`.
2. Restore the previous DNS record for GitBook.
3. Re-open `https://docs.nextcommerce.com` and confirm GitBook is serving again.
4. Log the failure reason before retrying another cutover.

Rollback target remains GitBook until the confidence window is complete.

## Confidence Window

Keep GitBook available for 48 to 72 hours after cutover.

During that window:

- re-run the smoke test at least once against `https://docs.nextcommerce.com`
- watch for reported 404s or broken images
- verify the support and storefront-heavy pages still behave as expected

## Post-Cutover Cleanup

After the confidence window passes:

1. merge `fumadocs-migration` into `main`
2. switch the Cloudflare production branch from `fumadocs-migration` to `main`
3. retire GitBook from the live `docs.nextcommerce.com` path
4. keep the Worker deployment flow as the source of truth
