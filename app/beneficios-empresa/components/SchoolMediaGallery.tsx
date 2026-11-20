"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { SchoolMedia } from "../data/schoolMedia";

/**
 * Photo and video gallery for the offering cards on the country pages.
 *
 * Reproduces the behaviour of `irlanda-ofertas-originales.js` and
 * `promociones-originales.js`. Both scripts are the same gallery with different
 * element ids, so this takes the id prefix as a prop; the media itself lives in
 * `../data/schoolMedia`.
 *
 * The dialog markup is part of the ported page. This only drives it: it binds
 * the `[data-modal]` buttons inside each `[data-school]` card, fills the
 * dialog, and handles thumbnails, arrows, Escape and backdrop clicks.
 *
 * The video iframe is created only while the dialog is open and removed on
 * close, so YouTube is not contacted until a visitor asks for the video.
 */
export default function SchoolMediaGallery({
  media,
  idPrefix = "",
  scope,
}: {
  media: Record<string, SchoolMedia>;
  /** Element id prefix, e.g. "principalBIrish" on the Irlanda page. */
  idPrefix?: string;
  /** Optional ancestor selector, when the source scopes the gallery. */
  scope?: string;
}) {
  const [school, setSchool] = useState<string | null>(null);
  const [mode, setMode] = useState<"photos" | "video">("photos");
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const config = school ? media[school] : null;
  const photos = config?.photos ?? [];

  const close = useCallback(() => {
    dialogRef.current?.close();
    setSchool(null);
  }, []);

  const step = useCallback(
    (next: number) => {
      if (!photos.length) return;
      setIndex(((next % photos.length) + photos.length) % photos.length);
    },
    [photos.length]
  );

  // Bind the cards' buttons. The dialog belongs to the ported markup, so it is
  // found by id rather than rendered here.
  useEffect(() => {
    const id = (name: string) =>
      idPrefix ? `${idPrefix}${name[0].toUpperCase()}${name.slice(1)}` : name;
    const root = scope ? document.querySelector(scope) : document;
    if (!root) return;
    const dialog = document.getElementById(id("mediaDialog")) as HTMLDialogElement | null;
    if (!dialog) return;
    dialogRef.current = dialog;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-school]"));
    const bound: Array<[HTMLElement, (event: Event) => void]> = [];

    cards.forEach((card) => {
      const key = card.dataset.school;
      if (!key || !media[key]) return;
      card.querySelectorAll<HTMLElement>("[data-modal]").forEach((button) => {
        const handler = () => {
          setSchool(key);
          setMode(button.dataset.modal === "video" ? "video" : "photos");
          setIndex(0);
          dialog.showModal();
        };
        button.addEventListener("click", handler);
        bound.push([button, handler]);
      });
    });

    const onBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) close();
    };
    const onClose = () => setSchool(null);
    dialog.addEventListener("click", onBackdrop);
    dialog.addEventListener("close", onClose);

    return () => {
      bound.forEach(([el, handler]) => el.removeEventListener("click", handler));
      dialog.removeEventListener("click", onBackdrop);
      dialog.removeEventListener("close", onClose);
    };
  }, [media, idPrefix, scope, close]);

  // Arrow keys move through the gallery while photos are showing.
  useEffect(() => {
    if (!school || mode !== "photos") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") step(index - 1);
      if (event.key === "ArrowRight") step(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [school, mode, index, step]);

  // Paint the ported dialog's own elements.
  useEffect(() => {
    const id = (name: string) =>
      idPrefix ? `${idPrefix}${name[0].toUpperCase()}${name.slice(1)}` : name;
    const get = (name: string) => document.getElementById(id(name));
    const eyebrow = get("modalEyebrow");
    const title = get("modalTitle");
    const photosBox = get("modalPhotos");
    const videoBox = get("modalVideo");
    if (!eyebrow || !title || !photosBox || !videoBox) return;

    if (!config) {
      (videoBox.querySelector(`#${id("videoHolder")}`) ?? get("videoHolder"))?.replaceChildren();
      return;
    }

    eyebrow.textContent = config.eyebrow;
    title.textContent = mode === "photos" ? config.photoTitle : config.videoTitle;
    (photosBox as HTMLElement).hidden = mode !== "photos";
    (videoBox as HTMLElement).hidden = mode !== "video";

    if (mode === "photos") {
      const image = get("galleryImage") as HTMLImageElement | null;
      const caption = get("galleryCaption");
      const count = get("galleryCount");
      const thumbs = get("photoThumbs");
      const photo = photos[index];
      if (image && photo) {
        image.src = photo.src;
        image.alt = photo.alt;
      }
      if (caption && photo) caption.textContent = photo.alt;
      if (count) count.textContent = `${index + 1} / ${photos.length}`;
      if (thumbs) {
        thumbs.replaceChildren();
        photos.forEach((item, position) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = position === index ? "is-active" : "";
          button.setAttribute("aria-label", `Ver fotografía ${position + 1}`);
          const thumb = document.createElement("img");
          thumb.src = item.src;
          thumb.alt = "";
          thumb.loading = "lazy";
          button.appendChild(thumb);
          button.addEventListener("click", () => setIndex(position));
          thumbs.appendChild(button);
        });
      }
      return;
    }

    const holder = get("videoHolder");
    const note = get("videoNote");
    if (holder) {
      holder.replaceChildren();
      if (config.videoEmbed) {
        const iframe = document.createElement("iframe");
        iframe.src = config.videoEmbed;
        iframe.title = config.videoFrameTitle ?? config.videoTitle;
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        holder.appendChild(iframe);
      } else {
        const box = document.createElement("div");
        box.className = "video-placeholder";
        const strong = document.createElement("strong");
        strong.textContent = "Video pendiente de enlace";
        box.appendChild(strong);
        holder.appendChild(box);
      }
    }
    if (note) note.textContent = config.videoNote ?? "";
  }, [config, mode, index, photos, idPrefix]);

  // Wire the dialog's own arrow and close buttons.
  useEffect(() => {
    const id = (name: string) =>
      idPrefix ? `${idPrefix}${name[0].toUpperCase()}${name.slice(1)}` : name;
    const previous = document.getElementById(id("prevPhoto"));
    const next = document.getElementById(id("nextPhoto"));
    const closeButton = document.getElementById(id("closeModal"));
    const onPrev = () => step(index - 1);
    const onNext = () => step(index + 1);
    previous?.addEventListener("click", onPrev);
    next?.addEventListener("click", onNext);
    closeButton?.addEventListener("click", close);
    return () => {
      previous?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
      closeButton?.removeEventListener("click", close);
    };
  }, [index, step, close, idPrefix]);

  return null;
}
