import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

export default function HeaderSection() {
  const bgUrl = rewriteToCDN(
    "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Fotos-portada-Matchmycourse-us.webp"
  );

  return (
    <section className="relative h-[70vh] md:h-[50vh] lg:h-[65vh] xl:h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105"
        style={{ 
          backgroundImage: `url(${bgUrl})`
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-45"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-white text-3xl md:text-6xl font-extrabold px-4 text-shadow">
              Encuentra tu escuela de inglés <br />
              de forma fácil, rápida y sin intermediarios
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
