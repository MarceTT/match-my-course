/**
 * Compares ported pages against the published source, computed style by
 * computed style.
 *
 * Text diffs and build output cannot tell you a page looks wrong. This loads
 * both versions in the same browser at the same viewport and compares what the
 * engine actually resolved for a handful of load-bearing elements.
 *
 * It exists because a stylesheet imported in the segment layout applied to
 * every page beneath it, turning white hero headings dark on pages that never
 * asked for it. Every check here passed at the time; none of them looked.
 *
 *   node scripts/microsite/compareWithSource.mjs [localBase]
 */
import { chromium } from "playwright";

const local = process.argv[2] ?? "http://localhost:3123";
const SOURCE = "https://matchmycourse-beneficios.netlify.app";

const PAGES = [
  "",
  "irlanda",
  "nueva-zelanda",
  "canada",
  "inglaterra",
  "escocia",
  "irlanda/avanti-language-institute/ingles-golf",
  "irlanda/junior/cork-english-college/ingles-golf",
  "irlanda/junior/cork-english-college/ingles-futbol",
  "irlanda/junior/cork-english-college/ingles-rugby",
  "irlanda/junior/emerald-cultural-institute/sandford-park-school",
  "irlanda/junior/emerald-cultural-institute/alexandra-college",
  "inglaterra/centre-of-english-studies/ingles-actividades-londres",
  "inglaterra/junior/emerald-cultural-institute/st-georges-ascot",
  "inglaterra/junior/emerald-cultural-institute/rose-bruford-college",
  "inglaterra/junior/emerald-cultural-institute/anglia-ruskin-university/medicina",
  "escocia/junior/centre-of-english-studies/ingles-actividades-edimburgo",
];

/** Runs in the page: resolved styles for elements that carry the design. */
const probe = () => {
  const read = (selector, props) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const style = getComputedStyle(el);
    const out = {};
    for (const prop of props) out[prop] = style[prop];
    return out;
  };
  return {
    h1: read("h1", ["color", "fontSize", "fontWeight", "textAlign"]),
    hero: read(".hero", ["minHeight", "backgroundColor", "color", "padding"]),
    heroCopy: read(".hero-copy", ["color", "maxWidth"]),
    firstSection: read("section", ["backgroundColor", "display", "minHeight"]),
    container: read(".container", ["width", "maxWidth", "marginLeft"]),
    h2: read("h2", ["color", "fontSize"]),
  };
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
let failures = 0;

for (const slug of PAGES) {
  const path = `/beneficios-empresa${slug ? `/${slug}` : ""}`;
  let ours;
  let theirs;
  try {
    await page.goto(local + path, { waitUntil: "load" });
    await page.waitForTimeout(900);
    ours = await page.evaluate(probe);
    await page.goto(`${SOURCE}${path}/`, { waitUntil: "load" });
    await page.waitForTimeout(900);
    theirs = await page.evaluate(probe);
  } catch (error) {
    console.log(`ERR  ${slug || "(landing)"} — ${error.message.split("\n")[0]}`);
    failures += 1;
    continue;
  }

  const diffs = [];
  for (const key of Object.keys(theirs)) {
    const mine = ours[key];
    const source = theirs[key];
    if (!source) continue;
    if (!mine) {
      diffs.push(`${key}: missing on our page`);
      continue;
    }
    for (const prop of Object.keys(source)) {
      if (mine[prop] !== source[prop]) {
        diffs.push(`${key}.${prop}: ours=${mine[prop]} source=${source[prop]}`);
      }
    }
  }

  if (diffs.length) failures += 1;
  console.log(
    `${diffs.length ? "DIFF" : "ok  "} ${(slug || "(landing)").slice(-44).padEnd(46)} ${diffs.length} difference(s)`
  );
  diffs.slice(0, 4).forEach((d) => console.log(`       - ${d}`));
}

await browser.close();
console.log(failures ? `\n${failures} page(s) differ from the source` : "\nall pages match the source");
process.exit(failures ? 1 : 0);
