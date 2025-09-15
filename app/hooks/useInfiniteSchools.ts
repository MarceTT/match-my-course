import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/app/utils/apiClient";

const LIMIT = 8;


const fetchPaginatedSchools = async ({ pageParam = 1 }) => {
  const res = await axios.get(`/front/schools?page=${pageParam}&limit=${LIMIT}`);
  return {
    schools: res.data.data.schools,
    currentPage: res.data.data.currentPage,
    totalPages: res.data.data.totalPages,
    hasMore: res.data.data.hasMore
  };
};

export const useInfiniteSchools = () => {
  return useInfiniteQuery({
    queryKey: ["infiniteSchools"],
    queryFn: fetchPaginatedSchools,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    select: (data) => {
      // Combina correctamente todas las páginas
      return {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          schools: page.schools,
        })),
      };
    },
  });
};