"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import School from "../components/School";
import { useInfiniteSchools } from "../hooks/useInfiniteSchools";
import { useInView } from "react-intersection-observer";
import { SchoolDetails } from "@/app/types";
import InfiniteLoaderScroll from "../admin/components/infiniteLoaderScroll";

const SchoolPage = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteSchools();

  const schools = data?.pages
    .flatMap((page) => page.schools)
    .filter((s): s is SchoolDetails => !!s && !!s._id && !!s.name) || [];

  console.log("📦 Escuelas cargadas:", schools.length);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("🚀 Cargando siguiente página...");
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = schools.map((school) => {
        if (!school.mainImage) return Promise.resolve();
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = school.mainImage || "/placeholder.svg";
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };

    if (schools.length > 0) {
      preloadImages();
    }
  }, [schools]);

  if (isLoading || !imagesLoaded) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
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
          const price =
            school.prices?.[0]?.horarios?.precio &&
            !isNaN(Number(school.prices[0].horarios.precio))
              ? Number(school.prices[0].horarios.precio)
              : 0;

          return (
            <School
              key={school._id}
              _id={school._id}
              name={school.name}
              location={school.city}
              image={school.mainImage || "/placeholder.svg"}
              rating={parseFloat(String(school.qualities?.ponderado ?? 0))}
              price={price}
              lowestPrice={school.lowestPrice}
            />
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
