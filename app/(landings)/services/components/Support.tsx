import { Bus, Calendar, CreditCard, Phone, Smartphone } from "lucide-react";
import Image from "next/image";
import React from "react";

const Support = () => {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#4B55A5] text-white py-16 mb-2">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-2xl md:text-3xl lg:text-4xl mb-2">Durante el viaje</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">Atención y apoyo constante</h2>
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
    </div>
  );
};

export default Support;