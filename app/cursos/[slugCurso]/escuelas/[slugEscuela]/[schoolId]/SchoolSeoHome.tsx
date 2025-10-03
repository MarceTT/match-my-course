"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
// Shared components (usar el Header unificado del sitio)
import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";

// School feature components and hooks
import {
  SchoolDetail,
  Certifications,
  Facilities,
  Accommodation,
  SchoolStat,
  SchoolInclusion,
  Location,
  useSchoolDetails,
} from "@/app/features/school";

// Booking feature components and hooks
import { BookingPannelContainer, useBooking } from "@/app/features/booking";
import dynamic from "next/dynamic";

// Next.js and external libraries
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUp, Star, PlayCircle, Volume2 } from "lucide-react";
import { Footprints, Bus, Train } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Utils and other imports
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { useScrollTopButton } from "@/hooks/useScrollTopButton";
import { raleway } from "@/app/ui/fonts";
import LoadingSkeleton from "./LoadingSkeleton";
import { cursoSlugToSubcategoria } from "@/lib/courseMap";
import ScrollToBookingButton from "@/components/common/ScrollToBookingButton";

const SchoolDetailDynamic = dynamic(
  () =>
    import("@/app/features/school").then((mod) => ({
      default: mod.SchoolDetail,
    })),
  { ssr: false }
);
const BookingPannel = dynamic(
  () =>
    import("@/app/features/booking").then((mod) => ({
      default: mod.BookingPannelContainer,
    })),
  { ssr: false }
);

type Props = {
  schoolId: string;
  seoCourses: any[];
  slugCurso: string;
  weeks: number;
  schedule: string;
  summaryText?: string;
};

const SchoolSeoHome = ({
  schoolId,
  seoCourses,
  slugCurso,
  weeks,
  schedule,
  summaryText,
}: Props) => {
  const { data, isLoading, isError } = useSchoolDetails(schoolId);
  const { visible: showScrollTop, scrollToTop } = useScrollTopButton();
  const router = useRouter();
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  const subcategoria = cursoSlugToSubcategoria[slugCurso];

  const seo = subcategoria
    ? seoCourses.find((c) => c.subcategoria === subcategoria) ?? seoCourses[0]
    : seoCourses[0];

  const {
    reservation,
    loading: isBookingLoading,
    error: hasBookingError,
    errorMessage,
    courseInfo,
    scheduleInfo,
    weeksBySchoolInfo,
    formData,
    onFormDataChange,
    onChangeTypeOfCourse,
    onUpdateReservation,
    onSubmitReservation,
  } = useBooking({ schoolId, course: slugCurso, weeks, schedule });

  if (isLoading)
    return (
      <>
        <Header />
        <LoadingSkeleton />
        <Footer />
      </>
    );
  if (isError || !data) return notFound();

  const school = data.data.school;

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

  const rating = Number(school.qualities?.ponderado ?? 0);
  const yearsOld = school.description?.añoFundacion
    ? 2025 - parseInt(school.description.añoFundacion.toString())
    : null;

  const goBack = () => {
    router.back();
  };

  const getEmbedUrl = (raw?: string | null, muted: boolean = true) => {
    if (!raw) return null;
    try {
      const url = new URL(raw);
      const host = url.hostname.toLowerCase();
      if (host.includes("youtube.com") || host.includes("youtu.be")) {
        // Extract video ID
        let id = url.searchParams.get("v");
        if (!id && host.includes("youtu.be")) id = url.pathname.slice(1);
        if (!id && url.pathname.startsWith("/shorts/")) id = url.pathname.split("/")[2];
        if (!id) return raw;
        const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
        embed.searchParams.set("autoplay", "1");
        embed.searchParams.set("mute", muted ? "1" : "0");
        embed.searchParams.set("rel", "0");
        embed.searchParams.set("playsinline", "1");
        embed.searchParams.set("modestbranding", "1");
        return embed.toString();
      }
      if (host.includes("vimeo.com")) {
        const id = url.pathname.split("/").filter(Boolean).pop();
        if (!id) return raw;
        const embed = new URL(`https://player.vimeo.com/video/${id}`);
        embed.searchParams.set("autoplay", "1");
        embed.searchParams.set("muted", muted ? "1" : "0");
        embed.searchParams.set("title", "0");
        embed.searchParams.set("byline", "0");
        embed.searchParams.set("portrait", "0");
        return embed.toString();
      }
      return raw;
    } catch {
      return raw;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* <div className="max-w-7xl mx-auto px-4 mt-4">
        <button
          onClick={() => goBack()}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2"
        >
          ← Volver a resultados
        </button>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <SchoolDetailDynamic
          images={(school.galleryImages || []).map((url) => rewriteToCDN(url))}
          city={school.city!}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            {/* Header section crítico - render inmediato */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4">
              <div className="flex flex-col flex-1">
                <h1
                  className={`${raleway.className} text-4xl font-black text-center md:text-left lg:text-left xl:text-left`}
                >
                  {school.name || "Nombre no disponible"}
                </h1>
                {summaryText && (
                  <>
                    <p
                      id="school-summary"
                      className={`mt-2 text-gray-700 text-base leading-relaxed text-center md:text-left lg:text-left xl:text-left ${
                        summaryExpanded ? '' : 'clamp-2-md-unset fade-bottom-mobile'
                      } md:text-base md:leading-6 md:text-slate-500 md:font-normal md:max-w-2xl md:opacity-90`}
                      >
                        {summaryText}
                      </p>
                    <button
                      type="button"
                      aria-controls="school-summary"
                      aria-expanded={summaryExpanded}
                      onClick={() => setSummaryExpanded((v) => !v)}
                      className="mt-1 text-blue-600 hover:text-blue-700 text-sm md:hidden underline"
                    >
                      {summaryExpanded ? 'Leer menos' : 'Leer más'}
                    </button>
                  </>
                )}
                <div className="flex items-center gap-4 mt-1 justify-center md:justify-start lg:justify-start xl:justify-start">
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
                {school.urlVideo && (
                  <div className="mt-4 flex justify-center md:justify-start lg:justify-start">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="px-4 py-2 rounded-md bg-[#FF385C] hover:bg-[#e63152] text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF385C]"
                          aria-label="Ver video de la escuela"
                        >
                          <span className="inline-flex items-center gap-2">
                            <PlayCircle className="h-4 w-4" />
                            Video de la escuela
                          </span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Presentación de {school.name}</DialogTitle>
                        </DialogHeader>
                        <VideoEmbed url={school.urlVideo || undefined} getEmbedUrl={getEmbedUrl} />
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-6 text-gray-800 mb-4 mt-4 justify-center md:justify-center lg:justify-start xl:justify-start">
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
                    <div className="flex items-center text-sm gap-1">
                      {getTransportIcon(school.name) || (
                        <Footprints className="text-base w-5 h-5" />
                      )}
                      <span className="text-sm">
                        {school.description.minutosAlCentro} min/centro
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden md:block lg:block self-center sm:self-start sm:mt-1 lg:mt-0" style={{ width: 160, height: 120 }}>
                {school.logo && (
                  <Image
                    src={rewriteToCDN(school.logo)}
                    alt="School logo"
                    width={160}
                    height={120}
                    className="object-contain select-none pointer-events-none"
                    quality={75}
                    onContextMenu={(e) => e.preventDefault()}
                    loading="lazy"
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 120px, 160px"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,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"
                  />
                )}
              </div>
            </div>

            {/* Descripción crítica - render inmediato */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gray-700 leading-relaxed mb-6 text-justify"
            >
              {school.description?.detalleEscuela}
            </motion.p>

            {/* Secciones con Suspense streaming */}
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

          {/* Panel de booking con Suspense */}
          <div className="lg:col-span-1" id="booking-pannel">
            <Suspense fallback={
              <div className="bg-white rounded-lg border p-6 sticky top-4">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-40" />
                  <div className="space-y-3">
                    <div className="h-10 bg-gray-200 rounded" />
                    <div className="h-10 bg-gray-200 rounded" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                  <div className="h-12 bg-gray-200 rounded mt-6" />
                </div>
              </div>
            }>
              <BookingPannel
                courseInfo={courseInfo}
                error={hasBookingError}
                errorMessage={errorMessage}
                formData={formData}
                loading={isBookingLoading}
                onChangeTypeOfCourse={onChangeTypeOfCourse}
                onFormDataChange={onFormDataChange}
                onSubmitReservation={onSubmitReservation}
                onUpdateReservation={onUpdateReservation}
                reservation={reservation}
                scheduleInfo={scheduleInfo}
                weeksBySchoolInfo={weeksBySchoolInfo}
                schoolId={schoolId}
              />
            </Suspense>
          </div>
        </div>
      </div>

      <ScrollToBookingButton />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <Footer showWhatsApp={false} />
    </div>
  );
};

export default SchoolSeoHome;

// Se monta/desmonta el iframe según apertura del diálogo para controlar autoplay/stop
const VideoEmbed: React.FC<{ url?: string; getEmbedUrl: (raw?: string | null, muted?: boolean) => string | null }>
  = ({ url, getEmbedUrl }) => {
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  // Persistir preferencia (localStorage) para no mostrar overlay si ya activó sonido
  const storageKey = useMemo(() => `VIDEO_SOUND_PREF::${url ?? ""}`, [url]);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const pref = localStorage.getItem(storageKey);
      if (pref === "1") setMuted(false);
    } catch {}
  }, [storageKey]);

  const src = useMemo(() => getEmbedUrl(url, muted) || undefined, [url, muted, getEmbedUrl]);
  // Al cerrar el dialog, el componente se desmonta y el video se detiene.
  return (
    <div className="relative aspect-video w-full">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 rounded" />
      )}
      <iframe
        src={src}
        className="w-full h-full rounded"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
      {muted && (
        <button
          onClick={() => {
            setLoaded(false);
            setMuted(false);
            try { localStorage.setItem(storageKey, "1"); } catch {}
          }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-md bg-black/60 hover:bg-black/70 text-white text-xs font-medium inline-flex items-center gap-1"
        >
          <Volume2 className="h-3.5 w-3.5" /> Activar sonido
        </button>
      )}
    </div>
  );
};
const SchoolStatDynamic = dynamic(
  () => import("@/app/features/school/components/SchoolStat").then(m => ({ default: m.default })),
  { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 h-40 rounded-lg mb-6" /> }
);
