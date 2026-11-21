"""Extract <style> blocks from a source page's <head> into a scoped sheet.

Porting reads the <body>, so anything the source declares in a <head> <style>
block is dropped. Seven pages did that, up to 9.4 kB each, and losing them left
their own grids unstyled — `.jr-fact-grid` rendered as a plain block instead of
the four-column grid the source shows.

Nothing in the build or the text diff notices: the markup is identical, the
page compiles, only the layout is wrong. Run this whenever a page is ported.

Usage:
    python3 -I scripts/microsite/extractInlineStyles.py <source.html> <out.css>
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from portMicrosite import scope_css

HEADER = """/* Styles the source ships in a <style> block in the page <head>.
 *
 * Extracted into a file because porting reads the <body> only. Scoped like
 * every other microsite sheet. Re-extract with
 * `scripts/microsite/extractInlineStyles.py`.
 */

"""


def extract(html_path, min_length=100):
    """Return the scoped CSS of the head's <style> blocks, or '' if there are none."""
    source = open(html_path, encoding="utf-8").read()
    head = source[: source.find("<body")]
    blocks = [
        block
        for block in re.findall(r"<style[^>]*>(.*?)</style>", head, re.S)
        if len(block.strip()) > min_length
    ]
    if not blocks:
        return ""
    return scope_css("\n".join(blocks))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    css = extract(sys.argv[1])
    if not css:
        print("no <style> blocks in the head")
        raise SystemExit(0)
    open(sys.argv[2], "w", encoding="utf-8").write(HEADER + css)
    print(f"{len(css)} bytes written to {sys.argv[2]}")
