"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types";
import { ReservationFormData } from "@/types/reservationForm";
import { courseToLabelMap, isValidCourse } from "@/lib/helpers/courseHelper";
import {
  GraduationCap,
  MapPin,
  Clock,
  Users,
  Calendar,
  Home,
  AlertCircle,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface Props {
  reservation: Reservation | null;
  formData: Partial<ReservationFormData & { finalPrice?: number }>;
  onNext: () => void;
}

function normalizeDate(date: string | Date | undefined): Date | null {
  if (!date) return null;

  if (date instanceof Date) return isNaN(date.getTime()) ? null : date;

  const cleaned = date.replace(/[./]/g, "-");
  const parts = cleaned.split("-");

  if (parts.length === 3) {
    if (parts[0].length === 4) {
      const [y, m, d] = parts;
      const parsed = new Date(`${y}-${m}-${d}T00:00:00`);
      return isNaN(parsed.getTime()) ? null : parsed;
    } else {
      const [d, m, y] = parts;
      const parsed = new Date(`${y}-${m}-${d}T00:00:00`);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
  }
  return null;
}

export default function SummaryStepOne({ reservation, formData, onNext }: Props) {
  const courseKey = formData.courseType ?? reservation?.courseKey;

  const basePrice = reservation?.basePrice ?? 0;
  const offerPrice = reservation?.offer && reservation.offer > 0 ? reservation.offer : basePrice;

  let finalPrice = formData.finalPrice ?? offerPrice;
  let finalBasePrice = basePrice;

  // Detectar si es curso de 25 semanas (normalizando texto)
  const isWorkStudy =
    reservation?.course
      ?.toLowerCase()
      .replace(/á/g, "a")
      .includes("programa de estudios y trabajo");

  // Normalizamos fechas
  const fechaInicio = normalizeDate(formData.startDate);
  const fechaLimite = normalizeDate(reservation?.fechaTerminoReserva);

  // Promoción válida
  const promoAplica =
    reservation?.offer &&
    reservation.offer > 0 &&
    fechaInicio instanceof Date &&
    fechaLimite instanceof Date &&
    fechaInicio <= fechaLimite;

  // Recargo de 200€ si es curso de 25 semanas y empieza en 2027
  if (isWorkStudy && fechaInicio instanceof Date && fechaInicio.getFullYear() === 2027) {
    finalPrice += 200;
    finalBasePrice += 200;
  }

  const discount = finalBasePrice > finalPrice ? finalBasePrice - finalPrice : 0;
  const hasOffer = discount > 0;

  const semanas =
    formData.studyDuration ??
    (isWorkStudy ? 25 : reservation?.weeks ?? 0);

  const formattedFechaTermino =
    reservation?.fechaTerminoReserva &&
    new Date(reservation.fechaTerminoReserva).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  // Debug para verificar
  console.log("Curso:", reservation?.course);
  console.log("Es de 25 semanas?", isWorkStudy);
  console.log("Fecha inicio:", fechaInicio);
  console.log("Precio final:", finalPrice);

  return (
    <motion.div
      className="space-y-5 sm:space-y-6 p-4 sm:p-0"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Detalles */}
      <motion.div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4" variants={fadeInUp}>
        <Item icon={<GraduationCap className="h-5 w-5 text-blue-600" />} label="Escuela" value={reservation?.schoolName} />
        <Item icon={<MapPin className="h-5 w-5 text-green-600" />} label="Ciudad" value={reservation?.city} />
        <Item
          icon={<GraduationCap className="h-5 w-5 text-purple-600" />}
          label="Curso"
          value={isValidCourse(courseKey) ? courseToLabelMap[courseKey] : "No seleccionado"}
        />
        <Item
          icon={<Clock className="h-5 w-5 text-orange-600" />}
          label="Modalidad"
          value={
            reservation?.specificSchedule ??
            formData.schedule?.toUpperCase() ??
            reservation?.schedule?.toUpperCase() ??
            "No disponible"
          }
        />
        <Item icon={<Users className="h-5 w-5 text-indigo-600" />} label="Semanas de estudio" value={`${semanas} semanas`} />
        <Item
          icon={<Calendar className="h-5 w-5 text-teal-600" />}
          label="Inicio"
          value={fechaInicio ? format(fechaInicio, "PPP", { locale: es }) : "No seleccionado"}
        />
        {formData.accommodation && (
          <Item
            icon={<Home className="h-5 w-5 text-gray-600" />}
            label="Alojamiento"
            value={
              formData.accommodation === "posterior"
                ? "Lo veo más adelante"
                : formData.accommodation === "si"
                ? "Sí"
                : formData.accommodation === "no"
                ? "No"
                : undefined
            }
          />
        )}
      </motion.div>

      {/* Precio */}
      <motion.div className="rounded-lg p-4 relative bg-green-50" variants={fadeInUp} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {promoAplica ? (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Precio final</h3>
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
                <Badge className="flex items-center gap-1 bg-green-100 text-green-800 text-xs hover:bg-green-200 hover:text-green-900">
                  <Tag className="h-3 w-3" /> OFERTA
                </Badge>
              </motion.div>
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-green-700">€{finalPrice.toLocaleString("es-ES")}</span>
              <span className="text-sm text-gray-500 line-through">€{finalBasePrice.toLocaleString("es-ES")}</span>
              <Badge className="ml-1 sm:ml-2 bg-green-100 text-green-800 text-xs hover:bg-green-200 hover:text-green-900">
                Ahorro de €{discount.toLocaleString("es-ES")}
              </Badge>
            </div>
          </div>
        ) : hasOffer ? (
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-gray-800">€{finalBasePrice.toLocaleString("es-ES")}</span>
            <p className="mt-2 text-sm text-red-600 font-medium">
              La oferta no aplica porque el inicio de clases es posterior a la fecha límite de la promoción
              {formattedFechaTermino ? ` (${formattedFechaTermino})` : ""}.
            </p>
          </div>
        ) : (
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-gray-800">€{finalBasePrice.toLocaleString("es-ES")}</span>
          </div>
        )}
      </motion.div>

      {/* Info extra */}
      <motion.div className="bg-amber-50 border border-amber-200 rounded-lg p-4" variants={fadeInUp}>
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 mb-1 text-sm sm:text-base">
              El precio incluye curso de inglés, materiales, examen de salida, seguro médico, seguro PEL y matrícula.
            </h4>
          </div>
        </div>
      </motion.div>

      <motion.div className="pt-4" variants={fadeInUp}>
        <Button className="w-full bg-[#FF385C] hover:bg-[#E51D58] text-white text-sm sm:text-base h-11 sm:h-12" onClick={onNext}>
          Siguiente
        </Button>
      </motion.div>
    </motion.div>
  );
}

function Item({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | number | null }) {
  return (
    <motion.div className="flex items-start gap-2 sm:gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="p-2 rounded-lg bg-gray-100 flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-medium text-gray-900 mb-0.5 text-sm sm:text-base">{label}</h4>
        <p className="text-gray-700 text-xs sm:text-sm">{value ?? "No disponible"}</p>
      </div>
    </motion.div>
  );
}
