"""List every asset a source page references, however it references them.

Assets hide in more places than `src` and `href`:

  <img src="a.webp">                     — the obvious one
  style="--hero-image:url(b.webp)"        — CSS variables on the element
  <style> .x { background:url(c.webp) }   — a <style> block in the head

Three Canada pages reference their photos only through CSS variables, so a scan
for `src=` found one image per page and missed eight. Nothing downstream
notices: the page builds, the markup matches, the photos are simply absent.

Document-relative URLs are resolved against the page route, because the source
serves each page at a directory URL and Next does not.

Usage:
    python3 -I scripts/microsite/listPageAssets.py <source.html> <route>
"""
import re
import sys

EXTENSIONS = r"webp|jpg|jpeg|png|avif|svg|gif|mp4|webm"
ATTRIBUTE = re.compile(rf"(?:src|href|poster)=[\"']([^\"']+\.(?:{EXTENSIONS}))", re.I)
CSS_URL = re.compile(rf"url\(\s*['\"]?([^)'\"]+\.(?:{EXTENSIONS}))", re.I)
SRCSET = re.compile(r"srcset=[\"']([^\"']+)[\"']", re.I)


def assets(html, route):
    """Return every referenced asset path, absolute, in a stable order."""
    base = route.rstrip("/")
    found = set()

    candidates = set(ATTRIBUTE.findall(html)) | set(CSS_URL.findall(html))
    for entry in SRCSET.findall(html):
        for part in entry.split(","):
            url = part.strip().split(" ")[0]
            if re.search(rf"\.(?:{EXTENSIONS})$", url, re.I):
                candidates.add(url)

    for url in candidates:
        if url.startswith(("http://", "https://", "data:")):
            continue
        found.add(url if url.startswith("/") else f"{base}/{url}")
    return sorted(found)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    html = open(sys.argv[1], encoding="utf-8").read()
    for path in assets(html, sys.argv[2]):
        print(path)
