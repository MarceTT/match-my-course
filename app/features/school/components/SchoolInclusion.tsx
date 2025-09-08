import React from 'react'
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import Image from "next/image";

const SchoolInclusion = () => {

  const servicios = [
    {
      image: "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/ASESORIAGRATUITA.svg",
      title: "Asesorías preparativas con un experto",
    },
    {
      image: "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/bus-alt.svg",
      title: "Pasaje en Bus de Dublín a destino",
    },
    {
      image: "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/lesson.svg",
      title: "Acceso a la comunidad",
    },
    {
      image: "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/phone-heart-message.svg",
      title: "3GB datos móviles con Airalo",
    },
  ];
  return (
    <div className="space-y-8">
     <div className="w-full py-12 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center md:text-left text-black mb-16">
        ¿Qué servicios adicionales incluye tu reserva con la escuela?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {servicios.map((servicio, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <Image
                  src={rewriteToCDN(servicio.image)}
                  alt={servicio.title}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
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