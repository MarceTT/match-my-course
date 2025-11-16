import React from 'react'
import Image from 'next/image'
import { rewriteToCDN } from '@/app/utils/rewriteToCDN'

const imgSteps = rewriteToCDN(
    "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/landing-irlanda/Pasos+para+estudiar+y+trabajar+en+Irlanda.png"
)

const StetpsToStudy = () => {

    const steps = [
        {
          title: "PASO 1: ASESORÍA INICIAL GRATUITA",
          description:
            "Agenda tu primera asesoría, en donde analizaremos tu perfil de postulación y así tener claridad de las posibilidades que tienes de que tu visa sea aprobada.",
        },
        {
          title: "PASO 2: POSTULACIÓN GRATUITA",
          description:
            "Analizado tu perfil, postulamos a tu visa de forma gratuita, incluyendo un bono para tus traducciones de 100 dólares neozelandeses.",
        },
        {
          title: "PASO 3: PREPARACIÓN PRE VIAJE",
          description: "Te prepararemos de forma práctica para tu llegada por primera vez a Irlanda",
        },
        {
          title: "PASO 4: LLEGADA A IRLANDA",
          description:
            "Coordinaremos una junta con uno de nuestros encargados en Irlanda para presentarte la ciudad y entregarte datos importantes",
        },
      ]
  return (
    <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] mb-6 leading-tight">
          Pasos para estudiar y trabajar en
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Irlanda
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
        {/* Right Column - Process Steps (se muestra arriba en mobile) */}
        <div className="order-1 md:order-2 md:pl-0 text-justify h-full flex flex-col justify-center">
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt={`Paso ${idx + 1}`}
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <div>
                  <p className="text-[#2F343D] text-lg lg:text-xl font-bold leading-snug mb-2">
                    {step.title}
                  </p>
                  <p className="text-[#2F343D] text-lg lg:text-xl leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Column - Filter Demo (se muestra abajo en mobile) */}
        <div className="order-2 md:order-1 space-y-4 md:pr-0 h-full flex">
          <div className="relative w-full h-full">
            <Image
              src={imgSteps}
              alt="Pasos para estudiar y trabajar en Irlanda"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain rounded-lg"
              priority
              quality={80}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default StetpsToStudy
