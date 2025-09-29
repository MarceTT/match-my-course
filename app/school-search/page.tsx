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

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};
