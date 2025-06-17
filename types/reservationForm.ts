import * as z from "zod";

export const reservationFormSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido requerido"),
  email: z.string().email("El correo elecrónico es inválido"),
  nationality: z.string().min(1, "Selecciona una nacionalidad"),
  phone: z.string().min(8, "Teléfono inválido"),
  consent: z.boolean().refine(val => val === true, {
    message: "Debes aceptar el consentimiento",
  }),
  country: z.string().min(1, "La ciudad es requerida"),

  // Campos extendidos:
  studyDuration: z.number().optional(),
  schedule: z.enum(["am", "pm"]).optional(),
  startDate: z.date().optional(),
  accommodation: z.enum(["si", "no"]).optional(),
});

export type ReservationFormData = z.infer<typeof reservationFormSchema>;
