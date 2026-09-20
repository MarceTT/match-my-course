"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";
import type {
  PlacementResultsResponse,
  PlacementResultResponse,
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
