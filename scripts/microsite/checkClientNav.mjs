/**
 * Proves the microsite navigates client-side.
 *
 * A link that looks right can still reload the page. The test marks the live
 * document with a value that cannot survive a reload, clicks a link, and checks
 * the marker is still there afterwards: if it is, the document was never
 * replaced, so the router handled the navigation.
 *
 *   node scripts/microsite/checkClientNav.mjs [baseUrl]
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3123";

const HOPS = [
  ["/beneficios-empresa", "/beneficios-empresa/irlanda"],
  ["/beneficios-empresa", "/beneficios-empresa/canada"],
  ["/beneficios-empresa/irlanda", "/beneficios-empresa"],
  ["/beneficios-empresa/escocia", "/beneficios-empresa"],
];

const browser = await chromium.launch();
let failures = 0;

for (const [from, to] of HOPS) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const documentRequests = [];
  page.on("request", (request) => {
    if (request.resourceType() === "document") documentRequests.push(request.url());
  });

  await page.goto(base + from, { waitUntil: "load" });
  await page.waitForTimeout(600);
  const before = documentRequests.length;

  // Survives client-side navigation, never a reload.
  await page.evaluate(() => {
    window.__navProbe = "alive";
  });

  const clicked = await page.evaluate((target) => {
    const link = [...document.querySelectorAll("a[href]")].find(
      (a) => new URL(a.href).pathname === target
    );
    if (!link) return false;
    link.scrollIntoView();
    link.click();
    return true;
  }, to);

  if (!clicked) {
    console.log(`SKIP ${from} -> ${to}  (no link found)`);
    await page.close();
    continue;
  }

  await page.waitForTimeout(1500);
  const result = await page.evaluate(() => ({
    probe: window.__navProbe ?? null,
    path: location.pathname,
  }));
  const newDocuments = documentRequests.length - before;
  const ok = result.probe === "alive" && result.path === to && newDocuments === 0;
  if (!ok) failures += 1;

  console.log(
    `${ok ? "ok  " : "FAIL"} ${from} -> ${to}  ` +
      `landed=${result.path} probe=${result.probe ?? "LOST"} ` +
      `document-requests=${newDocuments}`
  );
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} navigation(s) reloaded` : "\nall navigations stayed client-side");
process.exit(failures ? 1 : 0);
