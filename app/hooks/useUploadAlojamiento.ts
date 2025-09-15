import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/apiClient";

export function useUploadAlojamiento() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("/excel/upload-alojamiento", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onError: (error: any) => {
      console.error("❌ Error al subir el archivo de alojamiento:", error);
    },
  });
}