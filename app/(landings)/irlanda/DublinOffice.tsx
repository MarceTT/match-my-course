"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DublinOffice() {
  return (
    <section className="py-16 lg:py-20 bg-[#1e3a5f]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Tenemos oficina en Dublín
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
            Matchmycourse es un portal con sede en Dublín. Contamos con muchos beneficios gratuitos que te permitirán vivir una mejor experiencia, desde pasajes hasta internet móvil para tus primeros días.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#FFCB03] hover:bg-[#e6b800] text-gray-900 font-semibold text-lg px-8 py-3 rounded-lg border-2 border-[#FFCB03] transition-all"
          >
            <Link href="#irlanda-form">Más información</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
