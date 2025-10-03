"use client";

import { useEffect, useRef } from "react";

type GTMClientProps = {
  gtmId: string;
  dataLayerName?: string;
  lazyOn?: "idle" | "interaction" | "both";
};

export default function GTMClient({ gtmId, dataLayerName = "dataLayer", lazyOn = "both" }: GTMClientProps) {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!gtmId || typeof window === "undefined") return;

    // Initialize dataLayer and set default consent to denied (privacy-friendly baseline)
    (window as any)[dataLayerName] = (window as any)[dataLayerName] || [];
    const dl = (window as any)[dataLayerName];
    dl.push({ "gtm.start": Date.now(), event: "gtm.js" });
    dl.push({
      event: "default_consent",
      consent: {
        ad_storage: "denied",
        analytics_storage: "denied",
        functionality_storage: "granted",
        personalization_storage: "denied",
        security_storage: "granted",
      },
    });

    const loadGTM = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}${dataLayerName !== "dataLayer" ? `&l=${encodeURIComponent(dataLayerName)}` : ""}`;
      document.head.appendChild(s);
    };

    const onFirstInteraction = () => {
      loadGTM();
      cleanup();
    };

    const onIdle = () => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => loadGTM(), { timeout: 3000 });
      } else {
        setTimeout(loadGTM, 1500);
      }
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction, { capture: true } as any);
      window.removeEventListener("touchstart", onFirstInteraction);
    };

    // Strategy
    if (lazyOn === "interaction" || lazyOn === "both") {
      window.addEventListener("pointerdown", onFirstInteraction, { once: true });
      window.addEventListener("keydown", onFirstInteraction, { once: true });
      window.addEventListener("scroll", onFirstInteraction, { once: true, capture: true });
      window.addEventListener("touchstart", onFirstInteraction, { once: true });
    }
    if (lazyOn === "idle" || lazyOn === "both") {
      onIdle();
    }

    return cleanup;
  }, [gtmId, dataLayerName, lazyOn]);

  return null;
}

