"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingPannelProps } from "@/lib/types";
import GeneralBookingForm from "./forms/GeneralBookingForm";
import WorkAndStudyBookingForm from "./forms/WorkAndStudyBookingForm";
import { Course, courseLabelToIdMap } from "@/lib/constants/courses";
import ReservationSummaryModal from "./forms/ReservationSummaryModal";
import { ReservationFormData } from "@/types/reservationForm";

const BookingPannel = ({ reservation, submitReservation, loading, error }: BookingPannelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitContact = async (formData: ReservationFormData) => {
    const result = await submitReservation(formData);

    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.message || "Error al enviar la reserva");
    }
  };

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

  if (submitted) {
    return (
      <p className="text-center text-green-600 text-lg">¡Gracias por tu mensaje!</p>
    )
  }

  return (
    <>
      {(() => {
        const courseKey = courseLabelToIdMap[reservation.course];

        switch (courseKey) {
          case Course.GENERAL:
          case Course.INTENSIVE:
          case Course.GENERAL_PLUS:
            return (
              <GeneralBookingForm
                reservation={reservation}
                onReserve={handleOpenModal}
              />
            );
          case Course.WORK_AND_STUDY:
            return (
              <WorkAndStudyBookingForm
                reservation={reservation}
                onReserve={handleOpenModal}
              />
            );
          default:
            return (
              <GeneralBookingForm
                reservation={reservation}
                onReserve={handleOpenModal}
              />
            );
        }
      })()}
      <ReservationSummaryModal
        open={isModalOpen}
        onClose={handleCloseModal}
        reservation={reservation}
        onSubmitContact={handleSubmitContact}
      />
    </>
  );
}

export default BookingPannel;
