"use client";

import { useState } from "react";
import { ReservationFormData } from "@/types/reservationForm";
import { Reservation } from "@/types";
import { CoursesInfo } from "@/lib/types/coursesInfo";
import BookingPannelLoading from "./BookingPannel.loading";
// import BookingPannelError from "./BookingPannel.error";
// import BookingPannelNoReservation from "./BookingPannel.noReservation";
import BookingPannelSubmit from "./BookingPannel.submit";
import WorkAndStudyBooking from "./forms/BookingForm.workAndStudy";
import SummaryModal from "./summary/Summary.modal";
import GeneralBooking from "./forms/BookingForm.general";
import { CourseKey, courseLabelToIdMap } from "@/lib/helpers/courseHelper";
import { ScheduleInfo } from "@/lib/types/scheduleInfo";
import { WeeksBySchoolInfo } from "@/lib/types/weeksBySchoolInfo";

export type BookingPannelProps = {
  reservation: Reservation | null;
  error: boolean;
  errorMessage: string;
  loading: boolean;
  courseInfo: CoursesInfo;
  scheduleInfo: ScheduleInfo;
  weeksBySchoolInfo: WeeksBySchoolInfo;
  formData: Partial<ReservationFormData>;
  onFormDataChange: (updated: Partial<ReservationFormData>) => void;
  onUpdateReservation: (updatedData: Partial<ReservationFormData>) => void;
  onSubmitReservation: (formData: ReservationFormData) => Promise<{ success: boolean; message?: string }>;
};

const BookingPannel = ({
  reservation,
  formData,
  onFormDataChange,
  onUpdateReservation,
  onSubmitReservation,
  loading,
  // error,
  // errorMessage,
  courseInfo,
  scheduleInfo,
  weeksBySchoolInfo
}: BookingPannelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitContact = async (finalData: ReservationFormData) => {
    const result = await onSubmitReservation(finalData);

    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.message || "Error al enviar la reserva");
    }
  };

  if (loading) return <BookingPannelLoading />;
  // if (error) return <BookingPannelError message={errorMessage} />;
  // if (!reservation) return <BookingPannelNoReservation />;
  if (submitted) return <BookingPannelSubmit />;

  const courseKey = reservation ? courseLabelToIdMap[reservation.course] : undefined;

  const renderBookingForm = () => {
    if (courseKey === CourseKey.WORK_AND_STUDY) {
      return (
        <WorkAndStudyBooking
          reservation={reservation}
          scheduleInfo={scheduleInfo}
          formData={formData}
          onUpdateReservation={onUpdateReservation}
          onChangeFormData={onFormDataChange}
          onReserve={handleOpenModal}
        />
      );
    }

    return (
      <GeneralBooking
        reservation={reservation}
        courseInfo={courseInfo}
        scheduleInfo={scheduleInfo}
        weeksBySchoolInfo={weeksBySchoolInfo}
        formData={formData}
        onUpdateReservation={onUpdateReservation}
        onChangeFormData={onFormDataChange}
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
