#!/usr/bin/env python3
"""
Find changelog entries whose body is effectively empty (all section headings
but no bullets or paragraphs under them).

Outputs:
  /tmp/empty-entries.json — list of { slug, path, published, old_slug, old_url }
"""
from __future__ import annotations

import json
import re
from pathlib import Path

CHANGELOG_DIR = Path("/Users/devin/Developer/docs/content/changelog")
SCRAPED = Path("/tmp/changelog-scraped.json")
OUT = Path("/tmp/empty-entries.json")

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.S)


def is_empty_body(body: str) -> bool:
    # Strip headings and whitespace; if nothing bullety remains, it's empty.
    # We consider an entry empty if there are zero list items and zero non-heading paragraphs.
    without_headings = re.sub(r"^#+\s+.*$", "", body, flags=re.M)
    without_bold = re.sub(r"\*\*[^*]+\*\*", "", without_headings)
    stripped = without_bold.strip()
    # If it's just whitespace, empty.
    if not stripped:
        return True
    # Check for any list items
    if re.search(r"^\s*[-*]\s+\S", body, flags=re.M):
        return False
    # Check for any actual paragraph text (non-heading lines with words)
    for line in body.splitlines():
        line = line.strip()
        if not line or line.startswith("#") or line.startswith("- "):
            continue
        if re.search(r"\w", line):
            return False
    return True


def main() -> None:
    # load slug → old_slug from scraped data
    scraped = json.loads(SCRAPED.read_text()) if SCRAPED.exists() else []
    slug_to_old: dict[str, dict] = {}
    for r in scraped:
        if "error" in r:
            continue
        # we don't have new-slug in scraped output, but we can match by publishedAt
        slug_to_old[r.get("published", "")[:10]] = r

    empties: list[dict] = []
    for path in sorted(CHANGELOG_DIR.glob("*.mdx")):
        text = path.read_text()
        m = FRONTMATTER_RE.match(text)
        if not m:
            continue
        frontmatter_raw, body = m.group(1), m.group(2)
        pub = ""
        for line in frontmatter_raw.splitlines():
            if line.startswith("publishedAt:"):
                pub = line.split(":", 1)[1].strip().strip('"').strip("'")
                break
        if is_empty_body(body):
            scrape_entry = slug_to_old.get(pub, {})
            empties.append({
                "slug": path.stem,
                "path": str(path),
                "publishedAt": pub,
                "old_slug": scrape_entry.get("old_slug"),
                "old_url": scrape_entry.get("url"),
            })

    OUT.write_text(json.dumps(empties, indent=2))
    print(f"found {len(empties)} empty entries → {OUT}")
    for e in empties:
        print(f"  {e['publishedAt']}  {e['slug']}  (old: {e.get('old_url')})")


if __name__ == "__main__":
    main()
