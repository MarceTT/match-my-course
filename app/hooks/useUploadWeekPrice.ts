import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInterceptor";

export function useUploadWeekPrice() {
    return useMutation({
      mutationFn: async ({ file, selectedColumns }: { file: File; selectedColumns: string[] }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("selectedColumns", JSON.stringify(selectedColumns));
  
        const response = await axiosInstance.post("/excel/upload-week-price", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        return response.data;
      },
      onError: (error: any) => {
        console.error("❌ Error al subir archivo:", error);
      },
    });
  }