"use client";

import { Suspense } from "react";
import { useReferralTracking } from "@/app/hooks/useReferralTracking";

function ReferralTracker() {
  useReferralTracking();
  return null;
}

export function ReferralTrackingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <ReferralTracker />
      </Suspense>
      {children}
    </>
  );
}
