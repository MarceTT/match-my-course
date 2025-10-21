"use client";

import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import School from "../components/School";
import { useInfiniteSchools } from "../hooks/useInfiniteSchools";
import InfiniteLoaderScroll from "../admin/components/infiniteLoaderScroll";
import { useInView } from "react-intersection-observer";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { ArrowUp } from "lucide-react";
import { useScrollTopButton } from "@/hooks/useScrollTopButton";

interface SchoolData {
  _id: string;
  name: string;
  city: string;
  mainImage: string;
  ponderado?: number;
  prices?: Array<{
    horarios?: {
      precio?: string | number;
    };
  }>;
  lowestPrice?: number;
  courseTypes?: string[];
  cursosEos?: any[];
  generalEnglishPrice?: number;
  specificSchedule?: any;
}

interface ClientSchoolPaginationProps {
  initialSchools: SchoolData[];
}

const SkeletonCard = () => (
  <div className="flex flex-col rounded-lg shadow-md overflow-hidden bg-white animate-pulse min-h-[320px]">
    <Skeleton className="h-48 w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

const MAX_PAGES = 10;

export default function ClientSchoolPagination({ initialSchools }: ClientSchoolPaginationProps) {
  const { visible: showScrollTop, scrollToTop } = useScrollTopButton();
  const isFetching = useRef(false);

  const { ref: loaderRef, inView: isInView } = useInView({
    threshold: 0.1,
    rootMargin: "200px"
  });

  const isSmall = useMediaQuery("(max-width: 640px)");
  const priorityCount = isSmall ? 2 : 4;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteSchools();

  // Get all schools from paginated data, excluding the initial ones
  const paginatedSchools = Array.from(
    new Map(
      data?.pages.flatMap((page) => page.schools).map((s) => [s._id, s])
    ).values()
  ).filter(school => !initialSchools.some(initial => initial._id === school._id)) || [];

  useEffect(() => {
    if (
      isInView &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetching.current &&
      (data?.pages.length ?? 0) < MAX_PAGES
    ) {
      isFetching.current = true;
      fetchNextPage().finally(() => {
        isFetching.current = false;
      });
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage, data]);

  return (
    <>
      {/* Only show paginated schools if there are any */}
      {paginatedSchools.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {paginatedSchools.map((school) => {
            const price =
              school.prices?.[0]?.horarios?.precio &&
              !isNaN(Number(school.prices[0].horarios.precio))
                ? Number(school.prices[0].horarios.precio)
                : 0;

            return (
              <div
                key={school._id}
                className="transition-opacity duration-300 ease-in-out opacity-100"
              >
                <School
                  _id={school._id}
                  name={school.name}
                  location={school.city}
                  image={rewriteToCDN(school.mainImage) || "/placeholder.svg"}
                  rating={parseFloat(String(school.ponderado ?? 0))}
                  price={price}
                  lowestPrice={school.lowestPrice}
                  courseTypes={school.courseTypes}
                  seoCourses={school.cursosEos}
                  generalEnglishPrice={school.generalEnglishPrice}
                  specificSchedule={school.specificSchedule}
                  priority={false} // Paginated schools don't need priority
                />
              </div>
            );
          })}
        </div>
      )}

      {hasNextPage && (
        <div ref={loaderRef} className="flex justify-center mt-10">
          {isFetchingNextPage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={`loading-skeleton-${i}`} />
              ))}
            </div>
          ) : (
            <InfiniteLoaderScroll />
          )}
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Volver al inicio"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
