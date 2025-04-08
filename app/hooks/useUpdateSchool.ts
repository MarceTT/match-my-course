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
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("status", data.status.toString());

      if (isFileOrBlob(data.logo)) formData.append("logo", data.logo);
      if (isFileOrBlob(data.mainImage)) formData.append("mainImage", data.mainImage);

      if (Array.isArray(data.galleryImages)) {
        data.galleryImages.forEach((img) => {
          if (img && typeof img === "object" && "file" in img && img.isNew) {
            formData.append("galleryImages", img.file);
          } else if (img instanceof File) {
            formData.append("galleryImages", img);
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
