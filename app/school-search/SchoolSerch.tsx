"use client";

import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import Filter from "../components/features/Filter/Filter";
import Header from "../components/common/Header";
import { useSearchParams, useRouter } from "next/navigation";
import filtersConfig from "@/app/utils/filterConfig";
import InfiniteSchoolList from "../components/school/InfiniteSchoolList";

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
      } else if (
        !Array.isArray(value) &&
        value !== null &&
        value !== undefined &&
        value !== 0 &&
        config.type === "slider"
      ) {
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();
    router.replace(`/school-search?${queryString}`);
  }, [filters, courseType, router]);

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
          <InfiniteSchoolList filters={filters} isFilterOpen={isOpen} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolSearch;
