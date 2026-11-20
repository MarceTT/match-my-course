/**
 * Checks the ported country pages in a real browser.
 *
 * The markup is reproduced from the source, but the behaviour its external
 * scripts provided is reimplemented as components — so the only honest check is
 * whether those behaviours actually work on the rendered page.
 *
 *   node scripts/microsite/checkCountryPages.mjs [baseUrl]
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3123";
const PAGES = ["irlanda", "nueva-zelanda", "canada", "inglaterra", "escocia"];

const browser = await chromium.launch();
let failures = 0;

for (const slug of PAGES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  // The exchange-rate API is third-party and may be unreachable offline; the
  // selector falls back to local currency by design, so it is not a page fault.
  page.route("**/api.frankfurter.dev/**", (route) => route.abort());

  await page.goto(`${base}/beneficios-empresa/${slug}`, { waitUntil: "load" });
  await page.waitForTimeout(1200);

  const report = await page.evaluate(() => {
    // Only sections that hold cards are laid out — the source script skips the
    // rest, so counting them as missed would be a false alarm.
    const sections = [...document.querySelectorAll(".principal-b-auto-section")].filter(
      (s) => s.querySelector(".principal-b-auto-cards")
    );
    return {
      currencySelect: !!document.querySelector("header.site-header #mmc-currency-select"),
      currencyOptions: [
        ...document.querySelectorAll("#mmc-currency-select option"),
      ].map((o) => o.value),
      autoSections: sections.length,
      sectionsLaidOut: sections.filter((s) => s.dataset.programmeLayout).length,
      schoolCards: document.querySelectorAll("[data-school]").length,
      galleryTriggers: document.querySelectorAll("[data-school] [data-modal]").length,
      carouselDots: document.querySelectorAll(".rela-carousel-dot").length,
      hasCarousel: !!document.querySelector("[data-rela-carousel]"),
      // An empty src is the gallery viewer waiting for a photo, exactly as in
      // the source; only images that have a src and failed are broken.
      brokenImages: [...document.images]
        .filter((i) => i.getAttribute("src") && i.complete && i.naturalWidth === 0)
        .map((i) => i.getAttribute("src")),
      // A section still 500px tall on grey means the root layout's critical CSS
      // is winning again.
      greySections: [...document.querySelectorAll("section")].filter((s) => {
        const style = getComputedStyle(s);
        return style.backgroundColor === "rgb(249, 250, 251)" && style.display === "flex";
      }).length,
    };
  });

  // Open the first gallery and confirm the photo actually loads. The gallery
  // photos are listed in the source's script, not in the markup, so a check
  // that only looks at the rendered page cannot see them missing.
  const gallery = await page.evaluate(async () => {
    const button = document.querySelector("[data-school] [data-modal='photos']");
    if (!button) return null;
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 600));
    const image = [...document.querySelectorAll("dialog[open] img")].find((i) =>
      i.getAttribute("src")
    );
    if (!image) return { opened: false };
    if (!image.complete) {
      await new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
        setTimeout(resolve, 2000);
      });
    }
    return {
      opened: true,
      src: image.getAttribute("src"),
      loaded: image.complete && image.naturalWidth > 0,
      thumbs: document.querySelectorAll("dialog[open] [id$='hotoThumbs'] button").length,
    };
  });

  const problems = [];
  if (gallery && gallery.opened === false) problems.push("gallery did not open");
  if (gallery?.opened && !gallery.loaded) {
    problems.push(`gallery photo missing: ${gallery.src}`);
  }
  if (!report.currencySelect) problems.push("no currency selector in the header");
  if (report.autoSections && report.sectionsLaidOut !== report.autoSections) {
    problems.push(`sections laid out ${report.sectionsLaidOut}/${report.autoSections}`);
  }
  if (report.brokenImages.length) {
    problems.push(`${report.brokenImages.length} broken images: ${report.brokenImages.slice(0, 3)}`);
  }
  if (report.greySections) problems.push(`${report.greySections} sections hit by critical CSS`);
  if (report.hasCarousel && !report.carouselDots) problems.push("carousel without dots");
  const realErrors = errors.filter(
    (e) => !/frankfurter|ERR_SSL_PROTOCOL_ERROR|net::ERR_FAILED|Failed to load resource/.test(e)
  );
  if (realErrors.length) problems.push(`js errors: ${realErrors.slice(0, 2).join(" | ")}`);

  const status = problems.length ? "FAIL" : "ok";
  if (problems.length) failures += 1;
  console.log(
    `${status.padEnd(4)} ${slug.padEnd(14)} ` +
      `currency=${report.currencySelect ? report.currencyOptions.join("/") : "-"} ` +
      `sections=${report.sectionsLaidOut}/${report.autoSections} ` +
      `cards=${report.schoolCards} triggers=${report.galleryTriggers} ` +
      `dots=${report.carouselDots} imgs-broken=${report.brokenImages.length} ` +
      `gallery=${gallery ? (gallery.loaded ? `ok/${gallery.thumbs}` : "BROKEN") : "n/a"}`
  );
  problems.forEach((p) => console.log(`       - ${p}`));
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} page(s) with problems` : "\nall pages ok");
process.exit(failures ? 1 : 0);
