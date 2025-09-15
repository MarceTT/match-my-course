"use client";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

// Skeletons optimizados para cada sección
const SchoolGallerySkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton key={i} className="aspect-video rounded-lg" />
    ))}
  </div>
);

const SchoolStatsSkeleton = () => (
  <Card className="p-6 mb-6">
    <Skeleton className="h-6 w-48 mb-4" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  </Card>
);

const CertificationsSkeleton = () => (
  <Card className="p-6 mb-6">
    <Skeleton className="h-6 w-32 mb-4" />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  </Card>
);

const FacilitiesSkeleton = () => (
  <Card className="p-6 mb-6">
    <Skeleton className="h-6 w-40 mb-4" />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  </Card>
);

const AccommodationSkeleton = () => (
  <Card className="p-6 mb-6">
    <Skeleton className="h-6 w-36 mb-4" />
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-start space-x-4">
          <Skeleton className="h-16 w-16 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const BookingPanelSkeleton = () => (
  <Card className="p-6 sticky top-4">
    <Skeleton className="h-6 w-40 mb-4" />
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full rounded" />
      </div>
      <Skeleton className="h-12 w-full rounded mt-6" />
    </div>
  </Card>
);

// Componentes lazy-loaded con Suspense
const LazySchoolGallery = React.lazy(
  () => import("@/app/features/school").then((mod) => ({ default: mod.SchoolDetail }))
);

const LazySchoolStats = React.lazy(
  () => import("@/app/features/school").then((mod) => ({ default: mod.SchoolStat }))
);

const LazyCertifications = React.lazy(
  () => import("@/app/features/school").then((mod) => ({ default: mod.Certifications }))
);

const LazyFacilities = React.lazy(
  () => import("@/app/features/school").then((mod) => ({ default: mod.Facilities }))
);

const LazyAccommodation = React.lazy(
  () => import("@/app/features/school").then((mod) => ({ default: mod.Accommodation }))
);

const LazyBookingPanel = React.lazy(
  () => import("@/app/features/booking").then((mod) => ({ default: mod.BookingPannelContainer }))
);

// Props interfaces
interface SchoolGalleryProps {
  images: string[];
  city: string;
}

interface SchoolStatsProps {
  data: Array<{ name: string; value: number }>;
  averageAge: number;
  nacionalidades: number;
}

interface CertificationsProps {
  school: any;
}

interface FacilitiesProps {
  installations: any;
}

interface AccommodationProps {
  accommodations: any[];
  detailAccomodation: any[];
  school: string;
}

interface BookingPanelProps {
  courseInfo: any;
  error: boolean;
  errorMessage: string;
  formData: any;
  loading: boolean;
  onChangeTypeOfCourse: (course: any) => void;
  onFormDataChange: (data: any) => void;
  onSubmitReservation: (formData: any) => Promise<{ success: boolean; message?: string }>;
  onUpdateReservation: () => void;
  reservation: any;
  scheduleInfo: any;
  weeksBySchoolInfo: any;
  schoolId: string;
}

// Componentes envueltos en Suspense
export const StreamingSchoolGallery: React.FC<SchoolGalleryProps> = (props) => (
  <Suspense fallback={<SchoolGallerySkeleton />}>
    <LazySchoolGallery {...props} />
  </Suspense>
);

export const StreamingSchoolStats: React.FC<SchoolStatsProps> = (props) => (
  <Suspense fallback={<SchoolStatsSkeleton />}>
    <LazySchoolStats {...props} />
  </Suspense>
);

export const StreamingCertifications: React.FC<CertificationsProps> = (props) => (
  <Suspense fallback={<CertificationsSkeleton />}>
    <LazyCertifications {...props} />
  </Suspense>
);

export const StreamingFacilities: React.FC<FacilitiesProps> = (props) => (
  <Suspense fallback={<FacilitiesSkeleton />}>
    <LazyFacilities {...props} />
  </Suspense>
);

export const StreamingAccommodation: React.FC<AccommodationProps> = (props) => (
  <Suspense fallback={<AccommodationSkeleton />}>
    <LazyAccommodation {...props} />
  </Suspense>
);

export const StreamingBookingPanel: React.FC<BookingPanelProps> = (props) => (
  <Suspense fallback={<BookingPanelSkeleton />}>
    <LazyBookingPanel {...props} />
  </Suspense>
);