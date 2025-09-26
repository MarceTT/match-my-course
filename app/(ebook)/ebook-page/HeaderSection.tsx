"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const HeaderSection = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clipPath = isDesktop
    ? "polygon(100% 0%, 0% 0% , 0.00% 76.67%, 2.00% 76.84%, 4.00% 77.37%, 6.00% 78.22%, 8.00% 79.38%, 10.00% 80.79%, 12.00% 82.41%, 14.00% 84.18%, 16.00% 86.04%, 18.00% 87.92%, 20.00% 89.76%, 22.00% 91.48%, 24.00% 93.04%, 26.00% 94.37%, 28.00% 95.43%, 30.00% 96.18%, 32.00% 96.59%, 34.00% 96.65%, 36.00% 96.35%, 38.00% 95.71%, 40.00% 94.76%, 42.00% 93.51%, 44.00% 92.02%, 46.00% 90.35%, 48.00% 88.54%, 50.00% 86.67%, 52.00% 84.79%, 54.00% 82.99%, 56.00% 81.31%, 58.00% 79.82%, 60.00% 78.58%, 62.00% 77.62%, 64.00% 76.98%, 66.00% 76.69%, 68.00% 76.75%, 70.00% 77.16%, 72.00% 77.90%, 74.00% 78.96%, 76.00% 80.29%, 78.00% 81.85%, 80.00% 83.58%, 82.00% 85.41%, 84.00% 87.29%, 86.00% 89.15%, 88.00% 90.92%, 90.00% 92.54%, 92.00% 93.96%, 94.00% 95.11%, 96.00% 95.96%, 98.00% 96.49%, 100.00% 96.67%)"
    : "none";

  return (
    <div className="relative">
      <section
        className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-16 overflow-hidden"
        style={{ clipPath }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white flex flex-col justify-center mx-2 lg:mx-4">
              <h1 className="text-4xl text-center [text-shadow:0_8px_24px_rgba(88,28,135,0.45)] md:[text-shadow:0_8px_24px_rgba(88,28,135,0.45)] lg:text-start lg:text-5xl xl:text-6xl font-black leading-tight mb-6">
                Estudia inglés y trabaja en el extranjero
              </h1>
              <p className="text-lg text-center lg:text-start lg:text-xl xl:text-2xl mb-8 opacity-90 font-semibold leading-relaxed">
                Encuentra lo que debes saber antes de tomar una decisión de
                estudio que cambiará tu vida
              </p>
            </div>

            {/* Right Content - Mobile card only */}
            <div className="flex justify-center lg:hidden relative mx-2">
              <div className="w-full max-w-xs mx-auto">
                <div className="bg-white p-4 rounded-2xl shadow-2xl ring-1 ring-black/5">
                  <Image
                    src={
                      rewriteToCDN(
                        "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Estudia+ingle%CC%81s+en+el+extranjero+Ebook.jpg"
                      ) || "/placeholder.svg"
                    }
                    alt="Guía para estudiar inglés y trabajar en el extranjero"
                    width={500}
                    height={500}
                    className="w-full h-auto rounded"
                    priority
                    draggable={false}
                  />
                  <div className="flex justify-center mt-6">
                    <Button
                      className="bg-[#5174fc] hover:bg-[#4257FF] text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg"
                      onClick={() => {
                        const formulario =
                          document.getElementById("formulario-guia");
                        if (formulario) {
                          formulario.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
                    >
                      Descargar Guía
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop floating card - OUTSIDE the clipped section */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none z-50">
        <div className="relative h-full max-w-7xl mx-auto">
          <div className="absolute right-8 xl:right-40 lg:right-40 top-2/1 transform translate-y-8 pointer-events-auto">
            <div className="bg-white p-5 rounded-2xl shadow-2xl ring-1 ring-black/5 w-[360px] xl:w-[380px]">
              <Image
                src={
                  rewriteToCDN(
                    "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Estudia+ingle%CC%81s+en+el+extranjero+Ebook.jpg"
                  ) || "/placeholder.svg"
                }
                alt="Guía para estudiar inglés y trabajar en el extranjero"
                width={500}
                height={500}
                className="w-full h-auto rounded"
                priority
                draggable={false}
              />
              <div className="flex justify-center mt-6">
                <Button
                  className="bg-[#5174fc] hover:bg-[#4257FF] text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg"
                  onClick={() => {
                    const formulario =
                      document.getElementById("formulario-guia");
                    if (formulario) {
                      formulario.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  Descargar Guía
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
