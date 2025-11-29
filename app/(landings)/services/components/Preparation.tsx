import { Headphones } from "lucide-react";
import React from "react";
import Image from "next/image";

function Preparation() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
      <div className="relative w-full h-80 lg:h-96">
        <Image
          src="/images/Servicios-gratuitos-Matchmycourse-1.png"
          alt="Asesorías de preparación personalizadas para estudiar en el extranjero"
          fill
          className="rounded-lg object-cover"
          loading="lazy"
          quality={80}
        />
      </div>
      <div>
        <p className="text-lg text-black text-center md:text-right mb-2">Antes de viajar</p>
        <h2 className="text-4xl font-black text-black text-center md:text-right mb-6">Preparación</h2>
        <p className="text-xl text-black text-center md:text-right mb-6">
          Tendrás <span className="font-bold">asesorías personalizadas</span>{" "}
          para <br />Irlanda con nuestro equipo
        </p>

        {/* Callout Box */}
        <div className="relative mb-4">
          <div className="absolute top-1 -left-1 md:top-2 md:-left-2 w-full h-full bg-[#283593] rounded-lg border-1 border-[#283593]"></div>

          <div className="flex bg-white rounded-lg relative z-10 overflow-hidden">
            {/* Left side - Yellow background with icon */}
            <div className="bg-[#EDB93A] p-3 md:p-6 flex items-center justify-center min-w-[80px] md:min-w-[120px]">
              <Headphones className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>

            {/* Right side - Green background with text */}
            <div className="bg-[#4BC083] p-3 md:p-6 flex-1">
              <p className="text-black font-medium leading-relaxed text-sm md:text-base">
                Te orientamos en la preparación para <strong>estudiar en el extranjero</strong>: desde visas y alojamiento hasta
                consejos prácticos para tu llegada.<br />Nuestro objetivo es que viajes seguro(a) y sin estrés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preparation;
