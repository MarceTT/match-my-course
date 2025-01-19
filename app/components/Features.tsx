import React from 'react'
import Image from 'next/image'

const Features = () => {

    const features = [
        {
          image: '/features-images/online-course.png',
          text: 'Asesores gratuitas'
        },
        {
          image: '/features-images/visa.png',
          text: 'Requisitos visas de estudio'
        },
        {
          image: '/features-images/school.png',
          text: 'Busca una escuela a tu medida'
        },
        {
          image: '/features-images/online-course.png',
          text: 'Preparación e inserción en el extranjero'
        }
      ]
  return (
    <div className="container mx-auto px-6 py-12 flex flex-col bg-white lg:mt-6 rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
            <Image src={feature.image} width={48} height={48} className="mb-4 md:mb-0 md:mr-4 flex-shrink-0" alt={feature.text} />
            <p className="text-md text-gray-700 lg:mt-2">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features