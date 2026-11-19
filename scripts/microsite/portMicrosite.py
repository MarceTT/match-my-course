"""Port a page of the beneficios microsite from its published source.

Two jobs, both mechanical on purpose so a re-port is cheap when the source
changes (it already rewrote every landing heading once):

  scope_css  - prefix every selector with `.mmc-microsite` so the source sheets
               cannot collide with Tailwind's generic class names (`.container`)
               or leak outside the segment. Keyframe/font-face bodies are left
               alone; body/html/:root collapse onto the wrapper.
  html_to_jsx - convert published markup to JSX with a real HTML parser. Regexes
               were tried first and silently broke all 20 inline SVGs.
"""
import re
from html.parser import HTMLParser

SCOPE = ".mmc-microsite"
ROOT = {"body", "html", ":root", "html body", "body html"}
VOID = {"img","br","hr","input","source","meta","link","area","base","col","embed","param","track","wbr"}
SVG_SELF = {"path","circle","rect","line","polyline","polygon","ellipse","use","stop"}
RENAME = {"class":"className","for":"htmlFor","srcset":"srcSet","tabindex":"tabIndex",
 "stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin",
 "fill-rule":"fillRule","clip-rule":"clipRule","stroke-miterlimit":"strokeMiterlimit",
 "xlink:href":"xlinkHref","stroke-dasharray":"strokeDasharray","clip-path":"clipPath",
 "viewbox":"viewBox","preserveaspectratio":"preserveAspectRatio","stop-color":"stopColor",
 "stop-opacity":"stopOpacity","gradientunits":"gradientUnits","colspan":"colSpan","rowspan":"rowSpan"}
NUMERIC = {"tabIndex","colSpan","rowSpan"}
BOOL = {"hidden","autoplay","muted","loop","playsinline","novalidate","required","defer","async","disabled","checked","open"}


def _scope_selector(sel):
    out = []
    for part in sel.split(","):
        p = part.strip()
        if not p:
            continue
        low = p.lower()
        if low in ROOT:
            out.append(SCOPE)
        elif low.startswith(":root"):
            out.append(SCOPE + p[5:])
        elif low.startswith("body") or low.startswith("html"):
            out.append(f"{SCOPE} {re.sub(r'^(?:html|body)\s*', '', p, flags=re.I)}".strip())
        else:
            out.append(f"{SCOPE} {p}")
    return ", ".join(out)


def scope_css(css):
    res, i, n = [], 0, len(css)
    while i < n:
        at = re.compile(r"@[\w-]+").match(css, i)
        if at:
            name = at.group(0).lower()
            j, brace = i, -1
            while j < n:
                if css[j] == ";":
                    break
                if css[j] == "{":
                    brace = j
                    break
                j += 1
            if brace == -1:
                res.append(css[i:j + 1]); i = j + 1; continue
            depth, k = 0, brace
            while k < n:
                if css[k] == "{": depth += 1
                elif css[k] == "}":
                    depth -= 1
                    if depth == 0: break
                k += 1
            header, inner = css[i:brace + 1], css[brace + 1:k]
            keep = name in ("@keyframes","@-webkit-keyframes","@font-face","@counter-style","@property")
            res.append(header + (inner if keep else scope_css(inner)) + "}")
            i = k + 1
            continue
        b = css.find("{", i)
        if b == -1:
            res.append(css[i:]); break
        depth, k = 0, b
        while k < n:
            if css[k] == "{": depth += 1
            elif css[k] == "}":
                depth -= 1
                if depth == 0: break
            k += 1
        sel, body = css[i:b], css[b + 1:k]
        lead = re.match(r"\s*", sel).group(0)
        res.append(lead + _scope_selector(sel) + "{" + body + "}")
        i = k + 1
    return "".join(res)


def _style_to_jsx(value):
    out = []
    for decl in value.split(";"):
        if ":" not in decl:
            continue
        k, v = decl.split(":", 1)
        k, v = k.strip(), v.strip().replace("\\", "\\\\").replace("'", "\\'")
        if not k or k.startswith("--"):
            continue
        k = re.sub(r"-([a-z])", lambda m: m.group(1).upper(), k)
        out.append(f"{k}: '{v}'")
    return "{{" + ", ".join(out) + "}}"


class _Converter(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.out = []

    def _tag(self, tag, attrs, closed):
        parts = []
        for k, v in attrs:
            name = RENAME.get(k.lower(), k)
            if v is None:
                parts.append(f"{name}={{true}}")
            elif k.lower() == "style":
                parts.append(f"style={_style_to_jsx(v)}")
            elif name in NUMERIC and v.strip().lstrip("-").isdigit():
                parts.append(f"{name}={{{v.strip()}}}")
            else:
                parts.append(f'{name}="{v.replace(chr(34), "&quot;")}"')
        attr = (" " + " ".join(parts)) if parts else ""
        return f'<{tag}{attr}{" />" if closed else ">"}'

    def handle_starttag(self, tag, attrs):
        self.out.append(self._tag(tag, attrs, tag in VOID or tag in SVG_SELF))

    def handle_startendtag(self, tag, attrs):
        self.out.append(self._tag(tag, attrs, True))

    def handle_endtag(self, tag):
        if tag not in VOID and tag not in SVG_SELF:
            self.out.append(f"</{tag}>")

    def handle_data(self, data):
        self.out.append(data.replace("{", '{"{"}').replace("}", '{"}"}'))

    def handle_entityref(self, name):
        self.out.append(f"&{name};")

    def handle_charref(self, name):
        self.out.append(f"&#{name};")


def html_to_jsx(html_text, drop_selectors=()):
    body = re.search(r"<body[^>]*>(.*)</body>", html_text, re.S).group(1)
    body = re.sub(r"<script.*?</script>", "", body, flags=re.S)
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    for pattern in drop_selectors:
        body = re.sub(pattern, "", body, flags=re.S)
    parser = _Converter()
    parser.feed(body)
    return "".join(parser.out).strip()
