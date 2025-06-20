"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import GeneralBookingForm from "./forms/GeneralBookingForm";
import WorkAndStudyBookingForm from "./forms/WorkAndStudyBookingForm";
import { Course, courseLabelToIdMap } from "@/lib/constants/courses";
import ReservationSummaryModal from "./forms/ReservationSummaryModal";
import { ReservationFormData } from "@/types/reservationForm";
import { Reservation } from "@/types";
import { CoursesInfo } from "@/lib/types/coursesInfo";

export type BookingPannelProps = {
  reservation: Reservation | null;
  error: string;
  loading: boolean;
  courseInfo: CoursesInfo;
  onSubmitReservation: (formData: ReservationFormData) => Promise<{ success: boolean; message?: string }>;
};

const BookingPannel = ({
  reservation,
  onSubmitReservation,
  loading,
  error,
  courseInfo
}: BookingPannelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<ReservationFormData>>({});

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormDataChange = (updated: Partial<ReservationFormData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  const handleSubmitContact = async (finalData: ReservationFormData) => {
    const result = await onSubmitReservation(finalData);

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
    );
  }

  const courseKey = courseLabelToIdMap[reservation.course];

  return (
    <>
      {courseKey === Course.WORK_AND_STUDY ? (
        <WorkAndStudyBookingForm
          reservation={reservation}
          formData={formData}
          onChangeFormData={handleFormDataChange}
          onReserve={handleOpenModal}
        />
      ) : (
        <GeneralBookingForm
          reservation={reservation}
          courseInfo={courseInfo}
          formData={formData}
          onChangeFormData={handleFormDataChange}
          onReserve={handleOpenModal}
        />
      )}
      <ReservationSummaryModal
        open={isModalOpen}
        onClose={handleCloseModal}
        reservation={reservation}
        formData={formData}
        onSubmitContact={handleSubmitContact}
      />
    </>
  );
};

export default BookingPannel;
