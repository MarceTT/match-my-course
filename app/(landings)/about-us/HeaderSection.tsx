import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

export default function HeaderSection() {
  const bgUrl = rewriteToCDN(
    "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Fotos-portada-Matchmycourse-us.webp"
  );
  return (
    <section
      className="relative h-[70vh] md:h-[50vh] lg:h-[65vh] xl:h-[70vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-white text-3xl md:text-6xl font-extrabold text-center px-4 text-shadow">
              Encuentra tu escuela de forma fácil, rápida y sin intermediarios
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
