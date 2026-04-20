#!/usr/bin/env python3
"""
Prepare input JSON for subagent-driven title generation.
Reads current MDX entries (minus empties), extracts body, splits into batches.

Writes /tmp/title-batch-{1..5}.json with a list of entries:
  [{ "slug": "2020-05-15-...", "publishedAt": "2020-05-15", "body": "..." }, ...]
"""
from __future__ import annotations

import json
import re
from pathlib import Path

CHANGELOG_DIR = Path("/Users/devin/Developer/docs/content/changelog")
BATCH_COUNT = 5

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.S)


def read_entry(path: Path) -> dict:
    text = path.read_text()
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {"slug": path.stem, "body": text, "publishedAt": ""}
    fm, body = m.group(1), m.group(2)
    pub = ""
    for line in fm.splitlines():
        if line.startswith("publishedAt:"):
            pub = line.split(":", 1)[1].strip().strip('"').strip("'")
            break
    # strip crosslink markdown to plain text for the subagent — they don't need URLs to write a title
    body = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", body)
    body = re.sub(r"`([^`]+)`", r"\1", body)
    return {"slug": path.stem, "publishedAt": pub, "body": body.strip()}


def main() -> None:
    entries = [read_entry(p) for p in sorted(CHANGELOG_DIR.glob("*.mdx"))]
    # chunk into BATCH_COUNT groups
    size = (len(entries) + BATCH_COUNT - 1) // BATCH_COUNT
    for i in range(BATCH_COUNT):
        chunk = entries[i * size : (i + 1) * size]
        if not chunk:
            continue
        out = Path(f"/tmp/title-batch-{i+1}.json")
        out.write_text(json.dumps(chunk, indent=2))
        print(f"{out} → {len(chunk)} entries ({chunk[0]['publishedAt']} to {chunk[-1]['publishedAt']})")


if __name__ == "__main__":
    main()
