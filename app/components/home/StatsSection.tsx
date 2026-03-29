import Image from "next/image";

const stats = [
  {
    image: "/home-icons/universidad.png",
    alt: "Escuelas",
    text: (
      <>
        Más de <span className="font-bold">35 escuelas</span> de inglés en Irlanda han confiado en nuestros servicios
      </>
    ),
  },
  {
    image: "/home-icons/user.png",
    alt: "Estudiantes",
    text: (
      <>
        Más de <span className="font-bold">2.000 estudiantes</span> han confiado en nosotros
      </>
    ),
  },
  {
    image: "/home-icons/mundo.png",
    alt: "Países",
    text: (
      <>
        Tenemos presencia en <span className="font-bold">más de 5 países</span>
      </>
    ),
  },
];

export default function StatsSection() {
  return (
    <section className="bg-[#283593] py-16 md:py-20">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-12 md:mb-16 max-w-3xl mx-auto">
          <span className="text-[#FFCB03]">
            Facilitamos la búsqueda
          </span>{" "}
          de cursos y escuelas de inglés en Irlanda
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center mb-6">
                <Image
                  src={stat.image}
                  alt={stat.alt}
                  width={100}
                  height={100}
                  className="w-20 h-20 md:w-24 md:h-24 brightness-0 invert"
                />
              </div>
              <p className="text-white text-lg text-center max-w-[200px]">
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
