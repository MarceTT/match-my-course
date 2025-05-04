"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, CalendarClock, Timer, MapPin, DollarSign, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SchoolDetails } from "@/app/types/index";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface SchoolFiltersModalProps {
  open: boolean;
  onClose: () => void;
  school: SchoolDetails;
  onApplyFilters: (schoolId: string, timeSlot: string, hours: number) => void;
  selectedCourse: string;
}

export default function SchoolFilterModal({
  open,
  onClose,
  school,
  onApplyFilters,
  selectedCourse,
}: SchoolFiltersModalProps) {
  const [timeSlot, setTimeSlot] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(0);

  const [timeOfDay, setTimeOfDay] = useState("AM");
  const [hours, setHours] = useState("4");
  const [price, setPrice] = useState(0);
  const [priceChanged, setPriceChanged] = useState(false);

  const calculatePrice = () => school.selectedPrice || 0;

  // Actualizar el precio cuando cambien los filtros
  useEffect(() => {
    const newPrice = calculatePrice();
    setPrice(newPrice);

    // Activar la animación de cambio de precio
    setPriceChanged(true);
    const timer = setTimeout(() => setPriceChanged(false), 500);

    return () => clearTimeout(timer);
  }, [timeOfDay, hours]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
      <DialogHeader className="pb-6 border-b">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg shadow-md border-2 border-primary/10 flex-shrink-0">
              <Image src={school.logo || "/placeholder.svg"} alt="Logo de la escuela" fill className="object-cover" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight">{school.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center sm:justify-start">
                <MapPin className="h-4 w-4 mr-1 text-primary/70" />
                <span className="font-medium">{school.city}</span>
                <span className="mx-2">•</span>
                <GraduationCap className="h-4 w-4 mr-1 text-primary/70" />
                <span>Centro acreditado</span>
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-2">
              <Badge variant="secondary" className="px-3 py-1 mt-4">
                <Clock className="h-3 w-3 mr-2" />
                Desde {school.description?.añoFundacion}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-2 mb-4">
          <h2 className="text-2xl font-bold text-center capitalize">
            {selectedCourse.replaceAll("-", " ")}
          </h2>
        </div>

        <div className="relative w-full h-[220px] rounded-lg overflow-hidden mb-4 cursor-pointer">
          <Image
            src={school.mainImage || "/placeholder.svg"}
            alt="Imagen principal"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors flex items-center justify-center">
            {/* <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Ver galería</span> */}
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-primary/10 rounded-lg p-6 border border-primary/20 text-center">
            <h3 className="text-lg font-medium mb-1">Precio mensual</h3>
            <div
              className={`text-4xl font-bold transition-all duration-300 text-blue-600 ${
                priceChanged ? "scale-110" : ""
              }`}
            >
              €{calculatePrice()}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Incluye material didáctico y acceso a plataforma online
            </p>
          </div>

          {/* Selectores en un div separado */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg border">
            <div>
              <p className="text-sm font-medium mb-2">Horario</p>
              <Select value={timeOfDay} onValueChange={setTimeOfDay}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar horario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">Mañana (AM)</SelectItem>
                  <SelectItem value="PM">Tarde (PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Horas de clases</p>
              <Select value={hours} onValueChange={setHours}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar horas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="11">11 horas</SelectItem>
                  <SelectItem value="14">14 horas</SelectItem>
                  <SelectItem value="15">15 horas</SelectItem>
                  <SelectItem value="16">16 horas</SelectItem>
                  <SelectItem value="17">17 horas</SelectItem>
                  <SelectItem value="18">18 horas</SelectItem>
                  <SelectItem value="20">20 horas</SelectItem>
                  <SelectItem value="22">22 horas</SelectItem>
                  <SelectItem value="23">23 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
