"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReservationFormData, reservationFormSchema } from "@/types/reservationForm";
import { Reservation } from "@/types";

interface ReservationSummaryModalProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation;
  onSubmitContact: (data: ReservationFormData) => void;
}

export default function ReservationSummaryModal({
  open,
  onClose,
  reservation,
  onSubmitContact,
}: ReservationSummaryModalProps) {
  const [step, setStep] = useState<"summary" | "contact">("summary");

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
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

  function onSubmit(data: ReservationFormData) {
    onSubmitContact(data);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {step === "summary" ? "Detalle de tu reserva" : "Tus datos de contacto"}
          </DialogTitle>
        </DialogHeader>

        {step === "summary" ? (
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Escuela:</strong> {reservation.school}</p>
            <p><strong>Ciudad:</strong> Dublin</p>
            <p><strong>Curso:</strong> {reservation.course}</p>
            <p><strong>Modalidad:</strong> {reservation.schedule}</p>
            <p><strong>Semanas de estudio:</strong> {reservation.schedule}</p>
            <p><strong>Inicio:</strong> {reservation.starDate}</p>
            {reservation.price !== undefined && (
              <p><strong>Precio final:</strong> €{reservation.price.toLocaleString()}</p>
            )}
            <p><strong>Gastos adicionales:</strong> Matrícula, materiales, exámen de salida, seguro médico.</p>
            <div className="pt-6">
              <Button className="w-full bg-red-500 hover:bg-red-600" onClick={handleNext}>
                Siguiente
              </Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Tu nombre completo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="ejemplo@mail.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" placeholder="123456789" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full bg-red-500 hover:bg-red-600" type="submit">
                Enviar solicitud
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
