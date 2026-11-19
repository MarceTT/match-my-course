/**
 * Diagnostic for the partners strip animation.
 *
 * The strip only animates while it carries `is-running`, which the client
 * component adds after measuring both logo groups. This reports what the
 * browser actually sees, so a stalled marquee can be diagnosed from evidence
 * instead of guesswork.
 *
 *   node scripts/microsite/checkMarquee.mjs [url]
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3123/beneficios-empresa";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(1500);

const report = await page.evaluate(() => {
  const strip = document.querySelector(".partners-marquee");
  if (!strip) return { error: "no .partners-marquee in the DOM" };
  const track = strip.querySelector(".partners-marquee-track");
  const groups = track ? [...track.querySelectorAll(".partners-marquee-group")] : [];
  const widths = groups.map((g) => Math.round(g.getBoundingClientRect().width));
  const styles = track ? getComputedStyle(track) : null;
  return {
    isRunning: strip.classList.contains("is-running"),
    groups: groups.length,
    widths,
    widthDelta: widths.length === 2 ? Math.abs(widths[0] - widths[1]) : null,
    duration: track?.style.getPropertyValue("--marquee-duration") || "(unset)",
    animationName: styles?.animationName ?? "(none)",
    animationDuration: styles?.animationDuration ?? "(none)",
    animationPlayState: styles?.animationPlayState ?? "(none)",
    transform: styles?.transform ?? "(none)",
    stripOverflow: getComputedStyle(strip).overflowX,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    imagesLoaded: [...strip.querySelectorAll("img")].filter((i) => i.complete).length,
    imagesTotal: strip.querySelectorAll("img").length,
  };
});

// Sample the transform twice: if it moves, the animation is really running.
const first = await page.evaluate(
  () => getComputedStyle(document.querySelector(".partners-marquee-track")).transform
);
await page.waitForTimeout(1200);
const second = await page.evaluate(
  () => getComputedStyle(document.querySelector(".partners-marquee-track")).transform
);

console.log(JSON.stringify({ ...report, movedOverTime: first !== second, first, second }, null, 2));

await browser.close();
