"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { subYears } from "date-fns/subYears";

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
import { DatePickerEbook } from "@/components/common/DatePickerEbook";
import { format as formatDate } from "date-fns";
import Image from "next/image";
import { CustomCountrySelect } from "../../shared";
import { countries } from "@/lib/constants/countries";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/apiClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Helper para parsear dd/MM/yyyy a Date
const parseDDMMYYYY = (s: string): Date | undefined => {
  if (!s || typeof s !== "string") return undefined;
  const parts = s.split("/");
  if (parts.length !== 3) return undefined;
  const [dd, mm, yyyy] = parts;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return isNaN(d.getTime()) ? undefined : d;
};

// 1. Define el esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(2, "Rellena este campo obligatorio"),
  apellido: z.string().min(2, "Rellena este campo obligatorio"),
  email: z.string().email("El correo no es válido"),
  nacionalidad: z.string().min(1, "Selecciona tu nacionalidad"),
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
        return d <= max; // Debe ser igual o anterior a hoy - 16 años
      },
      {
        message: "Debes ser mayor de 16 años",
      }
    ),
  motivacion: z.string().min(1, "Selecciona una opción"),
  aceptaTerminos: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

export function GuideForm() {
  // 2. Define el formulario con react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      nacionalidad: "",
      nacimiento: "",
      motivacion: "",
      aceptaTerminos: false,
    },
  });

  const isLoading = form.formState.isSubmitting;
const resetForm = form.reset;
  const router = useRouter();

  // 3. Define la función de envío
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("GuideForm payload:", values);
    try {
      const response = await axiosInstance.post("/ebook/download-ebook", values);
      if (response.data.success) {
        // Marca en la sesión que el usuario completó el formulario para habilitar la descarga automática
        try {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("EBOOK_DL_READY", "1");
          }
        } catch {}
        // Redirige a la página de gracias (App Router). Incluye ?dl=1 como respaldo
        router.push("/thankyou-page?dl=1");
        resetForm();
        toast.success("Formulario enviado correctamente");
      } else {
        console.warn("Respuesta 200 sin success=true:", response.data);
        const msg = response.data?.message || "Error al enviar el formulario. Por favor, intenta de nuevo.";
        toast.error(msg);
      }
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      console.error("[GuideForm] Error al enviar:", { status, data, error });
      const msg = data?.message || data?.error || `Error ${status || ""}. Por favor, revisa los datos e intenta nuevamente.`;
      toast.error(msg);
    }
  }

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 lg:py-24 ">
      <div className="mx-auto max-w-7xl lg:mt-12 xl:mt-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mx-2 sm:mx-4 lg:mx-8">
          {/* Left Content - Benefits */}
          <div className="lg:pr-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center font-black text-gray-900 mb-8 sm:mb-10 lg:text-left leading-tight sm:whitespace-nowrap">
              En esta guía encontrarás
            </h2>
            <div className="space-y-6 sm:space-y-8 text-left lg:text-left">
              <div className="flex items-start gap-3 sm:gap-5">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                />
                <div>
                  <p className="text-gray-800 font-bold text-base sm:text-lg leading-relaxed lg:text-2xl">
                    Dos de los mejores destinos para vivir tu experiencia;
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base mt-1 lg:text-xl">
                    Canadá, Irlanda y Nueva Zelanda
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-5">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                />
                <div>
                  <p className="text-gray-800 font-bold text-base sm:text-lg leading-relaxed lg:text-2xl">
                    Opciones de programas de estudio y visados disponibles en
                    cada país.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-5">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                />
                <div>
                  <p className="text-gray-800 font-bold text-base sm:text-lg leading-relaxed lg:text-2xl">
                    Puestos de trabajo para estudiantes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 p-4 sm:p-5 bg-gray-50 rounded-lg">
              <p className="text-gray-900 text-sm sm:text-base text-left leading-relaxed lg:text-xl">
                Una vez llenes y envíes el formulario, recibirás un email con el
                ebook adjunto para que puedas leerlo cuando quieras. ¡Asegúrate
                de diligenciarlo correctamente!
              </p>
            </div>
          </div>

          {/* Right Content - Form */}
          <div
            className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg"
            id="formulario-guia"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                          Nombre
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nombre"
                            className={`mt-1 h-10 sm:h-11 text-sm sm:text-base ${
                              form.formState.errors.nombre
                                ? "border-red-500"
                                : ""
                            }`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apellido"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                          Apellido
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apellido"
                            className={`mt-1 h-10 sm:h-11 text-sm sm:text-base ${
                              form.formState.errors.apellido
                                ? "border-red-500"
                                : ""
                            }`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                        Correo
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Correo"
                          className={`mt-1 h-10 sm:h-11 text-sm sm:text-base ${
                            form.formState.errors.email ? "border-red-500" : ""
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="nacionalidad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                          Nacionalidad
                        </FormLabel>
                        <FormControl>
                          <CustomCountrySelect
                            options={countries}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Selecciona tu país"
                            showCode={false}
                          />
                        </FormControl>

                        <FormMessage className="text-xs text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nacimiento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                          Fecha de nacimiento
                        </FormLabel>
                        <FormControl>
                          <DatePickerEbook
                            value={parseDDMMYYYY(field.value)}
                            onChange={(d) =>
                              field.onChange(
                                d ? formatDate(d, "dd/MM/yyyy") : ""
                              )
                            }
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1">
                          Formato: dd/mm/yyyy
                        </p>
                        <FormMessage className="text-xs text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="motivacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                        ¿Cuál es tu principal motivación para vivir esta
                        experiencia en el extranjero?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`mt-1 h-10 sm:h-11 text-sm sm:text-base ${
                              form.formState.errors.motivacion
                                ? "border-red-500"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="aprender-ingles">
                            Aprender inglés
                          </SelectItem>
                          <SelectItem value="vivir-experiencia-cultural">
                            Vivir la experiencia cultural
                          </SelectItem>
                          <SelectItem value="trabajar-mientras-estudio">
                            Trabajar mientras estudio
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs text-red-500 mt-1" />
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
                          onCheckedChange={field.onChange}
                          className={`mt-1 w-4 h-4 sm:w-5 sm:h-5 ${
                            form.formState.errors.aceptaTerminos
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          He leído y acepto los{" "}
                          <Link
                            href="/terminos-y-condiciones"
                            target="_blank"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            términos y condiciones
                          </Link>{" "}
                          y la{" "}
                          <Link
                            href="/politica-de-privacidad"
                            target="_blank"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            política de privacidad
                          </Link>
                        </FormLabel>
                        <FormMessage className="text-xs text-red-500" />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#5174fc] hover:bg-[#4257FF] text-white py-3 sm:py-4 text-base sm:text-lg font-semibold transition-colors duration-200 min-h-[44px] sm:min-h-[48px]"
                >
                  {isLoading ? "Enviando..." : "Descargar Guía"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
