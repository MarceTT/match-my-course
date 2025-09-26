import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FilterWorksSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] mb-6 leading-tight">
            ¿Cómo funciona el filtro de
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MatchMyCourse?
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[6fr_6fr] gap-12 items-start">
          {/* Right Column - Process Steps (se muestra arriba en mobile) */}
          <div className="order-1 md:order-2 md:pl-8 lg:mt-12">
            <div className="space-y-6">
              {[
                "Primero ingresa al buscador de escuelas de inglés desde tu móvil, tablet o laptop",
                "Selecciona el curso de inglés que quieres realizar, puedes elegir los cursos de inglés general para corta o larga estadía y también cursos especializados",
                "Si lo deseas, selecciona la ciudad donde te gustaría estudiar inglés, hay más de 10 opciones",
                "Finalmente, selecciona cualquiera de las escuelas que ofrece tu curso de inglés",
                "En el detalle de la escuela, puedes conocer todos los detalles de tu curso y reservar tu inicio de clases",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Image
                    src="/about-us/marca-de-verificacion.png"
                    alt="Marca de verificación"
                    width={24}
                    height={24}
                    className="mt-1 w-8 h-8 object-contain"
                  />
                  <p className="text-[#2F343D] text-lg font-semibold lg:text-2xl">
                    {text
                      .split(" ")
                      .map((word, i) =>
                        /ingresa|Selecciona|reservar/.test(word) ? (
                          <strong key={i}>{word} </strong>
                        ) : (
                          `${word} `
                        )
                      )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Left Column - Filter Demo (se muestra abajo en mobile) */}
          <div className="order-2 md:order-1 space-y-6">
            <Image
              src="/about-us/Como_funciona_el_filtro_de_MatchMyCourse.png"
              alt="Fotos Google Business"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />

            <Button
              asChild
              className="block mx-auto w-fit items-center justify-center px-6 py-2 bg-[#5174fc] hover:bg-[#4257FF] text-white text-sm font-semibold rounded-md shadow transition"
            >
              <Link href="/school-search?course=ingles-general" target="_blank">
                Quiero buscar mi escuela
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterWorksSection;
