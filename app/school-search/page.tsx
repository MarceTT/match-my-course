import { Suspense } from "react";
import SchoolSearch from "./SchoolSearch";
import SuspenseLoader from "@/app/admin/components/SuspenseLoader";

export default function SchoolSearchPage() {
  return (
    <Suspense fallback={<SuspenseLoader fullscreen={false} />}>
      <SchoolSearch />
    </Suspense>
  );
}