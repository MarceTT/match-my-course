"use client";

import { useQuery } from "@tanstack/react-query";
import { School } from "@/app/types";
import axiosInstance from "@/app/utils/axiosInterceptor";

export function useSchools() {
  return useQuery<School[]>({
    queryKey: ["schools"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/schools");
      return data.data.schools;
    },
  });
}