// hooks/useSchoolDetails.ts
import { useQuery } from "@tanstack/react-query";
import { SchoolDetailsResponse } from "@/lib/types";
import axios from "axios";

export const fetchSchoolById = async (id: string): Promise<SchoolDetailsResponse> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/front/school/${id}`);
  return res.data;
};

export const useSchoolDetails = (id: string) => {
  return useQuery({
    queryKey: ["school", id],
    queryFn: () => fetchSchoolById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
