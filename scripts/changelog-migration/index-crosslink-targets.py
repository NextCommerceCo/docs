#!/usr/bin/env python3
"""
Build a cross-link target index from the Next Commerce docs and developer-docs repos.
Each target is { url, title, description, keywords }.

Output: /tmp/crosslink-targets.json

Set DEV_DOCS_ROOT to point at a local developer-docs checkout. If it is not set,
the script looks for a sibling ../developer-docs/content/docs directory.
"""
from __future__ import annotations

import json
import os
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
DOCS_ROOT = REPO_ROOT / "content/docs"
DEV_DOCS_ROOT = Path(
    os.environ.get("DEV_DOCS_ROOT", REPO_ROOT.parent / "developer-docs/content/docs")
)
DOCS_BASE = "https://docs.nextcommerce.com/docs"
DEV_DOCS_BASE = "https://developers.nextcommerce.com/docs"
OUT = Path("/tmp/crosslink-targets.json")

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---", re.S)


def read_frontmatter(path: Path) -> dict:
    text = path.read_text(errors="replace")
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}
    out = {}
    for line in m.group(1).splitlines():
        if ":" in line and not line.startswith(" "):
            k, _, v = line.partition(":")
            v = v.strip().strip('"').strip("'")
            out[k.strip()] = v
    return out


def slugify_path(root: Path, path: Path) -> str:
    rel = path.relative_to(root).with_suffix("")
    parts = [p for p in rel.parts]
    if parts and parts[-1] == "index":
        parts = parts[:-1]
    return "/".join(parts)


def build_index(root: Path, base: str) -> list[dict]:
    out: list[dict] = []
    for p in sorted(root.rglob("*.mdx")):
        fm = read_frontmatter(p)
        title = fm.get("title", "")
        description = fm.get("description", "")
        slug = slugify_path(root, p)
        url = f"{base}/{slug}" if slug else base
        if not title:
            # derive from filename
            title = p.stem.replace("-", " ").title()
        out.append({
            "url": url,
            "title": title,
            "description": description,
            "path": str(p.relative_to(root)),
        })
    return out


def main() -> None:
    docs = build_index(DOCS_ROOT, DOCS_BASE)
    dev = build_index(DEV_DOCS_ROOT, DEV_DOCS_BASE)
    all_targets = {"user_docs": docs, "developer_docs": dev}
    OUT.write_text(json.dumps(all_targets, indent=2))
    print(f"user_docs: {len(docs)} dev_docs: {len(dev)} → {OUT}")


if __name__ == "__main__":
    main()
