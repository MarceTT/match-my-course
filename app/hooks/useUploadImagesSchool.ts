import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUploadSchoolImages() {
  const router = useRouter();

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
        router.push("/admin/school");
      }
    },
    onError: () => {
      toast.error("Error al crear la escuela. Inténtalo nuevamente.");
    },
  });
}
