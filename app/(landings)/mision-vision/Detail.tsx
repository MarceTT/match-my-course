"use client";
import React from "react";
import { Globe } from "lucide-react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const Detail = () => {
  return (
    <>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6">
          Misión y visión de
          <br />
          Matchmycourse
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-black leading-relaxed max-w-4xl mx-auto">
          En MatchMyCourse creemos en transformar la manera en que los
          estudiantes eligen dónde aprender inglés en el extranjero. Aquí
          compartimos nuestra misión, visión y los valores que nos guían cada
          día.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Mission */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/flags/irlanda.png"
                alt="Irlanda"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-black">
              Misión
            </h2>
          </div>
          <p className="text-black leading-relaxed text-lg">
            Conectar a las personas que quieren estudiar inglés en el extranjero
            con escuelas de idiomas que se adapten perfectamente a sus
            requisitos, utilizando herramientas tecnológicas innovadoras que
            optimicen el proceso de búsqueda y selección de manera precisa y
            eficiente.
          </p>
        </div>

        {/* Vision */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
            <Image
              src={rewriteToCDN(
                "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/mision-vision-images/tierra.webp"
              )}
              alt="Visión"
              width={100}
              height={100}
              className="rounded-full w-16 h-16 object-cover"
            />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800">
              Visión
            </h2>
          </div>
          <p className="text-black leading-relaxed text-lg">
            Ser la plataforma líder a nivel mundial en la búsqueda y comparación
            de escuelas de idiomas, reconocida por su capacidad para ofrecer a
            los estudiantes alternativas personalizadas que respondan a sus
            necesidades y objetivos.
          </p>
        </div>
      </div>
    </>
  );
};

export default Detail;
