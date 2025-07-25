"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { countries } from "@/lib/constants/countries";
import { transformCountryFormData } from "@/lib/helpers/countryHelper";
import { ContactFormData } from "@/app/lib/types";
import { CustomCountrySelect } from "@/app/components/common/CustomCountrySelect";

import { sendGTMEvent } from "@/app/lib/gtm";
import confetti from "canvas-confetti";
import BookingPannelSubmit from "@/app/components/booking/BookingPannel.submit";
import { Loader2 } from "lucide-react";

export default function ContactPage() {
  const methods = useForm<ContactFormData>();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    const transformedData = transformCountryFormData(formData, countries);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformedData),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        reset();
        confetti();
        sendGTMEvent("formSubmit", {
          formName: "contactForm",
          ...transformedData,
        });
      } else {
        alert("Hubo un error al enviar el formulario");
      }
    } catch (error) {
      alert("Error al enviar el formulario");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackButtonClick = () => {
    sendGTMEvent("cta_click", {
      label: "Enviar Contacto",
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Contáctanos</h1>
        {submitted ? (
          <BookingPannelSubmit />
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg border-2"
            >
              <h3 className="font-bold mb-6 text-center">
                Escríbenos y te responderemos en un plazo de 48 horas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Nombre</label>
                  <input
                    {...register("firstName", {
                      required: "Este campo es requerido",
                    })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium">Apellido</label>
                  <input
                    {...register("lastName", {
                      required: "Este campo es requerido",
                    })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Este campo es requerido",
                    })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <FormField
                  control={control}
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

                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal">
                        Teléfono
                      </FormLabel>
                      <div className="flex gap-2 items-center">
                        {/* Selector de país (ancho fijo) */}
                        <FormField
                          control={control}
                          name="country"
                          render={({ field }) => (
                            <FormItem className="w-[240px]">
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
                        {/* Input de teléfono (ocupa todo el resto del espacio) */}
                        <FormControl className="flex-grow">
                          <Input
                            type="tel"
                            placeholder="9898045991"
                            className="h-12 border-gray-300 w-full min-w-[350px]"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="font-semibold" />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Motivo de la consulta
                </label>
                <input
                  {...register("reason", {
                    required: "Este campo es requerido",
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.reason && (
                  <p className="text-red-600 text-sm">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Cuéntanos un poco más
                </label>
                <textarea
                  {...register("details", {
                    required: "Este campo es requerido",
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={4}
                ></textarea>
                {errors.details && (
                  <p className="text-red-600 text-sm">
                    {errors.details.message}
                  </p>
                )}
              </div>

              <Controller
                name="acceptTerms"
                control={control}
                rules={{ required: "Debes aceptar los términos y condiciones" }}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor="terms" className="text-sm">
                      Acepto los términos y condiciones.
                    </label>
                  </div>
                )}
              />

              {errors.acceptTerms && (
                <p className="text-red-600 text-sm">
                  {errors.acceptTerms.message}
                </p>
              )}

              <Controller
                name="acceptPolicy"
                control={control}
                rules={{
                  required: "Debes aceptar la política de consentimiento",
                }}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="policy"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor="policy" className="text-sm">
                      Doy mi consentimiento para el tratamiento de mis datos
                      personales de acuerdo con la Política de Privacidad.
                    </label>
                  </div>
                )}
              />

              {errors.acceptPolicy && (
                <p className="text-red-600 text-sm">
                  {errors.acceptPolicy.message}
                </p>
              )}

              <div className="flex justify-center">
                <Button
                  onClick={trackButtonClick}
                  type="submit"
                  className="mt-2 w-full bg-[#FF385C] hover:bg-[#E51D58] text-white text-base font-semibold"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>

      <section className="relative overflow-visible bg-yellow-400 mt-14">
        <div className="container mx-auto grid lg:grid-cols-2 items-center relative z-10">
          <div className="space-y-4 text-center py-4">
            <h2 className="text-3xl font-semibold text-black">
              ¿Estás buscando una escuela <br />
              de inglés en Irlanda?
            </h2>
            <p className="text-lg text-black">
              Encuentra la escuela de inglés que más se adecue a tus requisitos
              y necesidades a través de nuestro filtro inteligente.
            </p>
            <a
              href="/school-search?course=ingles-general"
              className="inline-block px-6 py-3 bg-black text-white text-lg rounded-full"
            >
              Buscar escuela
            </a>
          </div>
          <div className="relative h-[400px] md:h-[500px] hidden lg:block">
            <Image
              src="/landing-pages/mujer-pagina-contacto.png"
              alt="Contáctanos"
              width={600}
              height={600}
              className="absolute bottom-0 md:-top-25 right-0 object-contain z-20"
            />
          </div>
        </div>
      </section>
    </>
  );
}
