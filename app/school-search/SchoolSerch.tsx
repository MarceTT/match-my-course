"use client";

import React, { useEffect, useRef, useState } from "react";
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
    .replace(/\u0300-\u036f/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};

const SchoolSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseType = searchParams.get("course") || "";
  const normalizedCourse = normalizeCourse(courseType);
  const listRef = useRef<HTMLDivElement | null>(null);

  const initialFilters: Record<string, any> = {};
  Object.entries(filtersConfig).forEach(([key, config]) => {
    if (key === "course") {
      initialFilters[key] = normalizedCourse ? [normalizedCourse] : [];
    } else if (config.type === "slider") {
      initialFilters[key] = config.slider?.default ?? 0;
    } else {
      initialFilters[key] = [];
    }
  });

  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);

  useEffect(() => {
    const params = new URLSearchParams();
    if (courseType) {
      params.set("course", courseType);
    }
    Object.entries(filtersConfig).forEach(([key, config]) => {
      const value = filters[key];
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (!Array.isArray(value) && value !== null && value !== undefined && value !== 0 && config.type === "slider") {
        params.set(key, String(value));
      }
    });
    const queryString = params.toString();
    router.replace(`/school-search?${queryString}`);

    setTimeout(() => {
        listRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
    }, 200);
  }, [filters, courseType, router]);

  const handleResetFilters = () => {
    const resetFilters: Record<string, any> = {};
    Object.entries(filtersConfig).forEach(([key, config]) => {
      if (config.type === "slider" && config.slider) {
        resetFilters[key] = config.slider.default;
      } else {
        resetFilters[key] = [];
      }
    });
    setFilters(resetFilters);
    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const { data: schoolsData, isLoading, isError } = useFilteredSchools(filters);
  const schools = Array.isArray(schoolsData) ? schoolsData : [];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Filter
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            filters={filters}
            setFilters={setFilters}
            onResetFilters={handleResetFilters}
          />
          <div ref={listRef} className="flex-1">
            <SchoolList
              isFilterOpen={isOpen}
              schools={schools}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </div>
      </div>
      <Footer />

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-40 px-4 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
        >
          Filtros
        </button>
      )}
    </div>
  );
};

export default SchoolSearch;
