"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReservationFormData, reservationFormSchema } from "@/types/reservationForm";
import { Reservation } from "@/types";
import BookingSummaryStepOne from "./Summary.stepOne";
import BookingSummaryStepTwo from "./Summary.stepTwo";

interface ReservationSummaryModalProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  formData: Partial<ReservationFormData & {
    startDate?: Date;
    accommodation?: "si" | "no";
  }>;
  onSubmitContact: (data: ReservationFormData) => void;
}

export default function SummaryModal({
  open,
  onClose,
  reservation,
  formData,
  onSubmitContact,
}: ReservationSummaryModalProps) {
  const [step, setStep] = useState<"summary" | "contact">("summary");

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      nationality: "",
      phone: "",
      consent: false,
      consent2: false,
    },
  });

  useEffect(() => {
    if (!open) {
      setStep("summary");
      form.reset();
    }
  }, [open, form]);

  function handleNext() {
    setStep("contact");
  }

  async function onSubmit(data: ReservationFormData) {
    const finalData = {
      ...formData, // viene del paso anterior, por props
      ...data,     // campos del formulario de contacto
    };

    onSubmitContact(finalData as ReservationFormData);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {step === "summary" ? "Detalle de tu reserva" : "Tus datos de contacto"}
          </DialogTitle>
        </DialogHeader>
        {step === "summary" ? (
          <BookingSummaryStepOne
            reservation={reservation}
            formData={formData}
            onNext={handleNext}
          />
        ) : (
          <BookingSummaryStepTwo
            form={form}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
