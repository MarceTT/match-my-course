import { Suspense } from "react";
import type { Metadata } from "next";
import SchoolSearch from "./SchoolSerch";
import SuspenseLoader from "@/app/admin/components/SuspenseLoader";

export default function SchoolSearchPage() {
  return (
    <Suspense fallback={<SuspenseLoader fullscreen={false} />}>
      <SchoolSearch />
    </Suspense>
  );
}

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'https://matchmycourse.com'
).replace(/\/$/, '');
export const metadata: Metadata = {
  alternates: { canonical: `${ORIGIN}/school-search` },
  robots: { index: false, follow: true },
};
