import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const HeaderSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white mx-4 lg:mx-8">
            <h1 className="text-4xl text-center [text-shadow:0_8px_24px_rgba(88,28,135,0.45)] md:[text-shadow:0_8px_24px_rgba(88,28,135,0.45)] lg:text-left lg:text-5xl font-black leading-tight mb-6">
              Estudia inglés y trabaja en el extranjero
            </h1>
            <p className="text-lg text-center lg:text-left lg:text-xl mb-8 opacity-90 font-semibold">
              Encuentra lo que debes saber antes de tomar una decisión de
              estudio que cambiará tu vida
            </p>
          </div>

          {/* Right Content - Guide Image */}
          <div className="flex justify-center lg:justify-end relative mx-4 lg:mx-8">
            <div className="absolute top-10 right-20 z-20 transform -translate-y-24 lg:-translate-y-24 md:right-40 md:top-0">
              <div className="bg-white p-4 rounded-lg shadow-2xl max-w-sm">
                <Image
                  src={rewriteToCDN(
                    "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Estudia+ingle%CC%81s+en+el+extranjero+Ebook.jpg"
                  )}
                  alt="Guía para estudiar inglés y trabajar en el extranjero"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded"
                />
                <div className="flex justify-center mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg">
                    Descargar Guía
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
