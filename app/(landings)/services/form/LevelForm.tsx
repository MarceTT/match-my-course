"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { format as formatDate } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "sonner";
import axiosInstance from "@/app/utils/apiClient";
import { CustomCountrySelect } from "../../../shared";
import { countries } from "@/lib/constants/countries";
import DatePickerEbook from "@/components/common/DatePickerEbook";
import Link from "next/link";
import {
  City,
  cityOptionsByCountry,
  COUNTRIES,
  formSchema,
  parseDDMMYYYY,
} from "../schema";
import levelEnglish from "../service/levelEnglish";
import respaldoEconomico from "../service/respaldoEconomico";
import professionalLevel from "../service/professionalLevel";
import inicioCurso from "../service/inicioCurso";
import { irishHolidays } from "@/lib/constants/holidays";
import { FaSpinner } from "react-icons/fa";

const LevelEnglishForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      nacionalidad: "",
      paisEstudiar: "",
      ciudadEstudiar: "",
      nivelProfesional: "",
      nivelAproximado: "",
      fechaInicioCurso: "",
      nacimiento: "",
      respaldoEconomico: "",
      aceptaTerminos: false,
      aceptaPoliticaDePrivacidad: false,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const resetForm = form.reset;

  // Alinear el valor inicial con el StartDatePicker (primer lunes válido >= 6 semanas)
  React.useEffect(() => {
    const today = new Date();
    const minSelectableDate = new Date(today);
    minSelectableDate.setDate(minSelectableDate.getDate() + 42);
    const getFirstValidMonday = (from: Date): Date => {
      const d = new Date(from);
      while (true) {
        const isMon = d.getDay() === 1;
        const isHoliday = irishHolidays.some(
          (h) => h.toDateString() === d.toDateString()
        );
        if (isMon && !isHoliday) return new Date(d);
        d.setDate(d.getDate() + 1);
      }
    };
    const firstMonday = getFirstValidMonday(minSelectableDate);
  }, [form]);

  const selectedCountry = useWatch({
    control: form.control,
    name: "paisEstudiar",
  });
  const cityOptions: City[] = selectedCountry
    ? cityOptionsByCountry[selectedCountry] ?? []
    : [];

  // 3. Define la función de envío
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
    };
    //console.log("LevelForm payload ready:", payload);

    // Descomenta para enviar al backend
    try {
      const response = await axiosInstance.post("/service-form/submit-service-form", payload);
      if (response.data.success) {
        resetForm();
        toast.success("Formulario enviado correctamente");
      } else {
        toast.error("Error al enviar el formulario. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      // console.error("Error al enviar el formulario:", error);
      toast.error("Error al enviar el formulario. Por favor, intenta de nuevo.");
    }
  }
  return (
    <div
      className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-200"
      id="formulario-guia"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            // Log validation errors for debugging when submit doesn't fire
            // console.log("LevelForm validation errors:", errors);
          })}
          className="space-y-6"
        >
          {/* Small section title */}
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Completa tu información personal
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    Nombre
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre"
                      className={`mt-1 h-11 text-base ${
                        form.formState.errors.nombre ? "border-red-500" : ""
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    Apellido
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apellido"
                      className={`mt-1 h-11 text-base ${
                        form.formState.errors.apellido ? "border-red-500" : ""
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    Correo
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Correo"
                      className={`mt-1 h-11 text-base ${
                        form.formState.errors.email ? "border-red-500" : ""
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nacionalidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    Nacionalidad
                  </FormLabel>
                  <FormControl>
                    <CustomCountrySelect
                      options={countries}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Selecciona tu país"
                      showCode={false}
                      className="mt-1"
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <FormField
              control={form.control}
              name="paisEstudiar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    ¿En que país quieres estudiar?
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(v) => {
                      field.onChange(v);
                      form.setValue("ciudadEstudiar", ""); // por qué: evita dejar una ciudad inválida
                    }}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`mt-1 h-11 text-base ${
                          form.formState.errors.paisEstudiar
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.name}
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
              name="ciudadEstudiar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    ¿En que ciudad?
                  </FormLabel>
                  <Select
                    disabled={!selectedCountry}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`mt-1 h-11 text-base ${
                          form.formState.errors.ciudadEstudiar
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cityOptions.map((city) => (
                        <SelectItem key={city.code} value={city.code}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <FormField
              control={form.control}
              name="nivelProfesional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    ¿Cuál es tu nivel profesional?
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger
                        className={`mt-1 h-11 text-base ${
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
                  <FormLabel className="text-base font-medium text-gray-800">
                    ¿Nivel de inglés aprox.?
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger
                        className={`mt-1 h-11 text-base ${
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <FormField
              control={form.control}
              name="fechaInicioCurso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    ¿Cuándo te gustaría iniciar el curso?
                  </FormLabel>
                  <FormControl>
                  <Select
                    value={field.value} onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      className={`mt-1 text-base ${
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
                  </Select>
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
                  <FormLabel className="text-base font-medium text-gray-800">
                    Fecha de nacimiento
                  </FormLabel>
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

          {/* Respaldo económico */}
          <FormField
            control={form.control}
            name="respaldoEconomico"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-800">
                  ¿Cuentas con el respaldo económico para tu viaje de estudios?
                  Recomendamos un mínimo de 6.500 euros o 7 millones de pesos
                  chilenos.
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`mt-1 w-full text-sm sm:text-base h-auto min-h-[2.75rem] py-2 leading-snug [&>span]:whitespace-normal [&>span]:break-words ${
                        form.formState.errors.respaldoEconomico
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent className="max-w-[calc(100vw-2rem)] w-[var(--radix-select-trigger-width)]">
                      {respaldoEconomico.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="whitespace-normal break-words"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aceptaTerminos"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(v) => field.onChange(v === true)}
                    className={`mt-1 w-4 h-4 sm:w-5 sm:h-5 ${
                      form.formState.errors.aceptaTerminos
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-gray-600 leading-relaxed">
                    Acepto los{" "}
                    <Link
                      href="/terminos-y-condiciones"
                      target="_blank"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      términos y condiciones
                    </Link>
                  </FormLabel>
                  <FormMessage className="text-sm text-red-500" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aceptaPoliticaDePrivacidad"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(v) => field.onChange(v === true)}
                    className={`mt-1 w-4 h-4 sm:w-5 sm:h-5 ${
                      form.formState.errors.aceptaPoliticaDePrivacidad
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-gray-600 leading-relaxed">
                    Doy mi consentimiento para el tratamiento de mis datos
                    personales de acuerdo con la{" "}
                    <Link
                      href="/politica-de-privacidad"
                      target="_blank"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Política de privacidad
                    </Link>
                  </FormLabel>
                  <FormMessage className="text-sm text-red-500" />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ff6f6f] hover:bg-[#ff5a5a] text-white py-3 sm:py-4 text-base sm:text-lg font-semibold transition-colors duration-200 min-h-[44px] sm:min-h-[48px]"
          >
            {isLoading && (
              <FaSpinner className="mr-2 animate-spin" />
            )}
            {isLoading ? "Enviando..." : "Te contactaremos"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LevelEnglishForm;
