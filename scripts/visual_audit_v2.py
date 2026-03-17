#!/usr/bin/env python3
"""
Visual SEO Audit Script v2 for matchmycourse.com
Discovers actual pages and captures screenshots.
"""

from playwright.sync_api import sync_playwright
import os
import json

# Configuration
BASE_URL = "https://matchmycourse.com"
SCREENSHOTS_DIR = "/Users/marceloyvale/Desktop/Works/match-my-course/screenshots"

VIEWPORTS = {
    "desktop": {"width": 1920, "height": 1080},
    "mobile": {"width": 375, "height": 667},
}


def ensure_dir(path):
    """Ensure directory exists."""
    os.makedirs(path, exist_ok=True)


def capture_page(page, url, name, viewport_name, viewport):
    """Capture screenshot and analyze page structure."""
    page.set_viewport_size(viewport)

    print(f"  Loading {url} at {viewport_name} ({viewport['width']}x{viewport['height']})...")
    try:
        page.goto(url, wait_until="networkidle", timeout=60000)
    except Exception as e:
        print(f"  Error loading page: {e}")
        return None

    # Wait for any animations to settle
    page.wait_for_timeout(2000)

    # Capture screenshot
    screenshot_path = f"{SCREENSHOTS_DIR}/{name}_{viewport_name}.png"
    page.screenshot(path=screenshot_path, full_page=False)
    print(f"  Screenshot saved: {screenshot_path}")

    # Analyze page structure
    analysis = analyze_page(page, viewport_name)

    return {
        "screenshot": screenshot_path,
        "url": url,
        "viewport": viewport_name,
        "analysis": analysis
    }


def analyze_page(page, viewport_name):
    """Analyze page for SEO and visual elements."""
    analysis = {}

    # Check H1
    h1_elements = page.query_selector_all("h1")
    analysis["h1_count"] = len(h1_elements)
    analysis["h1_texts"] = []
    analysis["h1_visible"] = []

    for h1 in h1_elements:
        text = h1.inner_text().strip()
        analysis["h1_texts"].append(text)
        box = h1.bounding_box()
        if box:
            is_visible = box["y"] + box["height"] < 800
            analysis["h1_visible"].append({
                "text": text[:80] + "..." if len(text) > 80 else text,
                "in_viewport": is_visible,
                "position_y": box["y"]
            })

    # Check CTAs
    cta_buttons = page.query_selector_all("button, a.btn, a[class*='button'], [class*='cta'], a[class*='bg-']")
    visible_ctas = []
    for cta in cta_buttons[:10]:
        box = cta.bounding_box()
        if box and box["y"] < 800:
            text = cta.inner_text().strip()
            if text:
                visible_ctas.append(text[:30])
    analysis["cta_count"] = len(cta_buttons)
    analysis["visible_ctas"] = visible_ctas

    # Check navigation
    nav_elements = page.query_selector_all("nav, header nav, [role='navigation']")
    analysis["nav_present"] = len(nav_elements) > 0

    # Check mobile menu (hamburger)
    if viewport_name == "mobile":
        hamburger = page.query_selector("button[class*='hamburger'], button[aria-label*='menu'], header button svg")
        analysis["hamburger_menu"] = hamburger is not None

    # Check hero section
    hero = page.query_selector("[class*='hero'], [class*='Hero'], main > section:first-of-type, main > div:first-of-type")
    analysis["hero_present"] = hero is not None

    # Check images
    images = page.query_selector_all("img")
    analysis["image_count"] = len(images)
    image_issues = []
    for img in images[:15]:
        src = img.get_attribute("src") or ""
        alt = img.get_attribute("alt")
        if not alt and not "logo" in src.lower():
            image_issues.append({"src": src[:60], "issue": "missing alt"})
    analysis["image_issues"] = image_issues[:5]  # Limit

    # Check for horizontal overflow (mobile)
    if viewport_name == "mobile":
        overflow_check = page.evaluate("""
            () => {
                return document.body.scrollWidth > window.innerWidth;
            }
        """)
        analysis["horizontal_overflow"] = overflow_check

        # Check font size
        body_font = page.evaluate("""
            () => {
                return getComputedStyle(document.body).fontSize;
            }
        """)
        analysis["body_font_size"] = body_font

    # Get meta info
    meta_title = page.title()
    analysis["title"] = meta_title

    meta_desc = page.query_selector("meta[name='description']")
    if meta_desc:
        analysis["meta_description"] = meta_desc.get_attribute("content")

    # Canonical
    canonical = page.query_selector("link[rel='canonical']")
    if canonical:
        analysis["canonical"] = canonical.get_attribute("href")

    return analysis


def discover_pages(page):
    """Discover internal pages from homepage."""
    print("Discovering pages from homepage...")
    page.set_viewport_size({"width": 1920, "height": 1080})
    page.goto(BASE_URL, wait_until="networkidle", timeout=60000)

    # Get all internal links
    links = page.query_selector_all("a[href]")
    discovered = set()

    for link in links:
        href = link.get_attribute("href")
        if href and href.startswith("/") and not href.startswith("//"):
            # Skip anchors and static assets
            if not "#" in href and not href.endswith((".png", ".jpg", ".pdf", ".svg")):
                discovered.add(href)
        elif href and BASE_URL in href:
            path = href.replace(BASE_URL, "")
            if path and not "#" in path:
                discovered.add(path)

    print(f"  Found {len(discovered)} unique internal paths")
    return list(discovered)


def run_audit():
    """Run the visual audit."""
    ensure_dir(SCREENSHOTS_DIR)
    results = []

    print("Starting Visual SEO Audit v2...")
    print(f"Base URL: {BASE_URL}")
    print("-" * 50)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        # Discover pages
        internal_paths = discover_pages(page)
        print(f"\nDiscovered paths: {internal_paths[:20]}...")  # Show first 20

        # Capture homepage
        print("\n--- HOMEPAGE ---")
        for viewport_name, viewport in VIEWPORTS.items():
            result = capture_page(page, BASE_URL, "homepage", viewport_name, viewport)
            if result:
                results.append(result)

        # Identify key pages to capture
        key_paths = []

        # Look for escuelas pages
        for path in internal_paths:
            if "/escuelas/" in path and len(path.split("/")) >= 4:
                key_paths.append(("school_detail", path))
                break

        # Look for courses/cursos pages (not the broken one)
        for path in internal_paths:
            if "curso" in path.lower() and path != "/cursos":
                key_paths.append(("curso_page", path))
                break

        # Look for paises pages
        for path in internal_paths:
            if "/paises/" in path or "irlanda" in path.lower():
                key_paths.append(("pais_page", path))
                break

        # Look for services/about pages
        for path in internal_paths:
            if path in ["/servicios", "/acerca-de-nosotros", "/como-funciona"]:
                key_paths.append(("info_page", path))
                break

        # Blog page
        for path in internal_paths:
            if "/blog" in path:
                key_paths.append(("blog_page", path))
                break

        # Capture key pages
        for page_name, path in key_paths:
            url = f"{BASE_URL}{path}"
            print(f"\n--- {page_name.upper()}: {path} ---")
            for viewport_name, viewport in VIEWPORTS.items():
                result = capture_page(page, url, page_name, viewport_name, viewport)
                if result:
                    results.append(result)

        browser.close()

    # Save results
    results_path = f"{SCREENSHOTS_DIR}/audit_results_v2.json"
    with open(results_path, "w") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print("\n" + "=" * 50)
    print("Audit Complete!")
    print(f"Results saved to: {results_path}")

    return results, internal_paths


if __name__ == "__main__":
    results, internal_paths = run_audit()

    # Print summary
    print("\n" + "=" * 70)
    print("VISUAL SEO AUDIT SUMMARY")
    print("=" * 70)

    for result in results:
        print(f"\n{'='*70}")
        print(f"URL: {result['url']}")
        print(f"Viewport: {result['viewport']}")
        print("-" * 70)

        analysis = result["analysis"]

        # Title & Meta
        print(f"Title: {analysis.get('title', 'N/A')}")
        if analysis.get('meta_description'):
            desc = analysis['meta_description']
            print(f"Meta Description: {desc[:100]}..." if len(desc) > 100 else f"Meta Description: {desc}")
        if analysis.get('canonical'):
            print(f"Canonical: {analysis['canonical']}")

        # H1 Analysis
        print(f"\nH1 Count: {analysis.get('h1_count', 0)}")
        for h1_info in analysis.get("h1_visible", []):
            status = "ABOVE FOLD" if h1_info["in_viewport"] else "BELOW FOLD"
            print(f"  [{status}] \"{h1_info['text']}\" (y: {h1_info['position_y']:.0f}px)")

        # CTAs
        print(f"\nCTAs Found: {analysis.get('cta_count', 0)}")
        if analysis.get('visible_ctas'):
            print(f"  Visible above fold: {analysis['visible_ctas'][:5]}")

        # Layout Checks
        print(f"\nNavigation Present: {'YES' if analysis.get('nav_present') else 'NO'}")
        print(f"Hero Section: {'YES' if analysis.get('hero_present') else 'NO'}")
        print(f"Images: {analysis.get('image_count', 0)}")

        # Mobile-specific
        if result['viewport'] == 'mobile':
            print(f"\n[MOBILE CHECKS]")
            print(f"  Hamburger Menu: {'YES' if analysis.get('hamburger_menu') else 'NO/NOT DETECTED'}")
            print(f"  Horizontal Overflow: {'YES - ISSUE!' if analysis.get('horizontal_overflow') else 'NO'}")
            print(f"  Body Font Size: {analysis.get('body_font_size', 'N/A')}")

        # Issues
        if analysis.get("image_issues"):
            print(f"\n[IMAGE ISSUES]")
            for issue in analysis["image_issues"]:
                print(f"  - {issue['issue']}: {issue['src']}...")

    print("\n" + "=" * 70)
    print("DISCOVERED INTERNAL PATHS")
    print("=" * 70)
    for path in sorted(internal_paths)[:30]:
        print(f"  {path}")
    if len(internal_paths) > 30:
        print(f"  ... and {len(internal_paths) - 30} more")
