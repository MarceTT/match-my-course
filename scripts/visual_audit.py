#!/usr/bin/env python3
"""
Visual SEO Audit Script for matchmycourse.com
Captures screenshots at different viewports and analyzes page structure.
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

PAGES = [
    {"name": "homepage", "path": "/"},
    {"name": "cursos", "path": "/cursos"},
]


def ensure_dir(path):
    """Ensure directory exists."""
    os.makedirs(path, exist_ok=True)


def capture_page(page, url, name, viewport_name, viewport):
    """Capture screenshot and analyze page structure."""
    page.set_viewport_size(viewport)

    print(f"  Loading {url} at {viewport_name} ({viewport['width']}x{viewport['height']})...")
    page.goto(url, wait_until="networkidle", timeout=60000)

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
        # Check if H1 is in viewport (above the fold)
        box = h1.bounding_box()
        if box:
            is_visible = box["y"] + box["height"] < 800  # Roughly above fold
            analysis["h1_visible"].append({
                "text": text[:50] + "..." if len(text) > 50 else text,
                "in_viewport": is_visible,
                "position_y": box["y"]
            })

    # Check CTAs (buttons, links with specific classes)
    cta_buttons = page.query_selector_all("button, a.btn, a[class*='button'], [class*='cta']")
    analysis["cta_count"] = len(cta_buttons)

    # Check navigation
    nav_elements = page.query_selector_all("nav, header nav, [role='navigation']")
    analysis["nav_present"] = len(nav_elements) > 0

    # Check mobile menu (hamburger)
    if viewport_name == "mobile":
        hamburger = page.query_selector("[class*='hamburger'], [class*='menu-toggle'], button[aria-label*='menu']")
        analysis["hamburger_menu"] = hamburger is not None

    # Check hero section
    hero = page.query_selector("[class*='hero'], [class*='Hero'], section:first-of-type")
    analysis["hero_present"] = hero is not None

    # Check images
    images = page.query_selector_all("img")
    analysis["image_count"] = len(images)
    broken_images = []
    for img in images[:10]:  # Check first 10 images
        src = img.get_attribute("src")
        alt = img.get_attribute("alt")
        if not alt:
            broken_images.append({"src": src, "issue": "missing alt"})
    analysis["image_issues"] = broken_images

    # Check for horizontal overflow (mobile)
    if viewport_name == "mobile":
        overflow_check = page.evaluate("""
            () => {
                return document.body.scrollWidth > window.innerWidth;
            }
        """)
        analysis["horizontal_overflow"] = overflow_check

    # Get meta info
    meta_title = page.title()
    analysis["title"] = meta_title

    meta_desc = page.query_selector("meta[name='description']")
    if meta_desc:
        analysis["meta_description"] = meta_desc.get_attribute("content")

    return analysis


def run_audit():
    """Run the visual audit."""
    ensure_dir(SCREENSHOTS_DIR)
    results = []

    print("Starting Visual SEO Audit...")
    print(f"Base URL: {BASE_URL}")
    print("-" * 50)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        for page_config in PAGES:
            url = f"{BASE_URL}{page_config['path']}"
            print(f"\nAuditing: {page_config['name']} ({url})")

            for viewport_name, viewport in VIEWPORTS.items():
                result = capture_page(page, url, page_config["name"], viewport_name, viewport)
                results.append(result)

        # Try to find and capture a school detail page
        print("\nLooking for school detail page...")
        page.set_viewport_size(VIEWPORTS["desktop"])
        page.goto(f"{BASE_URL}/cursos", wait_until="networkidle", timeout=60000)

        # Look for school links
        school_links = page.query_selector_all("a[href*='/escuelas/']")
        if school_links:
            href = school_links[0].get_attribute("href")
            if href:
                school_url = href if href.startswith("http") else f"{BASE_URL}{href}"
                print(f"  Found school page: {school_url}")

                for viewport_name, viewport in VIEWPORTS.items():
                    result = capture_page(page, school_url, "school_detail", viewport_name, viewport)
                    results.append(result)

        browser.close()

    # Save results
    results_path = f"{SCREENSHOTS_DIR}/audit_results.json"
    with open(results_path, "w") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print("\n" + "=" * 50)
    print("Audit Complete!")
    print(f"Results saved to: {results_path}")

    return results


if __name__ == "__main__":
    results = run_audit()

    # Print summary
    print("\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)

    for result in results:
        print(f"\n{result['url']} ({result['viewport']})")
        print("-" * 40)

        analysis = result["analysis"]

        # H1 Analysis
        print(f"  H1 Count: {analysis.get('h1_count', 0)}")
        for h1_info in analysis.get("h1_visible", []):
            status = "VISIBLE" if h1_info["in_viewport"] else "BELOW FOLD"
            print(f"    - [{status}] {h1_info['text']} (y: {h1_info['position_y']:.0f})")

        # Other checks
        print(f"  CTAs Found: {analysis.get('cta_count', 0)}")
        print(f"  Navigation: {'Yes' if analysis.get('nav_present') else 'No'}")
        print(f"  Hero Section: {'Yes' if analysis.get('hero_present') else 'No'}")
        print(f"  Images: {analysis.get('image_count', 0)}")

        if analysis.get("horizontal_overflow"):
            print(f"  WARNING: Horizontal overflow detected!")

        if analysis.get("image_issues"):
            print(f"  Image Issues:")
            for issue in analysis["image_issues"]:
                print(f"    - {issue['issue']}: {issue['src'][:50]}...")
