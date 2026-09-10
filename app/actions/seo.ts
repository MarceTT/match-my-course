import { cache } from "react";
import axiosServer from "@/app/utils/axiosServer";

// Canonical SeoEntry lives in @/lib/types/seo (unify-seo-entry). Imported for
// local use (fetch return types) and re-exported so consumers importing
// `SeoEntry` from @/app/actions/seo keep resolving without changes.
import type { SeoEntry, SeoEntryDocument } from "@/lib/types/seo";
export type { SeoEntry };

// GET /seo/school/:id returns the persisted course SEO documents (with _id/__v)
// for a single school → SeoEntryDocument[].
export async function fetchSeoSchoolById(id: string): Promise<SeoEntryDocument[]> {
  const res = await axiosServer.get(`/seo/school/${id}`);
  return res.data.data;
}

// React cache() deduplicates calls within the same request
// So generateMetadata, generateStaticParams, and Page all share one fetch
export const fetchAllSeoEntries = cache(async (): Promise<SeoEntry[]> => {
  const res = await axiosServer.get(`/seo/course/schools`);
  return res.data.data;
});