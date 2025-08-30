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

// 1. Define el esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(2, "Rellena este campo obligatorio"),
  apellido: z.string().min(2, "Rellena este campo obligatorio"),
  email: z.string().email("El correo no es válido"),
  pasaporte: z.string().min(1, "Selecciona tu nacionalidad"),
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
      pasaporte: "",
      nacimiento: "",
      motivacion: "",
      aceptaTerminos: false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  // 3. Define la función de envío
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Aquí manejarías el envío del formulario (p. ej. a una API)
    console.log(values);
    alert("¡Formulario enviado! Revisa la consola para ver los datos.");
  }

  return (
    <section className="px-6 py-16 pt-40 mt-32 lg:mt-0 lg:pt-48 mb-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 mx-4 lg:mx-8">
          {/* Left Content - Benefits */}
          <div>
            <h2 className="text-3xl text-center font-bold text-gray-900 mb-8 lg:text-left">
              En esta guía encontrarás
            </h2>
            <div className="space-y-6 text-left lg:text-left">
              <div className="flex items-start gap-4">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <div>
                  <p className="text-gray-700 font-medium">
                    Dos de los mejores destinos para vivir tu experiencia;
                  </p>
                  <p className="text-gray-600">
                    Canadá, Irlanda y Nueva Zelanda
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <div>
                  <p className="text-gray-700 font-medium">
                    Opciones de programas de estudio y visados disponibles en
                    cada país.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <div>
                  <p className="text-gray-700 font-medium">
                    Puestos de trabajo para estudiantes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4">
              <p className="text-black text-justify lg:text-left">
                Una vez llenes y envíes el formulario, recibirás un email con el
                ebook adjunto para que puedas leerlo cuando quieras. ¡Asegúrate
                de diligenciarlo correctamente!
              </p>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Nombre
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nombre"
                            className={`mt-1 ${form.formState.errors.nombre ? "border-red-500" : ""}`}
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
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Apellido
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apellido"
                            className={`mt-1 ${form.formState.errors.apellido ? "border-red-500" : ""}`}
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
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Correo
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Correo"
                          className={`mt-1 ${form.formState.errors.email ? "border-red-500" : ""}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pasaporte"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          De tu pasaporte
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className={`mt-1 ${form.formState.errors.pasaporte ? "border-red-500" : ""}`}>
                              <SelectValue placeholder="nacionalidad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="colombia">Colombia</SelectItem>
                            <SelectItem value="mexico">México</SelectItem>
                            <SelectItem value="argentina">Argentina</SelectItem>
                            <SelectItem value="chile">Chile</SelectItem>
                            <SelectItem value="peru">Perú</SelectItem>
                            <SelectItem value="otros">Otros</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nacimiento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          mes-día-año
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="Fecha de nacimiento"
                            className={`mt-1 ${form.formState.errors.nacimiento ? "border-red-500" : ""}`}
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
                      <FormLabel className="text-sm font-medium text-gray-700">
                        ¿Cuál es tu principal motivación para vivir esta
                        experiencia en el extranjero?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={`mt-1 ${form.formState.errors.motivacion ? "border-red-500" : ""}`}>
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
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className={`mt-1 ${form.formState.errors.aceptaTerminos ? "border-red-500" : ""}`}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-600 leading-relaxed">
                          He leído y acepto el{" "}
                          <a href="#" className="text-blue-600 underline">
                            aviso legal
                          </a>{" "}
                          y la{" "}
                          <a href="#" className="text-blue-600 underline">
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
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
