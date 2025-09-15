import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";
import { toast } from "sonner";

interface UploadExcelArgs {
  file: File;
  selectedColumns?: string[];
}

export function useUploadFile(
  endpoint: string,
  label: string,
  onSuccessCallback?: () => void
) {
  return useMutation({
    mutationFn: async ({ file, selectedColumns }: UploadExcelArgs) => {
      const formData = new FormData();
      formData.append("file", file);

      if (selectedColumns) {
        formData.append("selectedColumns", JSON.stringify(selectedColumns));
      }

      const response = await axiosInstance.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`${label} subido correctamente`);
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        `Error al subir archivo de ${label.toLowerCase()}`;
      toast.error(message);
      console.error("❌", message, error);
    },
  });
}
