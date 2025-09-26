import React from "react";
import { BookUser } from "lucide-react";
import { extractSlugEscuelaFromSeoUrl } from "../../../../lib/helpers/buildSeoSchoolUrl";

const Inscription = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
      {/* Text Section - Order 2 on mobile, Order 1 on desktop */}
      <div className="order-2 lg:order-1">
        <p className="text-lg text-center md:text-left text-black mb-2">
          Antes de viajar
        </p>
        <h2 className="text-4xl font-black text-center md:text-left text-black mb-6">
          Matrícula
        </h2>
        <p className="text-xl text-center md:text-left text-black mb-6">
          Realizamos todo el proceso de matrícula e inscripción a tu inicio de
          clases
        </p>

        {/* Callout Box */}
        <div className="relative mb-4">
          <div className="absolute top-1 -left-1 md:top-2 md:-left-2 w-full h-full bg-[#283593] rounded-lg border-1 border-[#283593]"></div>

          <div className="flex bg-white rounded-lg relative z-10 overflow-hidden">
            {/* Left side - Yellow background with icon */}
            <div className="bg-[#EDB93A] p-3 md:p-6 flex items-center justify-center min-w-[80px] md:min-w-[120px]">
              <BookUser className="w-8 h-8 md:w-16 md:h-16 text-white" />
            </div>

            {/* Right side - Green background with text */}
            <div className="bg-[#4BC083] p-3 md:p-6 flex-1">
              <p className="text-black font-medium leading-relaxed text-sm md:text-base">
                Te ayudamos con todo el proceso de matrícula para tu curso de
                inglés. Gestionamos documentos, coordinamos con la escuela y te
                acompañamos hasta recibir tu confirmación oficial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section - Order 1 on mobile, Order 2 on desktop */}
      <div className="order-1 lg:order-2">
        <img
          src="/images/Servicios-gratuitos-Matchmycourse.png"
          alt="Servicios gratuitos Matchmycourse"
          className="rounded-lg w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Inscription;
