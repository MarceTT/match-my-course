#!/usr/bin/env python3
"""
Capture school detail page
"""

from playwright.sync_api import sync_playwright
import os
import json

BASE_URL = "https://matchmycourse.com"
SCREENSHOTS_DIR = "/Users/marceloyvale/Desktop/Works/match-my-course/screenshots"

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
        )
        page = context.new_page()

        # Go to escuelas page
        page.set_viewport_size({"width": 1920, "height": 1080})
        page.goto(f"{BASE_URL}/escuelas", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(2000)

        # Take screenshot of escuelas list
        page.screenshot(path=f"{SCREENSHOTS_DIR}/escuelas_list_desktop.png")
        print(f"Captured escuelas list")

        # Find school links
        school_links = page.query_selector_all("a[href*='/escuelas/']")
        print(f"Found {len(school_links)} school links")

        for link in school_links[:5]:
            href = link.get_attribute("href")
            print(f"  Link: {href}")

        # Click first school if available
        if school_links:
            href = school_links[0].get_attribute("href")
            if href:
                school_url = href if href.startswith("http") else f"{BASE_URL}{href}"
                print(f"\nCapturing school: {school_url}")

                page.goto(school_url, wait_until="networkidle", timeout=60000)
                page.wait_for_timeout(2000)
                page.screenshot(path=f"{SCREENSHOTS_DIR}/school_detail_desktop.png")

                # Mobile
                page.set_viewport_size({"width": 375, "height": 667})
                page.reload(wait_until="networkidle")
                page.wait_for_timeout(2000)
                page.screenshot(path=f"{SCREENSHOTS_DIR}/school_detail_mobile.png")

                print("School screenshots captured")

        # Also try the buscador
        print("\nCapturing buscador...")
        page.set_viewport_size({"width": 1920, "height": 1080})
        page.goto(f"{BASE_URL}/buscador-cursos-de-ingles?course=ingles-general", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(3000)
        page.screenshot(path=f"{SCREENSHOTS_DIR}/buscador_desktop.png")

        page.set_viewport_size({"width": 375, "height": 667})
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(2000)
        page.screenshot(path=f"{SCREENSHOTS_DIR}/buscador_mobile.png")

        print("Buscador screenshots captured")

        browser.close()

if __name__ == "__main__":
    run()
