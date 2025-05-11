import React from 'react'
import Image from 'next/image'
import Picture from "@/public/images/placeholder_img.svg"
import DialogSection from '@/app/components/servicios/DialogSection'

const PersonalizedAdviceSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="mx-auto text-center">
          <h2 className="text-5xl lg:text-5xl font-bold leading-tight">
            Asesoría Personalizada
          </h2>
          <p className="text-xl text-gray-700 max-w-xl mx-auto lg:mx-0 mt-4">
            Toma tu asesoría personalizada y{" "}
            <span className="font-black">
              te devolvemos el valor si tomas uno de los cursos de inglés
            </span>{" "}
            con nosotros
          </p>
          <div className="flex justify-center mt-8">
            <DialogSection />
          </div>
        </div>
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={Picture}
              alt="Video call interface"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute right-4 top-4 space-y-2 w-32">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="aspect-video bg-gray-800 rounded overflow-hidden"
              >
                <Image
                  src={Picture}
                  alt={`Participant ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PersonalizedAdviceSection