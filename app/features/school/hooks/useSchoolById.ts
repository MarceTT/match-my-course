"use client";

import { useQuery } from "@tanstack/react-query";
import { SchoolDetails } from "@/app/types";
import clientAxios from "@/app/utils/apiClient";

export function useSchoolById(schoolId: string) {
  return useQuery<SchoolDetails>({
    queryKey: ["school", schoolId],
    queryFn: async () => {
      const { data } = await clientAxios.get(`/schools/${schoolId}`);
      return data.data.school;
    },
    enabled: !!schoolId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}