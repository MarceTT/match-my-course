// app/components/NewExperience.tsx
"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import Image from "next/image";

const NewExperience = () => {
  const src =
    rewriteToCDN(
      "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Vive+una+experiencia+en+el+extranjero.png"
    ) || "/placeholder.svg";

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:hidden gap-6">
          {/* H2 primero en móvil y tablet */}
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 text-center">
            Empieza a planificar tu experiencia de estudio y trabajo en el extranjero
          </h2>

          {/* Imagen segundo en móvil y tablet */}
          <div className="relative w-full h-96">
            <Image
              src={src}
              alt="Grupo de estudiantes internacionales"
              fill
              draggable={false}
              className="bg-cover bg-center object-contain"
              sizes="(min-width: 640px) 90vw, 100vw"
              priority
              quality={95}
            />
          </div>

          {/* Textos tercero en móvil y tablet */}
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-6 lg:text-xl">
              ¿Te imaginas vivir, estudiar y trabajar en otro país mientras mejoras tu inglés?
            </p>
            <p className="text-lg font-semibold text-gray-900 mb-6 lg:text-xl">
              Es una experiencia que puede cambiar tu vida, pero también es normal no saber por dónde empezar.
            </p>
            <p className="text-gray-700 mb-4 lg:text-xl">
              Esta guía gratuita te ayudará a entender tus opciones y comparar destinos como Irlanda y Nueva Zelanda para tomar una mejor decisión.
            </p>
            <p className="text-gray-700 mb-4 lg:text-xl">
              Fue creada a partir de la experiencia real de estudiantes internacionales y el equipo de MatchMyCourse.
            </p>
            <p className="text-lg font-semibold text-gray-900 lg:text-xl">
              Descárgala y da el primer paso para vivir tu experiencia en el extranjero.
            </p>
          </div>
        </div>
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
          {/* Texto */}
          <div className="order-1 lg:order-2 lg:col-span-6 text-center lg:text-left lg:mx-auto lg:mr-20">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6 text-center lg:text-left">
              Empieza a planificar tu experiencia de estudio y trabajo en el extranjero
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-center lg:text-justify lg:text-xl">
              ¿Te imaginas vivir, estudiar y trabajar en otro país mientras mejoras tu inglés?
            </p>
            <p className="text-lg font-semibold text-gray-900 mb-6 text-center lg:text-justify lg:text-xl">
              Es una experiencia que puede cambiar tu vida, pero también es normal no saber por dónde empezar.
            </p>
            <p className="text-gray-700 mb-4 text-center lg:text-justify lg:text-xl">
              Esta guía gratuita te ayudará a entender tus opciones y comparar destinos como Irlanda y Nueva Zelanda para tomar una mejor decisión.
            </p>
            <p className="text-gray-700 mb-4 text-center lg:text-justify lg:text-xl">
              Fue creada a partir de la experiencia real de estudiantes internacionales y el equipo de <strong>MatchMyCourse</strong>.
            </p>
            <p className="text-lg font-semibold text-gray-900 mb-6 text-center lg:text-justify lg:text-xl">
              Descárgala y da el primer paso para vivir tu experiencia en el extranjero.
            </p>
          </div>

          {/* Imagen */}
          <div className="order-2 lg:order-1 lg:col-span-6 relative w-full h-96 lg:h-[500px]">
            <Image
              src={src}
              alt="Grupo de estudiantes internacionales"
              fill
              draggable={false}
              className="bg-cover bg-center object-contain"
              sizes="(min-width: 1024px) 600px, (min-width: 640px) 90vw, 100vw"
              priority
              quality={95}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewExperience;
