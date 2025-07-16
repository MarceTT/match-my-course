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
import {
  ReservationFormData,
  reservationFormSchema,
} from "@/types/reservationForm";
import { Reservation } from "@/types";
import BookingSummaryStepOne from "./Summary.stepOne";
import BookingSummaryStepTwo from "./Summary.stepTwo";
import { AnimatePresence, motion } from "framer-motion";


interface ReservationSummaryModalProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  formData: Partial<
    ReservationFormData & {
      startDate?: Date;
      accommodation?: "si" | "no" | "posterior";
    }
  >;
  onSubmitContact: (data: ReservationFormData) => void;
  disabled?: boolean;
}

export default function SummaryModal({
  open,
  onClose,
  reservation,
  formData,
  onSubmitContact,
  disabled,
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

  const { handleSubmit, ...restForm } = form;

  async function onSubmit(data: ReservationFormData) {
    const finalData = {
      ...formData,
      ...data,
    };
    try {
      onSubmitContact(finalData);
      onClose(); // cerramos el modal si todo salió bien
    } catch (err) {
      console.error("Error en envío de contacto", err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {step === "summary"
              ? "Detalle de tu reserva"
              : "Tus datos de contacto"}
          </DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {step === "summary" ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.25 }}
            >
              <BookingSummaryStepOne
                reservation={reservation}
                formData={formData}
                onNext={handleNext}
              />
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <BookingSummaryStepTwo
                form={form}
                onSubmit={onSubmit}
                onBack={() => setStep("summary")}
                disabled={disabled}
                
              />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
