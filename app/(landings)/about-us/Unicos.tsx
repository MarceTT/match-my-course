import React from "react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const Unicos = () => {
  return (
    <div className="w-full bg-white py-8 px-4 md:py-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Layout móvil y tablet: H2 → Imagen → Lista */}
        <div className="flex flex-col lg:hidden gap-6">
          {/* H2 primero en móvil y tablet */}
          <h2 className="text-4xl text-center font-black text-black">
            Qué nos hace únicos
          </h2>
          
          {/* Imagen segundo en móvil y tablet - optimizada */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm md:max-w-md">
              <Image
                src={rewriteToCDN(
                  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/quienes-somos/Que%CC%81+nos+hace+u%CC%81nicos+Matchmycourse.png"
                )}
                alt="Qué nos hace únicos"
                width={550}
                height={600}
                className="w-full h-auto object-contain rounded-2xl"
                sizes="(min-width: 768px) 384px, (min-width: 640px) 320px, 100vw"
                quality={90}
              />
            </div>
          </div>
          
          {/* Lista tercero en móvil y tablet */}
          <div className="flex flex-col justify-center">
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
        </div>

        {/* Layout desktop: Texto con H2 | Imagen */}
        <div className="hidden lg:flex flex-row gap-8 lg:gap-12 items-center">
          {/* Contenido de texto a la izquierda en desktop */}
          <div className="lg:w-3/5 flex flex-col justify-center">
            <h2 className="text-left text-4xl lg:text-5xl font-black text-black mb-6">
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

          {/* Imagen a la derecha en desktop - optimizada */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative w-full max-w-[380px] lg:max-w-[420px]">
              <Image
                src={rewriteToCDN(
                  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/quienes-somos/Que%CC%81+nos+hace+u%CC%81nicos+Matchmycourse.png"
                )}
                alt="Qué nos hace únicos"
                width={550}
                height={600}
                className="w-full h-[550px] lg:h-[650px] object-contain object-center rounded-2xl"
                sizes="(min-width: 1024px) 420px, 100vw"
                quality={95}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unicos;