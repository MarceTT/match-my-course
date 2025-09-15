import React from "react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const Experiencia = () => {
  return (
    <div className="w-full bg-white py-8 px-4 md:py-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Layout móvil y tablet: H2 → Imagen → Textos */}
        <div className="flex flex-col lg:hidden gap-6">
          {/* H2 primero en móvil y tablet */}
          <h2 className="text-4xl text-center font-black text-black">
            Nuestra experiencia y conocimiento
          </h2>

          {/* Imagen segundo en móvil y tablet - optimizada */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm md:max-w-md">
              <Image
                src={rewriteToCDN(
                  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/quienes-somos/Nuestra+experiencia+y+conocimiento+Matchmycourse.png"
                )}
                alt="Equipo de MatchMyCourse con experiencia internacional"
                width={550}
                height={600}
                className="w-full h-auto object-cover object-center rounded-2xl"
                sizes="(min-width: 768px) 384px, (min-width: 640px) 320px, 100vw"
                quality={90}
              />
            </div>
          </div>

          {/* Textos tercero en móvil y tablet */}
          <div className="flex flex-col justify-center">
            <p className="text-justify text-lg text-black leading-relaxed mb-6">
              Nuestro equipo no solo conoce el sector, sino que ha vivido en
              carne propia la experiencia, ya que todos han estudiado al menos
              seis meses en el extranjero, saben lo que significa buscar
              alojamiento, adaptarse a una nueva cultura y trabajar en países
              como Irlanda y Nueva Zelanda.
            </p>
            <p className="text-justify text-lg text-black leading-relaxed">
              Este conocimiento nos permite entender mejor las necesidades
              reales de los estudiantes.
            </p>
          </div>
        </div>

        {/* Layout desktop: Imagen | Texto con H2 */}
        <div className="hidden lg:flex flex-row gap-8 lg:gap-12 items-center">
          {/* Imagen a la izquierda en desktop - optimizada */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative w-full max-w-[380px] lg:max-w-[420px] aspect-[4/5]">
              <Image
                src={rewriteToCDN(
                  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/quienes-somos/Nuestra+experiencia+y+conocimiento+Matchmycourse.png"
                )}
                alt="Equipo de MatchMyCourse con experiencia internacional"
                fill
                className="object-contain object-center rounded-2xl"
                sizes="(min-width: 1024px) 420px, 100vw"
                quality={95}
                priority
              />
            </div>
          </div>

          {/* Contenido de texto a la derecha en desktop */}
          <div className="lg:w-3/5 flex flex-col justify-center">
            <h2 className="text-left text-4xl lg:text-5xl font-black text-black mb-6">
              Nuestra experiencia y conocimiento
            </h2>
            <p className="text-justify text-lg text-black leading-relaxed mb-6">
              Nuestro equipo no solo conoce el sector, sino que ha vivido en
              carne propia la experiencia, ya que todos han estudiado al menos
              seis meses en el extranjero, saben lo que significa buscar
              alojamiento, adaptarse a una nueva cultura y trabajar en países
              como Irlanda y Nueva Zelanda.
            </p>
            <p className="text-justify text-lg text-black leading-relaxed">
              Este conocimiento nos permite entender mejor las necesidades
              reales de los estudiantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiencia;