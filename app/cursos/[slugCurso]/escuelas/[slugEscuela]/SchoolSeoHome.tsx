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
import SchoolBreadcrumb from "@/app/features/school/components/SchoolBreadcrumb";

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

  // Structured Data for SEO (Schema.org)
  const ORIGIN = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://matchmycourse.com'
  ).replace(/\/$/, '');

  const canonicalPath = `/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(school.slug || school.name.toLowerCase().replace(/\s+/g, '-'))}`;
  const canonicalUrl = `${ORIGIN}${canonicalPath}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": school.name,
    "description": school.description?.detalleEscuela || `Escuela de inglés ${school.name} en ${school.city}`,
    "url": canonicalUrl,
    "image": school.logo ? rewriteToCDN(school.logo) : undefined,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": school.location?.address || school.description?.direccion,
      "addressLocality": school.city,
      "addressCountry": "IE"
    },
    "aggregateRating": rating > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": rating.toFixed(1),
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "foundingDate": school.description?.añoFundacion ? school.description.añoFundacion.toString() : undefined,
    "priceRange": school.minPrecio ? `€€` : undefined,
    "offers": school.minPrecio ? {
      "@type": "Offer",
      "price": school.minPrecio,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    } : undefined
  };

  // Remove undefined values
  Object.keys(structuredData).forEach(key => {
    if (structuredData[key as keyof typeof structuredData] === undefined) {
      delete structuredData[key as keyof typeof structuredData];
    }
  });

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
      {/* Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      <SchoolBreadcrumb
        slugCurso={slugCurso}
        schoolName={school.name}
      />

      {/* SSR Hero Section - CRÍTICO para SEO */}
      <div className="max-w-7xl mx-auto px-4 mt-8 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {school.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
            {school.city && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {school.city}, Irlanda
              </span>
            )}
            {rating > 0 && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {rating.toFixed(1)}/5
              </span>
            )}
            {yearsOld && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Fundada en {2025 - yearsOld}
              </span>
            )}
          </div>
          {school.description?.detalleEscuela && (
            <p className="text-gray-700 leading-relaxed text-base">
              {school.description.detalleEscuela}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <SchoolDetailDynamic
          images={(school.galleryImages || []).map((url: any) => rewriteToCDN(url))}
          city={school.city!}
          schoolName={school.name}
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

      <ScrollToBookingButton />

      <Footer showWhatsApp={false} />
    </div>
  );
}

export default SchoolSeoHome;
