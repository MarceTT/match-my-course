// hooks/useSchoolsByCourse.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SchoolDetails } from "@/app/types/index";



const fetchSchoolsByCourse = async (filters: Record<string, any>): Promise<SchoolDetails[]> => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      params.set(key, value.join(","));
    } else if (!Array.isArray(value) && value !== undefined && value !== null && value !== 0 && value !== "") {
      params.set(key, String(value));
    }
  });

  const queryString = params.toString();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/front/schools-by-type?${queryString}`;

  const res = await axios.get(url);
  return res.data?.data?.schools ?? [];
};



export const useFilteredSchools = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["filtered-schools", filters],
    queryFn: () => fetchSchoolsByCourse(filters),
    enabled: Object.keys(filters).length > 0,
    staleTime: 1000 * 60 * 5,
  });
};
