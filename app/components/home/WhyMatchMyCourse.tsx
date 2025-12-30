import Image from "next/image";

const benefits = [
  {
    image: "/home-icons/reserva.png",
    alt: "Matrícula preferencial",
    title: "Matrícula preferencial",
    description: (
      <>
        <span className="font-bold">Aseguramos tu inicio de clases</span> cuando
        quieras, gracias a nuestra representación preferencial
      </>
    ),
  },
  {
    image: "/home-icons/visa.png",
    alt: "Apoyo legal",
    title: "Apoyo legal",
    description: (
      <>
        Contamos con un equipo profesional que te apoyará en la gestión de tus{" "}
        <span className="font-bold">visados</span> y{" "}
        <span className="font-bold">trámites internacionales</span>
      </>
    ),
  },
  {
    image: "/home-icons/casa.png",
    alt: "Alojamiento seguro",
    title: "Alojamiento seguro",
    description: (
      <>
        <span className="font-bold">Aseguramos tu alojamiento</span> a tu
        llegada a Irlanda para que viajes con mayor tranquilidad
      </>
    ),
  },
  {
    image: "/home-icons/user.png",
    alt: "Acompañamiento para tu llegada",
    title: "Acompañamiento para tu llegada",
    description: (
      <>
        <span className="font-bold">Te acompañamos durante todo el proceso</span>
        , desde la compra de tu pasaje hasta el término de tu curso
      </>
    ),
  },
  {
    image: "/home-icons/dolar.png",
    alt: "Ofertas únicas",
    title: "Ofertas únicas",
    description: (
      <>
        Ofrecemos{" "}
        <span className="font-bold">precios iguales o más económicos</span> que
        las escuelas de inglés
      </>
    ),
  },
  {
    image: "/home-icons/bus.png",
    alt: "Beneficios extras",
    title: "Beneficios extras",
    description: (
      <>
        <span className="font-bold">Te regalamos</span> internet
        para tu llegada, tu chip telefónico, pasaje a tu ciudad destino y mucho
        más!
      </>
    ),
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
