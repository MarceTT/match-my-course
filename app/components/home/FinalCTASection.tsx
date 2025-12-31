import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FinalCTASection() {
  return (
    <section className="bg-[#283593] py-12 md:py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
          Busca tu curso de inglés en Irlanda y
          <br />
          encuentra tu escuela ideal ;)
        </h2>

        <Link href="/buscador-cursos-de-ingles?course=ingles-visa-de-trabajo">
          <Button
            size="lg"
            className="bg-[#FFCB03] hover:bg-[#e6b800] text-gray-900 font-semibold px-8 py-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Busca tu curso
          </Button>
        </Link>
      </div>
    </section>
  );
}
