import React from 'react'
import Image from "next/image";
import LevelEnglishForm from './LevelForm';

const WrapperForm = () => {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 lg:py-24 md:mb-10">
      <div className="mx-auto max-w-7xl lg:mt-4 xl:mt-4">
        <div className="grid lg:grid-cols-[45%_55%] gap-6 lg:gap-8 mx-0 sm:mx-0 lg:mx-0 items-start">
        {/* Left Content - Benefits */}
        <div className="pr-0 mt-6 md:mt-8 lg:mt-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center font-black text-gray-900 mb-8 sm:mb-10 lg:text-left leading-tight">
            Y si te quieres ir a estudiar y a trabajar en el extranjero... te
            ayudamos a cumplirlo!
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-xl">
            ¿Por qué deberías rellenar este formulario?
          </p>
          <div className="space-y-6 sm:space-y-8 text-left lg:text-left mt-8">
            <div className="flex items-start gap-3 sm:gap-5">
              <Image
                src="/about-us/marca-de-verificacion.png"
                alt="Marca de verificación"
                width={24}
                height={24}
                className="mt-1 w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
              />
              <div>
                <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed lg:text-xl">
                  Ofrecemos una asesoría personalizada, sin compromiso y
                  totalmente gratuita a través de especialistas que ya han
                  vivido una experiencia similar en el extranjero.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-5">
              <Image
                src="/about-us/marca-de-verificacion.png"
                alt="Marca de verificación"
                width={24}
                height={24}
                className="mt-1 w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
              />
              <div>
                <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed lg:text-xl">
                  Olvidate del papeleo!.Nos encargamos de hacer todos los
                  tramites por ti (visado, seguros,...)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-5">
              <Image
                src="/about-us/marca-de-verificacion.png"
                alt="Marca de verificación"
                width={24}
                height={24}
                className="mt-1 w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
              />
              <div>
                <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed lg:text-xl">
                  Te asesoramos y apoyamos durante todo tu viaje, desde que
                  haces la reserva hasta que tu curso finaliza.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-5">
              <Image
                src="/about-us/marca-de-verificacion.png"
                alt="Marca de verificación"
                width={24}
                height={24}
                className="mt-1 w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
              />
              <div>
                <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed lg:text-xl">
                  Y lo mejor de todo... !No te cobramos extra El curso que
                  contrates con nosotros te costaría lo mismo que si lo
                  adquirieses por ti mismo.
                </p>
              </div>
            </div>
          </div>
        </div>
          <LevelEnglishForm />
        </div>
      </div>
    </section>
  )
}

export default WrapperForm
