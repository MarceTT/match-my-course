"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

/**
 * School photo gallery, ported from the Canadá page.
 *
 * The original drove a single `<dialog>` with hand-written DOM code and a
 * `schoolMedia` map. Here each card owns its gallery, so the photos cannot get
 * out of sync with the school whose button was clicked.
 *
 * The original markup also carried a video panel, but both schools ship
 * `videoEmbed: ''` and the note "Video no disponible", and no button ever opens
 * it — it is dead markup, so it is not ported. Add it back the day there is a
 * video to show.
 */

export interface GalleryPhoto {
  src: string;
  alt: string;
}

interface SchoolGalleryDialogProps {
  /** Small eyebrow above the title, e.g. "CENTRE OF ENGLISH STUDIES · TORONTO". */
  eyebrow: string;
  photos: GalleryPhoto[];
  /** Label of the button that opens the gallery. */
  triggerLabel: string;
}

export default function SchoolGalleryDialog({
  eyebrow,
  photos,
  triggerLabel,
}: SchoolGalleryDialogProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const total = photos.length;
  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") go(index + 1);
      if (event.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, go]);

  const current = photos[index];

  return (
    <>
      <div className="my-[18px] mb-3.5 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
          className="flex flex-1 basis-[190px] items-center justify-between gap-4 rounded-xl border border-[#f3c6c6] bg-[#fff0f0] px-[15px] py-[13px] text-[13px] font-bold text-[#9c353d] transition-[background,transform] duration-[180ms] hover:-translate-y-px hover:bg-[#ffe2e2] max-[600px]:basis-full"
        >
          {triggerLabel} <span aria-hidden>↗</span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(11,19,45,.75)] p-4 backdrop-blur-[5px]"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Galería de la escuela"
            className="max-h-[92vh] w-[min(1020px,calc(100%-32px))] overflow-y-auto rounded-3xl bg-white p-5 text-[#16203b] shadow-[0_35px_110px_#0a163e66] max-[600px]:rounded-2xl max-[600px]:p-[13px]"
          >
            <div className="mb-[15px] flex items-center justify-between gap-[18px]">
              <div>
                <p className="m-0 text-[11px] font-extrabold tracking-[.12em] text-[#4863f5]">
                  {eyebrow}
                </p>
                <h2 className="my-1 text-[clamp(20px,3vw,28px)] font-bold">
                  Galería de la escuela
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar ventana"
                className="h-[42px] w-[42px] rounded-full border-0 bg-[#f0f3ff] text-[28px] leading-none text-[#26304c]"
              >
                ×
              </button>
            </div>

            <figure className="m-0">
              <Image
                src={current.src}
                alt={current.alt}
                width={1600}
                height={1067}
                className="block h-[min(62vh,650px)] w-full rounded-[14px] bg-[#f4f6fa] object-contain max-[600px]:h-[50vh]"
              />
              <figcaption className="mx-0.5 mt-2 flex justify-between text-[12px] text-[#6d7790]">
                <span>{current.alt}</span>
                <span>
                  {index + 1} / {total}
                </span>
              </figcaption>
            </figure>

            <div className="my-3 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="rounded-[10px] border border-[#d8e0f5] bg-white px-[15px] py-2.5 font-bold text-[#4863f5]"
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="rounded-[10px] border border-[#d8e0f5] bg-white px-[15px] py-2.5 font-bold text-[#4863f5]"
              >
                Siguiente →
              </button>
            </div>

            <div
              className="flex gap-2 overflow-x-auto pb-[5px]"
              aria-label="Seleccionar fotografía"
            >
              {photos.map((photo, photoIndex) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setIndex(photoIndex)}
                  aria-label={photo.alt}
                  aria-current={photoIndex === index}
                  className={`h-[54px] flex-[0_0_75px] overflow-hidden rounded-[9px] border-2 bg-transparent p-0 ${
                    photoIndex === index ? "border-[#4863f5]" : "border-transparent"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    width={150}
                    height={108}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
