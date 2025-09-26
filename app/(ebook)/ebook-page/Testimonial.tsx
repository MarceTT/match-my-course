import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Testimonial = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-2">
            Conoce de cerca la experiencia de uno de
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-8">
            nuestros estudiantes en Galway
          </h2>
          <p className="text-lg md:text-lg lg:text-xl text-black mb-8 max-w-2xl mx-auto text-center md:text-center lg:text-center">
            Conoce a Juan Jose Hidalgo, estudiante chileno que decidió tomar un
            curso de inglés a través de nuestra plataforma
          </p>

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
            <Link href="/school-search?course=ingles-general" target="_blank">
              Quiero buscar mi escuela
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
