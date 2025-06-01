import * as z from "zod";

export const reservationFormSchema = z.object({
  fullName: z.string().min(1, "El nombre completo es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Teléfono inválido"),
});

export type ReservationFormData = z.infer<typeof reservationFormSchema>;
