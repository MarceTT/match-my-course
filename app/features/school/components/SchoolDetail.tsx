"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ShareButtons } from "@/app/components/common/social";
import { Skeleton } from "@/components/ui/skeleton";
import type { StaticImageData } from "next/image";
import { ZoomIn } from "lucide-react";

interface SchoolDetailProps {
  images: string[] | StaticImageData[];
  city: string;
}

const PhotoSlider = dynamic(() => import("./PhotoSliderClient"), { ssr: false, loading: () => null });

const SchoolDetail = ({ images, city }: SchoolDetailProps) => {
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

        <div className="grid grid-cols-6 grid-rows-1 gap-2">
          {imageUrls.slice(0, 5).map((url, i) => {
            const remaining = imageUrls.length - 5;
            const [loaded, setLoaded] = useState(false);
            const isLcp = i === 0; // primer cuadro grande: candidato a LCP

            return (
              <div
                key={i}
                onClick={() => openSlider(i)}
                className={`relative aspect-[3/2] w-full cursor-zoom-in group ${
                  i < 2 ? "col-span-3" : "col-span-2"
                } row-span-1 transition hover:brightness-90`}
              >
                {!loaded && (
                  <Skeleton className="absolute inset-0 h-full w-full rounded-lg z-0" />
                )}
                <Image
                  src={url}
                  alt={`Image ${i + 1}`}
                  fill
                  className={`object-cover rounded-lg transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setLoaded(true)}
                  onError={() => setLoaded(true)}
                  loading={isLcp ? "eager" : "lazy"}
                  priority={isLcp}
                  fetchPriority={isLcp ? "high" : undefined}
                  sizes="100vw"
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
            images={imageUrls.map((src, index) => ({ key: `img-${index}`, src }))}
            visible={visible}
            index={index}
            onClose={() => setVisible(false)}
            onIndexChange={setIndex}
          />
        )}
      </div>
    </div>
  );
};

export default SchoolDetail;
