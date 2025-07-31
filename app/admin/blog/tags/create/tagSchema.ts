import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  slug: z.string()
    .min(2, "El slug es obligatorio")
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type TagFormValues = z.infer<typeof tagSchema>;