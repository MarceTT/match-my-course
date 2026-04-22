"use client";

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
import { CustomCountrySelect } from "@/app/components/common/CustomCountrySelect";
import { countries } from "@/lib/constants/countries";
import DatePickerEbook from "@/components/common/DatePickerEbook";
import Link from "next/link";
import {
  City,
  cityOptionsByCountry,
  COUNTRIES,
  parseDDMMYYYY,
} from "../services/schema";
import levelEnglish from "../services/service/levelEnglish";
import respaldoEconomico from "../services/service/respaldoEconomico";
import professionalLevel from "../services/service/professionalLevel";
import inicioCurso from "../services/service/inicioCurso";
import { FaSpinner } from "react-icons/fa";
import { createReferralLead, getReferralCode } from "@/app/hooks/useReferralTracking";
import { subYears } from "date-fns";

// Schema for the Ireland form
const irlandaFormSchema = z.object({
  nombre: z.string().min(2, "Rellena este campo obligatorio"),
  apellido: z.string().min(2, "Rellena este campo obligatorio"),
  email: z.string().email("El correo no es válido"),
  nacionalidad: z.string().min(1, "Selecciona tu nacionalidad"),
  paisEstudiar: z.string().min(1, "Selecciona un país"),
  ciudadEstudiar: z.string().min(1, "Selecciona tu ciudad de estudio"),
  nivelProfesional: z.string().min(1, "Selecciona tu nivel profesional"),
  nivelAproximado: z.string().min(1, "Selecciona tu nivel aproximado"),
  fechaInicioCurso: z.string().min(1, "Selecciona tu fecha de inicio"),
  nacimiento: z
    .string()
    .min(1, "Ingresa tu fecha de nacimiento")
    .refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
      message: "Formato inválido. Usa dd/mm/yyyy",
    })
    .refine(
      (val) => {
        const d = parseDDMMYYYY(val);
        if (!d) return false;
        const max = subYears(new Date(), 16);
        return d <= max;
      },
      { message: "Debes ser mayor de 16 años" }
    ),
  respaldoEconomico: z.string().min(1, "Selecciona tu respaldo económico"),
  aceptaTerminos: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
  aceptaPoliticaDePrivacidad: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la política de privacidad",
  }),
});

type IrlandaFormData = z.infer<typeof irlandaFormSchema>;

export default function IrlandaForm() {
  const form = useForm<IrlandaFormData>({
    resolver: zodResolver(irlandaFormSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      nacionalidad: "",
      paisEstudiar: "IE", // Default to Ireland
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

  const selectedCountry = useWatch({
    control: form.control,
    name: "paisEstudiar",
  });
  
  const cityOptions: City[] = selectedCountry
    ? cityOptionsByCountry[selectedCountry] ?? []
    : [];

  async function onSubmit(values: IrlandaFormData) {
    try {
      const response = await axiosInstance.post("/service-form/submit-service-form", {
        ...values,
        source: "irlanda-landing",
      });
      
      if (response.data.success) {
        resetForm();
        toast.success("Formulario enviado correctamente. ¡Te contactaremos pronto!");

        // Track referral conversion if a referral code exists
        const referralCode = getReferralCode();
        if (referralCode) {
          await createReferralLead({
            prospectName: `${values.nombre} ${values.apellido}`,
            prospectEmail: values.email,
            source: "consulting",
            courseInterest: "Irlanda - Visa de estudio y trabajo",
          });
        }
      } else {
        toast.error("Error al enviar el formulario. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      toast.error("Error al enviar el formulario. Por favor, intenta de nuevo.");
    }
  }

  return (
    <section id="irlanda-form" className="py-16 lg:py-20 bg-white scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Title and Description */}
            <div className="lg:sticky lg:top-24">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F343D] mb-6 leading-tight">
                ¿Te gustaría recibir más información sobre la visa de estudio de Irlanda?
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                <strong className="text-[#2F343D]">Completa el formulario</strong> y te aremos llegar la información que necesitas para conocer en profundidad el programa de estudio, requisitos, cursos de inglés y mucho más.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                También, podrás solicitar una <strong className="text-[#2F343D]">asesoría personalizada</strong> con nuestros profesionales expertos
              </p>
              <div className="hidden lg:block">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Te responderemos en un plazo máximo de 48 horas</p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border border-gray-200">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-gray-800">Nombre</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombre"
                              className={`h-11 text-base ${form.formState.errors.nombre ? "border-red-500" : ""}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="apellido"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-gray-800">Apellido</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Apellido"
                              className={`h-11 text-base ${form.formState.errors.apellido ? "border-red-500" : ""}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email and Nationality row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-gray-800">Correo</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="correo@ejemplo.com"
                              className={`h-11 text-base ${form.formState.errors.email ? "border-red-500" : ""}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nacionalidad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-gray-800">Nacionalidad</FormLabel>
                          <FormControl>
                            <CustomCountrySelect
                              options={countries}
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Selecciona tu país"
                              showCode={false}
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Country and City row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="paisEstudiar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-gray-800">
                            ¿En qué país quieres estudiar?
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={(v) => {
                              field.onChange(v);
                              form.setValue("ciudadEstudiar", "");
                            }}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={`h-11 text-base ${form.formState.errors.paisEstudiar ? "border-red-500" : ""}`}
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
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ciudadEstudiar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-gray-800">
                            ¿En qué ciudad?
                          </FormLabel>
                          <Select
                            disabled={!selectedCountry}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={`h-11 text-base ${form.formState.errors.ciudadEstudiar ? "border-red-500" : ""}`}
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
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Professional level and English level row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                className={`h-11 text-base ${form.formState.errors.nivelProfesional ? "border-red-500" : ""}`}
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
                          <FormMessage className="text-sm text-red-500" />
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
                                className={`h-11 text-base ${form.formState.errors.nivelAproximado ? "border-red-500" : ""}`}
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
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Course start and Birth date row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fechaInicioCurso"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-gray-800">
                            ¿Cuándo te gustaría iniciar el curso?
                          </FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger
                                className={`h-11 text-base ${form.formState.errors.fechaInicioCurso ? "border-red-500" : ""}`}
                              >
                                <SelectValue placeholder="Selecciona" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {inicioCurso.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-sm text-red-500" />
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
                              onChange={(d) => field.onChange(d ? formatDate(d, "dd/MM/yyyy") : "")}
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Economic backup - full width */}
                  <FormField
                    control={form.control}
                    name="respaldoEconomico"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-gray-800">
                          ¿Cuentas con el respaldo económico para tu viaje de estudios? Recomendamos un mínimo de 6.500 euros.
                        </FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger
                              className={`h-auto min-h-[2.75rem] py-2 text-base ${form.formState.errors.respaldoEconomico ? "border-red-500" : ""}`}
                            >
                              <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-w-[calc(100vw-2rem)]">
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
                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Terms checkbox */}
                  <FormField
                    control={form.control}
                    name="aceptaTerminos"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(v) => field.onChange(v === true)}
                            className={`mt-1 ${form.formState.errors.aceptaTerminos ? "border-red-500" : ""}`}
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

                  {/* Privacy checkbox */}
                  <FormField
                    control={form.control}
                    name="aceptaPoliticaDePrivacidad"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(v) => field.onChange(v === true)}
                            className={`mt-1 ${form.formState.errors.aceptaPoliticaDePrivacidad ? "border-red-500" : ""}`}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-600 leading-relaxed">
                            Doy mi consentimiento para el tratamiento de mis datos personales de acuerdo con la{" "}
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

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#FF385C] hover:bg-[#E51D58] text-white py-4 text-lg font-semibold transition-colors duration-200 min-h-[48px]"
                  >
                    {isLoading && <FaSpinner className="mr-2 animate-spin" />}
                    {isLoading ? "Enviando..." : "Te contactaremos"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
