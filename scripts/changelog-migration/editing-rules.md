# Changelog Editing Rules

Applied by `scripts/changelog-migration/process.py` to scraped entries from
changelog.29next.store. Encodes the user-approved decisions:

- Tier (b) editing — tighten parallelism + clarity, preserve voice
- Preserve deprecated features verbatim as historical record (tier a)
- Full history (May 2020 → Mar 2026, 149 entries)

## Terminology

| Old | New | Notes |
|-----|-----|-------|
| `29 Next` / `29next` | `Next Commerce` | Legacy platform name. Footer-only mentions dropped. |
| `Campaigns app` | `Campaigns App` | Canonical capitalization. Different from `Campaign Cart`. |
| `Campaign Cart` / `Campaign Cart SDK` | preserved | Different product from Campaigns App. |
| bare `Rapid` | `Rapid Fulfillment (legacy fulfillment app)` | First mention per entry. Skip if already "Rapid Fulfillment". |
| `Omnisend` | `Omnisend (legacy email marketing app)` | First mention per entry. |
| ambiguous "checkout flow" | `Storefront Checkout` | When context implies the storefront checkout, not custom/Admin API/Campaigns checkouts. |

## Typo / grammar fixes (confident fixes only)

| Wrong | Right |
|-------|-------|
| `occured` | `occurred` |
| `udpated` | `updated` |
| `Campagins` | `Campaigns` |
| `Emoji's are` | `Emojis are` |
| `notificaiton` | `notification` |
| `snycing` | `syncing` |
| `sincoming` | `incoming` |
| `"Fixed issue with X"` | `"Fixed an issue with X"` |
| `"Fixed bug with X"` | `"Fixed a bug with X"` |

## Cross-link map (first occurrence per entry, docs + developer-docs)

First mention of each term becomes a link. Second+ occurrences stay plain.

User docs (docs.nextcommerce.com/docs):

- `Shop Sync` → `/docs/apps/shop-sync`
- `Campaigns App` → `/docs/apps/campaigns-app`
- `TaxJar` → `/docs/apps/taxjar`
- `Avalara` / `AvaTax` → `/docs/apps/avalara-avatax`
- `MaxMind` / `minFraud` → `/docs/apps/maxmind-minfraud`
- `Klaviyo` → `/docs/apps/klaviyo`
- `Gorgias` → `/docs/apps/gorgias`
- `Meta Pixel` → `/docs/apps/meta-pixel`
- `ShipStation` → `/docs/apps/shipstation`
- `Everflow` → `/docs/apps/everflow`
- `3PL Central` → `/docs/apps/3pl-central`
- `Chargeback360` / `Midigator` → `/docs/apps/midigator`
- `Apple Pay` → `/docs/features/payments/apple-pay`
- `Google Pay` → `/docs/features/payments/google-pay`
- `PayPal` (first only) → `/docs/features/payments/paypal`
- `3DS2` / `3DS` → `/docs/features/payments/3ds2-payments`
- `Offers` (as a feature area) → `/docs/features/offers`
- `Storefront Checkout` / `checkout flow` → `/docs/start-here/get-started/checkout-settings-and-policies`
- `Subscriptions` (feature) → `/docs/manage/subscriptions-guide`

Developer docs (developers.nextcommerce.com/docs):

- `Admin API` → `https://developers.nextcommerce.com/docs/admin-api`
- `Storefront GraphQL API` / `Cart JS API` → `https://developers.nextcommerce.com/docs/storefront/graphql`
- `Webhook event` / `webhook` → `https://developers.nextcommerce.com/docs/webhooks`
- `Campaign Cart` / `Campaigns JS SDK` → `https://developers.nextcommerce.com/docs/campaigns`

## Title generation

Scraped H1 values are mostly the date (`2020/5/15`). Replace with:

```
{Tag1}, {Tag2}, and {Tag3} Updates
```

…where tags come from the `article:section` meta + any additional topics
inferred from body section headings (if the body mentions Subscriptions in
"New Features" but section is "Payments", tag both).

Fallback: `Platform Updates — {Month Day, Year}`.

## Summary generation

Generated from the first 1-2 bullets of "New Features", falling back to
"Improvements" if no new features were shipped. Kept to ~2 sentences.

## Tags

Canonical tag vocabulary (title-case):

- Payments, Subscriptions, Campaigns, Checkout, Storefront, Admin API,
  Webhooks, Offers, Fulfillment, Orders, Customers, Dashboard, Taxes,
  Analytics, Apps, Developer Tools, Platform
