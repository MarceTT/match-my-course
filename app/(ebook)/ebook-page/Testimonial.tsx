import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Testimonial = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-8">
            Así es realmente estudiar y trabajar en el extranjero
          </h2>
          <div className="max-w-3xl mx-auto mb-8 space-y-4">
            <p className="text-lg md:text-xl lg:text-2xl text-black text-center leading-relaxed lg:whitespace-nowrap">
              <strong>Juan José</strong>, estudiante chileno, decidió dar el paso y estudiar inglés en Galway.
            </p>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 text-center leading-relaxed">
              En su experiencia podrás ver cómo es realmente vivir, estudiar y trabajar en otro país, y lo que puedes esperar si tomas esta decisión.
            </p>
          </div>

          {/* Video Thumbnail */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/62Ai5YvnJ7E"
                  title="Testimonio de Lilu - Killarney School of English"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <Button className="bg-[#5174fc] hover:bg-[#4257FF] text-white px-6 py-2 text-lg font-semibold rounded-md transition-colors">
            <Link href="/buscador-cursos-de-ingles?course=ingles-general" target="_blank">
              Quiero buscar mi escuela
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
