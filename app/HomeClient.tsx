"use client";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import dynamic from "next/dynamic";
import SuspenseLoader from "./admin/components/SuspenseLoader";
import { Suspense } from "react";

const Hero = dynamic(() => import("./components/features/Hero/Hero"), { ssr: false });
const Carousel = dynamic(() => import("./components/features/Carousel/Carousel"), { ssr: false });
const Features = dynamic(() => import("./components/Features"), { ssr: false });
const SchoolPage = dynamic(() => import("./school/page"), { ssr: false });

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<SuspenseLoader fullscreen={false} />}>
        <Hero />
      </Suspense>
      <Carousel />
      <Features />
      <div className="container mx-auto px-6 py-16">
        <SchoolPage />
      </div>
      <Footer />
    </div>
  );
}