import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface School {
  _id: string;
  name: string;
  city: string;
  [key: string]: any;
}

export interface SchoolApiResponse {
  schools: School[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface UseInfiniteSchoolsParams {
  filters: Record<string, any>;
  limit?: number;
}

export const useInfiniteSchools = ({ filters, limit = 10 }: UseInfiniteSchoolsParams) => {
  return useInfiniteQuery<SchoolApiResponse>({
    queryKey: ['schools', filters],
    queryFn: async ({ pageParam }: { pageParam: unknown }) => {
        // console.log("Calling backend with filters", filters, "and page", pageParam);
      const currentPage = typeof pageParam === 'number' ? pageParam : 1;

      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('limit', limit.toString());

      for (const key in filters) {
        const value = filters[key];
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      }

      const res = await axios.get<SchoolApiResponse>(`/school-search?${params.toString()}`);
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 15, // 15 minutos para búsquedas
    refetchOnWindowFocus: false,
  });
};
