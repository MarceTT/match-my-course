"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin } from "lucide-react";

interface RelatedSchool {
  _id: string;
  name: string;
  slug?: string;
  city: string;
  logo?: string;
  mainImage?: string;
  ponderado?: number;
  cursosEos?: Array<{
    slugCurso: string;
    slugEscuela: string;
    subcategoria: string;
  }>;
}

interface RelatedSchoolsProps {
  currentSchoolId: string;
  city: string;
  slugCurso: string;
}

export default function RelatedSchools({
  currentSchoolId,
  city,
  slugCurso,
}: RelatedSchoolsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["relatedSchools", city],
    queryFn: async () => {
      // Use public /front/schools endpoint (no auth required)
      const url = new URL(
        "/api/front/schools",
        process.env.NEXT_PUBLIC_BACKEND_URL
      );
      // Backend supports city filter with case-insensitive matching
      url.searchParams.set("city", city);
      url.searchParams.set("limit", "5"); // Only need 4 + maybe exclude current

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch schools");
      }
      const json = await response.json();
      return (json?.data?.schools || []) as RelatedSchool[];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!city,
  });

  // Filter out current school and limit to 3
  const relatedSchools = (data as RelatedSchool[] | undefined)
    ?.filter((school) => school._id !== currentSchoolId)
    ?.slice(0, 3);

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            Otras escuelas en {city}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                <Skeleton className="h-32 w-full rounded-lg mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!relatedSchools || relatedSchools.length === 0) {
    return null;
  }

  // Build URL for each related school
  const buildSchoolUrl = (school: RelatedSchool) => {
    // Try to find matching SEO entry for current course
    const seoEntry = school.cursosEos?.find((c) =>
      c.slugCurso?.toLowerCase().includes(slugCurso.toLowerCase())
    );

    if (seoEntry) {
      return `/cursos/${seoEntry.slugCurso}/escuelas/${seoEntry.slugEscuela}`;
    }

    // Fallback to first available course
    const firstEntry = school.cursosEos?.[0];
    if (firstEntry) {
      return `/cursos/${firstEntry.slugCurso}/escuelas/${firstEntry.slugEscuela}`;
    }

    // Last resort - escuelas page
    return `/escuelas/${city.toLowerCase()}`;
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Otras escuelas en {city}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedSchools.map((school) => {
            const rating = Number(school.ponderado ?? 0);
            const schoolUrl = buildSchoolUrl(school);

            return (
              <Link
                key={school._id}
                href={schoolUrl}
                className="group block"
              >
                <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className="relative h-40 w-full">
                    {school.mainImage || school.logo ? (
                      <Image
                        src={rewriteToCDN(school.mainImage || school.logo || "")}
                        alt={`${school.name} - Escuela de inglés en ${school.city}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Sin imagen</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {school.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {school.city}
                      </span>
                      {rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          {rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Link to see all schools in the city */}
        <div className="text-center mt-8">
          <Link
            href={`/escuelas/${city.toLowerCase()}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Ver todas las escuelas en {city}
          </Link>
        </div>
      </div>
    </section>
  );
}
