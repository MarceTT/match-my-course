import React from 'react'
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
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/d8kdb8MdYVo"
            title="Asesoría personalizada para estudiar y trabajar en Irlanda - Matchmycourse"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default PersonalizedAdviceSection