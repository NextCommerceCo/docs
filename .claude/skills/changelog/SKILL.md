---
name: changelog
version: 0.3.0
description: |
  Generate a new published changelog entry for docs.nextcommerce.com from
  GitHub Releases and Sprint-tagged issues across the NextCommerceCo
  organization. Use when the user asks to draft a changelog, write a new
  sprint changelog, publish release notes for a sprint, or create a new
  entry under content/changelog/.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
---

# Changelog Generation

Drafts a new MDX entry in `/home/alex/git/29next/docs/content/changelog/` for a specific sprint.

## Always ask first

**Before doing anything, ask the user which sprint number the changelog is for.** Don't guess from the calendar. If the user gives a date range instead of a sprint number, use it and skip the project-Sprint-field source (process step 3).

## Format

Before drafting, **read 2-3 recent entries in `content/changelog/*.mdx`** to internalize the format and voice — those existing entries are the spec. The notes below are the non-obvious rules.

### Filename

`YYYY-MM-DD-tag1-tag2-tag3-tag4.mdx` — lowercase, hyphenated. Date matches `publishedAt`. Slug suffix matches the `tags` array order.

### Frontmatter (schema in `source.config.ts`)

```yaml
---
title: Sentence-case title bundling 2-3 lead items
publishedAt: "YYYY-MM-DD"
tags:
  - Tag1
  - Tag2
  - Tag3
summary: "First 1-2 sentences from the lead items, ending with …"
---
```

- `title` — sentence case, bundles 2-3 most prominent items with "and"/commas.
- `publishedAt` — quoted ISO date, regex `/^\d{4}-\d{2}-\d{2}$/`.
- `tags` — 3-4 entries (see "How to pick tags" below).
- `summary` — quoted string, 1-2 sentences from the lead items, truncated with `…`.
- `authors` — optional array. Omit unless the user explicitly asks.

### Body sections

Three H2 sections, in this exact order. Skip a section entirely if empty.

```markdown
## New Features
## Improvements
## Bug Fixes
```

Hard rules:
- **Never include `## Internal`** — internal items don't get published.
- No other heading levels. No images. No fenced code blocks. No MDX components.
- Each section is a flat bullet list of full sentences ending in periods.
- Capital first letter; never start a bullet with a lowercase word or a code span.

### Voice

**New Features / Improvements** — active, benefit-led:
- `<Product> now <verb>...`
- `<Product> can now <verb>...`
- `<Product> now features/includes/supports <noun>...`
- `We've added <feature>...`
- `We now support <feature>...`

**Bug Fixes** — `Fixed an issue where...` / `Fixed an edge case error that occurred when...` / `We've fixed an issue where...`.

Don't include severity, ticket number, repo name, version, sprint number, or engineer names.

### Inline formatting

- **Inline code** for API field/parameter/event names: `auth_code`, `network_transaction_id`, `checkout_complete`, `language`, `order_id`, `statement_descriptor`.
- **Links** for product/feature names on first prominent mention.

#### Link map

| Product / Feature | URL |
|---|---|
| Admin API | `https://developers.nextcommerce.com/docs/admin-api` |
| Campaigns Cart SDK | `https://developers.nextcommerce.com/docs/campaigns` |
| Campaigns App | `https://docs.nextcommerce.com/docs/apps/campaigns-app` |
| Shop Sync | `https://docs.nextcommerce.com/docs/apps/shop-sync` |
| Everflow | `https://docs.nextcommerce.com/docs/apps/everflow` |
| Apple Pay | `https://docs.nextcommerce.com/docs/features/payments/apple-pay` |
| 3DS | `https://docs.nextcommerce.com/docs/features/payments/3ds2-payments` |

If no public docs page exists for a feature, leave the name as plain text. Never link to GitHub, GitLab, or staging URLs.

### How to pick tags

**Analyze the topic of each issue yourself and write a tag for it.** Don't read GitHub issue labels. Don't mechanically pick from a fixed list.

1. For each bullet, read the underlying issue and identify what product area or feature it touches.
2. Write a short, capitalized tag (e.g. `Subscriptions`, `Checkout`, `Admin API`).
3. Tally and take the **3-4 most-prominent**, ordered by frequency with extra weight to lead items.

For consistency with the 144 existing entries, use these tags when an issue's topic matches:

`Admin API`, `Analytics`, `Campaigns`, `Checkout`, `Customers`, `Dashboard`, `Fulfillment`, `Offers`, `Orders`, `Payments`, `Products`, `Reports`, `Settings`, `Storefront`, `Subscriptions`, `Support`, `Taxes`, `Themes`, `Webhooks`

Create a new tag only when the topic genuinely doesn't fit; flag it for the user.

## Sprint model

Sprints are 14-day iterations on org project 4 ("Development Team"):
- Project URL: https://github.com/orgs/NextCommerceCo/projects/4
- Iteration field: `Sprint` (`ProjectV2IterationField`, 14d)
- Iteration titles: `Sprint 207`, `Sprint 208`, etc.

## Sources

Two sources, unioned:

1. **Releases shipped in the sprint window** — every release across the 15 monitored repos whose `publishedAt` is inside the sprint's date range.
2. **Issues tagged `Sprint = N` on org project 4** — issues whose Sprint field matches the requested sprint, regardless of whether they appear in any release line.

Dedupe by `(repo, issue_number)` after merging.

The two sources catch different things:
- Release-only items: PRs/changes that shipped but whose linked issue wasn't on the project (or no issue at all).
- Project-only items: issues marked done in the sprint that didn't surface as a release line.

## Monitored repositories

15 repos in `NextCommerceCo`:

`3pl-central-app`, `app-kit`, `campaign-cart`, `campaign-cart-starter-templates`, `campaign-page-kit`, `campaigns-app`, `delivery-tracking`, `facebook-conversion-api`, `gorgias`, `klaviyo`, `nexus`, `oscar-prime`, `shop-sync`, `theme-kit`, `traffic-control`

If a new product repo starts cutting releases outside this list, ask before adding it.

## Process

### 1. Ask which sprint

Required. Sprint number like `207`, `208`. Don't proceed without it.

### 2. Resolve the sprint window

```bash
gh api graphql -f query='
query {
  organization(login: "NextCommerceCo") {
    projectV2(number: 4) {
      field(name: "Sprint") {
        ... on ProjectV2IterationField {
          configuration {
            iterations { title startDate duration }
            completedIterations { title startDate duration }
          }
        }
      }
    }
  }
}'
```

Find the iteration with title `Sprint <N>` (check both `iterations` and `completedIterations`). End date = `startDate` + `duration` days.

### 3. Gather issues with Sprint = N from project 4

```bash
gh api graphql --paginate -f query='
query($cursor: String) {
  organization(login: "NextCommerceCo") {
    projectV2(number: 4) {
      items(first: 100, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          fieldValueByName(name: "Sprint") {
            ... on ProjectV2ItemFieldIterationValue { title }
          }
          content {
            __typename
            ... on Issue {
              number title state url body closedAt
              repository { name }
            }
            ... on PullRequest {
              number title state url
              repository { name }
              closingIssuesReferences(first: 5) {
                nodes { number repository { name } }
              }
            }
          }
        }
      }
    }
  }
}'
```

Filter client-side:
- Keep items where `fieldValueByName.title == "Sprint <N>"`.
- Keep `Issue` content with `state == "CLOSED"`.
- For `PullRequest` content, follow `closingIssuesReferences` to the underlying issue.

### 4. Pull releases in window

`gh release list` doesn't support `--json body`. Two-step approach: list releases with date metadata, then fetch each release body separately with `gh release view`.

```bash
# Step 4a — list releases in window across all 15 repos
{
  for repo in 3pl-central-app app-kit campaign-cart campaign-cart-starter-templates campaign-page-kit campaigns-app delivery-tracking facebook-conversion-api gorgias klaviyo nexus oscar-prime shop-sync theme-kit traffic-control; do
    gh release list -R "NextCommerceCo/$repo" --limit 100 --json tagName,publishedAt,name 2>/dev/null \
      | jq --arg s "<start>T00:00:00Z" --arg e "<end>T00:00:00Z" --arg repo "$repo" \
           '[.[] | select(.publishedAt >= $s and .publishedAt < $e) | . + {repo: $repo}]'
  done
} | jq -s 'add // []' > /tmp/releases.json

# Step 4b — fetch each release body
jq -c '.[]' /tmp/releases.json | while read -r rel; do
  repo=$(echo "$rel" | jq -r '.repo')
  tag=$(echo "$rel" | jq -r '.tagName')
  body=$(gh release view "$tag" -R "NextCommerceCo/$repo" --json body 2>/dev/null | jq -r '.body')
  echo "$rel" | jq --arg body "$body" '. + {body: $body}'
done | jq -s '.' > /tmp/releases-with-bodies.json
```

Each release body has a `## What's Changed` section with auto-generated PR lines.

### 5. Extract issue references from release bodies

Parse each release line:
- `#NNNN` (or `<REPO> #NNNN`) → issue or PR number in that repo.
- `/pull/NNNN` URL at end → PR.

For each PR ref, follow it to find the underlying issue:

```bash
gh pr view <num> -R NextCommerceCo/<repo> --json closingIssuesReferences
```

PR refs without a closing issue are typically internal/refactoring — skip.

### 6. Merge and dedupe

Combine the issue set from step 3 with the issue set from step 5. Dedupe by `(repo, number)`.

### 7. Filter

Drop items that:
- Match merge-only entries: `Merge Develop to Master`, `Merge develop into main`, `Merge branch …`.
- Are dependency bumps from Dependabot/Renovate (`Bump <pkg> from X to Y`, `chore(deps): …`).
- Are pure refactors, test-only, or CI/infra changes with no merchant-visible behavior.

### 8. Translate to merchant-facing prose

Issue titles and bodies are written in engineering language ("Catalogue Viewed Pixel Event", with "Story / Exit Criteria / Tasks" body sections). Rewrite for merchants.

For each kept item:
1. Read the issue title and body.
2. Decide the section:
   - Net-new capability → **New Features**
   - Enhancement to existing feature, perf, UX polish, expanded handling → **Improvements**
   - Defect fix, edge-case error → **Bug Fixes**
3. Write one bullet following the voice rules above.
4. Add inline `` `code` `` for any API field, parameter, or event name mentioned.
5. Link the product name using the link map. If no link is in the map and no public docs page is obvious, leave the name as plain text.

If an issue is genuinely too internal to translate (infrastructure-only, no merchant impact), drop it.

> TODO — confirm with the user: is the issue body the source of truth for the translation, or is there a separate description field or comment template engineers fill in? Current default: read issue title + body and rewrite from scratch.

### 9. Pick title, summary, tags, date

- **title** — sentence case, bundles the 2-3 most prominent New Features (or Improvements if no New Features).
- **summary** — first 1-2 sentences from the lead bullets, truncated with `…`.
- **tags** — analyze each issue's topic yourself (see "How to pick tags" above). 3-4 most-prominent.
- **publishedAt** — confirm with the user. Common choice: the date the changelog goes live.
- **filename** — `YYYY-MM-DD-tag1-tag2-tag3-tag4.mdx`.

### 10. Write the MDX file

Save to `/home/alex/git/29next/docs/content/changelog/<filename>.mdx`.

### 11. Self-check

- [ ] Filename matches `publishedAt` and tags array
- [ ] Frontmatter validates against `source.config.ts`
- [ ] Three H2 sections (or fewer), no `Internal`
- [ ] No `gitlab.com` or `github.com/NextCommerceCo` URLs in body
- [ ] Inline `code` used for all API field, event, and parameter names
- [ ] `summary` ends with `…`
- [ ] Tags came from your own topic analysis

## Cross-reference: sprint recap

If a recap exists at `~/sync/Sprint Recaps/sprint-NNN-recap.md`, read it first — it has done a lot of the engineering-to-merchant translation. The recap is the better starting point than raw issues; raw issues are the fallback.

## When unsure, ask

If you're missing the sprint number, can't decide which section a fix belongs in, or hit an issue whose merchant impact is unclear, ask the user one short question. Don't guess.
