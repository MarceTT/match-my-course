import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../app/utils/axiosInterceptor";

export function useUploadCalidad() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosInstance.post("/excel/upload-calidad", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },
    onError: (error) => {
      console.error("❌ Error al subir el archivo:", error);
    },
    onSuccess: (data) => {
      console.log("✅ Archivo subido correctamente:", data);
    },
  });
}
