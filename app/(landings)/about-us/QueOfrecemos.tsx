import React from "react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const QueOfrecemos = () => {
  return (
    <div className="w-full bg-white py-8 px-4 md:py-8 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Text section - Second on mobile, First on desktop */}
        <div className="order-1 lg:order-1">
          <div className="text-lg">
            <h2 className="text-4xl text-center md:text-left md:text-5xl font-black text-black mb-6">
              Qué ofrecemos
            </h2>
            <p className="text-justify text-lg text-black leading-relaxed md:text-justify mb-6">
              A partir de esta experiencia como agencia, identificamos un problema
              común en el modelo de negocio tradicional: es lento, poco
              transparente y restringe las opciones reales del mercado, mostrando
              solo unas pocas escuelas de las muchas disponibles.
            </p>
            <p className="text-justify text-lg text-black leading-relaxed md:text-justify mb-6">
              Por eso creamos MatchMyCourse, ahora como empresa irlandesa, para
              ofrecer una plataforma innovadora con información completa, rápida y
              transparente, donde las personas pueden acceder de forma directa a
              todos los detalles que necesitan para elegir su curso de inglés en
              el extranjero, sin intermediarios ni esperas innecesarias.
            </p>
            <p className="text-justify text-lg text-black leading-relaxed md:text-justify">
              Si necesitas ser asesorado, contamos con un equipo experto que te
              ayudará a salir de cualquier duda asociada a tu curso o escuela de
              inglés, así como ayudarte y apoyarte en todo el proceso de estudio,
              desde la gestión de tu matrícula hasta tu inserción en el
              extranjero.
            </p>
          </div>
        </div>

        {/* Image section - First on mobile, Second on desktop */}
        <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
          <Image
            src={rewriteToCDN(
              "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/quienes-somos/Que%CC%81+ofrecemos+Matchmycourse.png"
            )}
            alt="MatchMyCourse"
            width={500}
            height={800}
            className="w-full h-96 md:h-[550px] lg:h-[650px] object-contain rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default QueOfrecemos;