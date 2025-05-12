import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SchoolOptionsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 flex items-center flex-col md:flex-row">
        {/* Left side - (empty or could be an image later) */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <Image
            src="/images/schools-for-partners.png"
            alt={`Escuelas`}
            width={700}
            height={700}
            className="rounded-sm"
          />
        </div>

        {/* Right side - Content */}
        <div className="md:w-1/2 text-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">
            ¿En qué escuela estudiar?
          </h2>

          <p className="text-gray-500 text-lg font-bold">
            Representamos más de 40 escuelas de inglés <br /> en más de 10 ciudades de Irlanda
          </p>

          <p className="text-gray-600">
            A través de nuestro filtro inteligente, encuentra <br /> cuál es la escuela de inglés 
            que más se acerca a <br /> tus requisitos y necesidades.
          </p>

          <Button className="mt-2 bg-[#5371FF] hover:bg-[#4257FF] text-white text-base font-semibold" size="lg">
            Buscar escuela
          </Button>
        </div>
      </div>
    </section>
  )
}