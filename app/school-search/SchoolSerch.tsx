"use client";

import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import Filter from "../components/features/Filter/Filter";
import SchoolList from "../components/school/SchoolSearchList";
import Header from "../components/common/Header";
import { useSearchParams, useRouter } from "next/navigation";
import { useFilteredSchools } from "../hooks/useSchoolsByCourse";
import filtersConfig from "@/app/utils/filterConfig";

const normalizeCourse = (course: string) => {
  return course
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};

const SchoolSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseType = searchParams.get("course") || "";
  const normalizedCourse = normalizeCourse(courseType);

  const initialFilters: Record<string, any> = {};

  Object.entries(filtersConfig).forEach(([key, config]) => {
    if (key === "courseTypes") {
      // ✅ Agrega el tipo de curso normalizado al filtro si viene desde la URL
      initialFilters[key] = normalizedCourse ? [normalizedCourse] : [];
    } else if (config.type === "slider") {
      initialFilters[key] = config.slider?.default ?? 0;
    } else {
      initialFilters[key] = [];
    }
  });

  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);

  // 🔁 Actualiza la URL en base a los filtros dinámicamente
  useEffect(() => {
    const params = new URLSearchParams();
  
    if (courseType) {
      params.set("course", courseType); // Siempre incluye el curso
    }
  
    Object.entries(filtersConfig).forEach(([key, config]) => {
      const value = filters[key];
  
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (
        !Array.isArray(value) &&
        value !== null &&
        value !== undefined &&
        value !== 0 && // Evita agregar sliders con valor inicial = 0
        config.type === "slider"
      ) {
        params.set(key, String(value));
      }
    });
  
    const queryString = params.toString();
    router.replace(`/school-search?${queryString}`);
  }, [filters, courseType, router]);
  

  const {
    data: schoolsData,
    isLoading,
    isError,
  } = useFilteredSchools(filters);

  const schools = Array.isArray(schoolsData) ? schoolsData : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Filter
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            filters={filters}
            setFilters={setFilters}
          />
          <SchoolList
            isFilterOpen={isOpen}
            schools={schools}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolSearch;
