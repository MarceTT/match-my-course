"use client";

import { useEffect, useState } from "react";
import { ReservationFormData } from "@/types/reservationForm";
import { Reservation } from "@/types";
import { CoursesInfo } from "@/lib/types/coursesInfo";
import BookingPannelLoading from "./BookingPannel.loading";
import BookingPannelSubmit from "./BookingPannel.submit";
import WorkAndStudyBooking from "./forms/BookingForm.workAndStudy";
import SummaryModal from "./summary/Summary.modal";
import GeneralBooking from "./forms/BookingForm.general";
import { CourseKey, courseLabelToIdMap } from "@/lib/helpers/courseHelper";
import { ScheduleInfo } from "@/lib/types/scheduleInfo";
import { WeeksBySchoolInfo } from "@/lib/types/weeksBySchoolInfo";
import { launchConfettiBurst } from "@/lib/confetti";
import { getInitialStartDate } from "@/lib/helpers/calendar";
import { irishHolidays } from "@/lib/constants/holidays";

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
  onChangeTypeOfCourse: (updatedData: Partial<ReservationFormData>) => void;
  onUpdateReservation: (updatedData: Partial<ReservationFormData>) => void;
  onSubmitReservation: (formData: ReservationFormData) => Promise<{ success: boolean; message?: string }>;
};

const BookingPannel = ({
  reservation,
  formData,
  onChangeTypeOfCourse,
  onFormDataChange,
  onUpdateReservation,
  onSubmitReservation,
  loading,
  courseInfo,
  scheduleInfo,
  weeksBySchoolInfo
}: BookingPannelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!formData.accommodation) {
      onFormDataChange({ accommodation: "posterior" });
    }
  }, [formData.accommodation]);

  useEffect(() => {
    if (!formData.startDate && reservation) {
      const fechaCalculada = getInitialStartDate(new Date(), irishHolidays);
      if (fechaCalculada) {
        onFormDataChange({ startDate: fechaCalculada });
      }
    }
  }, [formData.startDate, reservation]);

  const handleSubmitContact = async (finalData: ReservationFormData) => {
    setIsSending(true);
    const result = await onSubmitReservation(finalData);

    if (result.success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsSending(false);
      launchConfettiBurst();
      setSubmitted(true);
    } else {
      setIsSending(false);
      alert(result.message || "Error al enviar la reserva");
    }
    setIsSending(false);
  };

  if (loading) return <BookingPannelLoading />;
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
          disabled={isSending}
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
        onChangeTypeOfCourse={onChangeTypeOfCourse}
        onUpdateReservation={onUpdateReservation}
        onChangeFormData={onFormDataChange}
        onReserve={handleOpenModal}
        disabled={isSending}
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
        disabled={isSending}
      />
    </>
  );
};

export default BookingPannel;
