"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchSchoolsWithDetails } from "../actions/school";
import { Skeleton } from "@/components/ui/skeleton";
import School from "../components/School";
import { SchoolDetails } from "@/app/types/index";

const SchoolPage = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { data, isLoading, isError } = useQuery<{
    message: string;
    data: { schools: SchoolDetails[] };
  }>({
    queryKey: ["schoolsWithDetails"],
    queryFn: fetchSchoolsWithDetails,
  });

  const schools = data?.data.schools || [];

  useEffect(() => {
    const preloadImages = async () => {
      const promises = schools.map((school) => {
        const src = school.mainImage;
        if (!src) return Promise.resolve(); // ignorar si no hay imagen
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[420px] w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error al cargar las escuelas</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {schools.map((school) => {
        const price =
          school.prices?.[0]?.horarios?.precio &&
          !isNaN(Number(school.prices[0].horarios.precio))
            ? Number(school.prices[0].horarios.precio)
            : 0;

        return (
          <School
            _id={school._id}
            key={school._id}
            name={school.name}
            location={school.city}
            image={school.mainImage || "/placeholder.svg"}
            rating={parseFloat(String(school.qualities?.ponderado ?? 0))}
            price={price}
          />
        );
      })}
    </div>
  );
};

export default SchoolPage;
