"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";

export interface Tag {
  _id: string;
  name: string;
  slug: string;
}

export function useTags() {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blog/tag`);
      return Array.isArray(data.data) ? data.data : [];
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
