"use client";

import React, { useState } from "react";
import { ZoomIn } from "lucide-react";
import dynamic from "next/dynamic";

const PhotoSlider = dynamic(() => import("./PhotoSliderClient"), {
  ssr: false,
  loading: () => null
});

interface SchoolDetailClientProps {
  imageUrls: string[];
  schoolName?: string;
}

export function SchoolDetailClient({
  imageUrls,
  schoolName
}: SchoolDetailClientProps) {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const openSlider = (i: number) => {
    setIndex(i);
    setVisible(true);
  };

  // For mobile: Just the "Ver más imágenes" button
  if (imageUrls.length <= 1) {
    return null; // No interactivity needed for single image
  }

  // Return mobile button + desktop interactive overlay
  return (
    <>
      {/* Mobile "Ver más imágenes" button - rendered in mobile view section */}
      <div className="lg:hidden">
        <button
          onClick={() => openSlider(0)}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Ver más imágenes ({imageUrls.length})
        </button>
      </div>

      {/* Desktop interactive overlay */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-6 grid-rows-1 gap-2 absolute inset-0 pointer-events-none">
          {imageUrls.slice(0, 5).map((_, i) => (
            <div
              key={i}
              onClick={() => openSlider(i)}
              className={`relative aspect-[3/2] cursor-zoom-in group bg-gray-100 rounded-lg ${
                i < 2 ? "col-span-3" : "col-span-2"
              } row-span-1 pointer-events-auto transition hover:brightness-90 overflow-hidden`}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 rounded-lg transition">
                <ZoomIn className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PhotoSlider modal - only rendered when visible */}
      {visible && PhotoSlider && (
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
