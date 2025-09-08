"use client";

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
import { Button } from "@/components/ui/button";
import { CustomCountrySelect } from "@/app/shared";
import { countries } from "@/lib/constants/countries";
import { ReservationFormData } from "@/types/reservationForm";
import { UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type ContactStepProps = {
  form: UseFormReturn<ReservationFormData>;
  onSubmit: (data: ReservationFormData) => void;
  onBack: () => void;
  disabled?: boolean;
};

export default function SummaryStepTwo({ form, onSubmit, onBack, disabled }: ContactStepProps) {
  return (
    <Form {...form}>
      <form
  onSubmit={form.handleSubmit(
    (data) => {
      console.log("✔ FORM OK", data);
      onSubmit(data);
    },
    (errors) => {
      console.error("❌ VALIDATION ERRORS", errors);
    }
  )}
  className="space-y-6"
>
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
                  <Input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    {...field}
                  />
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
              <FormLabel className="text-base font-normal">Teléfono</FormLabel>
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
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="text-sm leading-tight">
                  Doy mi consentimiento para el tratamiento de mis datos
                  personales asociados al curso tomado de acuerdo con los
                  términos de la{" "}
                    <Link
                      href="https://www.matchmycourse.com/politica-de-privacidad"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Política de Privacidad
                    </Link>.
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
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="text-sm leading-tight">
                  Declaro haber leído, comprendido y aceptado los{" "}
                    <Link
                      href="https://www.matchmycourse.com/terminos-y-condiciones"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Términos y Condiciones generales del servicio
                    </Link>,
                  incluyendo políticas de pagos, cambios, cancelaciones y devoluciones asociadas al
                  curso contratado.
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            className="bg-gray-50 hover:bg-gray-100"
            onClick={onBack}
          >
            ← Ver detalles
          </Button>

          <Button type="submit" className="bg-[#FF385C] hover:bg-[#E51D58] text-white" disabled={disabled}>
            {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {disabled ? "Enviando..." : "Enviar solicitud"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
