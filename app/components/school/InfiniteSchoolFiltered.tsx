import { useEffect, useRef } from "react";
import { useInfiniteFilteredSchools } from "@/app/hooks/useInfiniteFilteredSchools";
import { SchoolDetails } from "@/app/types/index";
import SchoolSearchList from "./SchoolSearchList";
import { Loader2 } from "lucide-react";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";

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

  // 🔥 Evitar duplicados usando un Map basado en school._id
  const schoolsMap = new Map<string, SchoolDetails>();
  data?.pages.forEach((page) => {
    page.schools.forEach((school: SchoolDetails) => {
      schoolsMap.set(school._id, school);
    });
  });
  const schools = Array.from(schoolsMap.values());

  if (isLoading && !isFetchingNextPage) {
    return <FullScreenLoader isLoading={true} />;
  }

  return (
    <div className="relative">
      <SchoolSearchList
        key={filters.course?.[0] ?? "default"}
        isFilterOpen={isFilterOpen}
        schools={schools}
        isLoading={isLoading}
        isError={isError}
      />

      <div ref={observerRef} className="h-20 flex justify-center items-center">
        {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin text-blue-600" />}
      </div>
    </div>
  );
};

export default InfiniteSchoolFiltered;
