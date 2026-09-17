import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PlacementTestCTASection() {
  return (
    <section className="bg-primary py-12 md:py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          ¿Sabes cuál es tu nivel de inglés?
        </h2>
        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Haz nuestro test de nivel gratuito: 25 preguntas, resultado inmediato
          de A1 a C1 y una recomendación para elegir tu curso ideal.
        </p>

        <Link href="/test-de-nivel-de-ingles">
          <Button
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Hacer el test gratis →
          </Button>
        </Link>
      </div>
    </section>
  );
}
