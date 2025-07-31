import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  slug: z.string()
    .min(2, "El slug es obligatorio")
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  description: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;