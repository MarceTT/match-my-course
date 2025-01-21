import React from 'react'
import { GiBookmarklet } from "react-icons/gi";
import { CiWifiOn } from "react-icons/ci";
import { GiElevator } from "react-icons/gi";
import { LiaSprayCanSolid } from "react-icons/lia";
import { FaGamepad } from "react-icons/fa";
import { SiCoffeescript } from "react-icons/si";
import { GiPc } from "react-icons/gi";
import { BiAccessibility } from "react-icons/bi";

const Facilities = () => {

    const facilities = [
        [
          { icon: <GiBookmarklet className="w-5 h-5" />, name: "Biblioteca" },
          { icon: <CiWifiOn className="w-5 h-5" />, name: "Wifi" },
          { icon: <GiElevator className="w-5 h-5" />, name: "Ascensor" },
          { icon: <LiaSprayCanSolid className="w-5 h-5" />, name: "Dispensador" },
        ],
        [
          { icon: <FaGamepad className="w-5 h-5" />, name: "Recreación" },
          { icon: <SiCoffeescript className="w-5 h-5" />, name: "Café" },
          { icon: <GiPc className="w-5 h-5" />, name: "PC" },
          { icon: <BiAccessibility className="w-5 h-5" />, name: "Accesibilidad" },
        ],
      ]
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Instalaciones principales</h3>
      <div className="grid grid-cols-2 gap-x-12 gap-y-4">
        {facilities.map((column, colIndex) => (
          <div key={colIndex} className="space-y-4">
            {column.map((facility, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-600">
                {facility.icon}
                <span className="text-sm">{facility.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Facilities