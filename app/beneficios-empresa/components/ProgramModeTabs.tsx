"use client";

import { useEffect } from "react";

/**
 * Drives the accommodation tabs on the sport programme pages.
 *
 * The source ships this as an inline script: clicking a `[data-mode]` button
 * marks it active and shows the `.program` panel whose id matches. Inline
 * scripts are dropped when porting, so the behaviour lives here.
 *
 * It also completes the accessibility wiring the source left unfinished. The
 * buttons carry `role="tab"` and the panels `role="tabpanel"`, but nothing
 * connects them: no `aria-controls`, no `aria-labelledby`, and no keyboard
 * support. A screen reader announces "tab" and then cannot say what it
 * controls. The pairing is added here, along with arrow-key navigation, which
 * the tab role implies. Same behaviour on screen, announced correctly.
 */
export default function ProgramModeTabs() {
  useEffect(() => {
    const tabs = Array.from(document.querySelectorAll<HTMLElement>("[data-mode]"));
    const panels = Array.from(document.querySelectorAll<HTMLElement>(".program"));
    if (!tabs.length || !panels.length) return;

    const panelFor = (tab: HTMLElement) =>
      panels.find((panel) => panel.id === tab.dataset.mode) ?? null;

    // Pair each tab with its panel, which the source markup never does.
    tabs.forEach((tab) => {
      const panel = panelFor(tab);
      if (!panel) return;
      if (!tab.id) tab.id = `tab-${panel.id}`;
      tab.setAttribute("aria-controls", panel.id);
      panel.setAttribute("aria-labelledby", tab.id);
    });

    const select = (tab: HTMLElement, focus = false) => {
      tabs.forEach((candidate) => {
        const on = candidate === tab;
        candidate.classList.toggle("active", on);
        candidate.setAttribute("aria-selected", String(on));
        // Roving tabindex: only the selected tab is in the tab order.
        candidate.tabIndex = on ? 0 : -1;
      });
      panels.forEach((panel) => {
        const on = panel.id === tab.dataset.mode;
        panel.hidden = !on;
        panel.classList.toggle("active", on);
      });
      if (focus) tab.focus();
    };

    const onClick = (event: Event) => select(event.currentTarget as HTMLElement);
    const onKeyDown = (event: KeyboardEvent) => {
      const index = tabs.indexOf(event.currentTarget as HTMLElement);
      if (index === -1) return;
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[next], true);
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", onClick);
      tab.addEventListener("keydown", onKeyDown);
    });

    // Reflect the state the markup ships with, so tabindex starts consistent.
    const initial = tabs.find((tab) => tab.getAttribute("aria-selected") === "true");
    if (initial) select(initial);

    return () => {
      tabs.forEach((tab) => {
        tab.removeEventListener("click", onClick);
        tab.removeEventListener("keydown", onKeyDown);
      });
    };
  }, []);

  return null;
}
