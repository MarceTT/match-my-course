// schoolEditSchema.ts
import { z } from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

// Esquema para una imagen de galería
const galleryImageSchema = z.union([
  z.string().url(), // Para URLs existentes
  z.instanceof(File), // Para nuevos archivos
  z.object({
    id: z.string().optional(),
    url: z.string(),
    file: z.instanceof(File).optional(),
    isNew: z.boolean().optional(),
  }),
]);

export const schoolEditSchema = z.object({
  name: z.string().min(3).max(100),
  city: z.string().min(3).max(50),
  status: z.boolean().default(true),
  
  logo: z.union([
    z.string().url(),
    z.instanceof(File),
    z.null()
  ]).optional(),
  
  mainImage: z.union([
    z.string().url(),
    z.instanceof(File),
    z.null()
  ]).optional(),

  galleryImages: z.array(galleryImageSchema)
    .max(15, "No puedes subir más de 15 imágenes")
    .refine(
      (files) => files.every((file) => {
        if (typeof file === "string") return true;
        if (file instanceof File) {
          return ACCEPTED_IMAGE_TYPES.includes(file.type) && 
                 file.size <= MAX_FILE_SIZE;
        }
        if (file.file) {
          return ACCEPTED_IMAGE_TYPES.includes(file.file.type) && 
                 file.file.size <= MAX_FILE_SIZE;
        }
        return true;
      }),
      "Formato no soportado o tamaño excedido"
    )
    .default([]),
});

export type SchoolEditValues = z.infer<typeof schoolEditSchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;