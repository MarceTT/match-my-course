"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingPannelProps } from "@/app/lib/types";
import GeneralBookingForm from "./forms/GeneralBookingForm";
import WorkAndStudyBookingForm from "./forms/WorkAndStudyBookingForm";
import { Course } from "@/lib/constants/courses";

const BookingPannel = ({ reservation, loading, error }: BookingPannelProps) => {
  console.log('BookingPannel --> reservation', reservation)

  if (loading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 border border-red-500 bg-red-50 text-red-700">
        <p>Error: {error}</p>
      </Card>
    );
  }

  if (!reservation) {
    return (
      <Card className="p-4">
        <p>No hay datos de reserva disponibles.</p>
      </Card>
    );
  }

  switch (reservation.course) {
    case Course.GENERAL:
    case Course.INTENSIVE:
    case Course.GENERAL_PLUS:
      return <GeneralBookingForm reservation={reservation} />;

    case Course.WORK_AND_STUDY:
      return <WorkAndStudyBookingForm reservation={reservation} />;

    default:
      return <GeneralBookingForm reservation={reservation} />;
  }
}

export default BookingPannel;
