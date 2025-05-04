"use client";

import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import SchoolDetail from "../../components/school/SchoolDetail";
import BookingPannel from "../../components/common/BookingPannel";
import Certifications from "../../components/school/Certifications";
import Facilities from "../../components/school/Facilities";
import OptionsCertification from "../../components/school/OptionsCertification";
import SchoolInclusion from "../../components/school/SchoolInclusion";
import Accommodation from "../../components/school/Accommodation";
import Location from "../../components/school/Location";
import Testimonials from "../../components/features/Testimonials/Testimonials";
import { notFound, useParams } from "next/navigation";
import { useSchoolDetails } from "@/app/hooks/useSchoolDetails";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import Image from "next/image";
import { raleway } from "@/app/ui/fonts";
import { Star } from "lucide-react";
import SchoolStat from "@/app/components/school/SchoolStat";
import { FaWalking } from "react-icons/fa";

const SchoolHome = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useSchoolDetails(id);

  if (isLoading) return <FullScreenLoader isLoading={isLoading} />;
  if (isError || !data) return notFound();

  const school = data.data.school;
  const rating = 4.78;
  const yearsOld =
    2025 - parseInt(school.description?.añoFundacion?.toString() || "N/A");

  if (!school.nationalities?.continentes) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4">
        <SchoolDetail
          images={school.galleryImages || []}
          city={school.city}
        />
        {/* <div className="mt-8">
          <SchoolStat
            nationalities={school.nationalities?.nacionalidadesAnio || 0}
            spanishSpeakers={30}
            averageAge={school.nationalities?.edadPromedio || 0}
            testimonials={4.7}
          />
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-6 mb-4">
              {/* Logo */}
              <div className="w-40 h-auto">
                <Image
                  src={school.logo || ""}
                  alt="School logo"
                  width={160}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className={`${raleway.className} text-3xl font-black`}>
                  {school.name}
                </h2>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => {
                      const rating = Number(school.qualities?.ponderado ?? 0);
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
                      {parseFloat(
                        String(school.qualities?.ponderado ?? 0)
                      ).toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-gray-800 mb-4 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Antigüedad:</span>
                    <span>{yearsOld} años</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Ciudad:</span>
                    <span>{school.city}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <span className="text-sm">a 5 minutos del centro</span>
                    <FaWalking className="text-xl" />
                  </div>
                </div>
              </div>
            </div>
            {/* Detalles clave */}

            {/* Descripción */}
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              {school.description?.detalleEscuela || ""}
            </p>

            <SchoolStat
              data={[
                {
                  name: "Latinoamérica",
                  value: school.nationalities.continentes.latinoamerica * 100,
                },
                {
                  name: "Europa",
                  value: school.nationalities.continentes.europa * 100,
                },
                {
                  name: "Asia",
                  value: school.nationalities.continentes.asia * 100,
                },
                {
                  name: "Otros",
                  value: school.nationalities.continentes.otros * 100,
                },
              ]}
              averageAge={school.nationalities.edadPromedio}
              nationalityCount={school.nationalities.nacionalidadesAnio}
            />
            {school.qualities && <Certifications school={school.qualities} />}
            {school.installations && (
              <Facilities installations={school.installations} />
            )}
            {/* <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Curso elegido</h3>
              <p className="text-gray-600">
                El curso de inglés general de 25 semanas diseñado para mejorar
                tus habilidades en Speaking, Listening, Reading y Writing,
                enfocándose en la comunicación diaria y el desarrollo del
                vocabulario y la gramática. El curso se divide en módulos de 3
                meses en donde te evaluarán semanalmente. Según como te vaya,
                pueden subirte de nivel antes de tiempo.
              </p>
            </div>
            <OptionsCertification />
            <SchoolInclusion /> */}
            {Array.isArray(school.accommodation) &&
              school.accommodation.length > 0 && (
                <Accommodation
                  accommodations={school.accommodation}
                  detailAccomodation={school.accomodationDetail || []}
                />
              )}
            <Location schoolName={school.name} city={school.city} />
            {/* <Testimonials /> */}
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
