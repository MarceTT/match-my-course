import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

export default function HeaderSection() {
  const bgUrl = rewriteToCDN(
    "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/landing-irlanda/Estudiar+y+trabajar+en+Irlanda%2C+estudiar+ingle%CC%81s+en+Irlanda%2C+cursos+de+ingle%CC%81s+en+Irlanda.jpg"
  );

  return (
    <section className="relative h-[70vh] md:h-[50vh] lg:h-[65vh] xl:h-[70vh] overflow-hidden">
      <Image
        src={bgUrl}
        alt="Estudiar Inglés en Irlanda | MatchMyCourse"
        fill
        className="absolute inset-0 object-cover scale-105"
        priority
        quality={80}
        sizes="100vw"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-white text-3xl md:text-6xl font-extrabold px-4 text-shadow">
              Estudiar inglés en Irlanda
            </h1>
            <p className="text-white text-lg md:text-2xl font-semibold px-4">
              Comienza tu aventura con un curso de inglés que te permitirá estudiar y trabajar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
