import React from "react";
import Image from "next/image";
import { ShareButtons } from "@/app/components/common/social";
import type { StaticImageData } from "next/image";
import { SchoolDetailClient } from "./SchoolDetailClient";

interface SchoolDetailProps {
  images: string[] | StaticImageData[];
  city: string;
  schoolName?: string;
}

/**
 * Server-rendered component for school gallery
 * - Renders all images server-side for better SEO and performance
 * - Mobile: Shows single image + button
 * - Desktop: Shows 5-image grid
 * - Client-side interactivity handled by SchoolDetailClient wrapper
 */
export default function SchoolDetail({ images, city, schoolName }: SchoolDetailProps) {
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
              <SchoolDetailClient
                imageUrls={imageUrls}
                schoolName={schoolName}
              />
            )}
          </div>
        </div>

        {/* DESKTOP VIEW: Grid layout - Server rendered for SEO */}
        <div className="hidden lg:grid grid-cols-6 grid-rows-1 gap-2">
          {imageUrls.slice(0, 5).map((url, i) => {
            const remaining = imageUrls.length - 5;
            const isLcp = i === 0; // First large box: LCP candidate

            return (
              <div
                key={i}
                className={`relative aspect-[3/2] w-full bg-gray-100 rounded-lg ${
                  i < 2 ? "col-span-3" : "col-span-2"
                } row-span-1 overflow-hidden`}
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

        {/* Client-side interactive overlay and gallery - only loaded on demand */}
        <SchoolDetailClient
          imageUrls={imageUrls}
          schoolName={schoolName}
        />
      </div>
    </div>
  );
}
