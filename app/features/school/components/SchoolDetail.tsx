"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ShareButtons } from "@/app/components/common/social";
import type { StaticImageData } from "next/image";
import { ZoomIn } from "lucide-react";

interface SchoolDetailProps {
  images: string[] | StaticImageData[];
  city: string;
  schoolName?: string;
}

const PhotoSlider = dynamic(() => import("./PhotoSliderClient"), { ssr: false, loading: () => null });

const SchoolDetail = ({ images, city, schoolName }: SchoolDetailProps) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);


  const openSlider = (i: number) => {
    setIndex(i);
    setVisible(true);
  };

  const imageUrls = images.map((img) => (typeof img === "string" ? img : img.src));

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
            <div className="relative aspect-[4/3] w-full cursor-zoom-in group bg-gray-100 rounded-lg overflow-hidden">
              {(() => {
                const [loaded, setLoaded] = useState(false);
                return (
                  <>
                    {!loaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
                    )}
                    <Image
                      src={imageUrls[0]}
                      alt={`${schoolName || 'Escuela'} - Imagen principal`}
                      fill
                      className={`object-cover rounded-lg transition-opacity duration-300 ${
                        loaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => setLoaded(true)}
                      onError={() => setLoaded(true)}
                      loading="eager"
                      priority
                      fetchPriority="high"
                      sizes="100vw"
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEwIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBmaWxsPSIjRTVFN0VCIi8+Cjwvc3ZnPgo="
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </>
                );
              })()}
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

        {/* DESKTOP VIEW: Grid layout (unchanged) */}
        <div className="hidden lg:grid grid-cols-6 grid-rows-1 gap-2">
          {imageUrls.slice(0, 5).map((url, i) => {
            const remaining = imageUrls.length - 5;
            const [loaded, setLoaded] = useState(false);
            const isLcp = i === 0; // primer cuadro grande: candidato a LCP

            return (
              <div
                key={i}
                onClick={() => openSlider(i)}
                className={`relative aspect-[3/2] w-full cursor-zoom-in group bg-gray-100 rounded-lg ${
                  i < 2 ? "col-span-3" : "col-span-2"
                } row-span-1 transition hover:brightness-90 overflow-hidden`}
              >
                {!loaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
                )}
                <Image
                  src={url}
                  alt={`${schoolName || 'Escuela'} - Imagen ${i + 1}`}
                  fill
                  className={`object-cover rounded-lg transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setLoaded(true)}
                  onError={() => setLoaded(true)}
                  loading={isLcp ? "eager" : "lazy"}
                  priority={isLcp}
                  fetchPriority={isLcp ? "high" : "low"}
                  sizes={i < 2 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                  quality={isLcp ? 85 : 75}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEwIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBmaWxsPSIjRTVFN0VCIi8+Cjwvc3ZnPgo="
                  onContextMenu={(e) => e.preventDefault()}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 rounded-lg transition">
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

        {visible && (
          <PhotoSlider
            images={imageUrls.map((src, index) => ({
              key: `img-${index}`,
              src,
              alt: `${schoolName || 'Escuela'} - Imagen ${index + 1}`
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
};

export default SchoolDetail;
