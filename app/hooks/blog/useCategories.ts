"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blog/category`);
      return Array.isArray(data.data) ? data.data : [];
    },
    staleTime: 1000 * 60 * 10, // Cache 10 min
    retry: 1,
  });
}
