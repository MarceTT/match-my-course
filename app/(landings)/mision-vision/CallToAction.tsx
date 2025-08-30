"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="text-center mb-16">
      <p className="text-lg md:text-xl lg:text-2xl text-black italic leading-relaxed max-w-4xl mx-auto mb-12">
        Explora nuestras escuelas de inglés y elige tu curso ideal, de manera
        fácil, rápida y transparente, sin depender de intermediarios, con
        información confiable, segura y actualizada que te permitirá tomar la
        mejor decisión para tu experiencia en el extranjero.
      </p>

      {/* Illustration */}
      <div className="flex items-center justify-center gap-8 mb-8">
        {/* Left side - Mission/Vision image */}
        <div className="flex">
          <Image
            src={rewriteToCDN(
              "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/mision-vision-images/Misio%CC%81n-y-visio%CC%81n-.webp"
            )}
            alt="Misión y Visión"
            width={300}
            height={300}
          />
        </div>

        {/* Center - Double arrow */}
        <div className="flex items-center">
        <ArrowRightLeft className="w-8 h-8 md:w-24 md:h-24 text-black" />
        </div>

        {/* Right side - School logos (single image with all logos) */}
        <div className="flex">
          <Image
            src={rewriteToCDN(
              "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/mision-vision-images/Misio%CC%81n-y-visio%CC%81n-Matchmycourse_1.webp"
            )}
            alt="Logos de escuelas asociadas"
            width={300}
            height={300}
          />
        </div>
      </div>

      <Button className="bg-[#FF385C] hover:bg-[#E51D58] text-white px-8 py-6 rounded-lg text-lg md:text-xl lg:text-2xl">
        <Link href="/school-search?course=ingles-general" target="_blank">
          Buscar mi escuela
        </Link>
      </Button>
    </div>
  );
};

export default CallToAction;
