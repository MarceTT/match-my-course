import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { SchoolEditValues, GalleryImage } from "@/app/admin/school/[id]/SchoolEditSchema";

// Tipo guard para verificar si es un objeto de imagen de galería
function isGalleryImageObject(obj: any): obj is GalleryImage {
  return obj && typeof obj === 'object' && 'url' in obj;
}

export function useUpdateSchool(
  schoolId: string,
  onSuccessCallback?: () => void
) {
  return useMutation({
    mutationFn: async (data: SchoolEditValues) => {
      const formData = new FormData();
      
      // 1. Agregar datos básicos
      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("status", data.status.toString());

      // 2. Manejo del logo
      if (data.logo === null) {
        formData.append("removeLogo", "true");
      } else if (data.logo instanceof File) {
        formData.append("logo", data.logo);
      } else if (typeof data.logo === 'string') {
        formData.append("logoUrl", data.logo);
      }

      // 3. Manejo de la imagen principal
      if (data.mainImage === null) {
        formData.append("removeMainImage", "true");
      } else if (data.mainImage instanceof File) {
        formData.append("mainImage", data.mainImage);
      } else if (typeof data.mainImage === 'string') {
        formData.append("mainImageUrl", data.mainImage);
      }

      // 4. Procesar galería de imágenes
      const galleryImages = Array.isArray(data.galleryImages) ? data.galleryImages : [];
      const newImages: File[] = [];
      const existingImages: string[] = [];

      galleryImages.forEach((img) => {
        if (img instanceof File) {
          newImages.push(img);
        } else if (typeof img === 'string') {
          existingImages.push(img);
        } else if (isGalleryImageObject(img)) {
          if (img.file instanceof File) {
            newImages.push(img.file);
          } else if (img.url) {
            existingImages.push(img.url);
          }
        }
      });

      // Agregar nuevas imágenes
      newImages.forEach((file, index) => {
        formData.append(`galleryNew_${index}`, file);
      });

      // Agregar orden de imágenes existentes
      formData.append("galleryOrder", JSON.stringify(existingImages));

      // Debug: Mostrar contenido del FormData
      if (process.env.NODE_ENV === 'development') {
        console.group('📤 Datos enviados al servidor');
        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(`${key}:`, {
              name: value.name,
              type: value.type,
              size: `${(value.size / 1024).toFixed(2)} KB`
            });
          } else {
            console.log(`${key}:`, value);
          }
        }
        console.groupEnd();
      }

      // Enviar la solicitud
      const response = await axiosInstance.put(`/schools/${schoolId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data) {
        throw new Error("La respuesta del servidor no contiene datos");
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Escuela actualizada exitosamente ✅");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: Error) => {
      console.error("Error al actualizar escuela:", error);
      
      const errorMessage = error.message || 
        (error as any)?.response?.data?.message || 
        "Ocurrió un error al actualizar la escuela";
      
      toast.error("❌ Error al actualizar la escuela", {
        description: errorMessage,
        action: {
          label: "Reintentar",
          onClick: () => window.location.reload(),
        },
      });
    },
  });
}