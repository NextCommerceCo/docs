---
name: changelog
version: 0.7.0
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

Drafts a new MDX entry in `/home/alex/git/docs/content/changelog/` for a specific sprint.

## Always ask first

**Before doing anything, ask the user which sprint number the changelog is for.** Don't guess from the calendar. If the user gives a date range instead of a sprint number, use it and skip the project-Sprint-field source (process step 3).

## Format

Before drafting, read entries in `content/changelog/*.mdx` to internalize format and voice. The notes
below are the non-obvious rules.

**Do not calibrate on the newest entries.** Entries from 2026-06 onward were drafted with this skill
and have drifted long: 26 to 34 words per bullet against a six-year hand-written norm of 20 to 23.
Calibrating on them compounds the drift with every sprint. Read entries from **2022 through early
2026** instead, where the voice is stable and hand-written. Good samples: `2022-09-19`, `2024-03-01`,
`2025-02-05`.

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
- **One sentence per bullet.** Not two, not a short one plus an elaboration. If an item genuinely
  needs a second sentence, it is two items, or the second sentence is detail the reader doesn't need.
- **20 to 23 words per bullet on average**, and no bullet past ~30. This is measured, not a feel:
  see the self-check in step 11.
- Detail lost to those two rules is a feature, not a cost. Merchants skim these. Configuration
  specifics, per-country coverage lists, reproduction conditions, and background mechanics belong in
  the docs page, not the changelog.
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

**"benefit-led" is a requirement, not a flourish.** Every New Feature and Improvement bullet states
the change *and* what the merchant gets from it. A bullet that stops at the change is a bad entry:

> A new Risk Tolerance setting under Payments controls the risk score at which orders are blocked.

That tells a merchant a setting exists and nothing about why they'd touch it. With the value clause:

> A new Risk Tolerance setting under Payments sets the score at which orders are blocked, so you can
> tighten screening or loosen it to stop rejecting good customers.

**Take the value clause from the issue, don't invent it.** Nearly every issue opens with
`As a <role>, I want <thing> so that <value>`. That `so that` is the merchant value, written by the
person who scoped the work. Lift it and compress it. Where an issue has no user story, the exit
criteria usually imply the value; if neither does, ask rather than inventing a benefit.

This is the one thing that competes with the length rules. Resolve it by cutting mechanism, never by
cutting value: drop the configuration detail, the country list, the field names, and keep the
`so that`. If change plus value genuinely cannot fit one sentence under ~30 words, the bullet is
covering two things and should be split.

**Bug Fixes** — `Fixed an issue where...` / `Fixed an edge case error that occurred when...` / `We've fixed an issue where...`. These need no value clause; the value is that it stopped happening.

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

### 0. Read what's already published

```bash
ls /home/alex/git/docs/content/changelog/*.mdx | tail -3
```

Read the last two entries in full before gathering anything. This does two jobs: it is where you
pick up the format and voice, and it is the only way to know what has already gone out.

**Entries do not line up with sprint boundaries.** They are published on their own cadence, so the
previous entry has usually already covered the first week or so of the sprint you are drafting. Note
every item it published. Anything on that list is out, no matter how big it is, and the fact that a
release inside your window shipped it is not an argument for including it again.

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
query($endCursor: String) {
  organization(login: "NextCommerceCo") {
    projectV2(number: 4) {
      items(first: 100, after: $endCursor) {
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

**The cursor variable must be named `$endCursor`.** `gh --paginate` only auto-injects a variable
with that exact name. Name it `$cursor` and the variable is never bound, `after:` stays null, and gh
refetches page 1 forever without ever erroring. Sanity check after running:

```bash
# should equal the number of pages, not 1
jq -r '.data.organization.projectV2.items.pageInfo.endCursor' project-raw.json | sort -u | wc -l
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
- Are spikes (`[Spike] …`) — research, not shipped behavior.

Then apply the three checks below. Each one has produced a wrong entry before, and none of them
can be settled from the issue title.

**Already published?** Check the item against the most recent published entries (see step 0). A
sprint's first week routinely ships inside the *previous* entry's window. Anything already published
is dropped, however prominent it looks.

**Actually visible to merchants?** An issue can be closed, released, and still gated. Look for
`Display for superuser only`, `staff only`, or a feature flag in the issue body, then confirm in the
diff of its PR:

```bash
gh pr diff <num> -R NextCommerceCo/<repo> | grep -inE "is_superuser|is_staff|feature_flag|waffle"
```

A view gated on `is_superuser or is_staff` is not merchant-facing. Hold it until the gate is lifted,
and tell the user you held it.

**Actually finished?** Count the exit criteria. A large issue can be closed with most boxes still
open, which usually means the plumbing landed and the merchant-facing surface did not:

```bash
gh issue view <num> -R NextCommerceCo/<repo> --json body | jq -r .body | grep -c '^- \[x\]'
```

Nothing checked on a long list means hold it, and say so.

**Shipped after the window.** An issue tagged `Sprint = N` whose PR merged after the sprint's last
release is done but not yet live. Include it, and flag it to the user so they can drop it if the
entry should only cover what is already out.

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

Save to `/home/alex/git/docs/content/changelog/<filename>.mdx`.

### 11. Self-check

- [ ] Filename matches `publishedAt` and tags array
- [ ] Frontmatter validates against `source.config.ts`
- [ ] Three H2 sections (or fewer), no `Internal`
- [ ] No `gitlab.com` or `github.com/NextCommerceCo` URLs in body
- [ ] Inline `code` used for all API field, event, and parameter names
- [ ] `summary` ends with `…`
- [ ] Tags came from your own topic analysis
- [ ] No item duplicates one in the previous entry (step 0)
- [ ] Nothing staff-gated or with its exit criteria still open (step 7)
- [ ] Anything held back or shipped after the window was flagged to the user
- [ ] Every New Feature / Improvement bullet has a value clause lifted from its issue's `so that`
- [ ] One sentence per bullet, average 20-23 words, none past ~30:

```bash
f=content/changelog/<filename>.mdx
n=$(grep -cE "^- " "$f"); w=$(grep -E "^- " "$f" | wc -w)
echo "avg_words=$((w/n))"                                  # want 20-23
grep -E "^- " "$f" | grep -nE "\. [A-Z\`]" || echo "1 sentence each"   # want no hits
grep -E "^- " "$f" | awk '{print NF}' | sort -rn | head -1  # want <= 30
```

Compare against the hand-written norm before publishing:

```bash
for f in content/changelog/*.mdx; do n=$(grep -cE "^- " "$f"); [ "$n" -gt 0 ] && \
  echo "$((`grep -E "^- " "$f" | wc -w`/n)) $f"; done | sort -n | tail -20
```

## Cross-reference: sprint recap

Recaps live in two places, and neither has every sprint:

```bash
ls ~/sync/"Sprint Recaps"/sprint-*-recap.md /home/alex/Desktop/"Sprint Recaps"/*recap.md 2>/dev/null
```

If a recap exists for the sprint, read it first — it has done a lot of the engineering-to-merchant translation. The recap is the better starting point than raw issues; raw issues are the fallback.

## When unsure, ask

If you're missing the sprint number, can't decide which section a fix belongs in, or hit an issue whose merchant impact is unclear, ask the user one short question. Don't guess.
