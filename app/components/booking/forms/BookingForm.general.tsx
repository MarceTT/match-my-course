"use client";

import { Reservation } from "@/types";
import { CourseKey, isValidCourse } from "@/lib/helpers/courseHelper";
import { ReservationFormData } from "@/types/reservationForm";
import ScheduleSelect from "../fields/ScheduleSection";
import CoursePrice from "../fields/CoursePrice";
import InfoButton from "../fields/InfoButton";
import CourseSection from "../fields/CourseSelection";
import StartDatePicker from "../fields/StartDateSection";
import ReserveSection from "../fields/ReserveSection";
import StudyWeeksSection from "../fields/StudyWeeksSection";
import { CoursesInfo } from "@/lib/types/coursesInfo";
import { ScheduleInfo } from "@/lib/types/scheduleInfo";

interface FormProps {
  reservation: Reservation;
  courseInfo: CoursesInfo;
  scheduleInfo: ScheduleInfo;
  formData: Partial<ReservationFormData>;
  onChangeFormData: (changes: Partial<ReservationFormData>) => void;
  onReserve: () => void;
}

export default function GeneralBooking({
  reservation,
  courseInfo,
  scheduleInfo,
  formData,
  onChangeFormData,
  onReserve
}: FormProps) {
  
  const weekOptions = Array.from({ length: 36 }, (_, i) => {
    const weekNumber = i + 1;
    return {
      label: `${weekNumber} semana${weekNumber > 1 ? 's' : ''}`,
      value: weekNumber.toString(),
    };
  });

  const getCourseType = (): CourseKey | undefined => {
    return formData.courseType ?? (isValidCourse(reservation.courseKey) ? reservation.courseKey as CourseKey : undefined);
  };

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-6">
        <CoursePrice amount={reservation.basePrice ?? 0} />
        <InfoButton onClick={() => console.log("Mostrar info")} />
      </div>
      <div className="space-y-4">
        <CourseSection
          basePrice={reservation.basePrice ?? 0}
          bookingAmound={100}
          selectedCourse={getCourseType()}
          courseInfo={courseInfo}
          onChange={(courseType) => onChangeFormData({ courseType })}
          helperText="Pagando por reserva, te explicaremos cómo solicitar tu visa de estudio y trabajo"
        />
        <ScheduleSelect
          value={undefined}
          scheduleInfo={scheduleInfo}
          onChange={(val) => onChangeFormData({ schedule: val })}
          placeholder="Selecciona horario"
        />
        {/* {schedule && ( */}
          <StudyWeeksSection
            value={formData.studyDuration ?? reservation.weeks}
            onChange={(val) => onChangeFormData({ studyDuration: val })}
            options={weekOptions}
          />
        {/* )} */}
        {/* {schedule && formData.studyDuration && ( */}
          <StartDatePicker
            value={formData.startDate}
            onChange={(date) => onChangeFormData({ startDate: date })}
          />
        {/* )} */}
        <ReserveSection onReserve={onReserve} />
      </div>
    </div>
  );
}
