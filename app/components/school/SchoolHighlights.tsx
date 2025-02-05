import React from 'react'
import { CiStar } from "react-icons/ci";

interface Highlight {
    position: number
    description: string
  }


  const highlights: Highlight[] = [
    {
      position: 2,
      description: "de las escuelas con más certificaciones de calidad de la educación",
    },
    {
      position: 3,
      description: "de las escuelas con instalaciones más completas",
    },
    {
      position: 5,
      description: "de las escuelas de Irlanda con menos porcentaje de alumnos de habla hispana",
    },
  ]

const SchoolHighlights = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Escuela destaca en</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <CiStar className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </div>
            <div>
              <div className="font-semibold mb-1">Puesto Nº{highlight.position}</div>
              <p className="text-sm text-gray-600">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block lg:divide-y-2 lg:divide-gray-300 lg:mt-10">
      <div></div>
      <div></div>
    </div>
    </div>
  )
}

export default SchoolHighlights