"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  /**
   * Fecha actualmente seleccionada (controlada externamente si se desea).
   */
  value?: Date;

  /**
   * Callback que se ejecuta cuando se selecciona una fecha.
   */
  onChange?: (date: Date | undefined) => void;

  /**
   * Función que define qué fechas deben estar deshabilitadas.
   */
  disabled?: boolean | ((date: Date) => boolean);
};

/**
 * Componente de selector de fecha con Popover y calendario.
 * 
 * Características:
 * - Permite seleccionar una fecha única.
 * - Admite deshabilitar fechas específicas mediante `disabled`.
 * - Se cierra automáticamente al seleccionar una fecha válida.
 * - Localizado en español (`date-fns/locale/es`).
 */
export function DatePicker({ value, onChange, disabled }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
    if (selectedDate) setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date
            ? format(date, "PPP", { locale: es })
            : <span>Selecciona una fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={es}
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}
