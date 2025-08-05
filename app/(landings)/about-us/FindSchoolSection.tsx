import React from "react";
import Image from "next/image";

const FindSchoolSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 items-start">
          {/* Left Column - School Cards */}
          <div className="space-y-4">
            <Image
              src="/images/schools-for-partners.png"
              alt="Encuentra tu escuela"
              width={400}
              height={400}
              className="rounded-sm w-[95%] max-w-sm h-auto mx-auto"
            />

            {/* Find School Button */}
            <button className="mx-auto block px-6 py-2 bg-[#5174FC] hover:bg-[#5174FC] text-white text-sm font-semibold rounded-lg mt-4 shadow transition">
              Encuentra tu escuela
            </button>
          </div>

          {/* Right Column - Benefits */}
          <div className="lg:pl-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Utiliza nuestro filtro para buscar tu escuela de inglés ideal
            </h2>

            <p className="text-lg font-bold text-gray-700 mb-8">
              Elige la escuela de inglés que{" "}
              <strong>
                más se ajuste a tus gustos, necesidades y requisitos
              </strong>
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <p className="text-gray-700 font-bold">
                  <strong>Explora libremente</strong> más de 38 escuelas de
                  inglés certificadas y acreditadas
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <p className="text-gray-700 font-bold">
                  <strong>Nuestros precios</strong> son los mismos precios que
                  manejan las escuelas de inglés o{" "}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <p className="text-gray-700 font-bold">
                  <strong>Nuestros precios</strong> son los mismos precios que
                  manejan las escuelas de inglés o <strong>más baratos</strong>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <p className="text-gray-700 font-bold">
                  Podrás elegir de forma autónoma,{" "}
                  <strong>sin depender de agencias o vendedores</strong>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <p className="text-gray-700 font-bold">
                  Manejamos información real y completa para que puedas{" "}
                  <strong>decidir con confianza</strong>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Image
                  src="/about-us/marca-de-verificacion.png"
                  alt="Marca de verificación"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <p className="text-gray-700 font-bold">
                  Nos puedes <strong>contactar gratuitamente</strong> para salir
                  de cualquier duda o consulta respecto a qué escuela de inglés
                  escoger
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindSchoolSection;
