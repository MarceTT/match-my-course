import { useEffect, useRef, useMemo } from "react";
import { useInfiniteSchools } from "@/hooks/useInfiniteSchools";
import { SchoolDetails } from "@/app/lib/types";
import SchoolSearchList from "./SchoolSearchList";
import { Loader2 } from "lucide-react";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";

interface InfiniteSchoolListProps {
  filters: Record<string, any>;
  isFilterOpen: boolean;
}

const InfiniteSchoolList = ({
  filters,
  isFilterOpen,
}: InfiniteSchoolListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteSchools({ filters });

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

  const schools = (data?.pages.flatMap((page) => page.schools) ?? []) as SchoolDetails[];

  const uniqueSchools = useMemo(() => {
    const seen = new Set();
    return schools.filter((school) => {
      if (seen.has(school._id)) return false;
      seen.add(school._id);
      return true;
    });
  }, [schools]);

  if (isLoading && !isFetchingNextPage) {
    return <FullScreenLoader isLoading={true} />;
  }

  return (
    <div className="relative">
      <SchoolSearchList
        key={filters.course?.[0] ?? "default"}
        isFilterOpen={isFilterOpen}
        schools={uniqueSchools}
        isLoading={false}
        isError={isError}
      />

      <div ref={observerRef} className="h-20 flex justify-center items-center">
        {isFetchingNextPage && (
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default InfiniteSchoolList;
