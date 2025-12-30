import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const services = [
  {
    image: "/images/visa.png",
    alt: "Permiso de residencia temporal",
    title: "Acompañamiento en la solicitud del Permiso de Residencia Temporal de 8 meses",
  },
  {
    image: "/images/bus-alt.svg",
    alt: "Ticket gratuito",
    title: "Ticket gratuito desde el aeropuerto de Dublín a tu ciudad",
  },
  {
    image: "/images/phone-heart-message.svg",
    alt: "Datos móviles",
    title: "Datos móviles para que llegues a Irlanda con internet desde tu aterrizaje",
  },
  {
    image: "/images/atencion-al-cliente.png",
    alt: "Asistencia virtual",
    title: "Asistencia virtual 24/7 ante cualquier duda o consulta",
  },
  {
    image: "/images/libro-de-tapa-negra-cerrado.png",
    alt: "Apoyo gestión bancaria",
    title: "Apoyo para la emisión y gestión de cuenta bancaria, impuesto, PPS Number y otros",
  },
];

export default function TravelSupportSection() {
  return (
    <section className="bg-[#283593] py-12 md:py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-10">
          Durante el viaje te entregamos
          <br />
          atención y apoyo constante
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 mb-10">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center mb-4">
                <Image 
                  src={service.image} 
                  alt={service.alt} 
                  width={80} 
                  height={80} 
                  className="brightness-0 invert" 
                />
              </div>
              <p className="text-white text-sm md:text-base leading-snug">
                {service.title}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/buscador-cursos-de-ingles?course=ingles-general">
            <Button
              size="lg"
              className="bg-[#FFCB03] hover:bg-[#e6b800] text-gray-900 font-semibold px-8 py-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Busca tu curso
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
