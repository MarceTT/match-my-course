"use client";

import { Headphones } from "lucide-react";
import React from "react";

const Service = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
      {/* Left Side - School Cards */}
      <div className="hidden lg:block space-y-4">
        {/* School Card 1 */}
        <div className="rounded-lg p-4 flex items-center gap-4">
          <img
            src="/about-us/Utiliza-nuestro-filtro-para-buscar-tu-escuela-de-ingles-ideal.png"
            alt="Escuela de inglés ideal"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Right Side - Enrollment Section */}
      <div className="space-y-8">
        <div>
          <p className="text-lg text-center md:text-right text-black mb-2">
            Reserva tu cupo
          </p>
          <h2 className="text-4xl font-black text-black text-center md:text-right mb-4">
            Reserva
          </h2>
          <p className="text-xl text-center md:text-right text-black mb-6">
            a tu inicio de clases en la escuela que más se <br />
            adapte a tus necesidades
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
                  Con MatchMyCourse puedes reservar tu <strong>curso de inglés en el extranejor</strong> 
                  de forma rápida y segura.Accede a escuelas certificadas, compara precios
                  y asegura tu plaza con total transparencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
