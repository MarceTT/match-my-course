import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookUser } from "lucide-react";
import PillsBadges from "./PillsBadges";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const imgWhyNZ = rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/landing-nueva-zelanda/Por+que%CC%81+estudiar+ingle%CC%81s+en+Nueva+Zelanda.jpg");

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

        {/* Dos columnas iguales en desktop y misma altura */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 lg:gap-0 items-stretch">
          {/* Right Column - Process Steps (se muestra arriba en mobile) */}
          <div className="order-1 md:order-2 md:pl-0 lg:pl-0 text-justify h-full flex flex-col justify-center">
            <div className="space-y-4">
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
                    width={28}
                    height={28}
                    className="mt-1 w-7 h-7 object-contain"
                  />
                  <p className="text-[#2F343D] text-lg md:text-xl lg:text-2xl leading-relaxed">
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
          <div className="order-2 md:order-1 space-y-4 md:pr-0 lg:pr-0 h-full flex">
            <div className="relative w-full h-full">
              <Image
                src={imgWhyNZ}
                alt="Fotos Google Business"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
        <PillsBadges />
      </div>
    </section>
  );
};

export default WhyNZ;
