"use client";

import { Reservation } from "@/types";
import { ReservationFormData } from "@/types/reservationForm";
import ScheduleSelect from "../fields/ScheduleSection";
import CoursePrice from "../fields/CoursePrice";
import StartDatePicker from "../fields/StartDateSection";
import ReserveSection from "../fields/ReserveSection";
import AccommodationSection from "../fields/AccomodationSection";
import CourseSection from "../fields/CourseSelection";
import { ScheduleInfo } from "@/lib/types/scheduleInfo";
import { CoursesInfo } from "@/lib/types/coursesInfo";
import { CourseKey, isValidCourse } from "@/lib/helpers/courseHelper";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ContactButtonWhatsApp from "./ContactButtonWhatsApp";
import { sendGTMEvent } from "@/app/lib/gtm";

interface FormProps {
  reservation: Reservation | null;
  scheduleInfo: ScheduleInfo;
  courseInfo: CoursesInfo;
  formData: Partial<ReservationFormData>;
  onUpdateReservation: (updatedData: Partial<ReservationFormData>) => void;
  onChangeFormData: (changes: Partial<ReservationFormData>) => void;
  onChangeTypeOfCourse: (updatedData: Partial<ReservationFormData>) => void;
  onReserve: () => void;
  href?: string;
  disabled?: boolean;
  schoolId?: string;
}

// Función para convertir cualquier fecha a string (DD-MM-YYYY)
function normalizeDate(date: string | Date | undefined): string | null {
  if (!date) return null;
  if (typeof date === "string") return date;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function WorkAndStudyBooking({
  formData,
  onChangeFormData,
  onReserve,
  onUpdateReservation,
  onChangeTypeOfCourse,
  reservation,
  scheduleInfo,
  courseInfo,
  disabled,
  schoolId,
}: FormProps) {
  const [step, setStep] = useState<1 | 2>(1);

  const getCourseType = (): CourseKey | undefined => {
    return (
      formData.courseType ??
      (isValidCourse(reservation?.courseKey)
        ? (reservation.courseKey as CourseKey)
        : undefined)
    );
  };

  const bookingAmound = 100;
  const helperText =
    "Pagada tu reserva, te explicaremos cómo debes solicitar tu permiso de residencia de 8 meses";

  const priceText = (
    <>
      Válido para reservas hechas hasta el{" "}
      <span className="underline text-blue-600 font-semibold">
        {reservation?.fechaLimiteReserva}
      </span>
      , con inicio de clases antes del{" "}
      <span className="underline text-blue-600 font-semibold">
        {reservation?.fechaTerminoReserva}
      </span>
    </>
  );

  const amount = reservation?.precioBruto
    ? parseFloat(reservation.precioBruto)
    : 0;
  const offer = reservation?.ofertaBruta
    ? parseFloat(reservation.ofertaBruta)
    : undefined;
  const typeCourse = "Work";

  const oferta = Number(reservation?.ofertaBruta);
  const precio = Number(reservation?.precioBruto);

  const baseMonto = oferta > 0 ? oferta : precio;

  const pendingToPay = "Pendiente por pagar";
  const notes = ["Con tu reserva aseguras tu cupo y tu matricula."];
  const restaMonto = 100;
  const totalPagar = baseMonto - restaMonto;
  const reserveLabel = "Reserva ahora con solo";

  useEffect(() => {
    if (
      reservation?.specificSchedule &&
      formData.schedule !== reservation.specificSchedule
    ) {
      onChangeFormData({ schedule: reservation.specificSchedule });
    }
  }, [reservation?.specificSchedule, formData.schedule, onChangeFormData]);

  console.log("formData", formData);
  console.log("reservation", reservation);

  const handleContinueClick = () => {
    if (reservation?.schoolName === "University of Limerick Language Centre") {
      sendGTMEvent("click_whatsapp_limerick_ad");
    }

    onChangeFormData({
      schoolName: reservation?.schoolName,
      totalPrice: parseFloat(reservation?.precioBruto || "0") || 0,
      offerPrice: parseFloat(reservation?.ofertaBruta || "0") || 0,
    });
    //setStep(2);\
    onReserve();
  };

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-3">
        <CoursePrice
          amount={amount}
          offer={offer}
          htmlText={priceText}
          type={typeCourse}
        />
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
            <div className="flex justify-between">
              <label className="block text-sm text-gray-600">Curso</label>
            </div>
            <CourseSection
              selectedCourse={getCourseType()}
              courseInfo={courseInfo}
              onChange={(courseType) => {
                onChangeFormData({ courseType });
                onChangeTypeOfCourse({ courseType });
              }}
              helperText={helperText}
              disabled={disabled}
            />
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Semanas a estudiar
              </label>
              <div className="text-sm text-gray-700 border px-4 py-2 rounded bg-gray-100 mb-1">
                25 semanas
              </div>
            </div>
            <ScheduleSelect
              value={
                formData.schedule ?? reservation?.specificSchedule ?? undefined
              }
              scheduleInfo={{
                ...scheduleInfo,
                // Si no hay horarios disponibles pero hay specificSchedule, usarlo como opción
                list: scheduleInfo.list && scheduleInfo.list.length > 0
                  ? scheduleInfo.list
                  : reservation?.specificSchedule
                  ? [{ horario: reservation.specificSchedule, precioMinimo: 0 }]
                  : []
              }}
              onChange={(schedule) => {
                onChangeFormData({ schedule });
                onUpdateReservation({ schedule });
              }}
              placeholder="Selecciona horario"
              disabled={disabled}
            />

            {/* <div>
              <hr className="my-2 border-gray-300 mb-4" />
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-500 italic">
                  {reserveLabel}
                </span>
                <span className="text-xl font-bold text-[#1F2937]">
                  €{restaMonto}
                </span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <p className="text-sm text-gray-500 mb-2 font-semibold italic">
                  {pendingToPay}
                </p>
                <p className="text-xl font-bold text-[#1F2937]">
                  €{totalPagar}
                </p>
              </div>
              {notes.map((text, index) => (
                <p key={index} className="text-xs text-gray-500 mb-4 italic">
                  {text}
                </p>
              ))}
            </div> */}

            <div className="mt-4 flex flex-row gap-1 items-stretch">
              <Button
                onClick={handleContinueClick}
                className="flex-1 basis-0 min-w-0 bg-[#FF385C] hover:bg-[#E51D58] text-white px-2 py-2 rounded font-semibold inline-flex items-center justify-center gap-2 group transition-all text-[11px] sm:text-sm md:text-base leading-tight text-center whitespace-normal break-words"
              >
                <span className="text-center">Más Información</span>
                {/* <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" /> */}
              </Button>
              <ContactButtonWhatsApp
                reservation={reservation!}
                className="flex-1 basis-0 min-w-0 px-2 py-2 text-[11px] sm:text-sm md:text-base leading-tight text-center whitespace-normal break-words"
              />
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {!disabled && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors duration-150"
              >
                ← Volver al paso anterior
              </button>
            )}
            <StartDatePicker
              value={formData.startDate}
              onChange={(date) => {
                onChangeFormData({ startDate: date });
              }}
              disabled={disabled}
            />

            {/* Aviso si la fecha seleccionada supera la fecha límite */}
            {(() => {
              const startStr = normalizeDate(formData.startDate);
              const limitStr = normalizeDate(reservation?.fechaTerminoReserva);
              if (!startStr || !limitStr) return null;

              const [d1, m1, y1] = startStr.split("-");
              const [d2, m2, y2] = limitStr.split("-");
              const start = new Date(`${y1}-${m1}-${d1}T00:00:00`);
              const limit = new Date(`${y2}-${m2}-${d2}T00:00:00`);

              if (start > limit) {
                return (
                  <p className="text-xs text-red-700 italic">
                    *Fecha seleccionada no aplica para la oferta
                  </p>
                );
              }
              return null;
            })()}

            <AccommodationSection
              value={formData.accommodation}
              onChange={(val) => onChangeFormData({ accommodation: val })}
              disabled={disabled}
            />

            <ReserveSection
              onReserve={onReserve}
              disabled={disabled}
              reservation={{
                total: Number(reservation?.precioBruto) ?? 0,
                offer: Number(reservation?.ofertaBruta) ?? 0,
              }}
              reservationData={reservation!}
              horizontalButtons
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
