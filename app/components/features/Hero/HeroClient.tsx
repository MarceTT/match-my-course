"use client";

import { raleway } from "../../../ui/fonts";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendGTMEvent } from "@/app/lib/gtm";

const courseLabelToIdMap: Record<string, string> = {
  "Inglés general": "ingles-general",
  "Inglés general más sesiones individuales": "ingles-general-mas-sesiones-individuales",
  "Inglés general intensivo": "ingles-general-intensivo",
  "Inglés general orientado a negocios": "ingles-general-orientado-a-negocios",
  "Programa de estudio y trabajo (25 semanas)": "ingles-visa-de-trabajo",
};

export default function HeroClient() {
  const searchParams = useSearchParams();
  const courseFromUrl = searchParams.get("course");
  const [courseType, setCourseType] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (courseFromUrl) {
      setCourseType(decodeURIComponent(courseFromUrl));
    }
  }, [courseFromUrl]);

  const handleCourseChange = (value: string) => {
    setCourseType(value);
    const courseId = courseLabelToIdMap[value] ?? null;
    sendGTMEvent("hero_course_selected", {
      course_name: value,
      course_id: courseId,
    });
  };

  const handleSearch = () => {
    const normalizedId = courseLabelToIdMap[courseType];
    sendGTMEvent("hero_search_clicked", {
      selected_course: courseType,
      course_id: normalizedId ?? null,
    });
    if (normalizedId) {
      router.push(`/school-search?course=${encodeURIComponent(normalizedId)}`);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <h1 className={`${raleway.className} animate-fade-in text-4xl font-black text-white leading-tight drop-shadow-[2px_4px_6px_rgba(0,0,0,0.6)] block md:hidden`}>
            Encuentra tu <br />curso de inglés
          </h1>

          <h1 className={`${raleway.className} animate-fade-in text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight drop-shadow-[2px_4px_6px_rgba(0,0,0,0.6)] hidden md:block`}>
            Encuentra tu curso de inglés
          </h1>

          <div className="flex flex-col sm:flex-row bg-white rounded-lg sm:rounded-full p-2 shadow-sm space-y-2 sm:space-y-0 w-full max-w-xl pointer-events-auto">
            <div className="relative flex-1 sm:border-r border-gray-200 rounded-l-lg sm:rounded-l-full overflow-hidden">
              <select
                className="w-full px-6 py-3 bg-transparent text-gray-700 appearance-none focus:outline-none"
                aria-label="Selecciona un destino"
                disabled
              >
                <option>Irlanda</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="relative flex-2 sm:border-r border-gray-200">
              <select
                value={courseType}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="w-full px-6 py-3 bg-transparent text-gray-700 appearance-none focus:outline-none"
              >
                <option>Tipo de curso de inglés</option>
                {Object.keys(courseLabelToIdMap).map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="px-4 py-3 rounded-lg sm:rounded-full bg-[#FF385C] hover:bg-[#FF385C]/80 text-white font-semibold flex items-center justify-center whitespace-nowrap transition-colors sm:h-14 sm:w-14"
            >
              <FiSearch className="w-5 h-5 text-white" />
              <span className="ml-2 lg:ml-0 lg:hidden md:hidden">Buscar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
