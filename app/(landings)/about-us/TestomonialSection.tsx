import React from 'react'
import Image from 'next/image'

const TestomonialSection = () => {
  return (
    <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] mb-6">
              Estudiantes que han elegido su escuela a través de Matchmycourse
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 - Victor Vidal y Ángela Cimma */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <p className="text-[#2F343D] text-lg mb-6 leading-relaxed">
                "Cuando decidimos estudiar un curso de inglés en Nueva Zelanda, nos sentíamos nerviosos, abrumados y
                desorientados. El apoyo brindado por la agencia nos ayudó a que nuestra experiencia fuera grata y que
                este proceso fuera más llevadero"
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src="/testimonials/angela-cimma.png"
                  alt="Victor Vidal y Ángela Cimma"
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Victor Vidal y Ángela Cimma</h4>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - María Prieto */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <p className="text-[#2F343D] text-lg mb-6 leading-relaxed">
                "Excelente servicio, pude elegir mi escuela de forma fácil y rápido y sin que nadie me presionara.
                Además, me apoyaron en la preparación e inserción en Irlanda, desde comprar el pasaje hasta la obtención
                de mi permiso de residencia, mil gracias"
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src="/testimonials/maria-prieto.png"
                  alt="María Prieto"
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-[#2F343D] text-lg">María Prieto</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default TestomonialSection