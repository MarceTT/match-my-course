"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/apiClient";

interface SubmitPostArgs {
  postId?: string;
  values: Record<string, any>;
  coverImage?: File | null;
  selectedTags?: string[];
  publish?: boolean;
  onSuccessCallback?: () => void;
}

export function useSubmitPost() {
  return useMutation({
    mutationFn: async ({
      postId,
      values,
      coverImage,
      selectedTags = [],
      publish = true,
    }: SubmitPostArgs) => {
      const formData = new FormData();

      // Agregar todos los campos básicos
      Object.entries(values).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          formData.append(key, val as string);
        }
      });

      // Asegurar que los tags se envíen en JSON
      formData.delete("tags");
      values.tags.forEach((tagId: string) => {
        formData.append("tags", tagId);
      });

      // Adjuntar imagen solo si existe (nombre debe coincidir con multer.fields)
      if (coverImage) {
        formData.append("coverImage", coverImage);
      } else if (values.coverImage) {
        // Si hay una imagen existente (en caso de edición)
        formData.append("coverImage", values.coverImage);
      }

      // Publicado o borrador
      formData.append("published", String(publish));

      // Enviar a API
      const url = postId ? `/blog/post/${postId}` : `/blog/post`;
      const method = postId ? axiosInstance.put : axiosInstance.post;

      const response = await method(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },

    onSuccess: (_, { onSuccessCallback }) => {
      toast.success("Post guardado exitosamente ✅");
      onSuccessCallback?.();
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`❌ Error al guardar post: ${errorMessage}`);
      // console.error("Error detalles:", error);
    },
  });
}
