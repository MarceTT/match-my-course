"use client";

import { useEffect } from "react";

/**
 * Drives the partners strip animation.
 *
 * The stylesheet only animates the track once the strip carries `is-running`:
 *
 *   .partners-marquee.is-running .partners-marquee-track {
 *     animation: partners-scroll var(--marquee-duration, 45s) linear infinite;
 *   }
 *
 * That class is added by `partners-marquee.js`, an external script that is not
 * part of the page, so the ported strip sat still and stayed horizontally
 * scrollable. This reproduces that script's logic.
 *
 * It stays off unless the two logo groups measure the same width, so a failed
 * measurement leaves the row static and readable rather than mid-slide — the
 * source's own safeguard, kept.
 */
export default function PartnersMarquee() {
  useEffect(() => {
    const strip = document.querySelector<HTMLElement>(".partners-marquee");
    const track = strip?.querySelector<HTMLElement>(".partners-marquee-track");
    const groups = track?.querySelectorAll<HTMLElement>(".partners-marquee-group");
    if (!strip || !track || !groups || groups.length !== 2) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      if (reduced.matches) {
        strip.classList.remove("is-running");
        return;
      }
      const first = groups[0].getBoundingClientRect().width;
      const second = groups[1].getBoundingClientRect().width;
      if (!first || !second || Math.abs(first - second) > 2) {
        strip.classList.remove("is-running");
        return;
      }
      // 80px per second, as the source sets it.
      track.style.setProperty("--marquee-duration", `${(first / 80).toFixed(2)}s`);
      strip.classList.add("is-running");
    };

    const frame = requestAnimationFrame(update);
    window.addEventListener("load", update, { once: true });
    reduced.addEventListener("change", update);

    const observer = new ResizeObserver(update);
    observer.observe(groups[0]);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", update);
      reduced.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  return null;
}
