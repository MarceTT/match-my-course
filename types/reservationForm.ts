import { CourseKey } from "@/lib/helpers/courseHelper";
import * as z from "zod";

import { subYears, format as formatDate } from "date-fns";

export const parseDDMMYYYY = (s: string): Date | undefined => {
  if (!s || typeof s !== "string") return undefined;
  const parts = s.split("/");
  if (parts.length !== 3) return undefined;
  const [dd, mm, yyyy] = parts;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return isNaN(d.getTime()) ? undefined : d;
};

export const reservationFormSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido requerido"),
  email: z.string().email("El correo elecrónico es inválido"),
  nationality: z.string().min(1, "Selecciona una nacionalidad"),
  //phone: z.string().min(8, "Teléfono inválido"),
  fechaInicioCurso: z.string().refine(
    (val) => val && val.length > 0,
    { message: "Selecciona tu fecha de inicio" }
  ),
  nivelProfesional: z.string().min(1, "Selecciona tu nivel profesional"),
  nivelAproximado: z.string().min(1, "Selecciona tu nivel aproximado"),
  nacimiento: z
    .string()
    .min(1, "Ingresa tu fecha de nacimiento")
    .refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
      message: "Formato inválido. Usa dd/mm/yyyy",
    })
    .refine(
      (val) => {
        const d = parseDDMMYYYY(val);
        if (!d) return false;
        const max = subYears(new Date(), 16);
        return d <= max;
      },
      { message: "Debes ser mayor de 16 años" }
    ),
  //respaldoEconomico: z.string().min(1, "Selecciona tu respaldo económico"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar el consentimiento",
  }),
  consent2: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los Términos y Condiciones",
  }),
  country: z.string().optional(),


  // AGREGAR ESTOS CAMPOS
  courseProgram: z.string().optional(),
  weeksToStudy: z.number().optional(),
  schedule: z.string().optional(),

  // Campos extendidos (opcionales):
  studyDuration: z.number().optional(),
  //schedule: z.string().optional(),
  specificSchedule: z.string().optional(),
  startDate: z.date().optional(),
  accommodation: z.enum(["si", "no", "posterior"]).optional(),
  courseType: z.nativeEnum(CourseKey).optional(),
  schoolName: z.string().optional(),
  totalPrice: z.number().optional(),
  offerPrice: z.number().optional(),
  city: z.string().optional(),
  weeks: z.number().optional(),
});

export type ReservationFormData = z.infer<typeof reservationFormSchema>;
