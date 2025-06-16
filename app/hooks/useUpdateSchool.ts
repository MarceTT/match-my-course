import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { SchoolEditValues } from "@/app/admin/school/[id]/SchoolEditSchema";

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
      console.log("📤 Galería antes de enviar:", data.galleryImages);

      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("status", data.status.toString());

      if (isFileOrBlob(data.logo)) formData.append("logo", data.logo);
      if (isFileOrBlob(data.mainImage)) formData.append("mainImage", data.mainImage);

      const galleryToSend = (Array.isArray(data.galleryImages)
        ? data.galleryImages
        : []
      ).filter((img: any) =>
        img && (img instanceof File || (img?.file instanceof File && img?.isNew))
      );

      const galleryOrder: string[] = [];

      for (const img of data.galleryImages || []) {
        if (typeof img === "string") {
          galleryOrder.push(img);
        } else if (img?.url && !img?.isNew) {
          galleryOrder.push(img.url);
        }
      }

      if (galleryToSend.length > 0) {
        for (const img of galleryToSend) {
          const fileToSend =
            img instanceof File ? img : img?.file instanceof File ? img.file : null;

          if (fileToSend) {
            formData.append("galleryImages", fileToSend);
            console.log("📦 Enviando imagen:", fileToSend.name);
          }
        }
      }

      formData.append("galleryOrder", JSON.stringify(galleryOrder));

      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`📦 ${pair[0]}:`, {
            name: (pair[1] as File).name,
            type: (pair[1] as File).type,
            size: (pair[1] as File).size,
          });
        } else {
          console.log(`📦 ${pair[0]}: ${pair[1]}`);
        }
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
