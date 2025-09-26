import React from 'react'
import Image from 'next/image'

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
          description: "Te prepararemos de forma práctica para tu llegada por primera vez a Nueva Zelanda",
        },
        {
          title: "PASO 4: LLEGADA A NUEVA ZELANDA",
          description:
            "Coordinaremos una junta con uno de nuestros encargados en Nueva Zelanda para presentarte la ciudad y entregarte datos importantes",
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
            Nueva Zelanda
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[6fr_6fr] gap-12 items-start">
        {/* Right Column - Process Steps (se muestra arriba en mobile) */}
        <div className="order-1 md:order-2 md:pl-8 lg:mt-12 text-justify">
          <div className="space-y-6">
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
        <div className="order-2 md:order-1 space-y-6">
          <Image
            src="/about-us/Como_funciona_el_filtro_de_MatchMyCourse.png"
            alt="Fotos Google Business"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
  )
}

export default StetpsToStudy
