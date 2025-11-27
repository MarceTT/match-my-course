"use client";

import { useEffect, useState } from "react";
import { Grid, List, ArrowUp } from "lucide-react";
import { SchoolDetails } from "@/app/lib/types";
import { Switch } from "@/components/ui/switch";
import { useInView } from "react-intersection-observer";
import { useScrollTopButton } from "@/hooks/useScrollTopButton";
import { Skeleton } from "@/components/ui/skeleton";
import SchoolCard from "./SchoolCard";

const SkeletonSchoolCard = () => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col sm:flex-row gap-4 animate-pulse">
      <div className="rounded-lg bg-gray-200 h-40 sm:h-72 sm:w-56 lg:w-72 w-full" />
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/5" />
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 rounded-full bg-gray-200" />
            ))}
            <Skeleton className="h-4 w-6" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-48 rounded-full" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-6 w-44 rounded-md" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
};

interface SchoolListProps {
  isFilterOpen: boolean;
  schools: SchoolDetails[];
  isLoading: boolean;
  isError: boolean;
  isFetching?: boolean;
  course: string;
}

export default function SchoolSearchList({
  isFilterOpen,
  schools,
  isLoading,
  isError,
  isFetching = false,
  course,
}: SchoolListProps) {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const { ref } = useInView();
  const { visible: showScrollTop, scrollToTop } = useScrollTopButton();
  const [localLoading, setLocalLoading] = useState(false);
  const [prevCourse, setPrevCourse] = useState(course);

  useEffect(() => {
    if (course !== prevCourse) {
      setLocalLoading(true);
      setPrevCourse(course);
    } else if (!isFetching) {
      setLocalLoading(false);
    }
  }, [course, isFetching, prevCourse]);

  if (isLoading || localLoading) {
    const formattedCourse = course
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return (
      <div className="mt-6 space-y-4">
        <p className="text-gray-500 text-sm pl-1">
          Cargando resultados para <strong>{formattedCourse}</strong>...
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonSchoolCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-red-500 text-sm p-4">Error al cargar las escuelas.</p>
    );
  if (schools.length === 0)
    return (
      <p className="text-gray-500 text-sm p-4">No se encontraron resultados.</p>
    );

  return (
    <div
      className={`flex-1 flex flex-col ${
        isFilterOpen ? "mt-0 lg:mt-64" : "mt-0"
      }`}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Buscador de cursos de Inglés
      </h1>

      <div className="flex items-center space-x-4 md:flex-row md:space-x-4">
        <span className="text-sm text-gray-600 hidden md:inline">Vista</span>
        <div className="hidden md:flex items-center space-x-2">
          <Switch
            checked={viewType === "grid"}
            onCheckedChange={(checked) =>
              setViewType(checked ? "grid" : "list")
            }
          />
          {viewType === "grid" ? (
            <Grid className="text-blue-500 w-4 h-4" />
          ) : (
            <List className="text-gray-500 w-4 h-4" />
          )}
          <span className="text-sm text-gray-600">
            {viewType === "grid" ? "Cuadrícula" : "Lista"}
          </span>
        </div>
      </div>

      {viewType === "list" ? (
        <div className="space-y-6 mt-4">
          {schools.map((school) => (
            <SchoolCard 
              key={school._id} 
              school={school} 
              viewType="list"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {schools.map((school) => (
            <SchoolCard 
              key={school._id} 
              school={school} 
              viewType="grid"
            />
          ))}
        </div>
      )}

      <div ref={ref} className="flex justify-center items-center mt-10" />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
