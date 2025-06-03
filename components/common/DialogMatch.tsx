"use client";

import React, { useEffect } from "react";
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
import * as z from "zod";
import { Button } from "@/components/ui/button";
import CountrySelect from "./CountrySelect";

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
});

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogMatch = ({ open, onOpenChange }: ReservationDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: { value: "CL", label: "Chile", code: "+56", flag: "🇨🇱" },
      phone: "",
      consent: false,
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Aquí iría la lógica para enviar los datos
    console.log(values);
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
                    <a href="#" className="text-blue-600 hover:underline">
                      Política de Privacidad
                    </a>
                    .
                    <FormMessage className="mt-4 font-semibold" />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-[#FF385C] hover:bg-[#E51D58] text-white font-semibold"
            >
              Reservar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMatch;
