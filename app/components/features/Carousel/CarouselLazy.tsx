"use client";

import dynamic from "next/dynamic";

// Lazy load Carousel - no es crítico para above-the-fold
const Carousel = dynamic(() => import("./Carousel"), {
  ssr: false,
  loading: () => null
});

export default function CarouselLazy() {
  return <Carousel />;
}
