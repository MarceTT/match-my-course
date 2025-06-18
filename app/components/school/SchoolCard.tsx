
"use client";

import { useEffect, useState } from "react";
import { BadgePercent } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePrefetchSchoolDetails } from "@/app/hooks/usePrefetchSchoolDetails";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Reservation } from "@/types";
import { buildReservationQuery } from "@/lib/reservation";
import { SchoolDetails } from "@/app/lib/types";

interface SchoolCardProps {
  school: SchoolDetails;
  viewType: "grid" | "list";
}

export default function SchoolCard({ school, viewType }: SchoolCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefetchSchool = usePrefetchSchoolDetails();
  const rating = Number(school.qualities?.ponderado ?? 0);
  const antiguedad = school.description?.añoFundacion
    ? new Date().getFullYear() - school.description.añoFundacion
    : null;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const priceOptions = (school.prices || []).filter(
    (p) => typeof p.precio === "number" && p.precio > 0
  );

  const selected = priceOptions[selectedOptionIndex] ?? null;
  const hasDiscount = selected?.oferta && selected.oferta < selected.precio;

  const isGrid = viewType === "grid";
  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleScheduleOption = (i: number) => () => {
    setSelectedOptionIndex(i)
    const params = new URLSearchParams(searchParams.toString());
    const jornadaValue = i === 0 ? 'am' : 'pm';
    params.set('horario', jornadaValue);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  const handleShowSchool = () => {
    const reservation: Reservation = {
      schoolId: school._id.toString(),
      course: searchParams.get("course")?.toString() ?? "",
      weeks: Number(searchParams.get("weeksMin") ?? 1),
      schedule: selectedOptionIndex === 0 ? 'am' : 'pm'
    };
    
    const query = buildReservationQuery(reservation);  
    prefetchSchool(`${school._id}`);
    setTimeout(() => router.push(`school-detail/${school._id}?${query}`), 50);
  }

  useEffect(() => {
    setSelectedOptionIndex(0);
  }, [school._id]);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      onMouseEnter={() => prefetchSchool(`${school._id}`)}
      className={`relative border bg-white hover:bg-white hover:shadow-md transition-shadow rounded-lg p-4 group ${
        isGrid ? "flex flex-col h-full justify-between" : "flex flex-col sm:flex-row"
      }`}
    >
      <div
        className={`${
          isGrid ? "h-48 w-full" : "lg:h-72 lg:w-72 sm:w-56 h-40"
        } overflow-hidden rounded-lg relative`}
      >
        {hasDiscount && (
          <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-yellow-900 text-xs sm:text-sm font-extrabold px-2 py-1 rounded-md shadow-lg flex items-center gap-1 animate-pulse">
            <BadgePercent className="w-3 h-3 sm:w-4 sm:h-4" />
            Oferta activa
          </div>
        )}
        <Image
          src={rewriteToCDN(school.mainImage)}
          alt={school.name}
          width={500}
          height={300}
          className="h-full w-full object-cover cursor-pointer"
          loading="lazy"
          placeholder="empty"
          onClick={handleShowSchool}
        />
      </div>

      <div
        className={`flex flex-col justify-between ${
          isGrid ? "mt-4 flex-1" : "sm:ml-4 flex-1"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h1 
              className="mt-2 text-lg font-bold lg:mt-0 lg:text-lg xl:text-xl cursor-pointer"
              onClick={handleShowSchool}
            >
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

          {!isGrid && !isMobile && priceOptions.length > 0 && (
            <div className="text-sm text-gray-700">
              <p className="font-semibold text-gray-900 pb-1 text-right">
                Opciones:
              </p>
              <ul className="space-y-2">
                {priceOptions.map((p, i) => (
                  <li
                    key={i}
                    className={`cursor-pointer transition-colors ${
                      selectedOptionIndex === i
                        ? "font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded"
                        : "hover:text-blue-500 hover:bg-gray-50 px-2 py-1 rounded"
                    }`}
                    onClick={handleScheduleOption(i)}
                  >
                    Curso {p.horario} - {p.horasDeClase} horas/semana
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {(isGrid || isMobile) && priceOptions.length > 0 && (
          <div className="mt-4 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Selecciona una opción:
            </label>
            <Select
              value={String(selectedOptionIndex)}
              onValueChange={(val) => setSelectedOptionIndex(Number(val))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Elige una opción" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {priceOptions.map((p, i) => (
                  <SelectItem
                    key={i}
                    value={String(i)}
                    className="flex items-center gap-2 text-sm"
                  >
                    Curso {p.horario} - {p.horasDeClase}h/semana
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

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
          {!isMobile ? (
            <Image
              src={rewriteToCDN(school.logo)}
              alt="Logo"
              width={120}
              height={60}
              className="object-contain cursor-pointer"
              loading="lazy"
              placeholder="empty"
              onClick={handleShowSchool}
            />
          ) : null}

          <div className="mt-4 w-full flex flex-col items-center sm:items-end text-center sm:text-right space-y-2">
            <div className="flex flex-col sm:items-end">
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
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleShowSchool();
              }}
              className="w-full sm:w-auto bg-[#5371FF] hover:bg-[#FCCC02] hover:text-[#5371FF] text-white text-sm font-semibold rounded-md px-4 py-2 transition"
            >
              Ver escuela
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
