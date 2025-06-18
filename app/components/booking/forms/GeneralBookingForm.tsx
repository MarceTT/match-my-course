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
  const { basePrice, schedule, weeks } = reservation;
  console.log('schedule', schedule)
  const [courseType, setCourseType] = useState<Course | undefined>(undefined);
  
  const weekOptions = Array.from({ length: 36 }, (_, i) => {
    const weekNumber = i + 1;
    return {
      label: `${weekNumber} semana${weekNumber > 1 ? 's' : ''}`,
      value: weekNumber.toString(),
    };
  });

  useEffect(() => {
    if (reservation.courseKey && isValidCourse(reservation.courseKey)) {
      setCourseType(reservation.courseKey);
    }
  }, [reservation.courseKey]);

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-6">
        <CoursePrice amount={basePrice ?? 0} />
        <InfoButton onClick={() => console.log("Mostrar info")} />
      </div>
      <div className="space-y-4">
        <CourseSection
          basePrice={basePrice ?? 0}
          selectedCourse={courseType}
          onChange={setCourseType}
          helperText="Pagando por reserva, te explicaremos cómo solicitar tu visa de estudio y trabajo"
        />
        <ScheduleSelect
          value={schedule?.toLowerCase() as "am" | "pm" | undefined}
          onChange={(val) => onChangeFormData({ schedule: val })}
        />
        {schedule && (
          <StudyWeeksSection
            value={weeks}
            onChange={(val) => onChangeFormData({ studyDuration: val })}
            options={weekOptions}
          />
        )}
        {schedule && formData.studyDuration && (
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
