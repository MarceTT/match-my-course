import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInterceptor";

export function useUploadDetalleAlojamiento() {
  return useMutation({
    mutationFn: async ({ file, selectedColumns }: { file: File; selectedColumns: string[] }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("selectedColumns", JSON.stringify(selectedColumns));

      const response = await axiosInstance.post("/excel/upload-detalle-alojamiento", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // success, message, data
    },
    onError: (error) => {
      console.error("❌ Error al subir archivo de alojamiento:", error);
    },
  });
}
