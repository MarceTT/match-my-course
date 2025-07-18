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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  reservation: Reservation | null;
  formData: Partial<ReservationFormData>;
  onNext: () => void;
}

export default function SummaryStepOne({ reservation, formData, onNext }: Props) {
  const courseKey = formData.courseType ?? reservation?.courseKey;
  const finalPrice = reservation?.total ?? reservation?.offer ?? reservation?.basePrice;
  const basePriceToShow = reservation?.basePrice ?? null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

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
      {/* Grid adaptable */}
      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        variants={fadeInUp}
      >
        <Item icon={<GraduationCap className="h-5 w-5 text-blue-600" />} label="Escuela" value={reservation?.schoolName} />
        <Item icon={<MapPin className="h-5 w-5 text-green-600" />} label="Ciudad" value={reservation?.city} />
        <Item icon={<GraduationCap className="h-5 w-5 text-purple-600" />} label="Curso" value={isValidCourse(courseKey) ? courseToLabelMap[courseKey] : "No seleccionado"} />
        <Item icon={<Clock className="h-5 w-5 text-orange-600" />} label="Modalidad" value={formData.schedule?.toUpperCase() ?? reservation?.schedule.toUpperCase()} />
        <Item icon={<Users className="h-5 w-5 text-indigo-600" />} label="Semanas de estudio" value={`${formData.studyDuration ?? reservation?.weeks} semanas`} />
        <Item icon={<Calendar className="h-5 w-5 text-teal-600" />} label="Inicio" value={formData.startDate ? format(formData.startDate, "PPP", { locale: es }) : "No seleccionado"} />
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

      {/* Precio final */}
      <motion.div
        className="bg-green-50 rounded-lg p-4"
        variants={fadeInUp}
      >
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Precio final</h3>
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-bold text-green-700">€{(finalPrice ?? 0).toLocaleString()}</span>
          {typeof basePriceToShow === "number" && typeof finalPrice === "number" && basePriceToShow > finalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">€{basePriceToShow.toLocaleString()}</span>
              <Badge className="ml-1 sm:ml-2 bg-green-100 text-green-800 text-xs">
                Ahorro de €{(basePriceToShow - finalPrice).toLocaleString()}
              </Badge>
            </>
          )}
        </div>
      </motion.div>

      {/* Gastos adicionales */}
      <motion.div
        className="bg-amber-50 border border-amber-200 rounded-lg p-4"
        variants={fadeInUp}
      >
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 mb-1 text-sm sm:text-base">Gastos adicionales</h4>
            <p className="text-xs sm:text-sm text-amber-700">Matrícula, materiales, examen de salida, seguro médico</p>
          </div>
        </div>
      </motion.div>

      {/* Botón de acción */}
      <motion.div className="pt-4" variants={fadeInUp}>
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base h-11 sm:h-12" onClick={onNext}>
          Siguiente
        </Button>
      </motion.div>
    </motion.div>
  );
}

function Item({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | number | null }) {
  return (
    <motion.div
      className="flex items-start gap-2 sm:gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-2 rounded-lg bg-gray-100 flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-medium text-gray-900 mb-0.5 text-sm sm:text-base">{label}</h4>
        <p className="text-gray-700 text-xs sm:text-sm">{value ?? "No disponible"}</p>
      </div>
    </motion.div>
  );
}
