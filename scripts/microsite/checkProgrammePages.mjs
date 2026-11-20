/**
 * Checks the ported programme pages in a real browser.
 *
 * These pages carry an accommodation tab strip whose behaviour comes from an
 * inline script in the source. Porting drops inline scripts, so the component
 * that replaces it has to be exercised, not assumed: the check clicks the
 * second tab and asserts the panels actually swapped.
 *
 *   node scripts/microsite/checkProgrammePages.mjs [baseUrl]
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3123";

const PAGES = [
  "irlanda/avanti-language-institute/ingles-golf",
  "irlanda/junior/cork-english-college/ingles-golf",
  "irlanda/junior/cork-english-college/ingles-futbol",
  "irlanda/junior/cork-english-college/ingles-rugby",
  "irlanda/junior/emerald-cultural-institute/sandford-park-school",
  "irlanda/junior/emerald-cultural-institute/alexandra-college",
  "escocia/junior/centre-of-english-studies/ingles-actividades-edimburgo",
  "inglaterra/centre-of-english-studies/ingles-actividades-londres",
  "inglaterra/junior/emerald-cultural-institute/anglia-ruskin-university/medicina",
  "inglaterra/junior/emerald-cultural-institute/rose-bruford-college",
  "inglaterra/junior/emerald-cultural-institute/st-georges-ascot",
];

const browser = await chromium.launch();
let failures = 0;

for (const slug of PAGES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(`${base}/beneficios-empresa/${slug}`, { waitUntil: "load" });
  await page.waitForTimeout(900);

  const before = await page.evaluate(() => {
    const tabs = [...document.querySelectorAll("[data-mode]")];
    return {
      tabs: tabs.length,
      panels: document.querySelectorAll(".program").length,
      // Pairing the source markup omits; the component adds it.
      paired: tabs.filter((t) => t.getAttribute("aria-controls")).length,
      visiblePanel:
        document.querySelector(".program:not([hidden])")?.id ?? null,
      brokenImages: [...document.images]
        .filter((i) => i.getAttribute("src") && i.complete && i.naturalWidth === 0)
        .map((i) => i.getAttribute("src")),
      greySections: [...document.querySelectorAll("section")].filter((s) => {
        const style = getComputedStyle(s);
        return style.backgroundColor === "rgb(249, 250, 251)" && style.display === "flex";
      }).length,
    };
  });

  // Click the second tab and confirm the panels swapped.
  let after = null;
  if (before.tabs > 1) {
    await page.evaluate(() => document.querySelectorAll("[data-mode]")[1].click());
    await page.waitForTimeout(400);
    after = await page.evaluate(() => ({
      visiblePanel: document.querySelector(".program:not([hidden])")?.id ?? null,
      selected: document.querySelector("[data-mode][aria-selected='true']")?.dataset.mode ?? null,
    }));
  }

  const problems = [];
  if (before.tabs && before.paired !== before.tabs) {
    problems.push(`tabs paired ${before.paired}/${before.tabs}`);
  }
  if (after && after.visiblePanel === before.visiblePanel) {
    problems.push("tabs did not switch panels");
  }
  if (after && after.selected !== after.visiblePanel) {
    problems.push(`selected tab ${after.selected} does not match panel ${after.visiblePanel}`);
  }
  if (before.brokenImages.length) {
    problems.push(`${before.brokenImages.length} broken images: ${before.brokenImages.slice(0, 2)}`);
  }
  if (before.greySections) problems.push(`${before.greySections} sections hit by critical CSS`);
  if (errors.length) problems.push(`js errors: ${errors.slice(0, 2).join(" | ")}`);

  if (problems.length) failures += 1;
  const name = slug.split("/").slice(-2).join("/");
  console.log(
    `${problems.length ? "FAIL" : "ok  "} ${name.padEnd(36)} ` +
      `tabs=${before.tabs} paired=${before.paired} ` +
      `panels=${before.visiblePanel ?? "-"}${after ? ` -> ${after.visiblePanel}` : ""} ` +
      `imgs-broken=${before.brokenImages.length}`
  );
  problems.forEach((p) => console.log(`       - ${p}`));
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} page(s) with problems` : "\nall programme pages ok");
process.exit(failures ? 1 : 0);
