"use client";

import { raleway } from "../../../ui/fonts";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN"; // ✅ Asegúrate de importar esta función

const courseLabelToIdMap: Record<string, string> = {
  "Inglés general": "ingles-general",
  "Inglés general más sesiones individuales": "ingles-general-mas-sesiones-individuales",
  "Inglés general intensivo": "ingles-general-intensivo",
  "Inglés general orientado a negocios": "ingles-general-orientado-a-negocios",
  "Inglés general más trabajo(6 meses)": "ingles-visa-de-trabajo",
};

const Hero = () => {
  const searchParams = useSearchParams();
  const courseFromUrl = searchParams.get("course");
  const [courseType, setCourseType] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (courseFromUrl) {
      setCourseType(decodeURIComponent(courseFromUrl));
    }
  }, [courseFromUrl]);

  const handleSearch = () => {
    const normalizedId = courseLabelToIdMap[courseType];
    if (normalizedId) {
      router.push(`/school-search?course=${encodeURIComponent(normalizedId)}`);
    }
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[50vh] lg:h-[80vh] xl:h-[90vh] flex items-center justify-center overflow-hidden">
      <Image
        src={rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Pagina+inicial.png") || "/placeholder.svg"}
        alt="Hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-[15vh] lg:pt-[25vh] xl:pt-[30vh]">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <h1 className={`${raleway.className} text-3xl lg:text-6xl font-black text-white leading-tight drop-shadow-[2px_4px_6px_rgba(0,0,0,0.6)]`}>
            Encuentra tu curso de inglés
          </h1>

          <div className="flex flex-col sm:flex-row bg-white rounded-2xl sm:rounded-full p-2 shadow-sm space-y-2 sm:space-y-0 w-full max-w-xl">
            <div className="relative flex-1 sm:border-r border-gray-200">
              <select className="w-full px-6 py-3 rounded-l-full bg-transparent text-gray-700 appearance-none focus:outline-none">
                <option>Irlanda</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative flex-2 sm:border-r border-gray-200">
              <select
                value={courseType}
                className="w-full px-6 py-3 bg-transparent text-gray-700 appearance-none focus:outline-none"
                onChange={(e) => setCourseType(e.target.value)}
              >
                <option>Tipo de curso de inglés</option>
                {Object.keys(courseLabelToIdMap).map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-4 bg-[#FF385C] hover:bg-[#E51D58] text-white font-semibold rounded-md transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg lg:ml-4 lg:rounded-full md:rounded-full xl:rounded-full"
              aria-label="Buscar"
              onClick={handleSearch}
            >
              <FiSearch className="w-5 h-5 text-white" />
              <span className="ml-2 lg:ml-0 lg:hidden md:hidden">Buscar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
