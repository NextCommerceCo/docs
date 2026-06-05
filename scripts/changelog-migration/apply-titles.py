#!/usr/bin/env python3
"""
Apply LLM-written titles to MDX frontmatter.

Reads /tmp/all-titles.json ({ slug: title }).
Rewrites `title: ...` line in each MDX file's frontmatter.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
CHANGELOG_DIR = REPO_ROOT / "content/changelog"
TITLES = Path("/tmp/all-titles.json")


def yaml_scalar(s: str) -> str:
    if not s:
        return '""'
    if s.startswith(("- ", "? ", ": ", "!", "&", "*", "@", "`", "|", ">")):
        return json.dumps(s)
    if any(c in s for c in [":", "#", "'", '"', "\n"]):
        return json.dumps(s)
    return s


def main() -> int:
    titles = json.loads(TITLES.read_text())
    changed = 0
    missing = []
    for path in sorted(CHANGELOG_DIR.glob("*.mdx")):
        new_title = titles.get(path.stem)
        if not new_title:
            missing.append(path.stem)
            continue
        text = path.read_text()
        # replace the `title:` line only within the first frontmatter block
        text_new = re.sub(
            r"^(title:)[^\n]*",
            f"title: {yaml_scalar(new_title)}",
            text,
            count=1,
            flags=re.M,
        )
        if text_new != text:
            path.write_text(text_new)
            changed += 1
    print(f"updated {changed} of {len(list(CHANGELOG_DIR.glob('*.mdx')))} MDX files")
    if missing:
        print(f"{len(missing)} entries missing from titles map:")
        for m in missing[:10]:
            print(f"  {m}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
