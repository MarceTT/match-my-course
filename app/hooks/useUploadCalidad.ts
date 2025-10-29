import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";

export function useUploadCalidad() {
  return useMutation({
    mutationFn: async ({ file, selectedColumns }: { file: File; selectedColumns: string[] }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("selectedColumns", JSON.stringify(selectedColumns));

      const response = await axiosInstance.post("/excel/upload-calidad", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onError: (error: any) => {
      // console.error("❌ Error al subir archivo de calidad:", error);
    },
    onSuccess: (data) => {
//       console.log("✅ Archivo de calidad subido correctamente:", data);
    },
  });
} 
