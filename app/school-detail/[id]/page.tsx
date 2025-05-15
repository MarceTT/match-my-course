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

const cdnUrl = "https://d2wv8pxed72bi5.cloudfront.net/"; // 🔁 Reemplaza por tu dominio real

const rewriteToCDN = (url: string) => {
  return url.replace(
    "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/",
    cdnUrl
  );
};

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
          images={(school.galleryImages || []).map(rewriteToCDN)}
          city={school.city || ""}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-6 mb-4">
              <div className="w-40 h-auto">
                {school.logo && (
                  <Image
                  src={rewriteToCDN(school.logo)}
                    alt="School logo"
                    width={160}
                    height={120}
                    className="object-contain"
                    quality={75}
                    loading="lazy"
                    fetchPriority="high"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,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"
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
