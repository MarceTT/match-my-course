"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import ContactRequestDialog from "./ContactRequestDialog";

/**
 * Supplies the behaviour for the two dialogs the source markup declares but
 * whose driving script is an external file that is not part of the page.
 *
 * Both triggers already exist in the ported markup, so nothing is added to the
 * page visually:
 *   - `[data-about-photo]` — the about mosaic photos, which open the lightbox;
 *   - `[data-contact-destination]` — the two buttons inside `institutional-mmc`,
 *     which open the contact form with the destination they carry.
 *
 * The lightbox is a real `<dialog>` opened with `showModal()`, because the
 * source stylesheet styles it as one — it relies on `::backdrop` and on the top
 * layer for centring. Rendering it as a plain `<div>` made it appear at the
 * bottom of the page instead of over it.
 */
export default function MicrositeDialogs() {
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const [photo, setPhoto] = useState<{ src: string; alt: string } | null>(null);
  const [contactFor, setContactFor] = useState<string | null>(null);

  const closeLightbox = useCallback(() => {
    lightboxRef.current?.close();
    setPhoto(null);
  }, []);

  useEffect(() => {
    const onPhoto = (event: Event) => {
      const el = event.currentTarget as HTMLElement;
      setPhoto({
        src: el.dataset.aboutPhoto ?? "",
        alt: el.dataset.aboutAlt ?? "",
      });
      lightboxRef.current?.showModal();
    };
    const onContact = (event: Event) => {
      const el = event.currentTarget as HTMLElement;
      setContactFor(el.dataset.contactDestination || "Consulta general");
    };

    const photos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-about-photo]")
    );
    const contacts = Array.from(
      document.querySelectorAll<HTMLElement>("[data-contact-destination]")
    );
    photos.forEach((el) => el.addEventListener("click", onPhoto));
    contacts.forEach((el) => el.addEventListener("click", onContact));

    return () => {
      photos.forEach((el) => el.removeEventListener("click", onPhoto));
      contacts.forEach((el) => el.removeEventListener("click", onContact));
    };
  }, []);

  return (
    <>
      <dialog
        ref={lightboxRef}
        className="about-mmc-lightbox"
        aria-label="Fotografía ampliada"
        onClose={() => setPhoto(null)}
        onClick={(event) => {
          // Clicking the backdrop reaches the <dialog> element itself.
          if (event.target === lightboxRef.current) closeLightbox();
        }}
      >
        <div className="about-mmc-lightbox-content">
          <button
            type="button"
            className="about-mmc-lightbox-close"
            aria-label="Cerrar fotografía"
            onClick={closeLightbox}
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={photo?.alt ?? ""} src={photo?.src ?? ""} />
        </div>
      </dialog>

      <ContactRequestDialog
        destination={contactFor ?? ""}
        open={contactFor !== null}
        onClose={() => setContactFor(null)}
      />
    </>
  );
}
