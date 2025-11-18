"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerEbookProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean | ((date: Date) => boolean);
  fromDate?: Date;
  defaultMonth?: Date;
};

// DatePicker específico para ebook con formato dd/MM/yyyy y placeholder dd/mm/yyyy
export function DatePickerEbook({ value, onChange, disabled, fromDate, defaultMonth }: DatePickerEbookProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>(value ? format(value, "dd/MM/yyyy", { locale: es }) : "");

  React.useEffect(() => {
    setDate(value);
    setInputValue(value ? format(value, "dd/MM/yyyy", { locale: es }) : "");
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
    if (selectedDate) setOpen(false);
    setInputValue(selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : "");
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <div className="relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onClick={() => setOpen(true)}
            onBlur={() => {
              const s = inputValue.trim();
              const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
              if (m) {
                const dd = Number(m[1]);
                const mm = Number(m[2]);
                const yyyy = Number(m[3]);
                const d = new Date(yyyy, mm - 1, dd);
                if (!isNaN(d.getTime())) {
                  setDate(d);
                  onChange?.(d);
                  setInputValue(format(d, "dd/MM/yyyy", { locale: es }));
                }
              }
            }}
            placeholder="dd/mm/yyyy"
            className="pr-10 cursor-pointer"
          />
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Abrir calendario"
              className="absolute inset-y-0 right-0 px-2 flex items-center text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              <CalendarIcon className="h-4 w-4" />
            </button>
          </PopoverTrigger>
        </div>
        <PopoverContent side="bottom" align="start" className="w-auto p-0 z-[9999]">
          <Calendar
            locale={es}
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={disabled}
            fromDate={fromDate}
            defaultMonth={defaultMonth || date}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePickerEbook;
