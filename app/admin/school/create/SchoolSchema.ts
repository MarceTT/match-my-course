import { z } from "zod";

// Definimos el esquema de validación con Zod
const MAX_FILE_SIZE = 35 * 1024 * 1024; // 35MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const schoolFormSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres"),
  city: z
    .string()
    .min(3, "La ciudad debe tener al menos 3 caracteres")
    .max(50, "La ciudad no puede tener más de 50 caracteres"),
  status: z.boolean().default(true),
  logo: z
    .any()
    .refine((file) => {
      if (!file) return true; // Hace el campo opcional
      return file?.size <= MAX_FILE_SIZE;
    }, "El archivo debe ser menor a 35MB")
    .refine((file) => {
      if (!file) return true;
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, "Solo se aceptan archivos .jpg, .jpeg, .png, .webp y .svg")
    .optional(),
  mainImage: z
    .any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "El archivo debe ser menor a 35MB"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Solo se aceptan archivos .jpg, .jpeg, .png, .webp y .svg"
    ),
  galleryImages: z
    .array(z.any())
    .refine(
      (files) => files.every((file) => file?.size <= MAX_FILE_SIZE),
      "Cada archivo debe ser menor a 35MB"
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
      "Solo se aceptan archivos .jpg, .jpeg, .png, .webp y .svg"
    )
    .refine((files) => files.length <= 5, "No puedes subir más de 5 imágenes")
    .optional()
    .default([]),
});

// Tipo inferido del esquema
export type SchoolFormValues = z.infer<typeof schoolFormSchema>;