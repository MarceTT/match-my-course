import { cache } from "react";
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

// React cache() deduplicates calls within the same request
// So generateMetadata, generateStaticParams, and Page all share one fetch
export const fetchAllSeoEntries = cache(async (): Promise<SeoEntry[]> => {
  const res = await axiosServer.get(`/seo/course/schools`);
  return res.data.data;
});