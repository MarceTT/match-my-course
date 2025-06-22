"use client";

import { useState } from "react";
import { Course, courseLabelToIdMap } from "@/lib/constants/courses";
import { ReservationFormData } from "@/types/reservationForm";
import { Reservation } from "@/types";
import { CoursesInfo } from "@/lib/types/coursesInfo";
import BookingPannelLoading from "./BookingPannel.loading";
import BookingPannelError from "./BookingPannel.error";
import BookingPannelNoReservation from "./BookingPannel.noReservation";
import BookingPannelSubmit from "./BookingPannel.submit";
import WorkAndStudyBooking from "./forms/BookingForm.workAndStudy";
import SummaryModal from "./summary/Summary.modal";
import GeneralBooking from "./forms/BookingForm.general";

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
    console.log('updated', updated)
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

  if (loading) return <BookingPannelLoading />;
  if (error) return <BookingPannelError message={error} />;
  if (!reservation) return <BookingPannelNoReservation />;
  if (submitted) return <BookingPannelSubmit />;

  const courseKey = courseLabelToIdMap[reservation.course];

  const renderBookingForm = () => {
    if (courseKey === Course.WORK_AND_STUDY) {
      return (
        <WorkAndStudyBooking
          reservation={reservation}
          formData={formData}
          onChangeFormData={handleFormDataChange}
          onReserve={handleOpenModal}
        />
      );
    }

    return (
      <GeneralBooking
        reservation={reservation}
        courseInfo={courseInfo}
        formData={formData}
        onChangeFormData={handleFormDataChange}
        onReserve={handleOpenModal}
      />
    );
  };

  return (
    <>
      {renderBookingForm()}
      <SummaryModal
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
