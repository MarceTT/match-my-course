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

const BookingPannel = () => {
  const [courseType, setCourseType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  return (
    <div className="border rounded-lg p-6 sticky top-4 border border-gray-500 lg:top-32">
      <div className="flex justify-between items-start mb-6">
        <div className="text-2xl font-bold">€2.900</div>
        <button className="text-gray-400 hover:text-gray-600 flex items-center">
            <span className="text-gray-400 text-xs mr-2">Que incluye?</span>
          <MdInfoOutline className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
        <div className="flex justify-between">
          <label className="block text-sm text-gray-600 mb-1">Curso</label>
          <div className="text-sm text-gray-900 mb-2 align-end font-semibold">€2.900</div>
          </div>
          <Select value={courseType} onValueChange={setCourseType}>
            <SelectTrigger>
              <SelectValue placeholder="Inglés general - estudio + trabajo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">
                Inglés general - estudio + trabajo
              </SelectItem>
              <SelectItem value="intensive">Inglés intensivo</SelectItem>
              <SelectItem value="business">Inglés de negocios</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            Pagando por reserva, te explicaremos cómo debes solicitar tu visa de
            estudio y trabajo
          </p>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Inicio de clases
          </label>
          <Select value={startDate} onValueChange={setStartDate}>
            <SelectTrigger>
              <SelectValue placeholder="elegir" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next-monday">Próximo lunes</SelectItem>
              <SelectItem value="next-month">Próximo mes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
        <div className="flex justify-between mb-2">
          <label className="block text-sm text-gray-600 mb-1">
            Alojamiento
          </label>
          <span className="font-semibold">€200</span>
        </div>
          <div className="flex gap-2">
            <Select value={duration} onValueChange={setDuration}>
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

        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm mb-2">
            <span>Reserva</span>
            <span className="font-semibold">€200</span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            La parte que resta será pagada en destino
          </p>
          <Button className="w-full bg-red-500 hover:bg-red-600">
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingPannel;
