import React from 'react'
import { FiUsers, FiBookOpen, FiTarget } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";

const Features = () => {

    const features = [
        {
          icon: FiUsers,
          text: 'Asesores gratuitas'
        },
        {
          icon: FiBookOpen,
          text: 'Requisitos visas de estudio'
        },
        {
          icon: FiTarget,
          text: 'Busca una escuela a tu medida'
        },
        {
          icon: LuGraduationCap,
          text: 'Preparación e inserción en el extranjero'
        }
      ]
  return (
    <div className="container mx-auto px-6 py-12 flex flex-col bg-white mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
            <feature.icon className="h-12 w-12 mb-4 text-gray-700 md:mb-0 md:mr-4 flex-shrink-0" />
            <p className="text-md text-gray-700 lg:mt-2">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features