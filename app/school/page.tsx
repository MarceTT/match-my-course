"use client";

import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import School from "../components/School";
import { useInfiniteSchools } from "../hooks/useInfiniteSchools";
import { useInView } from "react-intersection-observer";
import { SchoolDetails } from "@/app/types";
import InfiniteLoaderScroll from "../admin/components/infiniteLoaderScroll";

const SchoolPage = () => {
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());
  const { ref, inView } = useInView();
  const pendingImages = useRef<Set<string>>(new Set());

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteSchools();

  const schools =
    data?.pages
      .flatMap((page) => page.schools)
      .filter((s): s is SchoolDetails => !!s && !!s._id && !!s.name) || [];

  // Preload only new images
  useEffect(() => {
    const newSchools = schools.filter((school) => !loadedIds.has(school._id));
    if (newSchools.length === 0) return;

    newSchools.forEach((school) => pendingImages.current.add(school._id));

    const preload = async () => {
      await Promise.all(
        newSchools.map((school) => {
          if (!school.mainImage) return Promise.resolve();
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = school.mainImage || "/placeholder.svg";
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
    };

    preload();
  }, [schools]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg shadow-md overflow-hidden animate-pulse bg-white"
          >
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
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
              className={`transition-all duration-700 ease-in-out transform ${
                isLoaded
                  ? "opacity-100 scale-100 blur-0"
                  : "opacity-0 scale-95 blur-sm"
              }`}
            >
              {isLoaded ? (
                <School
                  _id={school._id}
                  name={school.name}
                  location={school.city}
                  image={school.mainImage || "/placeholder.svg"}
                  rating={parseFloat(String(school.ponderado ?? 0))}
                  price={price}
                  lowestPrice={school.lowestPrice}
                />
              ) : (
                <div className="flex flex-col rounded-lg shadow-md overflow-hidden bg-white animate-pulse">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center mt-10 animate-bounce">
          <InfiniteLoaderScroll />
        </div>
      )}
    </>
  );
};

export default SchoolPage;
