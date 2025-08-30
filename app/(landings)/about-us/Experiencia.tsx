import React from "react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const Experiencia = () => {
  return (
    <div className="w-full bg-white py-8 px-4 md:py-16 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <Image
            src={rewriteToCDN(
              "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/quienes-somos/Nuestra+experiencia+y+conocimiento+Matchmycourse.png"
            )}
            alt="Equipo de MatchMyCourse con experiencia internacional"
            width={550}
            height={600}
            className="w-full h-96 md:h-[300px] lg:h-[430px] rounded-2xl"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl text-center md:text-left md:text-5xl font-black text-black mb-6">
            Nuestra experiencia y conocimiento
          </h2>
          <p className="text-justify text-lg text-black leading-relaxed md:text-justify mb-6">
            Nuestro equipo no solo conoce el sector, sino que ha vivido en carne
            propia la experiencia, ya que todos han estudiado al menos seis meses
            en el extranjero, saben lo que significa buscar alojamiento, adaptarse
            a una nueva cultura y trabajar en países como Irlanda y Nueva Zelanda.
          </p>
          <p className="text-justify text-lg text-black leading-relaxed md:text-justify">
            Este conocimiento nos permite entender mejor las necesidades reales de
            los estudiantes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experiencia;
