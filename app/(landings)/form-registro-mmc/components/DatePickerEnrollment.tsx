"use client"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerProps {
  date?: Date
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  showYearSelector?: boolean
  disabledDates?: (date: Date) => boolean
  fromDate?: Date
}


export function DatePickerEnrollment({
  date,
  onDateChange,
  placeholder = "Seleccione una fecha",
  disabled,
  showYearSelector = false,
  disabledDates,
  fromDate,
}: DatePickerProps) {
  const [month, setMonth] = useState<Date>(date || new Date())
  const [open, setOpen] = useState(false)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const handleYearChange = (year: string) => {
    const newDate = new Date(month)
    newDate.setFullYear(Number.parseInt(year))
    setMonth(newDate)
  }

  const handleMonthChange = (monthIndex: string) => {
    const newDate = new Date(month)
    newDate.setMonth(Number.parseInt(monthIndex))
    setMonth(newDate)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateChange(selectedDate)
    if (selectedDate) {
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy", { locale: es }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {showYearSelector && (
          <div className="flex gap-2 p-3 border-b">
            <Select value={month.getMonth().toString()} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((monthName, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {monthName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={month.getFullYear().toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          locale={es}
          month={month}
          onMonthChange={setMonth}
          disabled={disabledDates}
          fromDate={fromDate}
        />
      </PopoverContent>
    </Popover>
  )
}
