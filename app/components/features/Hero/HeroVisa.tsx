import React from 'react'
import {raleway}from "../../../ui/fonts";
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';
import Image from 'next/image';

const HeroVisa = () => {
  const bgImage = rewriteToCDN(
    "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Nuestros-servicios-MatchMyCourse.webp"
  );

  return (
    <div className="relative overflow-hidden h-[70vh] md:h-[50vh] lg:h-[65vh] xl:h-[70vh] flex items-center justify-center">
      <Image
        src={bgImage}
        alt="Asesoría gratuita para visa de estudio y trabajo en el extranjero - MatchMyCourse"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`${raleway.className} text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 lg:mb-8 xl:mb-10`}
          >
            Asesoría gratuita para
            <div className="mt-1">la visa de estudio y trabajo</div>
          </h2>
          <p
            className={`${raleway.className} text-xl lg:text-xl text-white mb-8 font-light`}
          >
            Verifica si la visa de estudio de inglés y trabajo es para ti y si cumples o no con los requisitos y lo que se vendrá en destino
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroVisa;