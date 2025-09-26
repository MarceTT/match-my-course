import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Users } from "lucide-react";
import { Globe } from "lucide-react";

const ResourcesSection = () => {
  return (
    <section className="mt-20 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Recursos Adicionales
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto md:text-lg">
          Continúa tu preparación con estos recursos complementarios para
          maximizar tu experiencia de estudios en el extranjero.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 - Blue to Purple Gradient */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <CardContent className="relative p-8 space-y-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Guías de Destinos</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Conoce todo sobre tu destino en nuestro Blog con información
              actualizada y consejos de expertos.
            </p>
            <Link
              href="/blog"
              target="_blank"
              className="inline-flex items-center text-white hover:text-blue-100 text-sm font-semibold group-hover:translate-x-1 transition-all duration-300"
            >
              Explorar destinos
              <span className="ml-2 group-hover:ml-3 transition-all duration-300">
                →
              </span>
            </Link>
          </CardContent>
        </Card>

        {/* Card 2 - Orange to Pink Gradient */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-orange-500 via-pink-500 to-rose-600 hover:from-orange-600 hover:via-pink-600 hover:to-rose-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <CardContent className="relative p-8 space-y-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Únete a nuestra comunidad
            </h3>
            <p className="text-orange-100 text-sm leading-relaxed">
              Conecta con otros estudiantes que quieren viajar al extranjero y
              comparte experiencias.
            </p>
            <Link
              href="https://chat.whatsapp.com/LZcWALJTjswHmNCNeCKQay?mode=ac_c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white hover:text-orange-100 text-sm font-semibold group-hover:translate-x-1 transition-all duration-300"
            >
              Unirse ahora
              <span className="ml-2 group-hover:ml-3 transition-all duration-300">
                →
              </span>
            </Link>
          </CardContent>
        </Card>

        {/* Card 3 - Green to Teal Gradient */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <CardContent className="relative p-8 space-y-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Asesorías gratuitas
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Recibe orientación personalizada para tu plan de estudios con
              nuestros expertos.
            </p>
            <Link
              href="/servicios"
              target="_blank"
              className="inline-flex items-center text-white hover:text-emerald-100 text-sm font-semibold group-hover:translate-x-1 transition-all duration-300"
            >
              Agendar cita
              <span className="ml-2 group-hover:ml-3 transition-all duration-300">
                →
              </span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ResourcesSection;
