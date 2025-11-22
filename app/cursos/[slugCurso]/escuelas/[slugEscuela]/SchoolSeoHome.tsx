import React, { Suspense } from "react";
// Shared components
import Header from "@/app/components/common/HeaderServer";
import Footer from "@/app/components/common/FooterServer";

// School feature components
import Certifications from "@/app/features/school/components/Certifications";
import Facilities from "@/app/features/school/components/Facilities";
import Accommodation from "@/app/features/school/components/Accommodation";
import SchoolInclusion from "@/app/features/school/components/SchoolInclusion";
import Location from "@/app/features/school/components/Location";

// Next.js imports
import { notFound } from "next/navigation";
import { Footprints, Bus, Train } from "lucide-react";
import dynamic from "next/dynamic";

// Utils and other imports
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { fetchSchoolById } from "@/app/actions/school";
import { SchoolSeoHomeClient } from "./SchoolSeoHomeClient";
import SchoolHeaderClient from "./SchoolHeaderClient";
import ScrollToBookingButton from "@/components/common/ScrollToBookingButton";

const SchoolDetailDynamic = dynamic(
  () =>
    import("@/app/features/school/components/SchoolDetail").then((mod) => ({
      default: mod.default,
    })),
  { ssr: true }
);

const SchoolStatDynamic = dynamic(
  () => import("@/app/features/school/components/SchoolStat").then(m => ({ default: m.default })),
  { ssr: true, loading: () => <div className="animate-pulse bg-gray-200 h-40 rounded-lg mb-6" /> }
);

type Props = {
  schoolId: string;
  slugCurso: string;
  weeks: number;
  schedule: string;
  summaryText?: string;
};

async function SchoolSeoHome({
  schoolId,
  slugCurso,
  weeks,
  schedule,
  summaryText,
}: Props) {
  // Server-side data fetching
  let data;
  try {
    data = await fetchSchoolById(schoolId);
  } catch (e) {
    return notFound();
  }

  if (!data) return notFound();

  const school = data.school;

  const rating = Number(school.qualities?.ponderado ?? 0);
  const yearsOld = school.description?.añoFundacion
    ? 2025 - parseInt(school.description.añoFundacion.toString())
    : null;

  const getTransportIcon = (name: string) => {
    const norm = name.toLowerCase();
    const tren = [
      "active language learning",
      "english path",
      "irish college of english",
      "university of limerick language centre",
    ];
    const bus = ["emerald cultural institute", "killarney school of english"];
    if (tren.includes(norm)) return <Train className="w-5 h-5" />;
    if (bus.includes(norm)) return <Bus className="w-5 h-5" />;
    return <Footprints className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <SchoolDetailDynamic
          images={(school.galleryImages || []).map((url: any) => rewriteToCDN(url))}
          city={school.city!}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Header section with client-side interactivity for expand/collapse */}
            <SchoolHeaderClient
              schoolName={school.name}
              schoolLogo={school.logo ? rewriteToCDN(school.logo) : undefined}
              schoolUrlVideo={school.urlVideo}
              summaryText={summaryText}
              rating={rating}
              yearsOld={yearsOld}
              city={school.city}
              minutesToCenter={school.description?.minutosAlCentro}
              transportIcon={getTransportIcon(school.name)}
            />

            {/* Mobile booking panel - positioned right after header on mobile */}
            <div className="lg:hidden mt-6 mb-8" id="booking-pannel">
              <SchoolSeoHomeClient
                schoolId={schoolId}
                schoolName={school.name}
                schoolUrlVideo={school.urlVideo}
                slugCurso={slugCurso}
                weeks={weeks}
                schedule={schedule}
                mobileOnly={true}
              />
            </div>

            {/* Description - critical SEO content */}
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              {school.description?.detalleEscuela}
            </p>

            {/* School stats section */}
            {school.nationalities?.continentes && (
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-40 rounded-lg mb-6" />}>
                <SchoolStatDynamic
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
                  nacionalidades={
                    typeof school.nationalities.nacionalidades === "number"
                      ? school.nationalities.nacionalidades
                      : Object.keys(school.nationalities.nacionalidades).length
                  }
                />
              </Suspense>
            )}

            {!!school.qualities && (
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded-lg mb-6" />}>
                <Certifications school={school.qualities} />
              </Suspense>
            )}

            {!!school.installations && (
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-48 rounded-lg mb-6" />}>
                <Facilities installations={school.installations} />
              </Suspense>
            )}

            {Array.isArray(school.accommodation) &&
              school.accommodation.length > 0 && (
                <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg mb-6" />}>
                  <Accommodation
                    accommodations={school.accommodation}
                    detailAccomodation={school.accomodationDetail || []}
                    school={school.name}
                  />
                </Suspense>
              )}

            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-24 rounded-lg mb-6" />}>
              <SchoolInclusion />
            </Suspense>

            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-56 rounded-lg mb-6" />}>
              <Location
                schoolName={school.name}
                city={school.city!}
                minutesToCenter={school.description?.minutosAlCentro || 0}
                transportIcon={getTransportIcon(school.name)}
              />
            </Suspense>
          </div>

          {/* Client-side interactive components - positioned in grid on desktop, outside on mobile */}
          <div className="hidden lg:block lg:col-span-1 order-1 lg:order-2">
            <SchoolSeoHomeClient
              schoolId={schoolId}
              schoolName={school.name}
              schoolUrlVideo={school.urlVideo}
              slugCurso={slugCurso}
              weeks={weeks}
              schedule={schedule}
              mobileOnly={false}
            />
          </div>
        </div>
      </div>

      {/* Mobile booking panel - outside grid */}
      <div className="max-w-7xl mx-auto px-4">
        <SchoolSeoHomeClient
          schoolId={schoolId}
          schoolName={school.name}
          schoolUrlVideo={school.urlVideo}
          slugCurso={slugCurso}
          weeks={weeks}
          schedule={schedule}
          mobileOnly={true}
        />
      </div>

      <ScrollToBookingButton />

      <Footer showWhatsApp={false} />
    </div>
  );
}

export default SchoolSeoHome;
