import axiosServer from "@/app/utils/axiosServer";

export async function fetchSeoSchoolById(id: string) {
  const res = await axiosServer.get(`/seo/school/${id}`);
  return res.data.data;
}


export type SeoEntry = {
    schoolId: string;
    categoria: string;
    subcategoria: string;
    escuela: string;
    ciudad: string;
    url: string;
    h1: string;
    metaTitle: string;
    metaDescription: string;
    keywordPrincipal: string;
  }

export async function fetchAllSeoEntries(): Promise<SeoEntry[]> {
    const res = await axiosServer.get(`/seo/course/schools`);
    return res.data.data;
}