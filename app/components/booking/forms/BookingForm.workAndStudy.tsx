"use client";

import { Reservation } from "@/types";
import { ReservationFormData } from "@/types/reservationForm";
import ScheduleSelect from "../fields/ScheduleSection";
import CoursePrice from "../fields/CoursePrice";
import InfoButton from "../fields/InfoButton";
import StartDatePicker from "../fields/StartDateSection";
import ReserveSection from "../fields/ReserveSection";
import AccommodationSection from "../fields/AccomodationSection";

interface FormProps {
  reservation: Reservation;
  formData: Partial<ReservationFormData>;
  onChangeFormData: (changes: Partial<ReservationFormData>) => void;
  onReserve: () => void;
}

export default function WorkAndStudyBooking({
  reservation,
  formData,
  onChangeFormData,
  onReserve,
}: FormProps) {
  const { basePrice, course, schedule } = reservation;

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-6">
        <CoursePrice amount={basePrice ?? 0} />
        <InfoButton onClick={() => console.log("Mostrar info")} />
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between">
            <label className="block text-sm text-gray-600 mb-1">
              Curso
            </label>
            <div className="text-sm text-gray-900 mb-2 font-semibold">€{basePrice}</div>
          </div>
          <div className="text-sm text-gray-700 border px-4 py-2 rounded bg-gray-100 mb-2">
            {course}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Pagada tu reserva, te explicaremos cómo debes solicitar tu permiso de residencia de 8 meses.
          </p>
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
          value={schedule?.toLowerCase() as "am" | "pm" | undefined}
          onChange={(val) => onChangeFormData({ schedule: val })}
        />
        <StartDatePicker
          value={formData.startDate}
          onChange={(date) => onChangeFormData({ startDate: date })}
        />
        {formData.startDate && (
          <AccommodationSection
            value={formData.accommodation}
            onChange={(val) => onChangeFormData({ accommodation: val })}
          />
        )}
        <ReserveSection onReserve={onReserve} />
      </div>
    </div>
  );
}
