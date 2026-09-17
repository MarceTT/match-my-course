"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card } from "@/components/ui/card";
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
import { CustomCountrySelect } from "@/app/components/common/CustomCountrySelect";
import { countries } from "@/lib/constants/countries";

import { leadSchema, type LeadFormValues } from "./leadSchema";

interface LeadFormProps {
  onSubmit: (values: LeadFormValues) => void;
}

export function LeadForm({ onSubmit }: LeadFormProps) {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      nationality: "",
      contactOptIn: false,
    },
  });

  return (
    <Card className="mx-auto flex max-w-2xl flex-col p-6 sm:p-8">
      <div className="mb-6 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
          Último paso
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Recibe tu resultado
        </h2>
        <p className="mx-auto mt-2 max-w-md text-base text-slate-500">
          Ya terminaste el test. Déjanos tus datos y te mostraremos tu nivel
          inmediatamente.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold text-slate-900">
                  Nombre completo *
                </FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre y apellidos" {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold text-slate-900">
                  Correo electrónico *
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@email.com" {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold text-slate-900">
                  País de residencia *
                </FormLabel>
                <FormControl>
                  <CustomCountrySelect
                    options={countries}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecciona tu país"
                    showCode={false}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold text-slate-900">
                  Nacionalidad *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Chilena, mexicana, argentina..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactOptIn"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(value) => field.onChange(value === true)}
                    className="mt-0.5"
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium leading-relaxed text-slate-600">
                  Quiero que MatchMyCourse me contacte con información y
                  oportunidades relacionadas con inglés.
                </FormLabel>
              </FormItem>
            )}
          />

          <p className="text-xs leading-relaxed text-slate-400">
            Tus datos se utilizarán para registrar tu resultado. Solo te
            contactaremos con información comercial si marcas la casilla anterior.
          </p>

          <Button type="submit" className="w-full font-bold">
            Ver mi resultado →
          </Button>
        </form>
      </Form>
    </Card>
  );
}
