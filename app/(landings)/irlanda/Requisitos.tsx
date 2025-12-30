import React from 'react'
import Image from 'next/image'
import ScrollToTopButton from './ScrollToTopButton'

const requisitos = [
  {
    icon: '/images/respaldo_economico.webp',
    title: 'Requisito económico',
    subtitle: '€4.000',
    description: 'Debes demostrar que tienes acceso a al menos €4.000 euros al momento de registrar tu visa de estudio y trabajo en Irlanda.',
  },
  {
    icon: '/images/mayor_18.webp',
    title: 'Edad',
    subtitle: '+18 años',
    description: 'La visa de estudio y trabajo de Irlanda está disponible para mayores de 18 años de cualquier nacionalidad.',
  },
  {
    icon: '/images/seguro_medico.webp',
    title: 'Seguro médico',
    subtitle: 'Obligatorio',
    description: 'Es necesario contar con un seguro médico que cubra toda tu estadía en Irlanda. Te ayudamos a encontrar las mejores opciones.',
  },
  {
    icon: '/images/curso_ingles_pagado.webp',
    title: 'Curso de inglés pagado',
    subtitle: 'Escuela acreditada',
    description: 'Debes tener pagado al menos el 50% de tu curso de inglés en una escuela acreditada por el gobierno irlandés.',
  },
]

const Requisitos = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] mb-4 leading-tight">
            Requisitos para estudiar inglés en{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Irlanda
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Todas las personas mayores de 18 años pueden optar a la visa de estudio y trabajo de Irlanda.
            Estos son los requisitos mínimos que debes cumplir:
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {requisitos.map((req, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={req.icon}
                  alt={req.title}
                  width={48}
                  height={48}
                  className="brightness-0 invert"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#2F343D] mb-1">
                {req.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                {req.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {req.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <ScrollToTopButton className="inline-flex items-center gap-2 bg-[#FFCB03] hover:bg-[#e6b800] text-gray-900 font-semibold text-lg px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer">
            Agenda una asesoría gratuita
          </ScrollToTopButton>
        </div>
      </div>
    </section>
  )
}

export default Requisitos
