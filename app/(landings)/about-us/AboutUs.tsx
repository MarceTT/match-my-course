import React from "react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const AboutUs = () => {
  return (
    <div className="w-full bg-white py-8 px-4 md:py-16 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <Image
            src={rewriteToCDN(
              "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/quienes-somos/Quie%CC%81nes+somos+Matchmycourse.png"
            )}
            alt="Estudiantes en clase de inglés"
            width={550}
            height={600}
            className="w-full h-96 md:h-[300px] lg:h-[400px] rounded-2xl"
            priority
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl text-center md:text-left md:text-5xl font-black text-black mb-6">
            Quiénes somos
          </h2>
          <p className="text-justify text-lg text-black leading-relaxed md:text-justify">
            MatchMyCourse es la evolución natural de Abroad Experience Chile,
            una agencia tradicional de estudios internacionales fundada en 2020.
            Durante años, asesoramos personalmente a estudiantes que buscaban
            aprender inglés en el extranjero, acumulando más de 2.000 asesorías
            personalizadas y construyendo una red de conocimiento directo con
            más de 40 escuelas en destinos como Irlanda, entre otros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
