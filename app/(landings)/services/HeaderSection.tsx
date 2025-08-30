import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

export default function HeaderSection() {
  const bgUrl = rewriteToCDN(
    "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Servicios+Matchmycourse.jpg"
  );

  return (
    <section className="relative h-[70vh] md:h-[50vh] lg:h-[65vh] xl:h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-[#4B55A5] bg-opacity-90"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              Nuestros Servicios              
            </h1>
            <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed max-w-4xl mx-auto">
              Estamos aquí para facilitar tu elección de escuela de inglés y para entregarte <br />
              el mejor servicio de preparación para tu llegada y estadía en destino
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}