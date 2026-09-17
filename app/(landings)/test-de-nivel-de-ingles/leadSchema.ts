// Lead form validation schema for the placement test.
// Uses Zod 3 (project pins zod ^3.24) — top-level z.email() is Zod 4 and is NOT used here.

import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  email: z.string().email("El correo no es válido"),
  country: z.string().min(1, "Selecciona tu país de residencia"),
  nationality: z.string().min(1, "Ingresa tu nacionalidad"),
  // Marketing opt-in — NOT required, defaults to false.
  contactOptIn: z.boolean().optional().default(false),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
