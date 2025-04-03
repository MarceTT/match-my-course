import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { SchoolEditValues } from "@/app/admin/school/[id]/SchoolEditSchema";

export function useUpdateSchool(schoolId: string, onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: async (data: SchoolEditValues) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("status", data.status.toString());

      if (data.logo instanceof File) formData.append("logo", data.logo);
      if (data.mainImage instanceof File) formData.append("mainImage", data.mainImage);

      if (Array.isArray(data.galleryImages)) {
        data.galleryImages.forEach((img) => {
          if (img instanceof File) {
            formData.append("galleryImages", img);
          } else if (img?.file && img?.isNew) {
            formData.append("galleryImages", img.file);
          }
        });
      }

      const response = await axiosInstance.put(`/schools/${schoolId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
