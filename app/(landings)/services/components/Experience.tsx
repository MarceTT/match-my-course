import React from "react";
import Image from "next/image";

const Experience = () => {
  const heading = "el 50% de tu experiencia depende de elegir bien tu escuela";

  return (
    <div className="mb-16">
      {/* Layout móvil: H2 → Imagen → Textos */}
      <div className="flex flex-col lg:hidden gap-6">
        {/* H2 primero en móvil */}
        <h2 className="text-3xl md:text-4xl font-black text-black leading-tight text-center">
          {heading}
        </h2>

        {/* Imagen segundo en móvil */}
        <div className="relative w-full h-64 sm:h-96">
          <Image
            src="/images/el-50-porciento-de-tu-experiencia-depende-de-elegir-bien-tu-escuela.png"
            alt="Grupo de estudiantes en clase de inglés"
            fill
            className="rounded-lg object-cover"
            loading="lazy"
            quality={80}
          />
        </div>

        {/* Textos tercero en móvil */}
        <div className="space-y-6 text-justify text-lg text-black leading-relaxed">
          <p>
            Todo lo que necesitas para tener una excelente experiencia en el
            extranjero comienza con{" "}
            <span className="font-bold text-black">
              elegir correctamente tu escuela de inglés
            </span>
            . Nuestros estudiantes están profundamente agradecidos por la
            asesoría y el apoyo personalizado que les brindamos, lo que les
            permitió seleccionar la opción más adecuada para ellos.
          </p>

          <p>
            Gracias a esto,{" "}
            <span className="font-bold text-black">
              disfrutan de una experiencia mucho más completa y enriquecedora
            </span>
            , a diferencia de quienes eligieron su curso sin considerar los
            aspectos clave de cada escuela.
          </p>
        </div>
      </div>

      {/* Layout desktop: Imagen | Texto con H2 */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
        {/* Imagen a la izquierda en desktop */}
        <div className="relative w-full h-96">
          <Image
            src="/images/el-50-porciento-de-tu-experiencia-depende-de-elegir-bien-tu-escuela.png"
            alt="Grupo de estudiantes en clase de inglés"
            fill
            className="rounded-lg object-cover"
            loading="lazy"
            quality={80}
          />
        </div>
        
        {/* Contenido de texto a la derecha en desktop */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-8 leading-tight">
            {heading}
          </h2>
          
          <div className="space-y-6 text-justify text-lg text-black leading-relaxed">
            <p>
              Todo lo que necesitas para tener una excelente experiencia en el
              extranjero comienza con{" "}
              <span className="font-bold text-black">
                elegir correctamente tu escuela de inglés
              </span>
              . Nuestros estudiantes están profundamente agradecidos por la
              asesoría y el apoyo personalizado que les brindamos, lo que les
              permitió seleccionar la opción más adecuada para ellos.
            </p>
            
            <p>
              Gracias a esto,{" "}
              <span className="font-bold text-black">
                disfrutan de una experiencia mucho más completa y enriquecedora
              </span>
              , a diferencia de quienes eligieron su curso sin considerar los
              aspectos clave de cada escuela.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;