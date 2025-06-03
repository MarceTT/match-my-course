"use client";

import Consultances from "../components/servicios/Consultances";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import HeroVisa from "../components/features/Hero/HeroVisa";

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
