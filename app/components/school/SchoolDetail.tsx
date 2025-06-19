"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LuHeart } from "react-icons/lu";
import { IoShareOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { PhotoSlider } from "react-photo-view";
import type { StaticImageData } from "next/image";
import "react-photo-view/dist/react-photo-view.css";
import { FiZoomIn } from "react-icons/fi";

interface SchoolDetailProps {
  images: string[] | StaticImageData[];
  city: string;
}

const SchoolDetail = ({ images, city }: SchoolDetailProps) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("¡Enlace copiado al portapapeles!");
  };

  const openSlider = (i: number) => {
    setIndex(i);
    setVisible(true);
  };

  const imageUrls = images.map((img) => (typeof img === "string" ? img : img.src));

  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, [imageUrls]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-3">
        <TooltipProvider delayDuration={0}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <h1 className="text-3xl font-black">{city}, Irlanda</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full w-8 h-8 p-0"
                      onClick={handleShare}
                    >
                      <IoShareOutline className="w-5 h-5 fill-gray-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Compartir</TooltipContent>
                </Tooltip>
                <span className="text-sm text-gray-600 font-semibold">
                  Compartir
                </span>
              </div>
            </div>
          </div>
        </TooltipProvider>

        <div className="grid grid-cols-6 grid-rows-1 gap-2">
          {imageUrls.slice(0, 5).map((url, i) => {
            const remaining = imageUrls.length - 5;
            const [loaded, setLoaded] = useState(false);

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
                  loading="lazy"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 rounded-lg transition">
                  <FiZoomIn className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

        <PhotoSlider
          images={imageUrls.map((src, index) => ({
            key: `img-${index}`,
            src,
          }))}
          visible={visible}
          index={index}
          onClose={() => setVisible(false)}
          onIndexChange={setIndex}
        />
      </div>
    </div>
  );
};

export default SchoolDetail;