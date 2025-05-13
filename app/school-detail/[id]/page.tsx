"use client";

import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import SchoolDetail from "../../components/school/SchoolDetail";
import BookingPannel from "../../components/common/BookingPannel";
import Certifications from "../../components/school/Certifications";
import Facilities from "../../components/school/Facilities";
import SchoolInclusion from "../../components/school/SchoolInclusion";
import Accommodation from "../../components/school/Accommodation";
import Location from "../../components/school/Location";
import { notFound, useParams } from "next/navigation";
import { useSchoolDetails } from "@/app/hooks/useSchoolDetails";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import Image from "next/image";
import { raleway } from "@/app/ui/fonts";
import { Star } from "lucide-react";
import SchoolStat from "@/app/components/school/SchoolStat";
import { FaWalking } from "react-icons/fa";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const SchoolHome = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useSchoolDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Skeleton className="h-96 w-full mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !data) return notFound();

  const school = data.data.school;
  const rating = Number(school.qualities?.ponderado ?? 0);
  const yearsOld = school.description?.añoFundacion
    ? 2025 - parseInt(school.description.añoFundacion.toString())
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2"
        >
          ← Volver a resultados
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <SchoolDetail
          images={school.galleryImages || []}
          city={school.city || ""}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-6 mb-4">
              <div className="w-40 h-auto">
                {school.logo && (
                  <Image
                    src={school.logo}
                    alt="School logo"
                    width={160}
                    height={120}
                    className="object-contain"
                  />
                )}
              </div>
              <div>
                <h2 className={`${raleway.className} text-3xl font-black`}>
                  {school.name || "Nombre no disponible"}
                </h2>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => {
                      const full = i + 1 <= Math.floor(rating);
                      const half = i + 0.5 === Math.round(rating * 2) / 2;
                      return (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            full
                              ? "fill-yellow-400 text-yellow-400"
                              : half
                              ? "fill-yellow-200 text-yellow-200"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      );
                    })}
                    <span className="ml-2 text-lg font-medium">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-gray-800 mb-4 mt-4">
                  {yearsOld !== null && (
                    <div className="flex items-center gap-2">
                      <span className="font-bold">Antigüedad:</span>
                      <span>{yearsOld} años</span>
                    </div>
                  )}
                  {school.city && (
                    <div className="flex items-center gap-2">
                      <span className="font-bold">Ciudad:</span>
                      <span>{school.city}</span>
                    </div>
                  )}
                  {school.description?.minutosAlCentro && (
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-sm">
                        a {school.description.minutosAlCentro} minutos del
                        centro
                      </span>
                      <FaWalking className="text-xl" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base text-gray-700 leading-relaxed mb-3"
            >
              {school.description?.detalleEscuela || ""}
            </motion.p>

            {school.nationalities?.continentes && (
              <SchoolStat
                data={[
                  {
                    name: "Latinoamérica",
                    value:
                      (school.nationalities.continentes.latinoamerica || 0) *
                      100,
                  },
                  {
                    name: "Europa",
                    value: (school.nationalities.continentes.europa || 0) * 100,
                  },
                  {
                    name: "Asia",
                    value: (school.nationalities.continentes.asia || 0) * 100,
                  },
                  {
                    name: "Otros",
                    value: (school.nationalities.continentes.otros || 0) * 100,
                  },
                ]}
                averageAge={school.nationalities.edadPromedio || 0}
                nationalityCount={school.nationalities.nacionalidadesAnio || 0}
              />
            )}

            {school.qualities && <Certifications school={school.qualities} />}
            {school.installations && (
              <Facilities installations={school.installations} />
            )}
            {Array.isArray(school.accommodation) &&
              school.accommodation.length > 0 && (
                <Accommodation
                  accommodations={school.accommodation}
                  detailAccomodation={school.accomodationDetail || []}
                />
              )}
            <SchoolInclusion />
            <Location
              schoolName={school.name || ""}
              city={school.city || ""}
              minutesToCenter={school.description?.minutosAlCentro || 0}
            />
          </div>

          <div className="lg:col-span-1">
            <BookingPannel />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolHome;
