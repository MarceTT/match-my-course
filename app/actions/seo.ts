import { cache } from "react";
import axiosServer from "@/app/utils/axiosServer";

export async function fetchSeoSchoolById(id: string) {
  const res = await axiosServer.get(`/seo/school/${id}`);
  return res.data.data;
}

// Canonical SeoEntry lives in @/lib/types/seo (unify-seo-entry). Imported for
// local use (fetchAllSeoEntries return type) and re-exported so consumers
// importing `SeoEntry` from @/app/actions/seo keep resolving without changes.
import type { SeoEntry } from "@/lib/types/seo";
export type { SeoEntry };

// React cache() deduplicates calls within the same request
// So generateMetadata, generateStaticParams, and Page all share one fetch
export const fetchAllSeoEntries = cache(async (): Promise<SeoEntry[]> => {
  const res = await axiosServer.get(`/seo/course/schools`);
  return res.data.data;
});