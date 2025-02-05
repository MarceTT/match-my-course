import React from 'react'
import Image from "next/image"
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const SchoolInclusion = () => {

    const basicInclusions = ["Matrícula", "Materiales", "Seguro médico", "Seguro PEL", "Examen obligatorio de salida"]

  const additionalInclusions = [
    {
      icon: "/images/placeholder_img.svg",
      title: "Asesoría personalizada con experto",
    },
    {
      icon: "/images/placeholder_img.svg",
      title: "Curso de inserción en Irlanda",
    },
    {
      icon: "/images/placeholder_img.svg",
      title: "Acceso a plataforma del estudiante",
    },
    {
      icon: "/images/placeholder_img.svg",
      title: "Traslado Dublin a destino",
    },
    {
      icon: "/images/placeholder_img.svg",
      title: "Acceso a la comunidad",
    },
    {
      icon: "/images/placeholder_img.svg",
      title: "SIM para móviles con Airalo",
    },
  ]
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          El curso incluye
          <span className="ml-2 text-gray-400 text-sm">(i)</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {basicInclusions.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <IoMdCheckmarkCircleOutline className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Además tendrás incluido</h3>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          {additionalInclusions.map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <Image src={item.icon || "/placeholder.svg"} alt={item.title} fill className="object-contain" />
              </div>
              <p className="text-xs text-gray-600">{item.title}</p>
              <span className="text-gray-400 text-xs">(i)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SchoolInclusion