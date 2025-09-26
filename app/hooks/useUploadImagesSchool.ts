import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUploadSchoolImages() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.post("/schools", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: (result) => {
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Escuela creada exitosamente");
        queryClient.invalidateQueries({ queryKey: ["schools"] });
        router.push("/admin/school");
      }
    },
    onError: () => {
      toast.error("Error al crear la escuela. Inténtalo nuevamente.");
    },
  });
}
