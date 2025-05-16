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

const SchoolPage = () => {
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());
  const [firstLoad, setFirstLoad] = useState(true);
  const pendingImages = useRef<Set<string>>(new Set());
  const { visible: showScrollTop, scrollToTop } = useScrollTopButton();

  const { ref: loaderRef, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: false });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteSchools();

  const schools =
    Array.from(
      new Map(
        data?.pages
          .flatMap((page) => page.schools)
          .map((s) => [s._id, s])
      ).values()
    ) || [];

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const newSchools = schools.filter((school) => !loadedIds.has(school._id));
    if (newSchools.length === 0) {
      setFirstLoad(false);
      return;
    }

    newSchools.forEach((school) => pendingImages.current.add(school._id));

    const preload = async () => {
      await Promise.all(
        newSchools.map((school) => {
          if (!school.mainImage) return Promise.resolve();
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = rewriteToCDN(school.mainImage) || "/placeholder.svg";
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        })
      );
      setLoadedIds((prev) => {
        const newSet = new Set(prev);
        newSchools.forEach((s) => newSet.add(s._id));
        return newSet;
      });

      setFirstLoad(false);
    };

    preload();
  }, [schools]);


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
          const isLoaded = loadedIds.has(school._id);
          const price =
            school.prices?.[0]?.horarios?.precio &&
            !isNaN(Number(school.prices[0].horarios.precio))
              ? Number(school.prices[0].horarios.precio)
              : 0;

          return (
            <div
              key={school._id}
              className={`transition-all duration-700 ease-in-out transform min-h-[320px] ${
                isLoaded
                  ? "opacity-100 scale-100 blur-0"
                  : "opacity-0 scale-95 blur-sm"
              }`}
            >
              {firstLoad || !isLoaded ? (
                <SkeletonCard />
              ) : (
                <School
                  _id={school._id}
                  name={school.name}
                  location={school.city}
                  image={rewriteToCDN(school.mainImage) || "/placeholder.svg"}
                  rating={parseFloat(String(school.ponderado ?? 0))}
                  price={price}
                  lowestPrice={school.lowestPrice}
                />
              )}
            </div>
          );
        })}
      </div>

      {hasNextPage && (
        <>
          {isFetchingNextPage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={`loading-skeleton-${i}`} />
              ))}
            </div>
          ) : (
            <div ref={loaderRef} className="flex justify-center mt-10 animate-bounce">
              <InfiniteLoaderScroll />
            </div>
          )}
        </>
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
