import axiosInstance from "@/app/utils/axiosInterceptor";
import { School, SchoolDetails } from "@/app/types";

export const fetchSchools = async (): Promise<School[]> => {
  const res = await axiosInstance.get("/schools"); // ✅ El interceptor se encarga del token
  return res.data;
};


export const fetchSchoolById = async (id: string): Promise<SchoolDetails> => {
    const res = await axiosInstance.get(`/schools/${id}`);
    return res.data.data.school;
  };


  export const deleteSchoolImage = async (
    schoolId: string,
    imageKey: string,
    imageType: "logo" | "mainImage" | "galleryImages"
  ) => {
    try {
      const res = await axiosInstance.delete(`/schools/${schoolId}/deleteImage`, {
        data: { imageKey, imageType },
      });
  
      return res.data;
    } catch (error: any) {
      console.error("❌ Error desde deleteSchoolImage:", error);
      return { error: error?.response?.data?.message || "Error desconocido" };
    }
  };
  