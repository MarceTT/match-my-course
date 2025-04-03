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
    id: string,
    imageKey: string,
    imageType: "galleryImages" | "logo" | "mainImage"
  ): Promise<any> => {
    const response = await axiosInstance.delete(`/schools/${id}/deleteImage`, {
      data: { imageKey, imageType },
    });
  
    return response.data;
  };