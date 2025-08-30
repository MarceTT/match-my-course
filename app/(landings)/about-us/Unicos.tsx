import React from "react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const Unicos = () => {
  return (
    <div className="w-full bg-white py-8 px-4 md:py-16 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
        <div className="order-2 md:order-1 md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl text-center md:text-left md:text-5xl font-black text-black mb-6">
            Qué nos hace únicos
          </h2>
          <ul className="space-y-4 text-black text-lg leading-relaxed">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Solo trabajamos con escuelas acreditadas y certificadas,
                autorizadas por el gobierno de cada país.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Antes de incorporar una escuela, realizamos un recorrido
                presencial para conocerla, evaluar su calidad y asegurarnos de que
                sea una buena opción para los estudiantes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span>
                De las más de 80 escuelas que existen en Irlanda, trabajamos solo
                con unas 40: aquellas en las que hemos podido garantizar calidad,
                seguridad y respaldo.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Apostamos por la transparencia, la actualización constante de la
                información y el empoderamiento del estudiante para que tome
                decisiones informadas.
              </span>
            </li>
          </ul>
        </div>
        <div className="order-1 md:order-2 md:w-1/2">
          <Image
            src={rewriteToCDN(
              "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/quienes-somos/Que%CC%81+nos+hace+u%CC%81nicos+Matchmycourse.png"
            )}
            alt="Qué nos hace únicos"
            width={550}
            height={600}
            className="w-full h-96 md:h-[460px] lg:h-[480px]object-contain rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Unicos;
