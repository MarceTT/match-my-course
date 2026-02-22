import Image from "next/image";
import { getResponsiveImageProps } from "@/app/utils/rewriteToCDN";
import HeroClient from "./HeroClient";

// Server Component - renders static images immediately
export default function Hero() {
  return (
    <div className="relative w-full h-[70vh] md:h-[50vh] lg:h-[65vh] xl:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Mobile Hero Image */}
      <Image
        {...getResponsiveImageProps(
          "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Matchmycourse-Cursos-de-ingles-en-el-extranjero-estudiar-ingles-en-Irlanda-movil.webp",
          "MatchMyCourse - Cursos de inglés en el extranjero - Hero móvil",
          {
            sizes: "(max-width: 768px) 100vw, 0px",
            priority: false, // Only desktop gets priority to avoid dual preload
            quality: 80,
            fill: true
          }
        )}
        fill
        className="object-cover object-center block md:hidden"
      />

      {/* Desktop Hero Image */}
      <Image
        {...getResponsiveImageProps(
          "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Matchmycourse-Cursos-de-ingles-en-el-extranjero-matchmycourse.webp",
          "MatchMyCourse - Cursos de inglés en el extranjero - Hero desktop",
          {
            sizes: "(min-width: 768px) 100vw, 0px",
            priority: true,
            quality: 80,
            fill: true,
            fetchPriority: 'high'
          }
        )}
        fill
        className="object-cover object-center hidden md:block"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      {/* Interactive Client Component - loads separately */}
      <HeroClient />
    </div>
  );
}
