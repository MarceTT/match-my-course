"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CustomCountrySelect } from "@/app/shared";
import { countries } from "@/lib/constants/countries";
import { parseDDMMYYYY, ReservationFormData } from "@/types/reservationForm";
import { UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import professionalLevel from "./service/professionalLevel";
import levelEnglish from "./service/levelEnglish";
import respaldoEconomico from "./service/respaldoEconomico";
import inicioCurso from "./service/inicioCurso";
import DatePickerEbook from "@/components/common/DatePickerEbook";
import { formatDate } from "date-fns";
import StartDatePicker from "../fields/StartDateSection";
import { Reservation } from "@/types/reservation";
import { useEffect } from "react";

type ContactStepProps = {
  form: UseFormReturn<ReservationFormData>;
  onSubmit: (data: ReservationFormData) => void;
  onBack: () => void;
  disabled?: boolean;
  reservation: Reservation | null;
  formData: Partial<ReservationFormData>;
};

function normalizeDate(date: string | Date | undefined): string | null {
  if (!date) return null;
  if (typeof date === "string") return date;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function SummaryStepTwo({
  form,
  onSubmit,
  onBack,
  disabled,
  reservation,
  formData,
}: ContactStepProps) {
  const isWorkAndStudy = reservation?.course?.includes("Programa de estudios y trabajo");

  useEffect(() => {
    if (formData.startDate && !form.getValues("fechaInicioCurso")) {
      const formatted = typeof formData.startDate === 'string'
        ? formData.startDate
        : formatDate(formData.startDate, "dd/MM/yyyy");
      
      form.setValue("fechaInicioCurso", formatted);
    }
  }, [formData.startDate, form]);

  // Si es Work & Study, siempre 25 semanas. Si no, usar lo que viene en formData o reservation
  const weeks = isWorkAndStudy ? 25 : (formData.weeks || reservation?.weeks || 0);
  const courseProgram = reservation?.course || "";
  const schedule = formData.schedule || reservation?.specificSchedule || "";

  // OBTENER DATOS DE ESCUELA Y PRECIOS
  const schoolName = formData.schoolName || reservation?.schoolName || "";
  const totalPrice = formData.totalPrice || reservation?.precioBruto || 0;
  const offerPrice = formData.offerPrice || reservation?.ofertaBruta || 0;
  const city = formData.city || reservation?.city || "";
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => {
            const finalData = {
              ...data,
              courseProgram: courseProgram,
              weeksToStudy: weeks,
              schedule: schedule,
              schoolName: schoolName,
              totalPrice: Number(totalPrice),
              offerPrice: Number(offerPrice),
              city: city,
            };

            // console.log("📤 Datos finales a enviar:", finalData);
            onSubmit(finalData);
          },
          (errors) => {
            // console.error("❌ VALIDATION ERRORS", errors);
          }
        )}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Tu apellido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nacionalidad</FormLabel>
                <FormControl>
                  <CustomCountrySelect
                    options={countries}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecciona tu país"
                    showCode={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nivelProfesional"
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Cuál es tu nivel profesional?</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger
                      className={`${
                        form.formState.errors.nivelProfesional
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {professionalLevel.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nivelAproximado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Nivel de inglés aprox.?</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger
                      className={` ${
                        form.formState.errors.nivelAproximado
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {levelEnglish.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>Tipo de curso</FormLabel>
            <FormControl>
              <Input 
                value={courseProgram} 
                disabled
                readOnly
                className="bg-gray-100 text-gray-700"
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Semanas a estudiar</FormLabel>
            <FormControl>
              <Input 
                value={weeks.toString()} 
                disabled
                readOnly
                className="bg-gray-100 text-gray-700"
              />
            </FormControl>
          </FormItem>
        </div>

        {/* <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal">Teléfono</FormLabel>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-[150px]">
                      <FormControl>
                        <CustomCountrySelect
                          options={countries}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="+56"
                          showNameInSelectedValue={false}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormControl>
                  <Input
                    type="tel"
                    placeholder=""
                    className="h-10 bg-gray-50 border-gray-200 flex-1"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage className="font-semibold" />
            </FormItem>
          )}
        /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <FormField
            control={form.control}
            name="fechaInicioCurso"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <StartDatePicker
                    value={
                      typeof field.value === 'string' 
                        ? parseDDMMYYYY(field.value) 
                        : field.value
                    }
                    onChange={(date) => {
                      if (date) {
                        // Convertir Date a string dd/MM/yyyy
                        const formatted = formatDate(date, "dd/MM/yyyy");
                        field.onChange(formatted);
                      } else {
                        field.onChange("");
                      }
                    }}
                    label="¿Cuándo te gustaría iniciar el curso?"
                    disabled={disabled}
                  />
                  {/* <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`${
                        form.formState.errors.fechaInicioCurso
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      {inicioCurso.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
                </FormControl>
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nacimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <DatePickerEbook
                    value={parseDDMMYYYY(field.value)}
                    onChange={(d) =>
                      field.onChange(d ? formatDate(d, "dd/MM/yyyy") : "")
                    }
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />
        </div>

        {/* <FormItem>
          <FormLabel>Horario seleccionado</FormLabel>
          <FormControl>
            <Input 
              value={schedule} 
              disabled
              readOnly
              className="bg-gray-100 text-gray-700"
            />
          </FormControl>
        </FormItem> */}

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2">
              <div className="flex items-start gap-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={
                      form.formState.errors.consent ? "border-red-500" : ""
                    }
                  />
                </FormControl>
                <div className="text-sm leading-tight">
                  Doy mi consentimiento para el tratamiento de mis datos
                  personales asociados al curso tomado de acuerdo con los
                  términos de la{" "}
                  <Link
                    href="https://www.matchmycourse.com/politica-de-privacidad"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Política de Privacidad
                  </Link>
                  .
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent2"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2">
              <div className="flex items-start gap-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={
                      form.formState.errors.consent2 ? "border-red-500" : ""
                    }
                  />
                </FormControl>
                <div className="text-sm leading-tight">
                  Declaro haber leído, comprendido y aceptado los{" "}
                  <Link
                    href="https://www.matchmycourse.com/terminos-y-condiciones"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Términos y Condiciones generales del servicio
                  </Link>
                  , incluyendo políticas de pagos, cambios, cancelaciones y
                  devoluciones asociadas al curso contratado.
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          {/* <Button
            type="button"
            variant="outline"
            className="bg-gray-50 hover:bg-gray-100"
            onClick={onBack}
          >
            ← Ver detalles
          </Button> */}

          <Button
            type="submit"
            className="bg-[#FF385C] hover:bg-[#E51D58] text-white"
            disabled={disabled}
          >
            {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {disabled ? "Enviando..." : "Enviar solicitud"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
