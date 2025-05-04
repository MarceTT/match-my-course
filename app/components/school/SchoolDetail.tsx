"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LuHeart } from "react-icons/lu";
import { IoShareOutline } from "react-icons/io5";
import type { StaticImageData } from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface SchoolDetailProps {
  images: string[] | StaticImageData[];
  city: string;
}

const SchoolDetail = ({
  images,
  city,
}: SchoolDetailProps) => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("¡Enlace copiado al portapapeles!");
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-3">
        {/* Ciudad + Botones */}
        <TooltipProvider delayDuration={0}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <h1 className="text-3xl font-black">{city}, Irlanda</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-[#F15368] hover:bg-[#F15368]/90 rounded-full w-8 h-8 p-0">
                      <LuHeart className="w-5 h-5 text-white fill-white" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Guardar</TooltipContent>
                </Tooltip>
                <span className="text-sm text-gray-600 font-semibold">Guardar</span>
              </div>
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
                <span className="text-sm text-gray-600 font-semibold">Compartir</span>
              </div>
            </div>
          </div>
        </TooltipProvider>

        {/* Imágenes */}
        <div className="grid grid-cols-6 grid-rows-2 gap-2">
          {images.slice(0, 5).map((src, index) => {
            const [loaded, setLoaded] = React.useState(false);

            return (
              <div
                key={index}
                className={`relative aspect-[3/2] w-full ${
                  index < 2 ? "col-span-3" : "col-span-2"
                } row-span-1`}
              >
                {!loaded && (
                  <Skeleton className="absolute inset-0 h-full w-full rounded-lg z-0" />
                )}
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`School image ${index + 1}`}
                  fill
                  className={`object-cover rounded-lg transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setLoaded(true)}
                  onError={() => setLoaded(true)} // fallback si falla
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SchoolDetail;
