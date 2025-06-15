"use client";

import Hero from "./components/features/Hero/Hero";
import dynamic from "next/dynamic";
import SuspenseLoader from "./admin/components/SuspenseLoader";
import { Suspense } from "react";
import { Footer, Header } from "@matchmycourse/components/layout";

const SchoolPage = dynamic(() => import("./school/page"), { ssr: false });

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<SuspenseLoader fullscreen={false} />}>
        <Hero />
      </Suspense>
      <div className="container mx-auto px-6 py-16">
        <SchoolPage />
      </div>
      <Footer />
    </div>
  );
}