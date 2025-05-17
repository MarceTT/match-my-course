"use client";

import HeroVisa from "../components/features/Hero/HeroVisa";
import Features from "../components/Features";
import Consultances from "../components/servicios/Consultances";
import { useScrollToTop } from "../hooks/useScrollToTop";

const ServicesHome = () => {
 
  useScrollToTop();

  return (
    <>
      <HeroVisa />
      <Features />
      <Consultances />
    </>
  );
};

export default ServicesHome;
