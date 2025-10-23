import React from 'react'
import Image from 'next/image'

const Requisitos = () => {
  return (
     <section className="w-full bg-[#4B55A5] text-white py-16 overflow-x-clip">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">Requisitos para estudiar inglés en Irlanda</h2>
              <p className="text-lg md:text-xl lg:text-2xl mt-6">Todas las personas sobre 18 años pueden optar a la visa de estudio y trabajo de Irlanda.
                Es necesario que los alumnos que postulan cumplan con los requisitos mínimos que se muestran en la tabla
              </p>
            </div>
    
            <div className="grid md:grid-cols-4 gap-4">
              {/* Service 1 */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/images/mayor_18.webp" alt="Permiso de residencia temporal" width={200} height={200} className="brightness-0 invert" />
                </div>
                <p className="text-sm md:text-base lg:text-xl leading-relaxed">
                  Mayor de 18 
                </p>
              </div>
    
              {/* Service 2 */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/images/seguro_medico.webp" alt="Permiso de residencia temporal" width={200} height={200} className="brightness-0 invert" />
                </div>
                <p className="text-sm md:text-base lg:text-xl leading-relaxed">
                  Seguro médico
                </p>
              </div>
    
              {/* Service 3 */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/images/respaldo_economico.webp" alt="Permiso de residencia temporal" width={200} height={200} className="brightness-0 invert" />
                </div>
                <p className="text-sm md:text-base lg:text-xl leading-relaxed">
                  Respaldo económico
                </p>
              </div>
    
              {/* Service 4 */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/images/curso_ingles_pagado.webp" alt="Permiso de residencia temporal" width={200} height={200} className="brightness-0 invert" />
                </div>
                <p className="text-sm md:text-base lg:text-xl leading-relaxed">
                  Curso de inglés pagado
                </p>
              </div>
            </div>
          </div>
        </section>
  )
}

export default Requisitos
