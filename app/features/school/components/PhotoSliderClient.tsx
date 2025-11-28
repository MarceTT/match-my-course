"use client";

import React, { useEffect, useCallback, useState, useRef } from "react";
import { PhotoSlider as RPPhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type ImageItem = { src: string; key?: string; alt?: string };
type Props = {
  images: ImageItem[];
  visible: boolean;
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  schoolName?: string;
  [key: string]: any;
};

export default function PhotoSlider(props: Props) {
  const { images, visible, index, schoolName } = props;
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([index]));
  const abortControllerRef = useRef<AbortController>(new AbortController());

  // Precargar imagen actual y siguientes con optimizaciones
  useEffect(() => {
    if (!visible) {
      // Cancelar precargas en progreso cuando se cierra
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      return;
    }

    const toPreload = new Set<number>();
    // Precargar imagen actual + siguiente (máximo 2 imágenes)
    toPreload.add(index);
    if (index + 1 < images.length) toPreload.add(index + 1);

    // Precargar con optimizaciones
    toPreload.forEach((idx) => {
      if (!preloadedImages.has(idx) && images[idx]) {
        const img = new Image();
        const url = new URL(images[idx].src, typeof window !== "undefined" ? window.location.origin : undefined);

        // Optimizar tamaño de imagen si es CDN
        if (url.hostname.includes("cdn") || url.hostname.includes("cloudfront")) {
          // Agregar parámetros de optimización si es posible
          if (!url.search.includes("w=")) {
            url.searchParams.set("w", "2000");
            url.searchParams.set("q", "80");
          }
        }

        // Usar fetch con AbortController para mejor control
        fetch(url.toString(), { signal: abortControllerRef.current.signal })
          .then((response) => {
            if (response.ok) {
              img.src = url.toString();
            }
          })
          .catch((error) => {
            // Ignorar AbortError, es normal cuando se cierra el modal
            if (error.name !== "AbortError") {
              console.warn(`Error preloading image ${idx}:`, error);
              // Fallback: cargar sin optimización
              img.src = images[idx].src;
            }
          });
      }
    });

    setPreloadedImages((prev) => new Set([...prev, ...toPreload]));
  }, [visible, index, images, preloadedImages]);

  // Handle keyboard navigation - memoizado
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

  // Cleanup en unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current.abort();
    };
  }, []);

  // Pasar images con alt texts descriptivos
  const imagesWithAlt = images.map((img, idx) => ({
    ...img,
    alt: img.alt || `${schoolName || 'Escuela'} - Imagen ${idx + 1}`
  }));

  // NO usar wrapper fixed - dejar que react-photo-view maneje su propio overlay
  // El wrapper fixed estaba interfiriendo con el cierre del modal en mobile
  return <RPPhotoSlider {...(props as any)} images={imagesWithAlt} />;
}
