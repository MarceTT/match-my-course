import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { SchoolEditValues } from "@/app/admin/school/[id]/SchoolEditSchema";

// 🛠️ Función utilitaria para verificar si es un archivo o blob
function isFileOrBlob(file: any): file is File | Blob {
  return file instanceof File || file instanceof Blob;
}

export function useUpdateSchool(
  schoolId: string,
  onSuccessCallback?: () => void
) {
  return useMutation({
    mutationFn: async (data: SchoolEditValues) => {
      console.log("🚀 Enviando datos al backend para actualizar escuela:");
      console.log("Nombre:", data.name);
      console.log("Ciudad:", data.city);
      console.log("Estado:", data.status);
      console.log("Logo es archivo:", isFileOrBlob(data.logo));
      console.log("MainImage es archivo:", isFileOrBlob(data.mainImage));
      console.log("Cantidad de imágenes en galería:", data.galleryImages?.length);

      data.galleryImages?.forEach((img, i) => {
        if (img instanceof File) {
          console.log(`🖼️ Imagen nueva ${i + 1}:`, img.name);
        } else if (img?.file && img?.isNew) {
          console.log(`🖼️ Imagen nueva ${i + 1} (desde objeto):`, img.file.name);
        }
      });

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("status", data.status.toString());

      if (isFileOrBlob(data.logo)) formData.append("logo", data.logo);
      if (isFileOrBlob(data.mainImage)) formData.append("mainImage", data.mainImage);

      if (Array.isArray(data.galleryImages)) {
        data.galleryImages.forEach((img) => {
          if (img instanceof File) {
            formData.append("galleryImages", img);
          } else if (img?.file && img?.isNew) {
            formData.append("galleryImages", img.file);
          }
        });
      }

      const response = await axiosInstance.put(
        `/schools/${schoolId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data) throw new Error("Error al actualizar la escuela");
      return response.data;
    },
    onSuccess: () => {
      toast.success("Escuela actualizada exitosamente ✅");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: any) => {
      toast.error("❌ Error al actualizar la escuela", {
        description: error?.message || "Ocurrió un problema",
      });
    },
  });
}
