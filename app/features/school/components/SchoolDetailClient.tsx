"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const PhotoSlider = dynamic(() => import("./PhotoSliderClient"), {
  ssr: false,
  loading: () => null
});

interface SchoolDetailClientProps {
  imageUrls: string[];
  schoolName?: string;
  onImageClick?: (index: number) => void;
}

export function SchoolDetailClient({
  imageUrls,
  schoolName,
  onImageClick
}: SchoolDetailClientProps) {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const openSlider = (i: number) => {
    setIndex(i);
    setVisible(true);
    onImageClick?.(i);
  };

  // For mobile: Just the "Ver más imágenes" button
  if (imageUrls.length <= 1) {
    return null;
  }

  return (
    <>
      {/* Mobile "Ver más imágenes" button */}
      <div className="lg:hidden">
        <button
          onClick={() => openSlider(0)}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Ver más imágenes ({imageUrls.length})
        </button>
      </div>

      {/* PhotoSlider modal - only rendered when visible */}
      {visible && (
        <PhotoSlider
          images={imageUrls.map((src, idx) => ({
            key: `img-${idx}`,
            src,
            alt: `${schoolName || 'Escuela'} - Imagen ${idx + 1}`
          }))}
          visible={visible}
          index={index}
          onClose={() => setVisible(false)}
          onIndexChange={setIndex}
          schoolName={schoolName}
        />
      )}
    </>
  );
}

// Export a helper function to attach click handlers to desktop images
export function attachImageClickHandlers(openSlider: (index: number) => void) {
  if (typeof window === "undefined") return;

  const desktopGallery = document.querySelector(".desktop-gallery-interactive");
  if (!desktopGallery) return;

  desktopGallery.querySelectorAll("[data-image-index]").forEach((element) => {
    element.addEventListener("click", (e) => {
      const index = parseInt((element as HTMLElement).dataset.imageIndex || "0");
      openSlider(index);
      e.stopPropagation();
    });
  });
}
