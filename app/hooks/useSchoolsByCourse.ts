// hooks/useSchoolsByCourse.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SchoolDetails } from "@/app/types/index";
import filtersConfig from "../utils/filterConfig";

const cityIdToLabel = (filtersConfig.cities?.options || []).reduce((acc, option) => {
  acc[option.id] = option.label;
  return acc;
}, {} as Record<string, string>);

const fetchSchoolsByCourse = async (filters: Record<string, any>): Promise<SchoolDetails[]> => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      if (key === "cities") {
        const originalCities = value.map((id) => cityIdToLabel[id] || id);
        params.set(key, originalCities.join(","));
      } else {
        params.set(key, value.join(","));
      }
    } else if (!Array.isArray(value) && value !== undefined && value !== null && value !== 0) {
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
