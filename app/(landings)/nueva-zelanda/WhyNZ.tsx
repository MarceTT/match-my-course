import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookUser } from "lucide-react";
import PillsBadges from "./PillsBadges";

const WhyNZ = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] mb-6 leading-tight">
            ¿Por qué estudiar inglés en
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nueva Zelanda?
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-6 lg:gap-8 items-start">
          {/* Right Column - Process Steps (se muestra arriba en mobile) */}
          <div className="order-1 md:order-2 md:pl-4 lg:pl-6 lg:mt-12 text-justify">
            <div className="space-y-6">
              {[
                "Puedes estudiar inglés a tiempo completo con una visa de estudio de 4 a 12 meses de duración.",
                "Te desarrollarás en un ambiente multicultural ideal para aprender inglés y hacer contactos.",
                "Vivirás en uno de los países más seguros y desarrollados del mundo con paisajes increíbles durante toda tu estadía.",
                "La visa de estudio de Nueva Zelanda te permite vivir hasta 12 meses y trabajar hasta 25 horas a la semana durante todo el año.",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Image
                    src="/about-us/marca-de-verificacion.png"
                    alt="Marca de verificación"
                    width={24}
                    height={24}
                    className="mt-1 w-8 h-8 object-contain"
                  />
                  <p className="text-[#2F343D] text-lg leading-relaxed lg:text-2xl">
                    {text
                      .split(" ")
                      .map((word, i) =>
                        /ingresa|Selecciona|reservar/.test(word) ? (
                          <strong key={i}>{word} </strong>
                        ) : (
                          `${word} `
                        )
                      )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Left Column - Filter Demo (se muestra abajo en mobile) */}
          <div className="order-2 md:order-1 space-y-6 md:pr-2 lg:pr-4 md:max-w-xl">
            <Image
              src="/about-us/Como_funciona_el_filtro_de_MatchMyCourse.png"
              alt="Fotos Google Business"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        </div>
        <PillsBadges />
      </div>
    </section>
  );
};

export default WhyNZ;
