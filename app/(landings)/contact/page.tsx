"use client"

import { Controller, FormProvider, useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import Image from "next/image"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CountrySelect } from "@/components/common/CountrySelect"
import { countries } from "@/lib/constants/countries"
import { transformCountryFormData } from "@/lib/helpers/countryHelper"

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  details: string;
  acceptTerms: boolean;
  acceptPolicy: boolean;
  nationality: string;
  country: string;
};

export default function ContactPage() {
  const methods = useForm<ContactFormData>();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const [submitted, setSubmitted] = useState(false)

  const onSubmit = async (formData: ContactFormData) => {
    const transformedData = transformCountryFormData(formData, countries);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transformedData),
      })

      const result = await res.json()

      if (result.success) {
        setSubmitted(true)
        reset()
      } else {
        alert('Hubo un error al enviar el formulario')
      }
    } catch (error) {
      alert('Error al enviar el formulario')
      console.error(error)
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Contáctanos
        </h1>
        {submitted ? (
          <p className="text-center text-green-600 text-lg">¡Gracias por tu mensaje!</p>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg border-2">
              <h3 className="font-bold mb-6 text-center">Escríbenos y te responderemos en un plazo de 48 horas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Nombre</label>
                  <input
                    {...register("firstName", { required: "Este campo es requerido" })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label className="block mb-1 font-medium">Apellido</label>
                  <input
                    {...register("lastName", { required: "Este campo es requerido" })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Correo electrónico</label>
                  <input
                    type="email"
                    {...register("email", { required: "Este campo es requerido" })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                </div>

                <FormField
                  control={control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidad</FormLabel>
                      <FormControl>
                        <CountrySelect
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
                      <div className="flex gap-2">
                        <FormField
                          control={control}
                          name="country"
                          render={({ field }) => (
                            <FormItem className="w-[140px]">
                              <FormControl>
                                <CountrySelect
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
                            placeholder="9898045991"
                            className="h-10 border-gray-300 flex-1"
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
                <label className="block mb-1 font-medium">Motivo de la consulta</label>
                <input
                  {...register("reason", { required: "Este campo es requerido" })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.reason && <p className="text-red-600 text-sm">{errors.reason.message}</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium">Cuéntanos un poco más</label>
                <textarea
                  {...register("details", { required: "Este campo es requerido" })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={4}
                ></textarea>
                {errors.details && <p className="text-red-600 text-sm">{errors.details.message}</p>}
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
                rules={{ required: "Debes aceptar la política de consentimiento" }}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="policy"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor="policy" className="text-sm">
                      Doy mi consentimiento para el tratamiento de mis datos personales de acuerdo con la Política de Privacidad.
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
                  type="submit"
                  className="mt-2 w-full bg-[#5371FF] hover:bg-[#4257FF] text-white text-base font-semibold"
                  size="lg"
                >
                  Enviar
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
              ¿Estás buscando una escuela <br />de inglés en Irlanda?
            </h2>
            <p className="text-lg text-black">
              Encuentra la escuela de inglés que más se adecue a tus requisitos y necesidades 
              a través de nuestro filtro inteligente.
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
  )
}
