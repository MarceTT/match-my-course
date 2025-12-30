const steps = [
  {
    number: 1,
    title: "Encuentra tu escuela",
    description:
      "Encuentra tu curso y elige la escuela de inglés que más te guste dentro de toda la gama de escuelas que representamos",
  },
  {
    number: 2,
    title: "Reserva/escríbenos a través de la página de la escuela",
    description:
      "Expertos te contactarán de manera personalizada para ayudarte a responder cualquier duda o consulta que tengas",
  },
  {
    number: 3,
    title: "Inicia el proceso de matrícula",
    description:
      "Comenzamos el proceso de inscripción preferente y te unirás al programa MatchMyCourse de asistencia legal y técnica",
  },
];

export default function ProcessStepsSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
          ¿Estás listo para estudiar inglés en Irlanda?
        </h2>

        <div className="max-w-5xl mx-auto">
          {/* Steps Container */}
          <div className="relative">
            {/* Connecting Line - Desktop */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-[#FFD033]" />

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  {/* Number Circle */}
                  <div className="relative z-10 w-16 h-16 bg-[#4E71FC] rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-[#000000]">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
