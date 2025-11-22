"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";

interface Props {
  schoolName: string;
  schoolLogo?: string;
  schoolUrlVideo?: string;
  summaryText?: string;
  rating: number;
  yearsOld?: number | null;
  city?: string;
  minutesToCenter?: number;
  transportIcon?: React.ReactNode;
}

const SchoolHeaderClient = ({
  schoolName,
  schoolLogo,
  schoolUrlVideo,
  summaryText,
  rating,
  yearsOld,
  city,
  minutesToCenter,
  transportIcon,
}: Props) => {
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4">
        <div className="flex flex-col flex-1">
          {/* School name - rendered by server, interactive here for expand functionality */}
          <h1 className="text-4xl font-black text-center md:text-left lg:text-left xl:text-left">
            {schoolName || "Nombre no disponible"}
          </h1>

          {/* Summary text with expand/collapse */}
          {summaryText && (
            <>
              <p
                id="school-summary"
                className={`mt-2 text-gray-700 text-base leading-relaxed text-center md:text-left lg:text-left xl:text-left ${
                  summaryExpanded ? '' : 'clamp-2-md-unset fade-bottom-mobile'
                } md:text-base md:leading-6 md:text-slate-500 md:font-normal md:max-w-2xl md:opacity-90`}
              >
                {summaryText}
              </p>
              <button
                type="button"
                aria-controls="school-summary"
                aria-expanded={summaryExpanded}
                onClick={() => setSummaryExpanded((v) => !v)}
                className="mt-1 text-blue-600 hover:text-blue-700 text-sm md:hidden underline"
              >
                {summaryExpanded ? 'Leer menos' : 'Leer más'}
              </button>
            </>
          )}

          {/* Rating display */}
          <div className="flex items-center gap-4 mt-1 justify-center md:justify-start lg:justify-start xl:justify-start">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => {
                const full = i + 1 <= Math.floor(rating);
                const half = i + 0.5 === Math.round(rating * 2) / 2;
                return (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      full
                        ? "fill-yellow-400 text-yellow-400"
                        : half
                        ? "fill-yellow-200 text-yellow-200"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                );
              })}
              <span className="ml-2 text-lg font-medium">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* School details - Antigüedad, Ciudad, Minutos */}
          <div className="flex items-center justify-center md:justify-start lg:justify-start xl:justify-start gap-6 mt-4 text-base text-gray-700 flex-wrap">
            {yearsOld !== undefined && yearsOld !== null && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">Antigüedad:</span>
                <span>{yearsOld} años</span>
              </div>
            )}
            {city && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">Ciudad:</span>
                <span>{city}</span>
              </div>
            )}
            {minutesToCenter !== undefined && minutesToCenter !== null && (
              <div className="flex items-center gap-2">
                {transportIcon}
                <span>{minutesToCenter} min/centro</span>
              </div>
            )}
          </div>

          {/* Video button */}
          {schoolUrlVideo && (
            <div className="mt-4 flex justify-center md:justify-start lg:justify-start">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="px-4 py-2 rounded-md bg-[#FF385C] hover:bg-[#e63152] text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF385C]"
                    aria-label="Ver video de la escuela"
                  >
                    <span className="inline-flex items-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      Video de la escuela
                    </span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl">
                  <DialogHeader>
                    <DialogTitle>Presentación de {schoolName}</DialogTitle>
                  </DialogHeader>
                  <div className="relative aspect-video w-full bg-gray-900 rounded">
                    <p className="text-white text-center py-20">Video player would go here</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* School logo - placeholder for now, would be rendered on server */}
        {schoolLogo && (
          <div className="hidden md:block lg:block self-center sm:self-start sm:mt-1 lg:mt-0">
            <img src={schoolLogo} alt={schoolName} style={{ width: 160, height: 120 }} className="object-contain" />
          </div>
        )}
      </div>
    </>
  );
};

export default SchoolHeaderClient;
