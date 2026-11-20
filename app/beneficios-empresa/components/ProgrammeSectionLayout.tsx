"use client";

import { useEffect } from "react";

/**
 * Reflows the country pages' offering sections to the number of cards actually
 * visible.
 *
 * Reproduces `<country>-b-layout.js`, which is byte-identical across all five
 * country pages. Each `.principal-b-auto-section` gets:
 *
 *   data-programme-count  — how many cards are visible
 *   data-programme-layout — "compact" for one or two, "expanded" otherwise
 *
 * The stylesheets select on those attributes, so without this the sections
 * always render in their default shape, regardless of how many offerings a
 * country actually shows.
 *
 * Visibility is recomputed on mutations and on resize, because a CSS or hidden
 * filter can change which cards show without the markup changing.
 */
const CARD_SELECTOR =
  ":scope > .programme-card, :scope > .long-card, :scope > .principal-b-city-card, :scope > .principal-b-work-feature-action";

export default function ProgrammeSectionLayout() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".principal-b-page .principal-b-auto-section"
      )
    );
    if (!sections.length) return;

    const isVisible = (item: Element) => {
      const el = item as HTMLElement;
      if (el.hidden || el.closest("[hidden], [inert]")) return false;
      const style = window.getComputedStyle(el);
      if (
        style.display === "none" ||
        style.visibility === "hidden" ||
        style.visibility === "collapse"
      ) {
        return false;
      }
      return el.getClientRects().length > 0;
    };

    const update = () => {
      sections.forEach((section) => {
        const holder = section.querySelector<HTMLElement>(".principal-b-auto-cards");
        if (!holder) return;
        const count = Array.from(holder.querySelectorAll(CARD_SELECTOR)).filter(
          isVisible
        ).length;
        const mode = count > 0 && count <= 2 ? "compact" : "expanded";
        if (section.dataset.programmeCount !== String(count)) {
          section.dataset.programmeCount = String(count);
        }
        if (section.dataset.programmeLayout !== mode) {
          section.dataset.programmeLayout = mode;
        }
      });
    };

    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };

    const observer = new MutationObserver(schedule);
    sections.forEach((section) => {
      const holder = section.querySelector(".principal-b-auto-cards");
      if (holder) {
        observer.observe(holder, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["class", "style", "hidden", "inert"],
        });
      }
    });

    update();
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
