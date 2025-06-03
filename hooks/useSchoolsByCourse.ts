import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SchoolDetails } from "@/lib/types";
import filtersConfig from "../app/utils/filterConfig";

const normalize = (str: string): string =>
  str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\(.*?\)/g, "")
    .replace(/\+/g, "-")
    .replace(/--+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

const cityIdToLabel = (filtersConfig.cities?.options || []).reduce((acc, option) => {
  acc[option.id] = option.label;
  return acc;
}, {} as Record<string, string>);

const fetchSchoolsByCourse = async (filters: Record<string, any>): Promise<SchoolDetails[]> => {
  const params = new URLSearchParams();

  const course = filters.course?.[0] || "";

  const isVisaCourse = course.includes("visa-de-trabajo");

  Object.entries(filters).forEach(([key, value]) => {
    if (key === "weeks" && Array.isArray(value) && value.length > 0) {
      if (!isVisaCourse) {
        params.set("weeksMin", String(value[0]));
      }
    } else if (key === "cities" && Array.isArray(value) && value.length > 0) {
      const normalizedCities = value.map((id) => {
        const originalLabel = cityIdToLabel[id] || id;
        return normalize(originalLabel);
      });
      params.set("cities", normalizedCities.join(","));
    } else if (Array.isArray(value) && value.length > 0) {
      params.set(key, value.join(","));
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
    placeholderData: (previousData) => previousData,
  });
};

