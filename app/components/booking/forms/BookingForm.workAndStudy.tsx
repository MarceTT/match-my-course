"use client";

import { Reservation } from "@/types";
import { ReservationFormData } from "@/types/reservationForm";
import ScheduleSelect from "../fields/ScheduleSection";
import CoursePrice from "../fields/CoursePrice";
import StartDatePicker from "../fields/StartDateSection";
import ReserveSection from "../fields/ReserveSection";
import AccommodationSection from "../fields/AccomodationSection";
import { ScheduleInfo } from "@/lib/types/scheduleInfo";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FormProps {
  reservation: Reservation | null;
  scheduleInfo: ScheduleInfo;
  formData: Partial<ReservationFormData>;
  onUpdateReservation: (updatedData: Partial<ReservationFormData>) => void;
  onChangeFormData: (changes: Partial<ReservationFormData>) => void;
  onReserve: () => void;
  href?: string;
  disabled?: boolean;
}

export default function WorkAndStudyBooking({
  formData,
  onChangeFormData,
  onReserve,
  onUpdateReservation,
  reservation,
  scheduleInfo,
  disabled,
}: FormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const bookingAmound = 100;
  const helperText =
    "Pagada tu reserva, te explicaremos cómo debes solicitar tu permiso de residencia de 8 meses";

    const priceText = "El precio incluye, curso de inglés, materiales, examen de salida, seguro médico, seguro PEL y matrícula";

  const amount = reservation?.basePrice ?? 0;
  const offer = reservation?.offer ?? 0;

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-6">
        <CoursePrice amount={amount} offer={offer} text={priceText} />
        {/* <InfoButton onClick={() => console.log("Mostrar info")} /> */}
      </div>
      <div>
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <div className="flex justify-between">
                <label className="block text-sm text-gray-600 mb-1">
                  Curso
                </label>
                <div className="text-sm text-gray-900 mb-2 font-semibold">
                  €{offer - bookingAmound}
                </div>
              </div>
              <div className="text-sm text-gray-700 border px-4 py-2 rounded bg-gray-100 mb-2">
                {reservation?.course}
              </div>
              <p className="text-xs text-gray-500 mt-1">{helperText}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Semanas a estudiar
              </label>
              <div className="text-sm text-gray-700 border px-4 py-2 rounded bg-gray-100 mb-2">
                25 semanas
              </div>
            </div>
            <ScheduleSelect
              value={
                formData.schedule ?? reservation?.specificSchedule ?? undefined
              }
              scheduleInfo={scheduleInfo}
              onChange={(schedule) => {
                onChangeFormData({ schedule });
                onUpdateReservation({ schedule });
              }}
              placeholder="Selecciona horario"
              disabled={disabled}
            />
            <Button
              onClick={() => setStep(2)}
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold flex items-center justify-center group transition-all"
            >
              <span className="mr-2">Continuar con tu reserva</span>
              <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors duration-150"
            >
              ← Volver al paso anterior
            </button>
            <StartDatePicker
              value={formData.startDate}
              onChange={(date) => {
                onChangeFormData({ startDate: date });
              }}
              disabled={disabled}
            />

            <AccommodationSection
              value={formData.accommodation}
              onChange={(val) => onChangeFormData({ accommodation: val })}
              disabled={disabled}
            />

            <ReserveSection onReserve={onReserve} disabled={disabled} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
