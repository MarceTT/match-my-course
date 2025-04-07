import React from 'react'
import Image from 'next/image'

const Features = () => {

    const features = [
        {
          image: '/features-images/asesorias_gratis_PRINCIPAL.svg',
          text: 'Asesores gratuitas'
        },
        {
          image: '/features-images/COMO_FUNCIONA_PRINCIPAL.svg',
          text: 'Requisitos visas de estudio'
        },
        {
          image: '/features-images/MATCH_PRINCIPAL.svg',
          text: 'Busca una escuela a tu medida'
        },
        {
          image: '/features-images/BENEFICIOS_PRINCIPAL.svg',
          text: 'Preparación e inserción en el extranjero'
        }
      ]
  return (
    <div className="container mx-auto px-6 py-12 flex flex-col bg-white lg:mt-6 rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left group"
          >
            <div className="mb-4 md:mb-0 md:mr-4 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md rounded-full">
              <Image
                src={feature.image}
                width={48}
                height={48}
                alt={feature.text}
              />
            </div>
            <p className="text-md text-gray-700 lg:mt-2">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features