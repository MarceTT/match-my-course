import React from 'react'
import Image from 'next/image'
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';



const NewExperience = () => {
  return (
    <section className="px-6 py-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Image */}
            <div className="overflow-hidden rounded-lg">
              <Image
                src={rewriteToCDN(
                  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Vive+una+experiencia+en+el+extranjero.png"
                )}
                alt="Grupo de estudiantes internacionales"
                width={500}
                height={500}
                className="w-full h-96 md:h-96 object-cover"
              />
            </div>

            {/* Right Content - Text */}
            <div>
              <h2 className="text-3xl text-center md:text-left lg:text-4xl font-black text-gray-900 mb-6">
                Vive una experiencia en el extranjero
              </h2>

              <p className="text-lg text-justify md:text-left lg:text-left text-gray-700 mb-6">
                ¿Te imaginas salir de tu zona de confort, conocer personas de distintas culturas y trabajar en otro
                país?
              </p>

              <p className="text-lg text-center md:text-left lg:text-left font-semibold text-gray-900 mb-6">¡Todo esto es posible!</p>

              <p className="text-gray-700 text-center md:text-left lg:text-left mb-4">
                Si estás pensando en vivir una experiencia en el extranjero y no sabes por dónde empezar, esta guía
                gratuita tiene la respuesta a esas preguntas que están rondando por tu cabeza.
              </p>

              <p className="text-gray-700 text-center md:text-left lg:text-left mb-4">
                Nuestros growers que han vivido en varios destinos, junto con el Content Team de GrowPro, han preparado
                esta guía para ti.
              </p>

              <p className="text-lg text-center md:text-left lg:text-left font-semibold text-gray-900">¡Entérate de todo lo que tienen para contarte!</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default NewExperience