"use client";

import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import School from "../components/School";
import { useInfiniteSchools } from "../hooks/useInfiniteSchools";
import InfiniteLoaderScroll from "../admin/components/infiniteLoaderScroll";
import { useInView } from "react-intersection-observer";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { ArrowUp } from "lucide-react";
import { useScrollTopButton } from "@/hooks/useScrollTopButton";

interface SchoolPageProps {
  onScrollTopVisibilityChange?: (visible: boolean) => void;
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

const SchoolPage = ({ onScrollTopVisibilityChange }: SchoolPageProps) => {
  const { visible: showScrollTop, scrollToTop } = useScrollTopButton();
  const isFetching = useRef(false);

  const { ref: loaderRef, inView: isInView } = useInView({ 
    threshold: 0.1,
    rootMargin: "200px"
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteSchools();

  const schools = Array.from(
    new Map(
      data?.pages.flatMap((page) => page.schools).map((s) => [s._id, s])
    ).values()
  ) || [];

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

  useEffect(() => {
    onScrollTopVisibilityChange?.(showScrollTop);
  }, [showScrollTop, onScrollTopVisibilityChange]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error al cargar las escuelas</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {schools.map((school) => {
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
              />
            </div>
          );
        })}
      </div>

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
};

export default SchoolPage;