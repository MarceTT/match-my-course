import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FeaturedSchoolsSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Content Section - Left */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                Encuentra y compara escuelas de inglés en Irlanda en un solo lugar
              </h2>

              <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                Compara cursos de inglés en Irlanda y{" "}
                <strong>
                  elige la escuela que mejor se adapte a tus objetivos
                </strong>
                , presupuesto y estilo de vida.
              </p>

              <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                Explora más de 35 escuelas certificadas, revisa precios oficiales
                sin costos ocultos y{" "}
                <strong>
                  encuentra toda la información que necesitas
                </strong>{" "}
                para tomar una decisión con confianza.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/buscador-cursos-de-ingles?course=ingles-general"
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="bg-[#FFCB03] hover:bg-[#e6b800] text-gray-900 font-bold px-10 py-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Conoce los cursos
                </Button>
              </Link>
            </div>
          </div>

          {/* School Cards Image - Right */}
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-md lg:max-w-lg">
              <Image
                src="/images/schools-for-partners.png"
                alt="Escuelas de inglés en Irlanda - Centre of English Studies, Apollo Language Centre, Emerald Cultural Institute"
                width={500}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            <Link href="/escuelas">
              <Button
                size="lg"
                className="bg-[#283593] hover:bg-[#1a237e] text-white font-semibold px-8 py-5 text-base rounded-lg transition-all"
              >
                Encuentra tu escuela
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
