import { useQueryClient } from "@tanstack/react-query";
import { fetchSchoolById } from "./useSchoolDetails";

export const usePrefetchSchoolDetails = () => {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ["school", id],
      queryFn: () => fetchSchoolById(id),
      staleTime: 1000 * 60 * 5,
    });
  };
};
