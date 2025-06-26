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
import { WeeksBySchoolInfo } from "@/lib/types/weeksBySchoolInfo";

interface FormProps {
  reservation: Reservation | null;
  courseInfo: CoursesInfo;
  scheduleInfo: ScheduleInfo;
  weeksBySchoolInfo: WeeksBySchoolInfo;
  formData: Partial<ReservationFormData>;
  onUpdateReservation: (updatedData: Partial<ReservationFormData>) => void;
  onChangeFormData: (changes: Partial<ReservationFormData>) => void;
  onReserve: () => void;
}

export default function GeneralBooking({
  reservation,
  courseInfo,
  scheduleInfo,
  weeksBySchoolInfo,
  formData,
  onUpdateReservation,
  onChangeFormData,
  onReserve
}: FormProps) {
  const getCourseType = (): CourseKey | undefined => {
    return formData.courseType ?? (isValidCourse(reservation?.courseKey) ? reservation.courseKey as CourseKey : undefined);
  };
  const helperText = "Pagando por reserva, te explicaremos cómo solicitar tu visa de estudio y trabajo";

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-6">
        <CoursePrice amount={reservation?.total ?? 0} />
        <InfoButton onClick={() => console.log("Mostrar info")} />
      </div>
      <div className="space-y-4">
        <CourseSection
          basePrice={reservation?.total ?? 0}
          bookingAmound={100}
          selectedCourse={getCourseType()}
          courseInfo={courseInfo}
          onChange={(courseType) => {
            onChangeFormData({ courseType })
            onUpdateReservation({ courseType });
          }}
          helperText={helperText}
        />
        <ScheduleSelect
          value={formData.schedule ?? reservation?.specificSchedule ?? undefined}
          scheduleInfo={scheduleInfo}
          onChange={(schedule) => {
            onChangeFormData({ schedule })
            onUpdateReservation({ schedule });
          }}
        />
        {/* {schedule && ( */}
          <StudyWeeksSection
            value={formData.studyDuration ?? reservation?.weeks ?? undefined}
            weeksBySchoolInfo={weeksBySchoolInfo}
            onChange={(studyDuration) => {
              onChangeFormData({ studyDuration }); // sigue actualizando formData
              onUpdateReservation({ studyDuration }); // actualiza la reserva directamente
            }}
          />
        {/* )} */}
        {/* {schedule && formData.studyDuration && ( */}
          <StartDatePicker
            value={formData.startDate}
            onChange={(startDate) => {
              onChangeFormData({ startDate });
              onUpdateReservation({ startDate });
            }}
          />
        {/* )} */}
        <ReserveSection onReserve={onReserve} />
      </div>
    </div>
  );
}
