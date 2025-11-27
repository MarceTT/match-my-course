"use client";

import React, { useEffect, useCallback, useState } from "react";
import { PhotoSlider as RPPhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type ImageItem = { src: string; key?: string; alt?: string };
type Props = {
  images: ImageItem[];
  visible: boolean;
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  [key: string]: any;
};

export default function PhotoSlider(props: Props) {
  const { images, visible, index } = props;
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([index]));

  // Precargar imagen actual y siguientes para mejor UX
  useEffect(() => {
    if (!visible) return;

    const toPreload = new Set<number>();
    // Precargar imagen actual + siguiente (máximo 2 imágenes)
    toPreload.add(index);
    if (index + 1 < images.length) toPreload.add(index + 1);

    // Precargar imágenes en background usando native Image API
    toPreload.forEach((idx) => {
      if (!preloadedImages.has(idx) && images[idx]) {
        const img = new window.Image();
        img.src = images[idx].src;
        // No hacer nada con la imagen, solo precargarla en caché
      }
    });

    setPreloadedImages((prev) => new Set([...prev, ...toPreload]));
  }, [visible, index, images, preloadedImages]);

  // Handle keyboard navigation sin perder funcionalidad
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!visible) return;

      if (e.key === "ArrowLeft" && index > 0) {
        props.onIndexChange(index - 1);
        e.preventDefault();
      } else if (e.key === "ArrowRight" && index < images.length - 1) {
        props.onIndexChange(index + 1);
        e.preventDefault();
      } else if (e.key === "Escape") {
        props.onClose();
        e.preventDefault();
      }
    },
    [visible, index, images.length, props]
  );

  useEffect(() => {
    if (visible) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  // Tipado laxo para compatibilidad con la lib instalada
  return <RPPhotoSlider {...(props as any)} />;
}
