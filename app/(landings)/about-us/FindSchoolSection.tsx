import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FindSchoolSection = () => {
  return (
    <section className="py-16 bg-white lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 items-start lg:grid-cols-[5fr_7fr]">
          {/* Right Column - Benefits (Shown first on mobile) */}
          <div className="order-1 lg:order-2 lg:pl-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#2F343D] mb-6">
              Utiliza nuestro filtro para buscar tu escuela de inglés ideal
            </h2>

            <p className="text-lg font-bold text-[#2F343D] mb-8">
              Elige la escuela de inglés que{" "}
              <strong>
                más se ajuste a tus gustos, necesidades y requisitos
              </strong>
            </p>

            <div className="space-y-6">
              {[
                "Explora libremente más de 38 escuelas de inglés certificadas y acreditadas",
                "Nuestros precios son los mismos precios que manejan las escuelas de inglés o",
                "Nuestros precios son los mismos precios que manejan las escuelas de inglés o más baratos",
                "Podrás elegir de forma autónoma, sin depender de agencias o vendedores",
                "Manejamos información real y completa para que puedas decidir con confianza",
                "Nos puedes contactar gratuitamente para salir de cualquier duda o consulta respecto a qué escuela de inglés escoger",
              ].map((text, idx) => (
                <div className="flex items-start gap-3" key={idx}>
                  <Image
                    src="/about-us/marca-de-verificacion.png"
                    alt="Marca de verificación"
                    width={24}
                    height={24}
                    className="mt-1 w-8 h-8 object-contain"
                  />
                  <p className="text-[#2F343D] font-semibold">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Left Column - Image and Button (Shown second on mobile) */}
          <div className="order-2 lg:order-1 space-y-4">
            <Image
              src="/images/schools-for-partners.png"
              alt="Encuentra tu escuela"
              width={400}
              height={400}
              className="rounded-sm w-[95%] max-w-sm h-auto mx-auto"
            />
            <Button
              asChild
              className="block mx-auto w-fit px-6 py-2 bg-[#5174fc] hover:bg-[#4257FF] text-white text-sm font-semibold rounded-md mt-4 shadow transition"
            >
              <Link
                href="/school-search?course=ingles-visa-de-trabajo"
                target="_blank"
              >
                Encuentra tu escuela
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindSchoolSection;
