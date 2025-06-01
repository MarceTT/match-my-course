"use client";

import { useEffect, useState } from "react";
import { Star, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { useRouter, useSearchParams } from "next/navigation";
import { SchoolDetails } from "@/app/lib/types";
import { buildReservationQuery } from "@/lib/reservation";
import { Reservation } from "@/types";

export interface SchoolCardProps {
  school: SchoolDetails;
  viewType: "grid" | "list";
}

const SchoolCard = ({ school, viewType }: SchoolCardProps) => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const rating = Number(school.qualities?.ponderado ?? 0);
  const antiguedad = school.description?.añoFundacion
    ? new Date().getFullYear() - school.description.añoFundacion
    : null;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const priceOptions = (school.prices || []).filter((p) => typeof p.precio === "number" && p.precio > 0);

  const selected = priceOptions[selectedOptionIndex] ?? null;
  const hasDiscount = selected?.oferta && selected.oferta < selected.precio;

  const isGrid = viewType === "grid";
  const isMobile = useMediaQuery("(max-width: 640px)")

  const handleShowSchool = () => {
    const reservation: Reservation = {
      schoolId: school._id.toString(),
      course: searchParams.get("course")?.toString() ?? "",
      weeks: 25, // TODO: WIP
      schedule: "AM", // TODO: WIP
    };

    console.log('reservation: ', reservation);
    
    const query = buildReservationQuery(reservation);

    router.push(`/school-detail/${reservation.schoolId}?${query}`)
  }

  useEffect(() => {
    setSelectedOptionIndex(0);
  }, [school._id]);

  return (
    <motion.div className={`relative border bg-white shadow-sm hover:shadow-md transition-shadow rounded-lg p-4 ${isGrid ? "flex flex-col h-full justify-between" : "flex flex-col sm:flex-row"}`}>
      {hasDiscount && (
        <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-yellow-900 text-sm font-extrabold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
          <BadgePercent className="w-4 h-4" />
          Oferta activa
        </div>
      )}

      <div className={`${isGrid ? "h-48 w-full" : "lg:h-72 lg:w-72 sm:w-56 h-40"} overflow-hidden rounded-lg`}>
        <Image
          src={rewriteToCDN(school.mainImage)}
          alt={school.name}
          width={500}
          height={300}
          className="h-full w-full object-cover"
          loading="lazy"
          placeholder="empty"
        />
      </div>

      <div className={`flex flex-col justify-between ${isGrid ? "mt-4 flex-1" : "sm:ml-4 flex-1"}`}>
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold lg:text-xl">{school.name}</h3>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => {
                const full = i + 1 <= Math.floor(rating);
                const half = i + 0.5 === Math.round(rating * 2) / 2;
                return (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${full ? "fill-yellow-400" : half ? "fill-yellow-200" : "fill-gray-200"}`}
                  />
                );
              })}
              <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
          </div>

          {!isGrid && !isMobile && priceOptions.length > 0 && (
            <div className={`text-xs text-gray-700 text-right ${hasDiscount ? "mt-9" : ""}`}>
              <p className="font-semibold text-gray-800 underline mb-1">Opciones:</p>
              <ul className="space-y-1">
                {priceOptions.map((p, i) => (
                  <li
                    key={i}
                    className={`italic cursor-pointer ${selectedOptionIndex === i ? "font-bold text-blue-600" : "hover:text-blue-600"}`}
                    onClick={() => setSelectedOptionIndex(i)}
                  >
                    {p.horarioEspecifico}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-sm mt-2">
          <p className="font-semibold">Ciudad: <span className="text-gray-900">{school.city}</span></p>
          {antiguedad !== null && (
            <span className="inline-flex items-center text-sm px-2 py-1 rounded-full bg-gray-100 mt-1">
              {antiguedad < 2 ? "Nueva escuela" : `${antiguedad} años de trayectoria`}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          {!isMobile ? (
            <Image
              src={rewriteToCDN(school.logo)}
              alt="Logo"
              width={120}
              height={60}
              className="object-contain"
              loading="lazy"
              placeholder="empty"
            />
          ) : (
            priceOptions.length > 0 && (
              <div className="text-xs text-gray-700">
                <p className="font-semibold text-gray-800 underline mb-1">Opciones:</p>
                <ul className="space-y-1">
                  {priceOptions.map((p, i) => (
                    <li
                      key={i}
                      className={`italic cursor-pointer ${selectedOptionIndex === i ? "font-bold text-blue-600" : "hover:text-blue-600"}`}
                      onClick={() => setSelectedOptionIndex(i)}
                    >
                      {p.horarioEspecifico}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">
              {hasDiscount ? (
                <>
                  <div className="line-through text-sm text-gray-500">€{selected?.precio?.toLocaleString()}</div>
                  <div className="text-green-600 text-3xl font-extrabold">€{selected?.oferta?.toLocaleString()}</div>
                </>
              ) : (
                <span className="text-blue-600 text-4xl font-extrabold">€{selected?.precio?.toLocaleString()}</span>
              )}
            </div>
            <Button className="mt-2 bg-[#5371FF] hover:bg-[#4257FF] text-white" onClick={handleShowSchool}>
              Ver escuela
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SchoolCard;
