"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { ShareButtons } from "@/app/components/common/social";
import type { StaticImageData } from "next/image";
import dynamic from "next/dynamic";

const PhotoSlider = dynamic(() => import("./PhotoSliderClient"), {
  ssr: false,
  loading: () => null
});

interface SchoolDetailProps {
  images: string[] | StaticImageData[];
  city: string;
  schoolName?: string;
}

/**
 * School gallery component with image grid and PhotoSlider modal
 * - Desktop: 5-image grid with hover zoom effects
 * - Mobile: Single image with "Ver más imágenes" button
 * - Click on any image opens PhotoSlider modal
 */
export default function SchoolDetail({ images, city, schoolName }: SchoolDetailProps) {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const imageUrls = images.map((img) => (typeof img === "string" ? img : img.src));

  const openSlider = (i: number) => {
    setIndex(i);
    setVisible(true);
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-black">
            Estudiar inglés en {city}, Irlanda
          </h2>
          <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-semibold lg:hidden">
                Compartir:
              </span>
              <ShareButtons
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={`Estudiar inglés en ${city}, Irlanda`}
                summary={`Descubre esta increíble escuela de inglés en ${city}. ¡Vive una experiencia única estudiando en el extranjero!`}
                hashtags={['StudyAbroad', 'English', city.replace(/\s+/g, '')]}
                via="matchmycourse"
                variant="minimal"
                platforms={['facebook', 'twitter', 'whatsapp']}
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Single image with "Ver más imágenes" button */}
        <div className="lg:hidden">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={imageUrls[0]}
                alt={`${schoolName || 'Escuela'} - Imagen principal`}
                fill
                className="object-cover rounded-lg"
                loading="eager"
                priority
                fetchPriority="high"
                sizes="100vw"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEwIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBmaWxsPSIjRTVFN0VCIi8+Cjwvc3ZnPgo="
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            {imageUrls.length > 1 && (
              <button
                onClick={() => openSlider(0)}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Ver más imágenes ({imageUrls.length})
              </button>
            )}
          </div>
        </div>

        {/* DESKTOP VIEW: Grid layout with clickable images */}
        <div className="hidden lg:grid grid-cols-6 grid-rows-1 gap-2">
          {imageUrls.slice(0, 5).map((url, i) => {
            const remaining = imageUrls.length - 5;
            const isLcp = i === 0; // First large box: LCP candidate

            return (
              <div
                key={i}
                data-image-index={i}
                onClick={() => openSlider(i)}
                className={`relative aspect-[3/2] w-full bg-gray-100 rounded-lg cursor-zoom-in group ${
                  i < 2 ? "col-span-3" : "col-span-2"
                } row-span-1 overflow-hidden hover:brightness-90 transition`}
              >
                <Image
                  src={url}
                  alt={`${schoolName || 'Escuela'} - Imagen ${i + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  loading={isLcp ? "eager" : "lazy"}
                  priority={isLcp}
                  fetchPriority={isLcp ? "high" : "low"}
                  sizes={i < 2 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                  quality={isLcp ? 85 : 75}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEwIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBmaWxsPSIjRTVFN0VCIi8+Cjwvc3ZnPgo="
                  onContextMenu={(e) => e.preventDefault()}
                />

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 rounded-lg transition pointer-events-none">
                  <ZoomIn className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {i === 4 && remaining > 0 && (
                  <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center pointer-events-none">
                    <span className="text-white text-lg font-bold">
                      +{remaining} imágenes
                    </span>
                  </div>
                )}
              </div>
            );
          })}
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
      </div>
    </div>
  );
}
