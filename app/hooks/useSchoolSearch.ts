import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Params = {
  q?: string;
  city?: string;
  courseType?: string;
  sortBy?: 'name' | 'minPrecio';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

export const useSchoolSearch = (params: Params) => {
  return useQuery({
    queryKey: ['schools', params],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/front/school-search`, { params });
      return data.data;
    },
    enabled: !!params.q || !!params.city // evita fetch vacío si no hay filtros
  });
};
