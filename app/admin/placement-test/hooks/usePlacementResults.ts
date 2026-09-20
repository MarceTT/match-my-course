"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/apiClient";
import type {
  PlacementResultsResponse,
  PlacementResultResponse,
  DeletePlacementResultResponse,
} from "../types";

interface UsePlacementResultsParams {
  page?: number;
  limit?: number;
}

export function usePlacementResults(params?: UsePlacementResultsParams) {
  return useQuery<PlacementResultsResponse>({
    queryKey: ["placement-test", "results", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());

      const { data } = await axiosInstance.get(
        `/placement-test/results?${searchParams.toString()}`
      );
      return data;
    },
  });
}

export function usePlacementResult(id: string | null) {
  return useQuery<PlacementResultResponse>({
    queryKey: ["placement-test", "result", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/placement-test/results/${id}`
      );
      return data;
    },
    enabled: !!id,
  });
}

export function useDeletePlacementResult() {
  const queryClient = useQueryClient();
  return useMutation<DeletePlacementResultResponse, Error, string>({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.delete(
        `/placement-test/results/${id}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["placement-test", "results"] });
      toast.success("Resultado eliminado con éxito");
    },
    onError: () => {
      toast.error("Error al eliminar el resultado");
    },
  });
}
