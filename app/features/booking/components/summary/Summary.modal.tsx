"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import { formatDate } from "date-fns";


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
  initialStep?: "summary" | "contact";
  weeks?: number;
  courseType?: string;
  schedule?: string;
}

function normalizeDate(date: string | Date | undefined): Date | null {
  if (!date) return null;
  if (date instanceof Date) return date;

  const parts = date.split("-");
  if (parts.length === 3) {
    const [d, m, y] = parts;
    const parsed = new Date(`${y}-${m}-${d}T00:00:00`);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

export default function SummaryModal({
  open,
  onClose,
  reservation,
  formData,
  onSubmitContact,
  disabled,
  initialStep = "summary",
  weeks,
  courseType,
  schedule,
}: ReservationSummaryModalProps) {
//   console.log("Reserva para ver datos", reservation);
  const [step, setStep] = useState<"summary" | "contact">(initialStep);

  // Derivar siempre el precio desde la reserva vigente (tipo de curso y horario seleccionados)
  const computedFinalPrice = useMemo(() => {
    const rawOffer = (reservation as any)?.ofertaBruta ?? (reservation as any)?.offer;
    const rawBase = (reservation as any)?.precioBruto ?? (reservation as any)?.total;
    if (rawOffer && Number(rawOffer) > 0) return Number(rawOffer);
    return Number(rawBase ?? 0);
  }, [reservation]);

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      nationality: "",
      country: "",
      nivelProfesional: "",
      nivelAproximado: "",
      fechaInicioCurso: formData.startDate 
        ? (typeof formData.startDate === 'string' 
            ? formData.startDate 
            : formatDate(formData.startDate, "dd/MM/yyyy"))
        : "",
      nacimiento: "",
      consent: false,
      consent2: false,
      // AGREGAR VALORES INICIALES
      courseProgram: courseType,
      weeksToStudy: weeks,
      schedule: schedule,
    },
  });

  useEffect(() => {
    if (open) {
      setStep(initialStep);
    } else {
      setStep(initialStep);
      form.reset();
    }
  }, [open, initialStep, form]);

  function handleNextFromZero(_price: number) {
    // ya no se usa estado local; el precio se deriva de la reserva
    setStep(initialStep);
  }

  function handleNext() {
    if (step === "summary") {
      setStep("contact");
    }
  }

  const { handleSubmit, ...restForm } = form;

  async function onSubmit(data: ReservationFormData) {
    const finalData = {
      ...formData,
      ...data,
      finalPrice: computedFinalPrice,
    };
    try {
      onSubmitContact(finalData);
      // NO cerramos el modal aquí - la navegación se manejará desde el container
    } catch (err) {
      console.error("Error en envío de contacto", err);
    }
  }

  return (
    <>
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          transition: scrollbar-color 0.3s ease;
        }
        .custom-scrollbar:hover {
          scrollbar-color: rgb(209, 213, 219) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 20px;
          transition: background-color 0.3s ease;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgb(209, 213, 219);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgb(156, 163, 175);
        }
        .modal-sending :global(button[aria-label="Close"]) {
          opacity: 0.3;
          pointer-events: none;
          cursor: not-allowed;
        }
      `}</style>
      <Dialog open={open} onOpenChange={disabled ? undefined : onClose}>
        <DialogContent
          className={`max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden ${disabled ? 'modal-sending' : ''}`}
          onInteractOutside={(e) => {
            if (disabled) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (disabled) {
              e.preventDefault();
            }
          }}
        >
        <DialogHeader className="flex-shrink-0">
        <DialogTitle className="text-xl font-bold text-center">
            {step === "summary"
              ? "Detalle de tu reserva"
              : "Tus datos de contacto"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-1 custom-scrollbar">
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
                  formData={{ ...formData, finalPrice: computedFinalPrice }}
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
                  reservation={reservation}
                  formData={formData}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
      </Dialog>
    </>
  );
}
