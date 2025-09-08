"use client";

import { Star, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Picture from "@/public/images/placeholder_img.svg";
import Image from "next/image";
import { raleway } from "@/app/ui/fonts";

interface Consultation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating: number;
}

const consultations: Consultation[] = [
  {
    id: "1",
    title: "Asesoría gratuita",
    subtitle: "Metodología cursos de inglés",
    description:
      "Conoce como se desarrollan los cursos de inglés y sus detalles",
    image: Picture,
    rating: 4.5,
  },
  {
    id: "2",
    title: "Asesoría gratuita",
    subtitle: "Alojamiento en Irlanda",
    description:
      "Ten claridad desde un principio antes de pagar un alojamiento",
    image: Picture,
    rating: 4.6,
  },
  {
    id: "3",
    title: "Asesoría gratuita",
    subtitle: "Visa de estudiante",
    description:
      "Descubre los requisitos y proceso para obtener tu visa de estudiante",
    image: Picture,
    rating: 4.8,
  },
  {
    id: "4",
    title: "Asesoría gratuita",
    subtitle: "Trabajo en Irlanda",
    description: "Información sobre oportunidades laborales para estudiantes",
    image: Picture,
    rating: 4.7,
  },
];

function ConsultationCard({ consultation }: { consultation: Consultation }) {
  return (
    <Card className="overflow-hidden bg-white rounded-lg shadow-md">
      <CardContent className="p-0">
        <div className="relative">
          {/* Thumbnail y Play Button */}
          <div className="relative aspect-video group">
            <Image
              src={consultation.image || "/placeholder.svg"}
              alt={consultation.subtitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-3">
            {/* Rating */}
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium mr-1">
                {consultation.rating.toFixed(1)}
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(consultation.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Títulos */}
            <h3 className="text-sm font-medium mb-1">{consultation.title}</h3>
            <h4 className="text-sm font-medium line-clamp-2 min-h-[2.5rem] mb-2">
              {consultation.subtitle}
            </h4>
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              {consultation.description}
            </p>

            {/* Etiqueta Gratis */}
            <div className="inline-block bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-full text-black">
              Gratis
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const RandomConsultations = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className={`text-5xl font-black text-center mb-12 ${raleway.className}`}>Otras asesorías</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {consultations.map((consultation) => (
          <ConsultationCard key={consultation.id} consultation={consultation} />
        ))}
      </div>
    </section>
  );
};

export default RandomConsultations;
