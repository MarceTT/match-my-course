"use client";

import { useEffect, useState } from "react";

/**
 * Lightbox for the about-section photo mosaic.
 *
 * The source markup ships the mosaic as buttons carrying `data-about-photo`
 * and `data-about-alt`, plus a `<dialog class="about-mmc-lightbox">` driven by
 * an external script that is not part of the page. The markup is reproduced as
 * published, so this component supplies the missing behaviour: it binds the
 * existing buttons and renders the dialog with the source's own class names.
 *
 * Without it the mosaic would still render, but clicking a photo would do
 * nothing — the buttons would be decorative.
 */
export default function AboutLightbox() {
  const [photo, setPhoto] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const buttons = Array.from(
      document.querySelectorAll<HTMLElement>("[data-about-photo]")
    );
    const onClick = (event: Event) => {
      const el = (event.currentTarget as HTMLElement) || null;
      if (!el) return;
      setPhoto({
        src: el.dataset.aboutPhoto ?? "",
        alt: el.dataset.aboutAlt ?? "",
      });
    };
    buttons.forEach((b) => b.addEventListener("click", onClick));
    return () => buttons.forEach((b) => b.removeEventListener("click", onClick));
  }, []);

  useEffect(() => {
    if (!photo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhoto(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photo]);

  if (!photo) return null;

  return (
    <div
      className="about-mmc-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Fotografía ampliada"
      onClick={(event) => {
        if (event.target === event.currentTarget) setPhoto(null);
      }}
      style={{ display: "flex" }}
    >
      <div className="about-mmc-lightbox-content">
        <button
          type="button"
          className="about-mmc-lightbox-close"
          aria-label="Cerrar fotografía"
          onClick={() => setPhoto(null)}
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={photo.alt} src={photo.src} />
      </div>
    </div>
  );
}
