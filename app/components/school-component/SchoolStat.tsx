import React from 'react'
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { GiWorld } from "react-icons/gi";
import { FaIdCardAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

interface SchoolStatsProps {
    nationalities: number
    spanishSpeakers: number
    averageAge: number
    testimonials: number
  }

const SchoolStat = ({nationalities, spanishSpeakers, averageAge, testimonials}: SchoolStatsProps) => {
  return (
    <div className="max-w-7xl mx-auto bg-gray-100 rounded-xl p-4">
      <div className="grid grid-cols-4 gap-8">
        <div className="flex items-center gap-3">
          <LiaGlobeAmericasSolid className="w-8 h-8 text-gray-600" />
          <div>
            <div className="font-bold text-xl">{nationalities}</div>
            <div className="text-xs text-gray-600">nacionalidades/año</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <GiWorld className="w-8 h-8 text-gray-600" />
          <div>
            <div className="font-bold text-xl">{spanishSpeakers}%</div>
            <div className="text-xs text-gray-600">hispanohablantes/año</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaIdCardAlt className="w-8 h-8 text-gray-600" />
          <div>
            <div className="font-bold text-xl">{averageAge} años</div>
            <div className="text-xs text-gray-600">Edad promedio</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CiStar className="w-8 h-8 text-gray-600" />
          <div>
            <div className="font-bold text-xl">{testimonials}</div>
            <div className="text-xs text-gray-600">testimonios</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolStat