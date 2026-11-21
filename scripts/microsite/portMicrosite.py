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
 "stop-opacity":"stopOpacity","gradientunits":"gradientUnits","colspan":"colSpan","rowspan":"rowSpan",
 # SVG attribute names are camelCase in JSX; HTML parsing lowercases them.
 "clippathunits":"clipPathUnits","gradienttransform":"gradientTransform",
 "patternunits":"patternUnits","patterncontentunits":"patternContentUnits",
 "patterntransform":"patternTransform","maskunits":"maskUnits",
 "maskcontentunits":"maskContentUnits","markerwidth":"markerWidth",
 "markerheight":"markerHeight","markerunits":"markerUnits","refx":"refX","refy":"refY",
 "spreadmethod":"spreadMethod","startoffset":"startOffset","textlength":"textLength",
 "lengthadjust":"lengthAdjust","filterunits":"filterUnits","primitiveunits":"primitiveUnits",
 "baseprofile":"baseProfile","attributename":"attributeName","repeatcount":"repeatCount",
 "stddeviation":"stdDeviation","shape-rendering":"shapeRendering",
 "text-anchor":"textAnchor","dominant-baseline":"dominantBaseline",
 "font-family":"fontFamily","font-size":"fontSize","font-weight":"fontWeight",
 "letter-spacing":"letterSpacing","fill-opacity":"fillOpacity",
 "stroke-opacity":"strokeOpacity","stroke-dashoffset":"strokeDashoffset",
 "vector-effect":"vectorEffect","paint-order":"paintOrder","mix-blend-mode":"mixBlendMode",
 "color-interpolation-filters":"colorInterpolationFilters","enable-background":"enableBackground",
 "xmlns:xlink":"xmlnsXlink","xml:space":"xmlSpace","crossorigin":"crossOrigin",
 "datetime":"dateTime","autocomplete":"autoComplete","maxlength":"maxLength",
 "minlength":"minLength","spellcheck":"spellCheck","enterkeyhint":"enterKeyHint",
 "inputmode":"inputMode","accesskey":"accessKey","contenteditable":"contentEditable",
 "usemap":"useMap","novalidate":"noValidate","formaction":"formAction",
 "referrerpolicy":"referrerPolicy","allowfullscreen":"allowFullScreen"}
NUMERIC = {"tabIndex","colSpan","rowSpan"}
BOOL = {"hidden","autoplay","muted","loop","playsinline","novalidate","required","defer","async","disabled","checked","open","inert","selected","readonly","multiple","controls","reversed","autofocus"}
# HTML parsing lowercases tag names, but SVG element names are case-sensitive in
# JSX: <clippath> is not a known element and fails the build.
SVG_ELEMENTS = {
    "clippath": "clipPath", "lineargradient": "linearGradient",
    "radialgradient": "radialGradient", "textpath": "textPath",
    "foreignobject": "foreignObject", "fegaussianblur": "feGaussianBlur",
    "fedropshadow": "feDropShadow", "feoffset": "feOffset",
    "feblend": "feBlend", "fecolormatrix": "feColorMatrix",
    "fecomposite": "feComposite", "feflood": "feFlood",
    "femerge": "feMerge", "femergenode": "feMergeNode",
    "femorphology": "feMorphology", "feturbulence": "feTurbulence",
    "animatetransform": "animateTransform", "animatemotion": "animateMotion",
}


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


COMMENT = re.compile(r"/\*.*?\*/", re.S)


def scope_css(css):
    # Strip comments first. They are not part of any selector, but the parser
    # below reads everything before a `{` as one, so a comment sitting above a
    # rule became part of it:
    #
    #     /* Exclusivo a #jovenes; no altera #adultos ni otras páginas. */
    #     .inglaterra-b-page #jovenes .principal-b-junior-cards { ... }
    #
    # The comment text was split on its commas and prefixed, producing an
    # invalid selector that browsers drop along with the whole rule. That is how
    # a four-column card grid silently became three, and 25 rules across the
    # sheets were lost the same way.
    css = COMMENT.sub("", css)
    res, i, n = [], 0, len(css)
    while i < n:
        # Skip leading whitespace before probing for an at-rule. Without this,
        # any at-rule preceded by a newline was not recognised and fell through
        # to the ordinary-rule path, which prefixed it:
        #     .mmc-microsite @keyframes partners-scroll { ... }
        #     .mmc-microsite @media (max-width: 760px) { ... }
        # Both are invalid, so browsers dropped them: the marquee had no
        # keyframes to run and every media query in the microsite was dead.
        ws = re.match(r"\s*", css[i:]).group(0)
        if ws:
            res.append(ws)
            i += len(ws)
            if i >= n:
                break
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
    """Convert an inline style attribute to a JSX style object.

    Custom properties are kept (dropping them changed layouts) but React's
    CSSProperties type does not allow them, so a style containing any is cast.
    The cast is emitted inline, and `html_to_jsx` reports when one was needed so
    the page can import the type.
    """
    out = []
    has_custom = False
    for decl in value.split(";"):
        if ":" not in decl:
            continue
        k, v = decl.split(":", 1)
        k, v = k.strip(), v.strip().replace("\\", "\\\\").replace("'", "\\'")
        if not k:
            continue
        if k.startswith("--"):
            has_custom = True
            # Custom properties, kept verbatim and quoted as keys. Dropping
            # them silently changed layouts: the schedule grids are sized with
            # `repeat(var(--days, 5), ...)`, so losing `--days: 7` rendered a
            # seven-day week as five columns.
            out.append(f"'{k}': '{v}'")
            continue
        k = re.sub(r"-([a-z])", lambda m: m.group(1).upper(), k)
        out.append(f"{k}: '{v}'")
    body = "{" + ", ".join(out) + "}"
    return ("{" + body + " as CSSProperties}") if has_custom else ("{" + body + "}")


def _internal_href(url):
    """Return the normalised route for an in-app link, or None.

    Only same-origin paths qualify. Anchors, external URLs, mail and phone
    links stay as plain <a>. The trailing slash is dropped because the app runs
    with `trailingSlash: false`, where a link ending in "/" costs a redirect on
    every navigation.
    """
    if not url or not url.startswith("/") or url.startswith("//"):
        return None
    path, _, rest = url.partition("#")
    if not path:
        return None
    if len(path) > 1 and path.endswith("/"):
        path = path.rstrip("/") or "/"
    return path + ("#" + rest if rest else "")


class _Converter(HTMLParser):
    """Converts published markup to JSX.

    In-app anchors become <Link> so navigation stays client-side; the source is
    a separate static site, where every link is a full page load.
    """

    def __init__(self, known_routes=None):
        super().__init__(convert_charrefs=False)
        self.out = []
        self.anchors = []  # per open <a>: True when emitted as <Link>
        self.uses_link = False
        # Routes that exist in the app. Links to anything else keep working but
        # opt out of prefetch: the source links to pages from later slices, and
        # prefetching them would fire 404s on every viewport entry.
        self.known_routes = known_routes
        self.unknown_targets = set()
        self.uses_css_properties = False

    def _tag(self, tag, attrs, closed):
        parts = []
        for k, v in attrs:
            name = RENAME.get(k.lower(), k)
            if isinstance(v, str) and v.startswith("{") and v.endswith("}"):
                parts.append(f"{name}={v}")  # pre-formed JSX expression
            elif v is None or (name in BOOL and v == ""):
                # `hidden=""` is true in HTML but an empty string in JSX, which
                # type-checks as a string where a boolean is expected.
                parts.append(f"{name}={{true}}")
            elif k.lower() == "style":
                rendered = _style_to_jsx(v)
                if "as CSSProperties" in rendered:
                    self.uses_css_properties = True
                parts.append(f"style={rendered}")
            elif name in NUMERIC and v.strip().lstrip("-").isdigit():
                parts.append(f"{name}={{{v.strip()}}}")
            else:
                parts.append(f'{name}="{v.replace(chr(34), "&quot;")}"')
        attr = (" " + " ".join(parts)) if parts else ""
        return f'<{tag}{attr}{" />" if closed else ">"}'

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            href = next((v for k, v in attrs if k.lower() == "href"), None)
            route = _internal_href(href)
            if route is not None:
                rewritten = [
                    (k, route if k.lower() == "href" else v) for k, v in attrs
                ]
                if self.known_routes is not None:
                    target = route.split("#")[0]
                    if target not in self.known_routes:
                        self.unknown_targets.add(target)
                        rewritten.append(("prefetch", "{false}"))
                self.anchors.append(True)
                self.uses_link = True
                self.out.append(self._tag("Link", rewritten, False))
                return
            self.anchors.append(False)
        self.out.append(
            self._tag(SVG_ELEMENTS.get(tag, tag), attrs, tag in VOID or tag in SVG_SELF)
        )

    def handle_startendtag(self, tag, attrs):
        self.out.append(self._tag(SVG_ELEMENTS.get(tag, tag), attrs, True))

    def handle_endtag(self, tag):
        if tag == "a":
            as_link = self.anchors.pop() if self.anchors else False
            self.out.append("</Link>" if as_link else "</a>")
            return
        if tag not in VOID and tag not in SVG_SELF:
            self.out.append(f"</{SVG_ELEMENTS.get(tag, tag)}>")

    def handle_data(self, data):
        self.out.append(data.replace("{", '{"{"}').replace("}", '{"}"}'))

    def handle_entityref(self, name):
        self.out.append(f"&{name};")

    def handle_charref(self, name):
        self.out.append(f"&#{name};")


def absolutise_assets(html_text, page_path):
    """Rewrite document-relative asset URLs as absolute ones.

    The source serves each page at a directory URL with a trailing slash, so
    `media/x.webp` resolves under that directory. Next serves the same page
    without the trailing slash, where the identical reference would resolve one
    level up and 404. `page_path` is the page's directory, e.g.
    "/beneficios-empresa/nueva-zelanda".
    """
    base = page_path.rstrip("/")

    def fix(match):
        attr, quote, url = match.group(1), match.group(2), match.group(3)
        if url.startswith(("/", "http://", "https://", "data:", "#", "mailto:", "tel:")):
            return match.group(0)
        return f"{attr}={quote}{base}/{url}{quote}"

    return re.sub(
        r"(src|href|poster)=([\"'])([^\"']+\.(?:webp|jpg|jpeg|png|avif|svg|mp4|webm))\2",
        fix,
        html_text,
    )


def html_to_jsx(html_text, drop_selectors=(), known_routes=None):
    body = re.search(r"<body[^>]*>(.*)</body>", html_text, re.S).group(1)
    body = re.sub(r"<script.*?</script>", "", body, flags=re.S)
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    for pattern in drop_selectors:
        body = re.sub(pattern, "", body, flags=re.S)
    parser = _Converter(known_routes)
    parser.feed(body)
    return (
        "".join(parser.out).strip(),
        parser.uses_link,
        sorted(parser.unknown_targets),
        parser.uses_css_properties,
    )
