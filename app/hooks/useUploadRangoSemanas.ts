import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInterceptor";

export function useUploadRangoSemanas() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosInstance.post("/excel/upload-week-range", formData, {
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
