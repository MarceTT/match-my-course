"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const benefits = [
  "Compara cursos en más de 35 escuelas de inglés de Irlanda",
  "Elige curso con autonomía y sin intermediarios",
  "Encuentra precios oficiales iguales o más bajos que el de las escuelas",
  <>
    Reserva gratis tu inicio de clases e inicia tu aventura con{" "}
    <span className="font-bold underline">asistencia profesional</span>
  </>,
];

interface VideoHeroSectionProps {
  youtubeVideoId?: string;
}

export default function VideoHeroSection({
  youtubeVideoId,
}: VideoHeroSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // YouTube thumbnail URL - maxresdefault for best quality
  const thumbnailUrl = youtubeVideoId
    ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`
    : null;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Section */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-900">
            {youtubeVideoId && isVideoPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1`}
                title="Video de presentación"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => youtubeVideoId && setIsVideoPlaying(true)}
              >
                {/* YouTube Thumbnail */}
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt="Video preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#283593] to-[#2d5a87]" />
                )}

                {/* Dark overlay for better play button visibility */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                {/* Play button */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-[#283593] ml-1" fill="#283593" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-tight">
              <span className="font-bold">Encuentra tu curso de inglés en{" "}
              <span className="text-[#283593]">Irlanda</span></span>{" "}
              <span className="font-normal">y las escuelas que lo ofrecen</span>
            </h2>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link href="/buscador-cursos-de-ingles?course=ingles-general" className="mt-4 inline-block">
              <Button
                size="lg"
                className="bg-[#FFCB03] hover:bg-[#e6b800] text-gray-900 font-semibold px-8 py-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Busca tu curso
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
