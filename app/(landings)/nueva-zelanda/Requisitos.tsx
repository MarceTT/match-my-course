import React from 'react'
import Image from 'next/image'

const Requisitos = () => {
  return (
     <section className="w-full bg-[#4B55A5] text-white py-16 overflow-x-clip">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">Requisitos para estudiar inglés en Nueva Zelanda</h2>
              <p className="text-lg md:text-xl lg:text-2xl mt-6">Todas las personas sobre 17 años pueden optar a la visa de estudio y trabajo de Nueva Zelanda.
                Es necesario que los alumnos que postulan cumplan con los requisitos mínimos que se muestran en la tabla
              </p>
            </div>
    
            <div className="grid md:grid-cols-5 gap-8">
              {/* Service 1 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/images/visa.png" alt="Permiso de residencia temporal" width={150} height={150} className="brightness-0 invert" />
                </div>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                  Acompañamiento en la solicitud del Permiso de Residencia Temporal
                  de 8 meses
                </p>
              </div>
    
              {/* Service 2 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/images/bus-alt.svg" alt="Permiso de residencia temporal" width={150} height={150} className="brightness-0 invert" />
                </div>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                  Ticket gratuito desde el aeropuerto de Dublín a tu ciudad
                </p>
              </div>
    
              {/* Service 3 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/images/phone-heart-message.svg" alt="Permiso de residencia temporal" width={150} height={150} className="brightness-0 invert" />
                </div>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                  Datos móviles para que llegues a Irlanda con internet desde tu
                  aterrizaje
                </p>
              </div>
    
              {/* Service 4 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/images/atencion-al-cliente.png" alt="Permiso de residencia temporal" width={150} height={150} className="brightness-0 invert" />
                </div>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                  Asistencia virtual 24/7 ante cualquier duda o consulta
                </p>
              </div>
    
              {/* Service 5 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/images/libro-de-tapa-negra-cerrado.png" alt="Permiso de residencia temporal" width={150} height={150} className="brightness-0 invert" />
                </div>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                  Apoyo para la emisión y gestión de cuenta bancaria, impuestos, PPS
                  Number y otros
                </p>
              </div>
            </div>
          </div>
        </section>
  )
}

export default Requisitos
