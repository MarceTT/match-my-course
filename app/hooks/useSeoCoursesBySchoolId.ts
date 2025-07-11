import { useQuery } from "@tanstack/react-query";
import axiosServer from "@/app/utils/axiosServer";

export const useSeoCoursesBySchoolId = (schoolId: string) => {
  return useQuery({
    queryKey: ["seoCourses", schoolId],
    queryFn: async () => {
      const { data } = await axiosServer.get(`/seo/school/${schoolId}`);
      return data;
    },
    enabled: !!schoolId,
  });
};