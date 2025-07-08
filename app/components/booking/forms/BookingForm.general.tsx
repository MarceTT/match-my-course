"use client";

import { Reservation } from "@/types";
import { CourseKey, isValidCourse } from "@/lib/helpers/courseHelper";
import { ReservationFormData } from "@/types/reservationForm";
import ScheduleSelect from "../fields/ScheduleSection";
import CoursePrice from "../fields/CoursePrice";
// import InfoButton from "../fields/InfoButton";
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
  onChangeTypeOfCourse: (updatedData: Partial<ReservationFormData>) => void;
  onChangeFormData: (changes: Partial<ReservationFormData>) => void;
  onReserve: () => void;
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
  weeksBySchoolInfo
}: FormProps) {
  const getCourseType = (): CourseKey | undefined => {
    return formData.courseType ?? (isValidCourse(reservation?.courseKey) ? reservation.courseKey as CourseKey : undefined);
  };
  const bookingAmound = 100;
  const helperText = "Pagando por reserva, te explicaremos cómo solicitar tu visa de estudio y trabajo";

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-6">
        <CoursePrice amount={reservation?.total ?? 0} />
        {/* <InfoButton onClick={() => console.log("Mostrar info")} /> */}
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between">
            <label className="block text-sm text-gray-600 mb-1">
              Curso
            </label>
            <div className="text-sm text-gray-900 mb-2 font-semibold">
              €{(reservation?.total ?? 0)  - bookingAmound}
            </div>
          </div>
          <CourseSection
            selectedCourse={getCourseType()}
            courseInfo={courseInfo}
            onChange={(courseType) => {
              onChangeFormData({ courseType })
              // onUpdateReservation({ courseType });
              onChangeTypeOfCourse({ courseType });
            }}
            helperText={helperText}
          />
        </div>
        <ScheduleSelect
          value={formData.schedule ?? reservation?.specificSchedule ?? undefined}
          scheduleInfo={scheduleInfo}
          onChange={(schedule) => {
            onChangeFormData({ schedule })
            onUpdateReservation({ schedule });
          }}
        />
        <StudyWeeksSection
          value={formData.studyDuration ?? reservation?.weeks ?? undefined}
          weeksBySchoolInfo={weeksBySchoolInfo}
          onChange={(studyDuration) => {
            onChangeFormData({ studyDuration }); // sigue actualizando formData
            onUpdateReservation({ studyDuration }); // actualiza la reserva directamente
          }}
        />
        <StartDatePicker
          value={formData.startDate}
          onChange={(startDate) => {
            onChangeFormData({ startDate });
          }}
        />
        <ReserveSection onReserve={onReserve} />
      </div>
    </div>
  );
}
