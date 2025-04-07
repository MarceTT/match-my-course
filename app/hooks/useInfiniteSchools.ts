import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/app/utils/axiosInterceptor";

const LIMIT = 8;

const fetchPaginatedSchools = async ({ pageParam = 1 }) => {
  const res = await axios.get(`/front/schools?page=${pageParam}&limit=${LIMIT}`);
  return {
    schools: res.data.data.schools,
    currentPage: res.data.data.currentPage,
    totalPages: res.data.data.totalPages,
  };
};

export const useInfiniteSchools = () => {
  return useInfiniteQuery({
    queryKey: ["infiniteSchools"],
    queryFn: fetchPaginatedSchools,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });
};
