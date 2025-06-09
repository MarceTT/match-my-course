// components/booking/forms/GeneralBookingForm.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select as BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MdInfoOutline } from "react-icons/md";
import { Reservation } from "@/types";
import { Course, courseLabelToIdMap } from "@/lib/constants/courses";
import { isValidCourse } from "@/lib/helpers/courseHelper";
import { Select } from "@matchmycourse/components";

interface FormProps {
  reservation: Reservation;
  onReserve: () => void;
}

export default function GeneralBookingForm({ reservation, onReserve }: FormProps) {
  const [courseType, setCourseType] = useState<Course | undefined>(undefined);
  const [startDate, setStartDate] = useState("");
  const [schedule, setSchedule] = useState("pm");
  const [studyDuration, setStudyDuration] = useState("");

  const { basePrice, total } = reservation;

  useEffect(() => {
    if (reservation.course && isValidCourse(reservation.course)) {
      setCourseType(reservation.course);
    }
  }, [reservation.course]);

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-6">
        <div className="text-2xl font-bold">€{basePrice}</div>
        <button className="text-gray-400 hover:text-gray-600 flex items-center">
          <span className="text-gray-400 text-xs mr-2">¿Qué incluye?</span>
          <MdInfoOutline className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Curso */}
        <div>
          <div className="flex justify-between">
            <label className="block text-sm text-gray-600 mb-1">Curso</label>
            <div className="text-sm text-gray-900 mb-2 align-end font-semibold">€{total}</div>
          </div>
          <Select<Course>
            options={courseLabelToIdMap}
            value={courseType}
            onChange={(id) => setCourseType(id)}
            placeholder="Seleccionar curso"
          />
          <p className="text-xs text-gray-500 mt-1">
            Pagando por reserva, te explicaremos cómo solicitar tu visa de estudio y trabajo
          </p>
        </div>

        {/* Schedule */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Horario de clases</label>
          <BaseSelect value={schedule} onValueChange={setSchedule}>
            <SelectTrigger>
              <SelectValue placeholder="elegir" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="am">AM - 09:00 a 12:00</SelectItem>
              <SelectItem value="pm">PM - 13:00 a 16:00</SelectItem>
            </SelectContent>
          </BaseSelect>
          {(reservation.course == 'ingles-general-mas-sesiones-individuales') && (
            <p className="text-xs text-gray-500 mt-1">
              Esta clase cuenta con <strong>5 lecciones individuales</strong> a la semana
            </p>
          )}
        </div>

        {/* Weeks */}
        {schedule && (
          <div>
            <label className="block text-sm text-gray-600 mb-2">Semanas a estudiar</label>
            <BaseSelect value={studyDuration} onValueChange={setStudyDuration}>
              <SelectTrigger>
                <SelectValue placeholder="elegir" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 semana</SelectItem>
                <SelectItem value="2">2 semanas</SelectItem>
                <SelectItem value="4">4 semanas</SelectItem>
              </SelectContent>
            </BaseSelect>
          </div>
        )}

        {/* Course start */}
        {schedule && studyDuration && (
          <div>
            <label className="block text-sm text-gray-600 mb-2">Inicio de clases</label>
            <BaseSelect value={startDate} onValueChange={setStartDate}>
              <SelectTrigger>
                <SelectValue placeholder="elegir" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next-monday">Próximo lunes</SelectItem>
                <SelectItem value="next-month">Próximo mes</SelectItem>
              </SelectContent>
            </BaseSelect>
          </div>
        )}

        {/* Examen de salida */}
        {/* {schedule && studyDuration && startDate && (
          <div>
            <label className="block text-sm text-gray-600 mb-2">Examen de salida</label>
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger>
                <SelectValue placeholder="elegir" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ielts">IELTS</SelectItem>
                <SelectItem value="cambridge">Cambridge</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )} */}

        {/* Alojamiento */}
        {/* {schedule && startDate && (
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm text-gray-600 mb-1">Alojamiento</label>
              <span className="font-semibold">€200</span>
            </div>
            <div className="flex gap-2">
              <Select value={hostType} onValueChange={setHostType}>
                <SelectTrigger>
                  <SelectValue placeholder="elegir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="homestay">Familia</SelectItem>
                  <SelectItem value="residence">Residencia</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="4">
                <SelectTrigger>
                  <SelectValue placeholder="semanas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 semana</SelectItem>
                  <SelectItem value="2">2 semanas</SelectItem>
                  <SelectItem value="4">4 semanas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )} */}

        {/* Confirmación */}
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm mb-2">
            <span>Reserva</span>
            <span className="font-semibold">€200</span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            La parte que resta será pagada en destino.
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Es parte del valor total que pagaras.
          </p>
          <Button className="w-full bg-red-500 hover:bg-red-600" onClick={onReserve}>
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
}
