"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUp, PlayCircle, Volume2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useScrollTopButton } from "@/hooks/useScrollTopButton";
import { useBooking } from "@/app/features/booking";

const BookingPannel = dynamic(
  () =>
    import("@/app/features/booking").then((mod) => ({
      default: mod.BookingPannelContainer,
    })),
  { ssr: false }
);

type Props = {
  schoolId: string;
  schoolName: string;
  schoolUrlVideo?: string;
  slugCurso: string;
  weeks: number;
  schedule: string;
  mobileOnly?: boolean;
};

export const SchoolSeoHomeClient = ({
  schoolId,
  schoolName,
  schoolUrlVideo,
  slugCurso,
  weeks,
  schedule,
  mobileOnly = false,
}: Props) => {
  const { visible: showScrollTop, scrollToTop } = useScrollTopButton();

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

  const getEmbedUrl = (raw?: string | null, muted: boolean = true) => {
    if (!raw) return null;
    try {
      const url = new URL(raw);
      const host = url.hostname.toLowerCase();
      if (host.includes("youtube.com") || host.includes("youtu.be")) {
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

  if (mobileOnly) {
    // Mobile only - show booking panel for mobile screens
    return (
      <>
        {/* Video button only */}
        {schoolUrlVideo && (
          <div className="mt-6 mb-4 flex justify-center lg:justify-start">
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
              <DialogContent className="max-w-5xl">
                <DialogHeader>
                  <DialogTitle>Presentación de {schoolName}</DialogTitle>
                </DialogHeader>
                <VideoEmbed url={schoolUrlVideo} getEmbedUrl={getEmbedUrl} />
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Booking panel mobile */}
        <div className="lg:hidden mt-6 mb-8" id="booking-pannel">
          <Suspense fallback={
            <div className="bg-white rounded-lg border p-6">
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
      </>
    );
  }

  // Desktop only - show booking panel for desktop screens
  return (
    <>
      {/* Booking panel desktop - note: grid positioning is in parent SchoolSeoHome div */}
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

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

// Video embed component - only mounts when dialog is open
const VideoEmbed: React.FC<{ url?: string; getEmbedUrl: (raw?: string | null, muted?: boolean) => string | null }>
  = ({ url, getEmbedUrl }) => {
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const storageKey = useMemo(() => `VIDEO_SOUND_PREF::${url ?? ""}`, [url]);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const pref = localStorage.getItem(storageKey);
      if (pref === "1") setMuted(false);
    } catch {}
  }, [storageKey]);

  const src = useMemo(() => getEmbedUrl(url, muted) || undefined, [url, muted, getEmbedUrl]);

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
