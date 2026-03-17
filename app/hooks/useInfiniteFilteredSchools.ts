import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { SchoolDetails } from "@/app/lib/types";
import filtersConfig from "@/app/utils/filterConfig";

const normalize = (str: string): string =>
  str.normalize("NFD")
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

const LIMIT = 8;

const fetchPaginatedSchools = async ({ pageParam = 1, filters }: { pageParam?: number; filters: Record<string, any> }): Promise<any> => {
  const params = new URLSearchParams();

  const course = filters.course?.[0] || "";
  const isVisaCourse = course.includes("visa-de-trabajo");

  Object.entries(filters || {}).forEach(([key, value]) => {
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

  params.set("page", String(pageParam));
  params.set("limit", String(LIMIT));

  const queryString = params.toString();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/front/schools-by-type?${queryString}`;

  const res = await axios.get(url);

  return {
    schools: res.data?.data?.schools || [],
    currentPage: res.data?.data?.pagination?.currentPage || 1,
    totalPages: res.data?.data?.pagination?.totalPages || 1,
  };
};

export const useInfiniteFilteredSchools = (
  filters: Record<string, any> | undefined,
  initialData?: { schools: any[]; currentPage: number; totalPages: number }
) => {
  // Solo usar initialData si no hay filtros de ciudad o semanas custom
  // (es decir, solo para la carga inicial sin filtros)
  const hasCustomFilters = filters?.cities?.length > 0 || 
    (filters?.weeks?.[0] && filters.weeks[0] !== 1);
  
  return useInfiniteQuery({
    queryKey: ["infinite-schools", filters],
    queryFn: ({ pageParam = 1 }) => fetchPaginatedSchools({ pageParam, filters: filters || {} }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    // Solo usar initialData si NO hay filtros custom (primera carga)
    initialData: (!hasCustomFilters && initialData) ? {
      pages: [initialData],
      pageParams: [1],
    } : undefined,
    // No mantener datos viejos cuando cambian filtros
    placeholderData: undefined,
    retry: 1,
    // Reducir staleTime para que refetch más rápido
    staleTime: 1000 * 30, // 30 segundos
    enabled: !!filters && Object.keys(filters).length > 0,
  });
};
