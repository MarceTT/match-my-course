"use client";

import { Suspense } from "react";
import HeroVisa from "../components/features/Hero/HeroVisa";
import Consultances from "../components/servicios/Consultances";
import { useScrollToTop } from "../hooks/useScrollToTop";

const ServicesHome = () => {
 
  useScrollToTop();

  return (
    <>
      <HeroVisa />
      <Suspense fallback={null}>
      <Consultances />
      </Suspense>
    </>
  );
};

export default ServicesHome;
