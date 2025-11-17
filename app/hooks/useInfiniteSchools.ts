import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/app/utils/apiClient";
import { useEffect } from "react";

const LIMIT = 8;

interface SchoolData {
  _id: string;
  name: string;
  city: string;
  mainImage: string;
  ponderado?: number;
  prices?: Array<{
    horarios?: {
      precio?: string | number;
    };
  }>;
  lowestPrice?: number;
  courseTypes?: string[];
  cursosEos?: any[];
  generalEnglishPrice?: number;
  specificSchedule?: any;
}

interface PaginatedPage {
  schools: SchoolData[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

const fetchPaginatedSchools = async ({ pageParam = 2 }) => {
  const res = await axios.get(`/front/schools?page=${pageParam}&limit=${LIMIT}`);
  return {
    schools: res.data.data.schools,
    currentPage: res.data.data.currentPage,
    totalPages: res.data.data.totalPages,
    hasMore: res.data.data.hasMore
  };
};

export const useInfiniteSchools = (initialSchools: SchoolData[] = []) => {
  const queryClient = useQueryClient();

  // Initialize React Query with server-side data to prevent double fetch
  useEffect(() => {
    if (initialSchools.length > 0) {
      const existingData = queryClient.getQueryData(["infiniteSchools"]);

      // Only set data if not already set
      if (!existingData) {
        queryClient.setQueryData(
          ["infiniteSchools"],
          {
            pages: [
              {
                schools: initialSchools,
                currentPage: 1,
                totalPages: Math.ceil(100 / 12), // Assuming ~100 schools total
                hasMore: true,
              },
            ],
            pageParams: [1],
          }
        );
      }
    }
  }, [initialSchools, queryClient]);

  return useInfiniteQuery({
    queryKey: ["infiniteSchools"],
    queryFn: fetchPaginatedSchools,
    initialPageParam: 2, // Start from page 2 since page 1 is from server
    initialData: initialSchools.length > 0 ? {
      pages: [
        {
          schools: initialSchools,
          currentPage: 1,
          totalPages: Math.ceil(100 / 12),
          hasMore: true,
        },
      ],
      pageParams: [1],
    } : undefined,
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