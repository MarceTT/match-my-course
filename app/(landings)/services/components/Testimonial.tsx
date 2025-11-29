import React from "react";
import { Button } from "@/components/ui/button";

const Testimonial = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-2">
        Conoce de cerca la experiencia de uno de
      </h2>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-8">
        nuestros estudiantes en Galway
      </h2>
      <p className="text-lg md:text-lg lg:text-xl text-black mb-8 max-w-2xl mx-auto text-center">
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
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

      <Button className="bg-[#5174fc] hover:bg-[#4257FF] text-white px-8 py-3 text-lg font-semibold">
        Quiero buscar mi escuela
      </Button>
    </div>
  );
};

export default Testimonial;
