"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReservationFormData, reservationFormSchema } from "@/types/reservationForm";
import { Reservation } from "@/types";
import { countries } from "@/lib/constants/countries";
import { CustomCountrySelect } from "../../common/CustomCountrySelect";

interface ReservationSummaryModalProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation;
  formData: Partial<ReservationFormData & {
    startDate?: Date;
    accommodation?: "si" | "no";
  }>;
  onSubmitContact: (data: ReservationFormData) => void;
}

export default function ReservationSummaryModal({
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
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Escuela:</strong> {reservation.schoolName}</p>
            <p>
              <strong>Ciudad:</strong> Dublin</p>
            <p>
              <strong>Curso:</strong> {reservation.course}</p>
            <p>
              <strong>Modalidad:</strong> {reservation.schedule}</p>
            <p>
              <strong>Semanas de estudio:</strong> {reservation.weeks}</p>
            <p>
              <strong>Inicio:</strong> {formData.startDate ? format(formData.startDate, "PPP", { locale: es }) : "No seleccionado"}
            </p>
            {formData.accommodation && (
              <p>
                <strong>Alojamiento:</strong> {formData.accommodation}
              </p>
            )}
            {reservation.basePrice !== undefined && (
              <p>
                <strong>Precio final:</strong> €{reservation.basePrice.toLocaleString()}
              </p>
            )}
            <p>
              <strong>Gastos adicionales:</strong> Matrícula, materiales, exámen de salida, seguro médico.
            </p>
            <div className="pt-6">
              <Button className="w-full bg-red-500 hover:bg-red-600" onClick={handleNext}>
                Siguiente
              </Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ejemplo@correo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidad</FormLabel>
                      <FormControl>
                        <CustomCountrySelect
                          options={countries}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Selecciona tu país"
                          showCode={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-normal">
                      Teléfono
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem className="w-[150px]">
                            <FormControl>
                              <CustomCountrySelect
                                options={countries}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="+56"
                                showNameInSelectedValue={false}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder=""
                          className="h-10 bg-gray-50 border-gray-200 flex-1"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <div className="flex items-start gap-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="text-sm leading-tight">
                        Doy mi consentimiento para el tratamiento de mis datos personales
                        asociados al curso tomado de acuerdo con los términos de la
                        Política de Privacidad.
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consent2"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <div className="flex items-start gap-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="text-sm leading-tight">
                        Declaro haber leído, comprendido y aceptado los Términos y Condiciones
                        generales del servicio, incluyendo las políticas de pagos, cambios,
                        cancelaciones y devoluciones asociadas al curso contratado.
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full bg-red-500 hover:bg-red-600">
                Enviar solicitud
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
