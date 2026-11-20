"""Turn in-app anchors into Next.js <Link> inside already-ported pages.

The microsite markup comes from a static site, where every link is a full page
load. Inside the app those same links should stay client-side.

This edits the anchors in place rather than re-porting the page. Re-porting
rebuilds the file around the markup and has already dropped mounted components
once, leaving a frozen marquee that still built and still looked right.

What it does, per anchor:
  - same-origin href          -> <Link>, trailing slash removed, because the app
                                 runs with `trailingSlash: false` and a trailing
                                 slash costs a redirect on every navigation
  - route not built yet       -> adds `prefetch={false}`, so links to pages from
                                 later slices do not fire 404 prefetches
  - anchors, external, mailto -> left exactly as they are

Usage:
    python3 -I scripts/microsite/linkifyPages.py app/beneficios-empresa/**/page.tsx
"""
import glob
import os
import re
import sys

ANCHOR_OPEN = re.compile(r"<a\b([^>]*)>")
HREF = re.compile(r'href="([^"]*)"')


def app_routes(app_dir="app"):
    """Every route the app builds, read from the App Router's page files."""
    routes = set()
    for page in glob.glob(f"{app_dir}/**/page.tsx", recursive=True):
        route = os.path.dirname(page)[len(app_dir):]
        routes.add(re.sub(r"/\([^)]+\)", "", route) or "/")
    return routes


def normalise(url):
    """Route for an in-app link, or None when the anchor should stay an <a>."""
    if not url.startswith("/") or url.startswith("//"):
        return None
    path, _, fragment = url.partition("#")
    if not path:
        return None
    if len(path) > 1 and path.endswith("/"):
        path = path.rstrip("/") or "/"
    return path + ("#" + fragment if fragment else "")


def linkify(source, known_routes):
    """Rewrite in-app anchors, pairing each </a> with the tag that opened it."""
    out = []
    position = 0
    stack = []  # one entry per open <a>: True when it became a <Link>
    unknown = set()
    pattern = re.compile(r"<a\b[^>]*>|</a>")

    for match in pattern.finditer(source):
        out.append(source[position:match.start()])
        position = match.end()
        token = match.group(0)

        if token == "</a>":
            out.append("</Link>" if (stack.pop() if stack else False) else "</a>")
            continue

        attrs = ANCHOR_OPEN.match(token).group(1)
        href = HREF.search(attrs)
        route = normalise(href.group(1)) if href else None
        if route is None:
            stack.append(False)
            out.append(token)
            continue

        attrs = HREF.sub(f'href="{route}"', attrs, count=1)
        if route.split("#")[0] not in known_routes:
            unknown.add(route.split("#")[0])
            attrs = attrs.rstrip() + " prefetch={false}"
        stack.append(True)
        out.append(f"<Link{attrs}>")

    out.append(source[position:])
    return "".join(out), unknown


def process(page_file, known_routes):
    source = open(page_file, encoding="utf-8").read()
    converted, unknown = linkify(source, known_routes)
    if converted == source:
        return 0, unknown
    if 'from "next/link"' not in converted:
        converted = converted.replace(
            'import type { Metadata, Viewport } from "next";',
            'import type { Metadata, Viewport } from "next";\nimport Link from "next/link";',
            1,
        )
    open(page_file, "w", encoding="utf-8").write(converted)
    return converted.count("<Link"), unknown


if __name__ == "__main__":
    files = sys.argv[1:]
    if not files:
        raise SystemExit(__doc__)
    known = app_routes()
    print(f"routes known to the app: {len(known)}")
    all_unknown = set()
    for page_file in files:
        count, unknown = process(page_file, known)
        all_unknown |= unknown
        name = os.path.basename(os.path.dirname(page_file))
        print(f"  {name:22s} links={count}")
    if all_unknown:
        print(f"\n{len(all_unknown)} route(s) linked but not built yet (prefetch off):")
        for target in sorted(all_unknown):
            print("  ", target)
