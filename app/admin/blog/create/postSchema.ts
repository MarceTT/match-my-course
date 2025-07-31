import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  slug: z
    .string()
    .min(3, "El slug es obligatorio")
    .regex(/^[a-z0-9-]+$/, "Usa solo minúsculas, números y guiones"),
  excerpt: z
    .string()
    .max(300, "El resumen no puede superar 300 caracteres")
    .optional(),
  content: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
  category: z.string().min(1, "Debe seleccionar una categoría"),
  tags: z.array(z.string()).default([]), // Se envía como texto, backend debe dividir en array
  metaTitle: z
    .string()
    .max(70, "El título SEO no puede superar 70 caracteres")
    .optional(),
  metaDescription: z
    .string()
    .max(160, "La descripción SEO no puede superar 160 caracteres")
    .optional(),
  coverImage: z
    .instanceof(File)
    .optional()
    .or(z.null()), // portada opcional (req.file en backend)
});

export type PostFormValues = z.infer<typeof postSchema>;