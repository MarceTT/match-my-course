import React from 'react'
import { TbMessageUser } from "react-icons/tb";
import { MdOutlineLaptopMac } from "react-icons/md";
import { TbHeartRateMonitor } from "react-icons/tb";
import { LuTicketsPlane } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";

const SchoolInclusion = () => {

    const servicios = [
      {
        icon: (
          <TbMessageUser className="w-full h-full text-black" />
        ),
        title: "Asesoría personalizada con experto",
      },
      {
        icon: (
          <MdOutlineLaptopMac className="w-full h-full text-black" />
        ),
        title: "Curso de inserción en Irlanda",
      },
      {
        icon: (
          <TbHeartRateMonitor className="w-full h-full text-black" />
        ),
        title: "Acceso a plataforma del estudiante",
      },
      {
        icon: (
          <LuTicketsPlane className="w-full h-full text-black" />
        ),
        title: "Pasaje de Dublin a destino",
      },
      {
        icon: (
          <FaWhatsapp className="w-full h-full text-black" />
        ),
        title: "Acceso a la comunidad",
      },
      {
        icon: (
          <GiSmartphone className="w-full h-full text-black" />
        ),
        title: "3GB datos móviles con Airalo",
      },
    ]
  return (
    <div className="space-y-8">
     <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center md:text-left text-black mb-16">
          ¿Qué servicios adicionales incluye tu reserva?
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {servicios.map((servicio, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">{servicio.icon}</div>
              <p className="text-center text-sm md:text-base">{servicio.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default SchoolInclusion