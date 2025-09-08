"use client";

import { useQuery } from "@tanstack/react-query";
import { SchoolDetails } from "@/app/types";
import axiosInstance from "@/app/utils/axiosInterceptor";

export function useSchoolById(schoolId: string) {
  return useQuery<SchoolDetails>({
    queryKey: ["school", schoolId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/schools/${schoolId}`);
      console.log("📦 [useSchoolById] response:", data);
      return data.data.school;
    },
    enabled: !!schoolId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}