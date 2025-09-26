import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "@/app/utils/apiClient";
import { SchoolEditValues, GalleryImage } from "@/app/admin/school/[id]/SchoolEditSchema";

export function useUpdateSchool(
  schoolId: string,
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SchoolEditValues) => {
      const formData = new FormData();
      
      // 1. Datos básicos
      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("status", String(data.status));
      formData.append("urlVideo", data.urlVideo || "");
      if (data.country) {
        formData.append("country", data.country);
      }

      // 2. Logo - manejo seguro de tipos
      if (data.logo instanceof File) {
        formData.append("logo", data.logo);
      } else if (data.logo === null) {
        formData.append("removeLogo", "true");
      }

      // 3. Imagen principal - manejo seguro de tipos
      if (data.mainImage instanceof File) {
        formData.append("mainImage", data.mainImage);
      } else if (data.mainImage === null) {
        formData.append("removeMainImage", "true");
      }

      // 4. Galería - procesamiento seguro según schema
      const galleryImages = data.galleryImages || [];
      const existingUrls: string[] = [];
      const newImages: File[] = [];

      galleryImages.forEach((item) => {
        // Caso 1: Es string (URL existente)
        if (typeof item === 'string') {
          existingUrls.push(item);
        } 
        // Caso 2: Es File (imagen nueva)
        else if (item instanceof File) {
          newImages.push(item);
        }
        // Caso 3: Es objeto GalleryImage
        else if (typeof item === 'object' && item !== null) {
          if (item.file instanceof File) {
            newImages.push(item.file);
          }
          if (item.url) {
            existingUrls.push(item.url);
          }
        }
      });

      // Agregar nuevas imágenes al FormData
      newImages.forEach(file => {
        formData.append("galleryImages", file);
      });

      // Orden de galería (combinando existentes y nuevas)
      formData.append("galleryOrder", JSON.stringify([
        ...existingUrls,
        ...newImages.map(() => 'new') // Marcador para nuevas
      ]));

      // Enviar la solicitud
      const response = await axios.put(`/schools/${schoolId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      toast.success("Escuela actualizada exitosamente ✅");
      // Ensure admin list reflects latest changes
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`❌ Error: ${errorMessage}`);
      console.error("Error details:", error);
    },
  });
}
