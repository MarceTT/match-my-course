// components/booking/forms/WorkAndStudyBookingForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdInfoOutline } from "react-icons/md";
import { Reservation } from "@/types";

interface FormProps {
  reservation: Reservation;
  onReserve: () => void;
}

export default function WorkAndStudyBookingForm({ reservation, onReserve }: FormProps) {
  // const [courseType, setCourseType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [schedule, setSchedule] = useState("pm");
  // const [studyDuration, setStudyDuration] = useState("");
  // const [examType, setExamType] = useState("");
  const [accomodationType, setAccomodationType] = useState("");

  console.log('WorkAndStudyBookingForm --> reservation: ', reservation)

  const { price } = reservation;

  return (
    <div className="border rounded-lg p-6 sticky top-4 border-gray-500 lg:top-32 mb-8 lg:mb-16 xl:mb-16">
      <div className="flex justify-between items-start mb-6">
        <div className="text-2xl font-bold">€{price}</div>
        <button className="text-gray-400 hover:text-gray-600 flex items-center">
          <span className="text-gray-400 text-xs mr-2">¿Qué incluye?</span>
          <MdInfoOutline className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">

        {/* Course */}
        <div>
          <div className="flex justify-between">
            <label className="block text-sm text-gray-600 mb-1">
              Curso
            </label>
            <div className="text-sm text-gray-900 mb-2 align-end font-semibold">
              €{price}
            </div>
          </div>
          <div className="text-sm text-gray-700 border px-4 py-2 rounded bg-gray-100 mb-2">
            Inglés general más trabajo (6 meses)
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Pagada tu reserva, te explicaremos cómo debes solicitar tu permiso de residencia de 8 meses.
          </p>
        </div>

        {/* Weeks */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Semanas a estudiar
          </label>
          <div className="text-sm text-gray-700 border px-4 py-2 rounded bg-gray-100 mb-2">
            25 semanas
          </div>
        </div>

        {/* Schedule */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Horario de clases
          </label>
          <Select value={schedule} onValueChange={setSchedule}>
            <SelectTrigger>
              <SelectValue placeholder="elegir" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="am">AM - 09:00 a 12:00</SelectItem>
              <SelectItem value="pm">PM - 13:00 a 16:00</SelectItem>
            </SelectContent>
          </Select>
          {(reservation.course == 'ingles-general-mas-sesiones-individuales') && (
            <p className="text-xs text-gray-500 mt-1">
              Esta clase cuenta con <strong>5 lecciones individuales</strong> a la semana
            </p>
          )}
        </div>

        {/* Course start */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Inicio de clases
          </label>
          <Select value={startDate} onValueChange={setStartDate}>
            <SelectTrigger>
              <SelectValue placeholder="elegir" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Martes 3 de Junio</SelectItem>
              <SelectItem value="1">Lunes 9 de Junio</SelectItem>
              <SelectItem value="2">Lunes 16 de Junio</SelectItem>
              <SelectItem value="3">Lunes 23 de Junio</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

        {/* Accomodation */}
        {startDate && (
          <div>
            {/* <div className="flex justify-between mb-2">
              <label className="block text-sm text-gray-600 mb-1">
                Alojamiento de la escuela para tus primeras semanas.
              </label>
              <span className="font-semibold">€200</span>
            </div> */}
            <div className="flex justify-between">
              <label className="block text-sm text-gray-600 mb-1">
                Alojamiento de la escuela para tus primeras semanas.
              </label>
              {/* <div className="text-sm text-gray-900 mb-2 align-end font-semibold">
                €200
              </div> */}
            </div>
            <div className="flex gap-2">
              <Select value={accomodationType} onValueChange={setAccomodationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Elegir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="si">Si</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              {/* <Select defaultValue="4">
                <SelectTrigger>
                  <SelectValue placeholder="semanas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 semana</SelectItem>
                  <SelectItem value="2">2 semanas</SelectItem>
                  <SelectItem value="4">4 semanas</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              El valor semanal de un alojamiento es de €250 - €350 euros semanales y 
              adicional al valor del curso de inglés.
            </p>
          </div>
        )}

        {/* Confirmación */}
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm mb-2">
            <span>Reserva</span>
            <span className="font-semibold">€200</span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            La parte que resta será pagada en destino.
          </p>
          <Button className="w-full bg-red-500 hover:bg-red-600" onClick={onReserve}>
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
}
