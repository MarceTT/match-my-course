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
    <div className="max-w-7xl mx-auto bg-gray-100 rounded-xl p-4 border border-gray-500">
      <div className=" grid grid-row gap-8 justify-center md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="flex items-center gap-3">
          <LiaGlobeAmericasSolid className="w-8 h-8 text-gray-600 lg:w-16 lg:h-16" />
          <div>
            <div className="font-bold text-xl">{nationalities}</div>
            <div className="text-md text-gray-800 font-semibold">nacionalidades/año</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <GiWorld className="w-8 h-8 text-gray-600 lg:w-16 lg:h-16" />
          <div>
            <div className="font-bold text-xl">{spanishSpeakers}%</div>
            <div className="text-md text-gray-800 font-semibold">hispanohablantes/año</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaIdCardAlt className="w-8 h-8 text-gray-600 lg:w-16 lg:h-16" />
          <div>
            <div className="font-bold text-xl">{averageAge} años</div>
            <div className="text-md text-gray-800 font-semibold">Edad promedio</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CiStar className="w-8 h-8 text-gray-600 lg:w-16 lg:h-16" />
          <div>
            <div className="font-bold text-xl">{testimonials}</div>
            <div className="text-md text-gray-800 font-semibold">testimonios</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolStat