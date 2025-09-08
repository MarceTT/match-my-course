"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import CountrySelect from "./CountrySelect";
import { CustomCountrySelect } from "./CustomCountrySelect";
import { countries } from "@/lib/constants/countries";
import { z } from "zod";
import Link from "next/link";
import { transformReservationData } from "@/lib/helpers/transformReservation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { launchConfettiBurst } from "@/lib/confetti";
import { sendGTMEvent } from "@/app/lib/gtm";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  email: z.string().email({ message: "Email inválido" }),
  country: z.object({
    value: z.string(),
    label: z.string(),
    code: z.string(),
    flag: z.string(),
  }),
  phone: z.string().min(8, { message: "Teléfono inválido" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar el tratamiento de datos personales",
  }),
  nationality: z.string(),
});

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogMatch = ({ open, onOpenChange }: ReservationDialogProps) => {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: { value: "CL", label: "Chile", code: "+56", flag: "🇨🇱" },
      phone: "",
      consent: false,
      nationality: "CL",
    },
  });

  useEffect(() => {
    if (open) {
      sendGTMEvent("reserva_asesoria_form_opened", { timestamp: new Date().toISOString() });
    } else {
      form.reset();
    }
  }, [open, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const transformedData = transformReservationData(values, countries);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/email/consulting`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transformedData),
        }
      );

      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        form.reset();
        launchConfettiBurst();
        toast.success("¡Mensaje enviado, revisa tu correo electrónico!");
        onOpenChange(false);
        sendGTMEvent("reserva_asesoria_form_submitted", {
          name: values.name,
          email_domain: values.email.split("@")[1], // Solo dominio, no correo completo
          nationality: values.nationality,
          phone_code: values.country.code,
        });
      } else {
        toast.error("Hubo un error al enviar el formulario");
      }
    } catch (error) {
      toast.error("Error al enviar el formulario");
      console.error(error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-normal">
            Completa el formulario para reservar reunión
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">
                    Nombre según ID/pasaporte
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      className="h-12 bg-gray-50 border-gray-200"
                      {...field}
                    />
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
                  <FormLabel className="text-base font-normal">
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder=""
                      className="h-12 bg-gray-50 border-gray-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-semibold" />
                </FormItem>
              )}
            />

            <div className="text-sm text-gray-600">
              Recibirás los documentos relacionados a la reserva de tu curso
            </div>

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">
                    Nacionalidad
                  </FormLabel>
                  <FormControl>
                    <CustomCountrySelect
                      className="min-h-[56px]"
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
                        <FormItem className="w-[180px]">
                          <FormControl>
                            <CountrySelect
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder=""
                        className="h-12 bg-gray-50 border-gray-200 flex-1"
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
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="text-sm leading-none">
                    Doy mi consentimiento para el tratamiento de mis datos
                    personales asociados al curso tomado de acuerdo con los
                    términos de la{" "}
                    <Link
                      href="https://www.matchmycourse.com/politica-de-privacidad"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Política de Privacidad
                    </Link>
                    .
                    <FormMessage className="mt-4 font-semibold" />
                  </div>
                </FormItem>
              )}
            />
            {submitted ? (
              <p className="text-center text-green-600 text-lg">
                ¡Gracias por tu mensaje!
              </p>
            ) : (
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full h-12 bg-[#FF385C] hover:bg-[#E51D58] text-white font-semibold"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <span>Contactar</span>
                )}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMatch;
