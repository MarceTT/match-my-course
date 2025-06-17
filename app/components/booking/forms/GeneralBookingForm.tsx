"use client";

import { useEffect, useState } from "react";
import { Reservation } from "@/types";
import { isValidCourse } from "@/lib/helpers/courseHelper";
import { Course } from "@/lib/constants/courses";
import { ReservationFormData } from "@/types/reservationForm";
import ScheduleSelect from "../fields/ScheduleSection";
import CoursePrice from "../fields/CoursePrice";
import InfoButton from "../fields/InfoButton";
import CourseSection from "../fields/CourseSelection";
import StartDatePicker from "../fields/StartDateSection";
import ReserveSection from "../fields/ReserveSection";
import StudyWeeksSection from "../fields/StudyWeeksSection";

interface FormProps {
  reservation: Reservation;
  formData: Partial<ReservationFormData>;
  onChangeFormData: (changes: Partial<ReservationFormData>) => void;
  onReserve: () => void;
}

export default function GeneralBookingForm({
  reservation,
  formData,
  onChangeFormData,
  onReserve
}: FormProps) {
  const { basePrice } = reservation;
  const [courseType, setCourseType] = useState<Course | undefined>(undefined);

  const weekOptions: { label: string; value: string }[] = [
    { label: "1 semana", value: "1" },
    { label: "2 semanas", value: "2" },
    { label: "4 semanas", value: "4" },
  ];

  useEffect(() => {
    if (reservation.course && isValidCourse(reservation.course)) {
      setCourseType(reservation.course);
    }
  }, [reservation.course]);

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-6">
        <CoursePrice amount={basePrice ?? 0} />
        <InfoButton onClick={() => console.log("Mostrar info")} />
      </div>
      <div className="space-y-4">
        <CourseSection
          basePrice={basePrice ?? 0}
          editable={true}
          selectedCourse={courseType}
          onChange={setCourseType}
          helperText="Pagando por reserva, te explicaremos cómo solicitar tu visa de estudio y trabajo"
        />
        <ScheduleSelect
          value={formData.schedule}
          onChange={(val) => onChangeFormData({ schedule: val })}
        />
        {formData.schedule && (
          <StudyWeeksSection
            value={formData.studyDuration}
            onChange={(val) => onChangeFormData({ studyDuration: val })}
            options={weekOptions}
          />
        )}
        {formData.schedule && formData.studyDuration && (
          <StartDatePicker
            value={formData.startDate}
            onChange={(date) => onChangeFormData({ startDate: date })}
          />
        )}
        <ReserveSection onReserve={onReserve} />
      </div>
    </div>
  );
}
