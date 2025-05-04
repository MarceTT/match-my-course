// app/contact/page.tsx
"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  details: string;
  acceptTerms: boolean;
  acceptPolicy: boolean;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>()

  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (data: ContactFormData) => {
    console.log("Form Data:", data)
    setSubmitted(true)
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Contáctanos</h1>
        {submitted ? (
          <p className="text-green-600 text-lg">¡Gracias por tu mensaje!</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 border-2">
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

              <div>
                <label className="block mb-1 font-medium">Número de teléfono</label>
                <input
                  {...register("phone", { required: "Este campo es requerido" })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
              </div>
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

            {/* <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                {...register("acceptTerms", { required: "Debes aceptar los términos" })}
                className="mt-1"
              />
              <label className="text-sm">
                Acepto los términos y condiciones (texto dummy).
              </label>
            </div>
            {errors.acceptTerms && <p className="text-red-600 text-sm">{errors.acceptTerms.message}</p>}

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                {...register("acceptPolicy", { required: "Debes aceptar la política de privacidad" })}
                className="mt-2"
              />
              <label className="text-sm">
                Doy mi consentimiento para el tratamiento de mis datos personales asociados al curso tomado de acuerdo con los términos de la Política de Provacidad.
              </label>
            </div>
            {errors.acceptPolicy && <p className="text-red-600 text-sm">{errors.acceptPolicy.message}</p>} */}

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acepto los términos y condiciones.
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="consent" />
              <label
                htmlFor="consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Doy mi consentimiento para el tratamiento de mis datos personales asociados al curso tomado de acuerdo con los términos de la Política de Provacidad.
              </label>
            </div>

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
        )}
      </div>

      <section className="py-12 bg-yellow-400">
        <div className="container mx-auto px-4 grid md:grid-cols-2 items-center">
          {/* Left Column */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-black">¿Estás buscando una escuela de inglés en Irlanda?</h2>
            <p className="text-lg text-black">
              Encuentra la escuela de inglés que más se adecue a tus requisitos y necesidades 
              a través de nuestro filtro inteligente.
            </p>
            <a 
              href="/search-school" 
              className="inline-block px-6 py-3 bg-black text-white text-lg rounded-full"
            >
              Buscar escuela
            </a>
          </div>

          {/* Right Column */}
          <div className="relative">
            <Image 
              src="https://images.unsplash.com/photo-1604718584790-d12e1de37979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIxfHxnaXJsfGVufDB8fHx8fDE2NTg5NDEzMTY&ixlib=rb-1.2.1&q=80&w=400" 
              alt="Girl" 
              width={192} 
              height={192} 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 object-cover rounded-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}