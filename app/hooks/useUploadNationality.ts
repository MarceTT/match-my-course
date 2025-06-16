import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { toast } from "sonner";

interface UploadNationalityArgs {
  file: File;
  selectedColumns: string[];
}

export function useUploadNationality(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: async ({ file, selectedColumns }: UploadNationalityArgs) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("selectedColumns", JSON.stringify(selectedColumns));

      const response = await axiosInstance.post("/excel/upload-nationality", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Nacionalidades subidas correctamente");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al subir archivo nacionalidades";
      toast.error(message);
      console.error("❌", message, error);
    },
  });
}
