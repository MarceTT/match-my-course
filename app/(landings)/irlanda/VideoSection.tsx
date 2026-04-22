"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VideoSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#2F343D] text-center mb-6 leading-tight">
            ¿Qué es la visa de estudio y trabajo de Irlanda?
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 text-center mb-10 leading-relaxed">
            Si eres de <strong className="text-[#2F343D]">Chile, Argentina o México</strong>, puedes estudiar inglés en Irlanda por un mínimo de 8 y un máximo de 24 meses. Para esto, tienes que solicitar tu{" "}
            <strong className="text-[#2F343D]">visa de estudio y trabajo de Irlanda</strong> cumpliendo requisitos que verás a continuación.
          </p>

          {/* YouTube Video Embed */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
            <iframe
              src="https://www.youtube.com/embed/xQhKWx_kQTM?rel=0"
              title="¿Qué es la visa de estudio y trabajo de Irlanda?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#FFCB03] hover:bg-[#e6b800] text-gray-900 font-semibold text-lg px-8 py-4 rounded-full border-2 border-[#FFCB03] transition-all"
            >
              <Link href="#requisitos">Más información</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
