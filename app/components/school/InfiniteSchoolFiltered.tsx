import { useEffect, useRef, useMemo } from "react";
import { useInfiniteFilteredSchools } from "@/app/hooks/useInfiniteFilteredSchools";
import { SchoolDetails } from "@/app/lib/types";
import SchoolSearchList from "./SchoolSearchList";
import { Loader2 } from "lucide-react";

interface InfiniteSchoolFilteredProps {
  filters: Record<string, any>;
  isFilterOpen: boolean;
}

const InfiniteSchoolFiltered = ({ filters, isFilterOpen }: InfiniteSchoolFilteredProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetching,
  } = useInfiniteFilteredSchools(filters);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );
    const el = observerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 🚀 Memoización: Evitar duplicados usando un Map basado en school._id
  const schools = useMemo(() => {
    if (!data?.pages) return [];
    
    const schoolsMap = new Map<string, SchoolDetails>();
    data.pages.forEach((page) => {
      page.schools.forEach((school: SchoolDetails) => {
        schoolsMap.set(school._id, school);
      });
    });
    return Array.from(schoolsMap.values());
  }, [data?.pages]);

  // Mostrar skeleton loading en lugar de fullscreen loader para mejor UX
  if (isLoading && schools.length === 0) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="border rounded-lg p-4 bg-white shadow-sm animate-pulse">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="rounded-lg bg-gray-200 h-40 sm:h-48 w-full sm:w-64" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-gray-200 rounded w-20" />
                  <div className="h-8 bg-gray-200 rounded w-24" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <SchoolSearchList
       isFilterOpen={isFilterOpen}
       schools={schools}
       isLoading={isLoading}
       isError={isError}
       isFetching={isFetching}
       course={filters.course?.[0] ?? ""}
      />

      <div ref={observerRef} className="h-20 flex justify-center items-center">
        {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin text-blue-600" />}
      </div>
    </div>
  );
};

export default InfiniteSchoolFiltered;
