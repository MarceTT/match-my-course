import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";
import { toast } from "sonner";

export function useUploadWeekRange(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: async ({ file, selectedColumns }: { file: File; selectedColumns: string[] }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("selectedColumns", JSON.stringify(selectedColumns));

      const response = await axiosInstance.post("/excel/upload-week-range", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Rango de semanas subido correctamente");
      onSuccessCallback?.(); // Llama al callback externo para limpiar estados
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al subir archivo de rango de semanas";
      toast.error(message);
      console.error("❌", message, error);
    },
  });
}
