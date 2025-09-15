import React from "react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const AboutUs = () => {
  return (
    <div className="w-full bg-white py-8 px-4 md:py-16 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Layout móvil y tablet: H2 → Imagen → Texto */}
        <div className="flex flex-col lg:hidden gap-6">
          {/* H2 primero en móvil y tablet */}
          <h2 className="text-4xl text-center font-black text-black">
            Quiénes somos
          </h2>

          {/* Imagen segundo en móvil y tablet */}
          <div className="relative w-full h-96 md:h-[450px]">
            <Image
              src={rewriteToCDN(
                "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/quienes-somos/Quie%CC%81nes+somos+Matchmycourse.png"
              )}
              alt="Estudiantes en clase de inglés"
              fill
              className="object-cover object-center rounded-2xl"
              sizes="100vw"
              quality={90}
              priority
            />
          </div>

          {/* Texto tercero en móvil y tablet */}
          <div>
            <p className="text-justify text-lg text-black leading-relaxed">
              MatchMyCourse es la evolución natural de Abroad Experience Chile,
              una agencia tradicional de estudios internacionales fundada en
              2020. Durante años, asesoramos personalmente a estudiantes que
              buscaban aprender inglés en el extranjero, acumulando más de 2.000
              asesorías personalizadas y construyendo una red de conocimiento
              directo con más de 40 escuelas en destinos como Irlanda, entre
              otros.
            </p>
          </div>
        </div>

        {/* Layout desktop: Imagen | Texto con H2 */}
        <div className="hidden lg:flex flex-row gap-8 lg:gap-12 items-center">
          {/* Imagen a la izquierda en desktop */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5]">
              <Image
                src={rewriteToCDN(
                  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/quienes-somos/Quie%CC%81nes+somos+Matchmycourse.png"
                )}
                alt="Estudiantes en clase de inglés"
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
            <h2 className="text-left text-5xl font-black text-black mb-6">
              Quiénes somos
            </h2>
            <p className="text-justify text-lg text-black leading-relaxed">
              MatchMyCourse es la evolución natural de Abroad Experience Chile,
              una agencia tradicional de estudios internacionales fundada en
              2020. Durante años, asesoramos personalmente a estudiantes que
              buscaban aprender inglés en el extranjero, acumulando más de 2.000
              asesorías personalizadas y construyendo una red de conocimiento
              directo con más de 40 escuelas en destinos como Irlanda, entre
              otros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;