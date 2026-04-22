"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const schoolImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Eleccio%CC%81n+personalizada+de+escuela+de+ingle%CC%81s+(1).jpg"
);

const visaImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Visa+de+estudio+y+documentos+legales.jpg"
);

export default function HowWeHelp() {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] leading-tight">
            ¿Cómo te ayudamos en{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MatchMyCourse
            </span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-16 lg:space-y-24">
          {/* Block 1: Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2F343D] mb-6">
                Elección personalizada de escuela de inglés
              </h3>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Tu experiencia en Irlanda dependerá en un 50% de elegir la mejor escuela para ti. Todas son diferentes y ofrecen diferentes servicios.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestro equipo conoce más de 35 escuelas y{" "}
                <strong className="text-[#2F343D]">te ayudaremos a elegir la escuela que más te representa.</strong>
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#FFCB03] hover:bg-[#e6b800] text-gray-900 font-semibold text-lg px-8 py-3 rounded-lg border-2 border-[#FFCB03] transition-all"
              >
                <Link href="#irlanda-form">Más información</Link>
              </Button>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={schoolImage}
                  alt="Elección personalizada de escuela de inglés"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  quality={80}
                />
              </div>
            </div>
          </div>

          {/* Block 2: Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={visaImage}
                  alt="Visa de estudio y documentos legales"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  quality={80}
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#2F343D] mb-6">
                Visa de estudio y documentos legales
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Te ayudamos a aplicar a la visa de estudiante y a revisar y gestionar todos los documentos legales para que sea aprobada.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#FFCB03] hover:bg-[#e6b800] text-gray-900 font-semibold text-lg px-8 py-3 rounded-lg border-2 border-[#FFCB03] transition-all"
              >
                <Link href="#irlanda-form">Más información</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
