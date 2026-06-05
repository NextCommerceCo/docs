#!/usr/bin/env python3
"""
Process scraped changelog JSON into MDX files + redirect slug map.

Inputs:
  /tmp/changelog-scraped.json       — scraped raw entries
  content/changelog/                — destination
  /tmp/editing-rules.md             — terminology reference

Outputs:
  ./content/changelog/YYYY-MM-DD-{slug}.mdx (per entry)
  /tmp/redirect-slug-map.json  — old_slug → new_slug
  /tmp/process-report.md       — summary of processing actions
"""
from __future__ import annotations

import datetime as dt
import json
import re
import sys
from pathlib import Path

SCRAPED = Path("/tmp/changelog-scraped.json")
REPO_ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = REPO_ROOT / "content/changelog"
SLUG_MAP_OUT = Path("/tmp/redirect-slug-map.json")

# ---------- Terminology / typo rules ----------

TYPO_FIXES = [
    (re.compile(r"\boccured\b"), "occurred"),
    (re.compile(r"\budpated\b"), "updated"),
    (re.compile(r"\bCampagins\b"), "Campaigns"),
    (re.compile(r"\bEmoji's\b"), "Emojis"),
    (re.compile(r"\bnotificaiton\b"), "notification"),
    (re.compile(r"\bsnycing\b"), "syncing"),
    (re.compile(r"\bsincoming\b"), "incoming"),
    (re.compile(r"\bpossibily\b"), "possibly"),
    (re.compile(r"\bretreive\b"), "retrieve"),
    (re.compile(r"\bfucntion\b"), "function"),
    (re.compile(r"\bcateogry\b"), "category"),
    (re.compile(r"\brecieve\b"), "receive"),
    (re.compile(r"\bseperate\b"), "separate"),
]

GRAMMAR_FIXES = [
    # Insert missing articles in stock phrases
    (re.compile(r"\bFixed issue where\b"), "Fixed an issue where"),
    (re.compile(r"\bFixed issue with\b"), "Fixed an issue with"),
    (re.compile(r"\bFixed issue preventing\b"), "Fixed an issue preventing"),
    (re.compile(r"\bFixed issue related to\b"), "Fixed an issue related to"),
    (re.compile(r"\bFixed issue that\b"), "Fixed an issue that"),
    (re.compile(r"\bFixed issue when\b"), "Fixed an issue when"),
    (re.compile(r"\bFixed bug where\b"), "Fixed a bug where"),
    (re.compile(r"\bFixed bug with\b"), "Fixed a bug with"),
    (re.compile(r"\bfix issue where\b"), "fix an issue where"),
    # "29 Next" → "Next Commerce" (always), except preserve "29Next Payments" brand usages
    (re.compile(r"\b29next\b", re.I), "Next Commerce"),
    (re.compile(r"\b29 Next\b"), "Next Commerce"),
    # "Campaigns app" (lowercase a) → "Campaigns App"
    (re.compile(r"\bCampaigns app\b"), "Campaigns App"),
    # Remove "Introducing " lead-in on first bullets (used a lot in 2020-2022)
    # Leave alone — preserves original voice
]

# "Rapid" alone (not "Rapid Fulfillment" or "RapidAPI" etc.) → first-mention expansion
RAPID_BARE = re.compile(r"\bRapid\b(?!\s+Fulfillment)")
OMNISEND_BARE = re.compile(r"\bOmnisend\b")


# ---------- Cross-link map ----------

# Ordered: longer terms before shorter (so "Campaigns App" matches before "Campaigns")
USER_DOCS = "https://docs.nextcommerce.com"
DEV_DOCS = "https://developers.nextcommerce.com"

CROSSLINKS: list[tuple[re.Pattern, str]] = [
    # Apps — user docs
    (re.compile(r"\bShop Sync\b"), f"{USER_DOCS}/docs/apps/shop-sync"),
    (re.compile(r"\bCampaigns App\b"), f"{USER_DOCS}/docs/apps/campaigns-app"),
    (re.compile(r"\bTaxJar\b"), f"{USER_DOCS}/docs/apps/taxjar"),
    (re.compile(r"\bAvalara(?: AvaTax)?\b"), f"{USER_DOCS}/docs/apps/avalara-avatax"),
    (re.compile(r"\bAvaTax\b"), f"{USER_DOCS}/docs/apps/avalara-avatax"),
    (re.compile(r"\bMaxMind(?: minFraud)?\b"), f"{USER_DOCS}/docs/apps/maxmind-minfraud"),
    (re.compile(r"\bKlaviyo\b"), f"{USER_DOCS}/docs/apps/klaviyo"),
    (re.compile(r"\bGorgias\b"), f"{USER_DOCS}/docs/apps/gorgias"),
    (re.compile(r"\bMeta Pixel\b"), f"{USER_DOCS}/docs/apps/meta-pixel"),
    (re.compile(r"\bShipStation\b"), f"{USER_DOCS}/docs/apps/shipstation"),
    (re.compile(r"\bEverflow\b"), f"{USER_DOCS}/docs/apps/everflow"),
    (re.compile(r"\b3PL Central\b"), f"{USER_DOCS}/docs/apps/3pl-central"),
    (re.compile(r"\bChargeback360\b"), f"{USER_DOCS}/docs/apps/midigator"),
    (re.compile(r"\bMidigator\b"), f"{USER_DOCS}/docs/apps/midigator"),
    # Payment features
    (re.compile(r"\bApple Pay\b"), f"{USER_DOCS}/docs/features/payments/apple-pay"),
    (re.compile(r"\bGoogle Pay\b"), f"{USER_DOCS}/docs/features/payments/google-pay"),
    (re.compile(r"\b3DS2?\b"), f"{USER_DOCS}/docs/features/payments/3ds2-payments"),
    # Don't auto-link PayPal, Stripe, Klarna — they're mentioned too frequently and
    # often as brand names in body copy. Skip to avoid linking noise.
    # Developer docs
    (re.compile(r"\bAdmin API\b"), f"{DEV_DOCS}/docs/admin-api"),
    (re.compile(r"\bCart JS API\b"), f"{DEV_DOCS}/docs/storefront/graphql"),
    (re.compile(r"\bStorefront GraphQL API\b"), f"{DEV_DOCS}/docs/storefront/graphql"),
    # "Webhooks" capitalized (not lowercase "webhook")
    (re.compile(r"\bWebhooks\b"), f"{DEV_DOCS}/docs/webhooks"),
    # Campaigns JS SDK / Campaign Cart / Campaigns Cart SDK
    (re.compile(r"\bCampaigns? Cart(?: SDK)?\b"), f"{DEV_DOCS}/docs/campaigns"),
    (re.compile(r"\bCampaigns JS SDK\b"), f"{DEV_DOCS}/docs/campaigns"),
]

# ---------- Tag inference ----------

TAG_KEYWORDS: list[tuple[re.Pattern, str]] = [
    (re.compile(r"\b(subscription|subscriptions|renewal)\b", re.I), "Subscriptions"),
    (re.compile(r"\b(payment|payments|gateway|3DS|3DS2|bankcard|bank card|transaction|refund)\b", re.I), "Payments"),
    (re.compile(r"\b(Campaigns App|Campaign Cart|Campaigns JS|campaigns?)\b"), "Campaigns"),
    (re.compile(r"\b(checkout|express checkout|express payment|one step checkout)\b", re.I), "Checkout"),
    (re.compile(r"\b(storefront|theme|blog|pages|reviews|seo)\b", re.I), "Storefront"),
    (re.compile(r"\bAdmin API\b"), "Admin API"),
    (re.compile(r"\b(webhook|webhooks)\b", re.I), "Webhooks"),
    (re.compile(r"\b(offer|offers|coupon|promotion|discount)\b", re.I), "Offers"),
    (re.compile(r"\b(fulfillment|shipping|tracking|carrier)\b", re.I), "Fulfillment"),
    (re.compile(r"\b(order|orders)\b", re.I), "Orders"),
    (re.compile(r"\b(customer|customers)\b", re.I), "Customers"),
    (re.compile(r"\b(dashboard|admin|users)\b", re.I), "Dashboard"),
    (re.compile(r"\b(tax|taxes|taxjar|avalara|avatax)\b", re.I), "Taxes"),
    (re.compile(r"\b(report|reports|analytics|dashboard|metrics)\b", re.I), "Analytics"),
    (re.compile(r"\b(shop sync|klaviyo|gorgias|shipstation|everflow|maxmind|midigator|3pl|chargeback360|meta pixel)\b", re.I), "Apps"),
]

PAYMENT_BRANDS = re.compile(
    r"\b(PayPal|Stripe|Klarna|Affirm|iDEAL|Bancontact|SEPA|Apple Pay|Google Pay|Stripe Link)\b",
    re.I,
)


# ---------- Helpers ----------

def parse_date(iso: str) -> dt.date:
    return dt.datetime.fromisoformat(iso.replace("Z", "+00:00")).date()


def sanitize_body(md: str) -> str:
    # Strip empty-text anchor links like [](#some-id) left over from GitHub-style
    # heading anchors. Both attached to a heading ("[](#foo)Foo") and standalone.
    md = re.sub(r"\[\]\(#[^)]+\)", "", md)
    # Collapse any "## [](#id) Foo" residue (with or without space) into "## Foo"
    md = re.sub(r"^(#+\s*)\s*", lambda m: m.group(1), md, flags=re.M)
    for rgx, repl in TYPO_FIXES:
        md = rgx.sub(repl, md)
    for rgx, repl in GRAMMAR_FIXES:
        md = rgx.sub(repl, md)
    # Strip trailing collapsed &nbsp; paragraphs and hard-space artifacts
    md = md.replace("\xa0", " ").replace("&nbsp;", " ")
    # Remove any ghost paragraphs like lines of just spaces
    md = re.sub(r"\n\s*\n\s*\n", "\n\n", md)
    # Expand legacy product first mentions
    if re.search(r"\bOmnisend\b", md) and "(legacy email marketing app)" not in md:
        md = OMNISEND_BARE.sub(
            "Omnisend (legacy email marketing app)",
            md,
            count=1,
        )
    if re.search(r"\bRapid\b", md) and "(legacy fulfillment app)" not in md:
        md = RAPID_BARE.sub(
            "Rapid Fulfillment (legacy fulfillment app)",
            md,
            count=1,
        )
    return md.strip() + "\n"


def apply_crosslinks(md: str) -> str:
    """Replace first occurrence of each known term with a Markdown link.

    Don't touch occurrences inside existing links, inline code, or headings.
    """
    lines = md.splitlines()
    used: set[str] = set()

    for i, line in enumerate(lines):
        # skip headings
        if line.startswith("#"):
            continue
        out = line
        # replace one term at a time, first occurrence only
        for rgx, url in CROSSLINKS:
            if url in used:
                continue
            m = rgx.search(out)
            if not m:
                continue
            # Guard: skip if inside backticks
            # Simplistic: if the match spans inside `...`, skip
            start, end = m.span()
            pre = out[:start]
            if pre.count("`") % 2 == 1:
                continue
            # Guard: skip if already inside a markdown link [text](url)
            # If there's a "](" before end without a "]" after start, we're in one
            if out.rfind("](", 0, end) > out.rfind(")", 0, start):
                continue
            label = m.group(0)
            out = out[:start] + f"[{label}]({url})" + out[end:]
            used.add(url)
        lines[i] = out
    return "\n".join(lines)


def infer_tags(section: str | None, body: str) -> list[str]:
    tags: list[str] = []
    # Section from meta is authoritative first tag
    if section:
        section_clean = section.strip()
        # normalize: "Campaigns App" → "Campaigns"
        if section_clean == "Campaigns App":
            section_clean = "Campaigns"
        if section_clean and section_clean not in tags:
            tags.append(section_clean)
    # add tags from keyword scan, capped at 4
    for rgx, tag in TAG_KEYWORDS:
        if tag in tags:
            continue
        if rgx.search(body):
            tags.append(tag)
        if len(tags) >= 4:
            break
    if not tags:
        tags = ["Platform"]
    return tags


def infer_summary(body: str) -> str:
    """Pull first 1-2 bullets under 'New Features'; fallback to 'Improvements'."""

    def first_bullets(heading: str, n: int = 2) -> list[str]:
        m = re.search(
            rf"^##\s+{re.escape(heading)}\s*$(.*?)^##|\Z",
            body,
            re.M | re.S,
        )
        if not m:
            return []
        block = m.group(1) or ""
        bullets = re.findall(r"^- (.+?)$", block, re.M)
        return bullets[:n]

    bullets = first_bullets("New Features", n=2)
    if not bullets:
        bullets = first_bullets("Improvements", n=2)
    if not bullets:
        bullets = first_bullets("Bug Fixes", n=1)
    if not bullets:
        return ""
    # Strip leading "Introducing " / "We've added" etc. to make summary terser.
    cleaned = []
    for b in bullets:
        # strip markdown links leaving the link text: [text](url) → text
        s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", b)
        s = re.sub(r"`([^`]+)`", r"\1", s)  # inline code
        s = re.sub(r"\s+", " ", s).strip()
        cleaned.append(s)
    summary = " ".join(cleaned)
    if len(summary) > 280:
        summary = summary[:277].rsplit(" ", 1)[0] + "…"
    return summary


def title_from_tags(tags: list[str], date: dt.date) -> str:
    if not tags or tags == ["Platform"]:
        return f"Platform Updates — {date.strftime('%B %-d, %Y')}"
    if len(tags) == 1:
        return f"{tags[0]} Updates"
    if len(tags) == 2:
        return f"{tags[0]} and {tags[1]} Updates"
    return ", ".join(tags[:-1]) + f", and {tags[-1]} Updates"


def slug_from(date: dt.date, tags: list[str]) -> str:
    tag_part = "-".join(t.lower().replace(" ", "-") for t in tags[:4])
    # replace unsafe chars
    tag_part = re.sub(r"[^a-z0-9\-]", "", tag_part)
    return f"{date.isoformat()}-{tag_part}"


def render_mdx(entry_out: dict) -> str:
    fm_lines = ["---"]
    fm_lines.append(f"title: {yaml_scalar(entry_out['title'])}")
    fm_lines.append(f'publishedAt: "{entry_out["publishedAt"]}"')
    fm_lines.append("tags:")
    for t in entry_out["tags"]:
        fm_lines.append(f"  - {t}")
    fm_lines.append(f"summary: {yaml_scalar(entry_out['summary'])}")
    fm_lines.append("---")
    fm_lines.append("")
    fm_lines.append(entry_out["body"].rstrip())
    fm_lines.append("")
    return "\n".join(fm_lines)


def yaml_scalar(s: str) -> str:
    """Emit a YAML scalar safely (quote if it contains reserved chars)."""
    if not s:
        return '""'
    if s.startswith(("- ", "? ", ": ", "!", "&", "*", "@", "`", "|", ">")):
        return json.dumps(s)
    if any(c in s for c in [":", "#", "'", '"', "\n"]):
        return json.dumps(s)
    return s


def main() -> int:
    scraped = json.loads(SCRAPED.read_text())
    ok = [r for r in scraped if "error" not in r and r.get("body_markdown")]

    slug_map: dict[str, str] = {}
    report_lines: list[str] = ["# Changelog Processing Report\n"]
    new_slugs_seen: dict[str, int] = {}
    written = 0

    # Clear existing generated output — keep only the 5 hand-authored files
    # if the user wants to diff. But per task, replace with the processed set.
    for p in sorted(OUT_DIR.glob("*.mdx")):
        p.unlink()

    for entry in sorted(ok, key=lambda x: x["published"]):
        try:
            date = parse_date(entry["published"])
        except Exception:
            report_lines.append(f"- SKIP bad date {entry.get('url')}: {entry.get('published')}")
            continue
        body = sanitize_body(entry["body_markdown"])
        body = apply_crosslinks(body)
        tags = infer_tags(entry.get("section"), body)
        title = title_from_tags(tags, date)
        summary = infer_summary(body)
        if not summary:
            summary = f"Platform update on {date.strftime('%B %-d, %Y')}."

        slug = slug_from(date, tags)
        # de-duplicate
        count = new_slugs_seen.get(slug, 0)
        new_slugs_seen[slug] = count + 1
        if count:
            slug = f"{slug}-{count + 1}"
        entry_out = {
            "title": title,
            "publishedAt": date.isoformat(),
            "tags": tags,
            "summary": summary,
            "body": body,
        }
        path = OUT_DIR / f"{slug}.mdx"
        path.write_text(render_mdx(entry_out))
        slug_map[entry["old_slug"]] = slug
        written += 1

    SLUG_MAP_OUT.write_text(json.dumps(slug_map, indent=2))
    report_lines.append(f"\nWrote **{written}** MDX files. Slug map: {len(slug_map)} entries.")
    Path("/tmp/process-report.md").write_text("\n".join(report_lines))
    print(f"wrote {written} MDX files → {OUT_DIR}")
    print(f"slug map → {SLUG_MAP_OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
