import React from "react";

const Experience = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-16 mb-16 items-center">
      {/* Left Column - Image */}
      <div className="order-1 md:order-1 lg:order-1">
        <img
          src="/images/el-50-porciento-de-tu-experiencia-depende-de-elegir-bien-tu-escuela.png"
          alt="Grupo de estudiantes en clase"
          className="rounded-lg w-full h-auto"
        />
      </div>
      
      {/* Right Column - Text */}
      <div className="order-1 md:order-2 lg:order-2 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-8 leading-tight">
          el 50% de tu experiencia depende de elegir bien tu escuela
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
  );
};

export default Experience;