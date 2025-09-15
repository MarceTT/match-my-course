"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { BadgePercent } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePrefetchSchoolDetails } from "@/app/hooks/usePrefetchSchoolDetails";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { getResponsiveImageProps } from "@/app/utils/rewriteToCDN";
import { useSearchParams } from "next/navigation";
import { SchoolDetails } from "@/app/lib/types";
import { buildSeoSchoolUrlFromSeoEntry } from "@/lib/helpers/buildSeoSchoolUrl";
import { cursoSlugToSubcategoria } from "@/lib/courseMap";
import { sendGTMEvent } from "@/app/lib/gtm";

// Lazy load Framer Motion solo cuando sea necesario
const MotionDiv = dynamic(
  () => import("framer-motion").then(mod => ({ default: mod.motion.div })),
  { 
    ssr: false,
    loading: () => <div /> // Fallback estático mientras carga
  }
);

interface SchoolCardProps {
  school: SchoolDetails;
  viewType: "grid" | "list";
}

function filtrarPrecioMasBarato(precios: SchoolDetails["prices"] = []) {
  const pm = precios.filter((p) => p.horario === "PM");
  const am = precios.filter((p) => p.horario === "AM");

  if (pm.length > 0) {
    return [pm.reduce((min, p) => (p.precio < min.precio ? p : min))];
  }

  if (am.length > 0) {
    return [am.reduce((min, p) => (p.precio < min.precio ? p : min))];
  }

  return [];
}

const SchoolCard = React.memo(function SchoolCard({ school, viewType }: SchoolCardProps) {
  const searchParams = useSearchParams();
  const prefetchSchool = usePrefetchSchoolDetails();
  
  // Memoizar cálculos costosos
  const rating = useMemo(() => Number(school.qualities?.ponderado ?? 0), [school.qualities?.ponderado]);
  
  const antiguedad = useMemo(() => 
    school.description?.añoFundacion
      ? new Date().getFullYear() - school.description.añoFundacion
      : null, 
    [school.description?.añoFundacion]
  );

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  
  // Memoizar filtrado de precios
  const priceOptions = useMemo(
    () => filtrarPrecioMasBarato(school.prices),
    [school.prices]
  );

  const selected = priceOptions[selectedOptionIndex] ?? null;
  const hasDiscount = selected?.oferta && selected.oferta < selected.precio;

  const isGrid = viewType === "grid";
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Generar URL para la tarjeta
  const schoolId = school._id.toString();
  const course = searchParams.get("course")?.toString().toLowerCase() ?? "";
  const weeks = Number(searchParams.get("weeksMin") ?? 1);
  const city = searchParams.get("city") ?? "Dublin";
  const schedule = searchParams.get("horario") ?? "PM";

  const subcategoria = cursoSlugToSubcategoria[course];
  const seoEntry = school.cursosEos?.find(
    (c: any) => c.subcategoria === subcategoria
  );

  const fullUrl = seoEntry
    ? buildSeoSchoolUrlFromSeoEntry(seoEntry, schoolId, {
        schoolId,
        curso: course,
        semanas: weeks,
        ciudad: city,
        horario: schedule,
      })
    : "#";

  useEffect(() => {
    setSelectedOptionIndex(0);
  }, [school._id]);

  // Memoizar event handlers
  const handleClick = useCallback(() => {
    sendGTMEvent("school_card_clicked", {
      school_id: schoolId,
      school_name: school.name,
      city: school.city,
      price: selected?.oferta ?? selected?.precio ?? null,
      has_discount: !!hasDiscount,
      course_slug: course,
      view_type: viewType,
    });
  }, [schoolId, school.name, school.city, selected, hasDiscount, course, viewType]);

  const handleHover = useCallback(() => {
    prefetchSchool(`${school._id}`);
    sendGTMEvent("school_card_hovered", {
      school_id: schoolId,
      school_name: school.name,
      city: school.city,
      price: selected?.oferta ?? selected?.precio ?? null,
      has_discount: !!hasDiscount,
      course_slug: course,
      view_type: viewType,
    });
  }, [prefetchSchool, school._id, school.name, school.city, selected, hasDiscount, course, viewType, schoolId]);

  const handlePrefetch = useCallback(() => {
    prefetchSchool(`${school._id}`);
  }, [prefetchSchool, school._id]);


  return (
    <Link
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleHover}
      onMouseLeave={handlePrefetch}
      onClick={handleClick}
      className="block" // Hace que todo el card sea clickeable como un bloque
    >
      <MotionDiv
        whileHover={{ scale: 1.02, y: -4 }}
        className={`relative border bg-white hover:bg-white hover:shadow-md transition-shadow rounded-lg p-4 group cursor-pointer ${
          isGrid
            ? "flex flex-col h-full justify-between"
            : "flex flex-col sm:flex-row"
        }`}
      >
        <div
          className={`${
            isGrid ? "h-48 w-full" : "lg:h-72 lg:w-72 sm:w-56 h-40"
          } overflow-hidden rounded-lg relative flex items-stretch`}
        >
          {hasDiscount && (
            <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-yellow-900 text-xs sm:text-sm font-extrabold px-2 py-1 rounded-md shadow-lg flex items-center gap-1 animate-pulse">
              <BadgePercent className="w-3 h-3 sm:w-4 sm:h-4" />
              Oferta activa
            </div>
          )}
          <Image
            {...getResponsiveImageProps(
              school.mainImage || '',
              `${school.name} - Escuela de inglés en ${school.city}`,
              {
                sizes: isGrid 
                  ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  : "(max-width: 640px) 100vw, (max-width: 768px) 40vw, 25vw",
                priority: false,
                fill: true,
                fallbackSrc: "/placeholder.svg"
              }
            )}
            className="object-cover select-none pointer-events-none transition-opacity duration-300"
            onContextMenu={(e) => e.preventDefault()}
            onLoad={(e) => {
              // Mejorar UX con fade-in suave
              e.currentTarget.style.opacity = '1';
            }}
            onLoadStart={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
          />
        </div>

        <div
          className={`flex flex-col justify-between ${
            isGrid ? "mt-4 flex-1" : "sm:ml-4 flex-1"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h1 className="mt-2 text-lg font-bold lg:mt-0 lg:text-lg xl:text-xl hover:underline">
                {school.name}
              </h1>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => {
                  const full = i + 1 <= Math.floor(rating);
                  const half = i + 0.5 === Math.round(rating * 2) / 2;
                  return (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 ${
                        full
                          ? "fill-yellow-400"
                          : half
                          ? "fill-yellow-200"
                          : "fill-gray-200"
                      }`}
                    />
                  );
                })}
                <span className="ml-2 text-sm text-gray-600">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm mt-4 flex flex-row sm:flex-col sm:items-start sm:space-y-1 justify-between w-full lg:mt-0 xl:mt-0">
            <p className="font-semibold text-base sm:text-lg text-gray-700">
              Ciudad: <span className="text-gray-900">{school.city}</span>
            </p>
            {antiguedad !== null && (
              <span className="inline-flex items-center text-xs sm:text-sm md:text-base px-3 py-1 rounded-lg bg-gray-100 text-gray-700">
                {antiguedad < 2
                  ? "Nueva escuela"
                  : `${antiguedad} años de trayectoria`}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between lg:mt-0 xl:mt-0">
            {!isMobile && (
              <Image
                {...getResponsiveImageProps(
                  school.logo || '',
                  `Logo de ${school.name}`,
                  {
                    sizes: "120px",
                    priority: false,
                    width: 120,
                    height: 60,
                    fallbackSrc: "/placeholder.svg"
                  }
                )}
                className="object-contain select-none pointer-events-none transition-opacity duration-200"
                onContextMenu={(e) => e.preventDefault()}
                onError={(e) => {
                  // Si falla el logo, ocultar el elemento
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}

            <div className="mt-4 w-full flex flex-col items-center sm:items-end text-center sm:text-right space-y-2">
              <div className="flex flex-col sm:items-end mb-2">
                {hasDiscount ? (
                  <>
                    <span className="text-xs text-gray-500 line-through">
                      €{selected?.precio?.toLocaleString()}
                    </span>
                    <span className="text-3xl font-extrabold text-green-600 lg:text-3xl xl:text-4xl">
                      €{selected?.oferta?.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold text-blue-600 lg:text-3xl xl:text-4xl">
                    €{selected?.precio?.toLocaleString()}
                  </span>
                )}
              </div>

              <button
                type="button"
                className="w-full sm:w-auto bg-[#5371FF] hover:bg-[#FCCC02] hover:text-[#5371FF] text-white text-sm font-semibold rounded-md px-4 py-2 transition"
              >
                Ver escuela
              </button>
            </div>
          </div>
        </div>
      </MotionDiv>
    </Link>
  );
});

export default SchoolCard;
