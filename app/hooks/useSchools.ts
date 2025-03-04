"use client";

import { useQuery } from "@tanstack/react-query";
import { getSchools } from "@/app/admin/actions/school";
import { School } from "@/app/types";

export function useSchools() {
  return useQuery<School[]>({
    queryKey: ["schools"],
    queryFn: async () => {
      const result = await getSchools();
      if ("error" in result) {
        throw new Error(result.error);
      }
      return result;
    },
  });
}
