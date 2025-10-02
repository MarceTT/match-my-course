"use client";

import { Reservation } from "@/types";
import { CourseKey, isValidCourse } from "@/lib/helpers/courseHelper";
import { ReservationFormData } from "@/types/reservationForm";
import ScheduleSelect from "../fields/ScheduleSection";
import CoursePrice from "../fields/CoursePrice";
import { FaWhatsapp } from "react-icons/fa";
import CourseSection from "../fields/CourseSelection";
import StartDatePicker from "../fields/StartDateSection";
import ReserveSection from "../fields/ReserveSection";
import StudyWeeksSection from "../fields/StudyWeeksSection";
import { CoursesInfo } from "@/lib/types/coursesInfo";
import { ScheduleInfo } from "@/lib/types/scheduleInfo";
import { WeeksBySchoolInfo } from "@/lib/types/weeksBySchoolInfo";
import AccommodationSection from "../fields/AccomodationSection";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactButtonWhatsApp from "./ContactButtonWhatsApp";

interface FormProps {
  reservation: Reservation | null;
  courseInfo: CoursesInfo;
  scheduleInfo: ScheduleInfo;
  weeksBySchoolInfo: WeeksBySchoolInfo;
  formData: Partial<ReservationFormData>;
  onUpdateReservation: (updatedData: Partial<ReservationFormData>) => void;
  onChangeTypeOfCourse: (updatedData: Partial<ReservationFormData>) => void;
  onChangeFormData: (changes: Partial<ReservationFormData>) => void;
  onReserve: () => void;
  disabled?: boolean;
}

export default function GeneralBooking({
  courseInfo,
  formData,
  onChangeFormData,
  onReserve,
  onUpdateReservation,
  onChangeTypeOfCourse,
  reservation,
  scheduleInfo,
  weeksBySchoolInfo,
  disabled,
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
    "Pagada tu reserva, tendrás acceso a todos nuestros beneficios";
  const priceText =
    "El precio no incluye matrícula ni materiales(para todos los otros cursos)";
  const typeCourse = "General";

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-6">
        <CoursePrice
          amount={reservation?.total ?? 0}
          text={priceText}
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
              {/* <div className="text-sm text-gray-900 font-semibold">
                €{(reservation?.total ?? 0) - bookingAmound}
              </div> */}
            </div>
            <CourseSection
              selectedCourse={getCourseType()}
              courseInfo={courseInfo}
              onChange={(courseType) => {
                onChangeFormData({ courseType });
                // onUpdateReservation({ courseType });
                onChangeTypeOfCourse({ courseType });
              }}
              helperText={helperText}
              disabled={disabled}
            />
            <ScheduleSelect
              value={
                formData.schedule ?? reservation?.specificSchedule ?? undefined
              }
              scheduleInfo={scheduleInfo}
              onChange={(schedule) => {
                onChangeFormData({ schedule });
                onUpdateReservation({ schedule });
              }}
              disabled={disabled}
            />
            <StudyWeeksSection
              value={formData.studyDuration ?? reservation?.weeks ?? undefined}
              weeksBySchoolInfo={weeksBySchoolInfo}
              onChange={(studyDuration) => {
                onChangeFormData({ studyDuration }); // sigue actualizando formData
                onUpdateReservation({ studyDuration }); // actualiza la reserva directamente
              }}
              disabled={disabled}
            />
            <div className="mt-4 flex flex-row gap-1 items-stretch">
              <Button
                onClick={() => setStep(2)}
                className="flex-1 basis-0 min-w-0 bg-[#FF385C] hover:bg-[#E51D58] text-white px-2 py-2 rounded font-semibold inline-flex items-center justify-center gap-2 group transition-all text-[11px] sm:text-sm md:text-base leading-tight text-center whitespace-normal break-words"
              >
                <span className="text-center">Continuar</span>
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
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
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 text-sm text-blue-600 underline hover:text-blue-800 transition-colors duration-150"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al paso anterior
            </button>

            <StartDatePicker
              value={formData.startDate}
              onChange={(startDate) => {
                onChangeFormData({ startDate });
              }}
              disabled={disabled}
            />

            <AccommodationSection
              value={formData.accommodation}
              onChange={(val) => onChangeFormData({ accommodation: val })}
              disabled={disabled}
            />
            <ReserveSection
              onReserve={onReserve}
              disabled={disabled}
              reservation={{
                total: reservation?.total ?? 0,
                offer: reservation?.offer ?? 0,
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
