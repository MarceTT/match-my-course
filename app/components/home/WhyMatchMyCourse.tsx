import Image from "next/image";

const benefits = [
  {
    image: "/home-icons/universidad.png",
    alt: "Variedad de escuelas",
    title: "Variedad de escuelas",
    description: "Compara más de 35 escuelas de inglés en Irlanda en un solo lugar",
  },
  {
    image: "/home-icons/dolar.png",
    alt: "Precios oficiales",
    title: "Precios oficiales",
    description: "Accede a precios oficiales, iguales o más bajos que los de las escuelas",
  },
  {
    image: "/home-icons/reserva.png",
    alt: "Toda la información en un solo lugar",
    title: "Toda la información en un solo lugar",
    description: "Encuentra información clara y completa para tomar una decisión segura",
  },
  {
    image: "/home-icons/user.png",
    alt: "Elige sin presión",
    title: "Elige sin presión",
    description: "Elige tu curso con total autonomía, sin presión de vendedores",
  },
  {
    image: "/home-icons/casa.png",
    alt: "Asistencia gratuita",
    title: "Asistencia gratuita",
    description: "Recibe asesoría gratuita antes, durante y después de tu experiencia",
  },
  {
    image: "/home-icons/visa.png",
    alt: "Trámites legales",
    title: "Trámites legales",
    description: "Tramitamos a tus visas y permisos de residencia de forma gratuita",
  },
];

export default function WhyMatchMyCourse() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          <span className="">¿Por qué elegir un curso de inglés con</span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MatchMyCourse</span>?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    width={32}
                    height={32}
                    className="w-7 h-7"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
