import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SchoolOptionsSection() {
  const router = useRouter()

  const goSearchSchool = () => {
    router.push('/school-search?course=ingles-general')
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-6 space-y-8 md:space-y-0 max-w-5xl">
        <div className="md:w-1/2">
          <Image
            src="/images/schools-for-partners.png"
            alt="Escuelas"
            width={600}
            height={600}
            className="rounded-sm w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-right space-y-2">
          <h2 className="text-4xl font-bold text-gray-800 lg:text-5xl">
            ¿En qué escuela estudiar?
          </h2>
          <p className="text-gray-500 text-lg text-center lg:text-center font-bold lg:text-2xl mt-2">
            Representamos más de 40 escuelas de inglés <br /> en más de 10 ciudades de Irlanda
          </p>
          <p className="text-gray-600 text-center lg:text-center lg:text-2xl mt-2">
            A través de nuestro filtro inteligente, encuentra <br /> cuál es la escuela de inglés 
            que más se acerca a <br /> tus requisitos y necesidades.
          </p>
          <div className="flex justify-center mt-2">
            <Button onClick={goSearchSchool} className="mt-2 bg-[#5371FF] hover:bg-[#4257FF] text-white text-base font-semibold lg:text-xl" size="lg">
              Buscar escuela
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}