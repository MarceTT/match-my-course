import React from 'react'

const steps = [
  {
    number: 1,
    title: 'Agenda una reunión con nuestro equipo',
    description: 'Conversaremos sobre tus metas, presupuesto y preferencias para encontrar la mejor opción para ti.',
  },
  {
    number: 2,
    title: 'Súmate a la experiencia',
    description: 'Te ayudamos con todo el proceso: inscripción en la escuela, seguro médico y preparación pre-viaje.',
  },
  {
    number: 3,
    title: 'Inicia tus estudios en Irlanda',
    description: '¡Llegó el momento! Comienza tu aventura de estudio y trabajo en Irlanda con todo nuestro apoyo.',
  },
]

const StepsToStudy = () => {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] mb-4 leading-tight">
            ¿Estás listo para estudiar inglés en{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Irlanda?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Sigue estos 3 simples pasos para comenzar tu aventura
          </p>
        </div>

        {/* Steps Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Dotted line connecting circles - only visible on md+ */}
            <div className="hidden md:block absolute top-[60px] left-[16.66%] right-[16.66%] h-0 border-t-4 border-dashed border-[#FFD033] z-0" />

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  {/* Circle with number */}
                  <div className="relative mb-6">
                    <div className="w-[120px] h-[120px] rounded-full bg-[#4E71FC] flex items-center justify-center shadow-lg">
                      <span className="text-5xl font-black text-[#2F343D]">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-[#2F343D] mb-3 leading-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepsToStudy
