"use client";

import { useMemo } from "react";

const AnnouncementBanner = () => {
  // Banner de anuncio (controlable por ENV + rango de fechas)
  const announcementEnabled = (process.env.NEXT_PUBLIC_ANNOUNCEMENT_ENABLED || "false") === "true";
  const startStr = process.env.NEXT_PUBLIC_ANNOUNCEMENT_START; // ej: 2025-10-06
  const endStr = process.env.NEXT_PUBLIC_ANNOUNCEMENT_END;     // ej: 2025-10-08

  const isAnnouncementActive = useMemo(() => {
    if (!announcementEnabled) return false;
    const now = new Date();
    const parse = (s?: string) => {
      if (!s) return null as Date | null;
      const d = new Date(s);
      return isNaN(d.getTime()) ? null : d;
    };
    const end = parse(endStr);
    // Mostrar desde HOY hasta la fecha de fin (inclusive)
    if (end) {
      const endOfDay = new Date(end);
      endOfDay.setHours(23, 59, 59, 999);
      if (now > endOfDay) return false;
    }
    return true;
  }, [announcementEnabled, endStr]);

  if (!isAnnouncementActive) return null;

  return (
    <div className="w-full bg-[#66E24C] text-black">
      <div className="container mx-auto px-3 py-2 text-center text-sm md:text-base font-normal">
        <span className="font-black">Cyber Monday</span> - todos los cursos con <span className="font-black">€300 de descuento para reservas realizadas entre el 06, 07 y 08 de octubre </span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
