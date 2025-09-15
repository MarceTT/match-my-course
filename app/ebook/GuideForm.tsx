"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Image from "next/image";
import { CustomCountrySelect } from "../shared";
import { countries } from "@/lib/constants/countries";

// 1. Define el esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(2, "Rellena este campo obligatorio"),
  apellido: z.string().min(2, "Rellena este campo obligatorio"),
  email: z.string().email("El correo no es válido"),
  nacionalidad: z.string().min(1, "Selecciona tu nacionalidad"),
  nacimiento: z.string().min(1, "Ingresa tu fecha de nacimiento"),
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

  // 3. Define la función de envío
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Aquí manejarías el envío del formulario (p. ej. a una API)
//     console.log(values);
    alert("¡Formulario enviado! Revisa la consola para ver los datos.");
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
                  <p className="text-gray-800 font-semibold text-base sm:text-lg leading-relaxed">
                    Dos de los mejores destinos para vivir tu experiencia;
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
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
                  <p className="text-gray-800 font-semibold text-base sm:text-lg leading-relaxed">
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
                  <p className="text-gray-800 font-semibold text-base sm:text-lg leading-relaxed">
                    Puestos de trabajo para estudiantes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 p-4 sm:p-5 bg-gray-50 rounded-lg">
              <p className="text-gray-900 text-sm sm:text-base lg:text-lg text-left leading-relaxed">
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
                          mes-día-año
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="Fecha de nacimiento"
                            className={`mt-1 h-10 sm:h-11 text-sm sm:text-base ${
                              form.formState.errors.nacimiento
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
                          <SelectItem value="estudios">Estudios</SelectItem>
                          <SelectItem value="trabajo">Trabajo</SelectItem>
                          <SelectItem value="ambas">
                            Estudiar y trabajar
                          </SelectItem>
                          <SelectItem value="experiencia">
                            Experiencia cultural
                          </SelectItem>
                          <SelectItem value="idioma">
                            Aprender idioma
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
                          He leído y acepto el{" "}
                          <a
                            href="#"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            aviso legal
                          </a>{" "}
                          y la{" "}
                          <a
                            href="#"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            política de privacidad
                          </a>
                        </FormLabel>
                        <FormMessage className="text-xs text-red-500" />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold transition-colors duration-200 min-h-[44px] sm:min-h-[48px]"
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
