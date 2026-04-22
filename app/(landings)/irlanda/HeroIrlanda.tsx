"use client";

import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const heroImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Estudiar+ingle%CC%81s+en+Irlanda+Matchmycourse.jpg"
);

export default function HeroIrlanda() {
  return (
    <section className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Estudiar inglés en Irlanda - Castillo irlandés"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={85}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight mb-6 [text-shadow:0_4px_16px_rgba(0,0,0,0.5)]">
          Estudia inglés en Irlanda
        </h1>
        <div className="inline-block bg-[#FFCB03] px-6 py-3 md:px-8 md:py-4">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
            Estudia inglés y trabaja con la visa de estudio y trabajo
          </p>
        </div>
      </div>
    </section>
  );
}
