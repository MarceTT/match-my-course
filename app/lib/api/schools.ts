import axiosInstance from "@/app/utils/axiosInterceptor";
import { School, SchoolDetails } from "@/app/types";
import axios from "axios";

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
    imageType: string
  ) => {
    try {
      const res = await axiosInstance.post(`/schools/${schoolId}/deleteImage`, {
        imageKey,
        imageType,
      });
      
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      
      return res.data;
    } catch (error) {
      console.error("❌ Error desde deleteSchoolImage:", error);
      if (axios.isAxiosError(error)) {
        return { 
          error: error.response?.data?.message || 
                error.message || 
                "No se pudo eliminar la imagen" 
        };
      }
      return { 
        error: error instanceof Error ? error.message : "No se pudo eliminar la imagen" 
      };
    }
  };
  