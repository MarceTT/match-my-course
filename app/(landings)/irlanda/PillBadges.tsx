"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const PillsBadges = () => {
  return (
    <>
      {/* Service highlights (mobile-first, single column, 3 blocks) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 sm:mt-20">
        {/* Item 1 */}
        <div className="relative mb-4">
          <div className="absolute top-1 -left-1 md:top-2 md:-left-2 w-full h-full bg-[#283593] rounded-lg border-1 border-[#283593]"></div>

          <div className="flex bg-white rounded-lg relative z-10 overflow-hidden">
            {/* Left side - Yellow background with icon */}
            <div className="bg-[#4E71FC] p-3 md:p-6 flex items-center justify-center min-w-[80px] md:min-w-[120px]">
              <Image src="/images/visa.png" alt="Permiso de residencia temporal" width={64} height={64} className="brightness-0 invert" />
            </div>

            {/* Right side - Green background with text */}
            <div className="bg-[#ECECEC] p-3 md:p-6 flex-1">
              <p className="text-black font-medium leading-relaxed text-sm md:text-base">
              No te preocupes de nada, <strong>te apoyamos paso a paso para que tu visa sea aprobada</strong>{" "}desde un inicio.
              </p>
            </div>
          </div>
        </div>
        <div className="relative mb-4">
          <div className="absolute top-1 -left-1 md:top-2 md:-left-2 w-full h-full bg-[#283593] rounded-lg border-1 border-[#283593]"></div>

          <div className="flex bg-white rounded-lg relative z-10 overflow-hidden">
            {/* Left side - Yellow background with icon */}
            <div className="bg-[#4E71FC] p-3 md:p-6 flex items-center justify-center min-w-[80px] md:min-w-[120px]">
              <Image src="/images/atencion-al-cliente.png" alt="Permiso de residencia temporal" width={64} height={64} className="brightness-0 invert" />
            </div>

            {/* Right side - Green background with text */}
            <div className="bg-[#ECECEC] p-3 md:p-6 flex-1">
              <p className="text-black font-medium leading-relaxed text-sm md:text-base">
             Tenemos reuniones <strong>gratuitas</strong> para conocerte y para abordar los próximos pasos en el destino.
              </p>
            </div>
          </div>
        </div>
        <div className="relative mb-4">
          <div className="absolute top-1 -left-1 md:top-2 md:-left-2 w-full h-full bg-[#283593] rounded-lg border-1 border-[#283593]"></div>

          <div className="flex bg-white rounded-lg relative z-10 overflow-hidden">
            {/* Left side - Yellow background with icon */}
            <div className="bg-[#4E71FC] p-3 md:p-6 flex items-center justify-center min-w-[80px] md:min-w-[120px]">
              <Image src="/images/NZCVService.png" alt="Permiso de residencia temporal" width={64} height={64} className="brightness-0 invert" />
            </div>

            {/* Right side - Green background with text */}
            <div className="bg-[#ECECEC] p-3 md:p-6 flex-1">
              <p className="text-black font-medium leading-relaxed text-sm md:text-base">
                Te apoyamos en la gestíon de documentos, inscripción, matrícula y mucho más.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <Button
          onClick={() => {
            const el = document.getElementById("asesoria-booking");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
              // Resaltar el contenedor por un instante
              const card = el.querySelector("div");
              const target = (card instanceof HTMLElement ? card : el) as HTMLElement;
              const highlight = [
                "ring-2",
                "ring-primary",
                "ring-offset-2",
                "ring-offset-white",
              ];
              target.classList.add(...highlight);
              setTimeout(() => {
                target.classList.remove(...highlight);
              }, 1200);
            }
          }}
          className="block mx-auto w-fit items-center justify-center px-16 py-1 bg-[#5174fc] hover:bg-[#4257FF] text-white text-xl font-semibold rounded-md shadow transition"
        >
          Asesoría gratuita
        </Button>
      </div>
    </>
  );
};

export default PillsBadges;
