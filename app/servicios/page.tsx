"use client";

import HeroVisa from "../components/features/Hero/HeroVisa";
import Consultances from "../components/servicios/Consultances";
import { useScrollToTop } from "../hooks/useScrollToTop";

const ServicesHome = () => {
 
  useScrollToTop();

  return (
    <>
      <HeroVisa />
      <Consultances />
    </>
  );
};

export default ServicesHome;
