"use client";

import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/common/FooterServer";
import Filter from "../components/features/Filter/Filter";
import Header from "../components/common/HeaderServer";
import { useSearchParams, useRouter } from "next/navigation";
import { useFilteredSchools } from "../hooks/useSchoolsByCourse";
import filtersConfig from "@/app/utils/filterConfig";
import { useDebounce } from "@/app/hooks/useDebounce";
import InfiniteSchoolFiltered from "../components/school/InfiniteSchoolFiltered";
import { TourProvider } from "@reactour/tour";

const normalizeCourse = (course: string) => {
  return course
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};

const SchoolSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseType = searchParams.get("course") || "ingles-general";
  const normalizedCourse = normalizeCourse(courseType);
  const listRef = useRef<HTMLDivElement | null>(null);

  const generateInitialFilters = (course: string): Record<string, any> => {
    const initial: Record<string, any> = {};
    Object.entries(filtersConfig).forEach(([key, config]) => {
      if (key === "course") {
        initial[key] = course ? [course] : ["ingles-general"];
      } else if (config.type === "slider") {
        const def = config.slider?.default;
        initial[key] = Array.isArray(def) ? def : [def];
      } else {
        initial[key] = [];
      }
    });
    return initial;
  };

  const [filters, setFilters] = useState<Record<string, any>>(
    generateInitialFilters(normalizedCourse)
  );
  const debouncedFilters = useDebounce(filters, 700); // Optimizado: 700ms vs 600ms original

  useEffect(() => {
    setFilters(generateInitialFilters(normalizedCourse));
  }, [courseType]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.course?.length) {
      params.set("course", filters.course[0]);
    }

    Object.entries(filtersConfig).forEach(([key, config]) => {
      const value = debouncedFilters[key];

      if (Array.isArray(value) && key === "weeks" && value.length > 0) {
        const weeksMin = value[0];
        if (weeksMin !== config.slider?.min) {
          params.set("weeksMin", String(weeksMin));
        }
      } else if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      }
    });

    router.replace(`/buscador-cursos-de-ingles?${params.toString()}`);
  }, [debouncedFilters, router]);

  const { data: schoolsData, isLoading, isError } = useFilteredSchools(filters);
  const schools = Array.isArray(schoolsData) ? schoolsData : [];

  const pageContent = (
    <div className="min-h-screen bg-gray-50 relative">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {!isOpen && (
            <div className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start min-h-[600px]">
              <Filter
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          )}
          {isOpen && (
            <Filter
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              filters={filters}
              setFilters={setFilters}
            />
          )}
          <div ref={listRef} className="flex-1 pr-1">
            <InfiniteSchoolFiltered filters={filters} isFilterOpen={isOpen} />
          </div>
        </div>
      </div>
      <Footer />

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-40 px-4 py-3 rounded-full bg-[#fe6361] text-white font-semibold shadow-lg hover:bg-[#fe6361] transition"
        >
          Filtros
        </button>
      )}
    </div>
  );

  // Mostrar TourProvider SOLO si es escritorio (>=1024px)
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return pageContent;
  }

  return (
    <TourProvider
      steps={[]} // Aquí defines tus pasos si los necesitas
      padding={8}
      showBadge={false}
      showNavigation={false}
      disableInteraction
      styles={{
        popover: (base) => ({
          ...base,
          borderRadius: 12,
          padding: "1rem 1.5rem",
          backgroundColor: "#FFF",
          color: "#1F2937",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
          maxWidth: 280,
        }),
        maskWrapper: (base) => ({
          ...base,
          color: "rgba(0,0,0,0.6)",
        }),
        maskArea: (base) => ({
          ...base,
          rx: 6,
          stroke: "#fff",
          strokeWidth: 3,
          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))",
        }),
      }}
    >
      {pageContent}
    </TourProvider>
  );
};

export default SchoolSearch;
