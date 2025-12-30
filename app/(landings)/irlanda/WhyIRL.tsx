import React from 'react'
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import ScrollToTopButton from './ScrollToTopButton';

const imgWhyIRL = rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/landing-irlanda/%C2%BFPor+que%CC%81+estudiar+ingle%CC%81s+en+Irlanda.png");

const benefits = [
  "Puedes estudiar inglés en escuelas de alta calidad y precios competitivos.",
  "Te desarrollarás en un ambiente multicultural ideal para aprender inglés y hacer contactos.",
  "Vivirás en uno de los países más seguros y desarrollados del mundo con paisajes increíbles durante toda tu estadía.",
  "Si lo deseas, puedes optar al permiso de estudio de inglés de larga estadía de 8 meses de duración y renovable dos veces más.",
];

const WhyIRL = () => {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] mb-4 leading-tight">
            Invierte en tu futuro,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              estudia inglés en Irlanda
            </span>
          </h2>
        </div>

        {/* Two columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full aspect-square max-w-md mx-auto lg:max-w-none">
              <Image
                src={imgWhyIRL}
                alt="Estudia inglés en Irlanda"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain rounded-2xl"
                priority
                quality={80}
              />
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <div className="space-y-6">
              {benefits.map((text, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-[#2F343D] text-lg md:text-xl leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <ScrollToTopButton className="inline-flex items-center gap-2 bg-[#FFCB03] hover:bg-[#e6b800] text-gray-900 font-semibold text-lg px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer">
                Quiero estudiar en Irlanda
              </ScrollToTopButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyIRL
