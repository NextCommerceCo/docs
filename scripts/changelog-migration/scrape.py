#!/usr/bin/env python3
"""
Scrape changelog.nextcommerce.com blog detail pages into structured JSON.
Input:  /tmp/changelog-urls.txt (one URL per line)
Output: /tmp/changelog-scraped.json (array of entries) — preserved across runs,
        entries with errors are retried on re-run.
"""
from __future__ import annotations

import html
import json
import random
import re
import sys
import time
import urllib.request
from pathlib import Path

URLS = Path("/tmp/changelog-urls.txt").read_text().strip().splitlines()
OUT = Path("/tmp/changelog-scraped.json")

META_RE = {
    "published": re.compile(r'article:published_time"\s*content="([^"]+)"'),
    "section": re.compile(r'article:section"\s*content="([^"]+)"'),
    "og_title": re.compile(r'og:title"\s*content="([^"]+)"'),
    "og_desc": re.compile(r'og:description"\s*content="([^"]+)"'),
}
H1_RE = re.compile(r"<h1[^>]*>(.*?)</h1>", re.S)


def strip_tags_in_li(s: str) -> str:
    s = re.sub(r"<code[^>]*>(.*?)</code>", lambda m: "`" + m.group(1) + "`", s, flags=re.S)
    s = re.sub(r"<(strong|b)[^>]*>(.*?)</\1>", lambda m: "**" + m.group(2) + "**", s, flags=re.S)
    s = re.sub(r"<(em|i)[^>]*>(.*?)</\1>", lambda m: "*" + m.group(2) + "*", s, flags=re.S)
    s = re.sub(
        r'<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)</a>',
        lambda m: f"[{m.group(2)}]({m.group(1)})",
        s,
        flags=re.S,
    )
    s = re.sub(r"<br\s*/?>", " ", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s).replace("\xa0", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def body_to_markdown(body_html: str) -> str:
    """Walk the body and emit markdown. Handles two observed layouts:

    1. `<h3>Section</h3><ul><li>…</li></ul>` — used in all entries 2020–2024
       and 2026.
    2. `<h3 class="p1"><strong>Section</strong></h3>`
       `<p class="p2">&bull; <strong>Title:</strong> text</p>` …
       — used on the six 2025 entries (Feb–May 2025). Bullets are
       individual `<p>` tags prefixed with `•` / `&bull;`.

    Strong tags wrapping an entire heading get unwrapped so layout 2
    produces a plain `## Section` heading.
    """
    out: list[str] = []
    pattern = re.compile(r"<(h3|p|ul|ol)[^>]*>(.*?)</\1>", re.S | re.I)
    for m in pattern.finditer(body_html):
        tag = m.group(1).lower()
        inner = m.group(2)
        if tag == "h3":
            text = strip_tags_in_li(inner)
            # layout 2 wraps the whole heading in <strong>…</strong>,
            # which becomes **…**. Unwrap so all headings look the same.
            text = re.sub(r"^\*\*(.+)\*\*$", r"\1", text)
            out.append(f"\n## {text}\n")
            continue
        if tag in ("ul", "ol"):
            for li in re.findall(r"<li[^>]*>(.*?)</li>", inner, flags=re.S):
                out.append(f"- {strip_tags_in_li(li)}")
            out.append("")
            continue
        if tag == "p":
            text = strip_tags_in_li(inner)
            if not text:
                continue
            bullet = re.match(r"^\s*(?:•|\*|-)\s+(.+)$", text)
            if bullet:
                out.append(f"- {bullet.group(1).strip()}")
            else:
                out.append(text)
                out.append("")
    return "\n".join(out).strip()


def parse_page(url: str, body: str) -> dict:
    meta = {}
    for key, regex in META_RE.items():
        m = regex.search(body)
        meta[key] = m.group(1) if m else None
    h1 = H1_RE.search(body)
    h1_text = strip_tags_in_li(h1.group(1)) if h1 else None
    body_match = re.search(
        r'content-body.*?<div class="col-lg-8">\s*(.*?)\s*</div>\s*</div>\s*</div>\s*</section>',
        body,
        re.S,
    )
    body_html = body_match.group(1).strip() if body_match else ""
    markdown = body_to_markdown(body_html) if body_html else ""
    slug_tail = url.rstrip("/").rsplit("/", 1)[-1]
    return {
        "url": url,
        "old_slug": slug_tail,
        "published": meta.get("published"),
        "section": meta.get("section"),
        "og_title": meta.get("og_title"),
        "og_description": meta.get("og_desc"),
        "h1": h1_text,
        "body_markdown": markdown,
    }


def fetch_one(url: str) -> dict:
    delay = 1.0
    for attempt in range(6):
        try:
            req = urllib.request.Request(
                url, headers={"User-Agent": "changelog-migration/1.0 (devin@29next.com)"}
            )
            with urllib.request.urlopen(req, timeout=30) as r:
                html_text = r.read().decode("utf-8", errors="replace")
            return parse_page(url, html_text)
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = delay * (2**attempt) + random.uniform(0, 1)
                print(f"  429, sleeping {wait:.1f}s for {url}", file=sys.stderr)
                time.sleep(wait)
                continue
            return {"url": url, "error": f"HTTP {e.code}"}
        except Exception as e:
            return {"url": url, "error": str(e)}
    return {"url": url, "error": "max retries"}


def main() -> int:
    # load cache
    cache: dict[str, dict] = {}
    if OUT.exists():
        try:
            for r in json.loads(OUT.read_text()):
                if "error" not in r and r.get("body_markdown"):
                    cache[r["url"]] = r
        except Exception:
            pass
    todo = [u for u in URLS if u not in cache]
    print(f"cached={len(cache)} todo={len(todo)}", file=sys.stderr)

    results: list[dict] = list(cache.values())
    for i, url in enumerate(todo, 1):
        r = fetch_one(url)
        results.append(r)
        # persist after every fetch for incremental progress
        if i % 10 == 0 or i == len(todo):
            tmp = results + [{"url": u, "error": "not fetched"} for u in URLS if u not in {x["url"] for x in results}]
            tmp.sort(key=lambda x: (x.get("published") or ""), reverse=True)
            OUT.write_text(json.dumps(tmp, indent=2))
            print(f"  saved {i}/{len(todo)}", file=sys.stderr)
        time.sleep(0.5 + random.uniform(0, 0.3))

    results.sort(key=lambda x: (x.get("published") or ""), reverse=True)
    OUT.write_text(json.dumps(results, indent=2))
    ok = [r for r in results if "error" not in r and r.get("body_markdown")]
    empty = [r for r in results if "error" not in r and not r.get("body_markdown")]
    errs = [r for r in results if "error" in r]
    print(f"done: ok={len(ok)} empty={len(empty)} error={len(errs)}", file=sys.stderr)
    return 0 if not errs and not empty else 1


if __name__ == "__main__":
    sys.exit(main())
