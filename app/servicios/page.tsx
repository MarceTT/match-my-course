"use client";

import Header from "../components/common/Header";
import HeroVisa from "../components/features/Hero/HeroVisa";
import Features from "../components/Features";
import Footer from "../components/common/Footer";
import Consultances from "../components/servicios/Consultances";
import { useScrollToTop } from "../hooks/useScrollToTop";

const ServicesHome = () => {
 
  useScrollToTop();

  return (
    <>
      <Header />
      <HeroVisa />
      <Features />
      <Consultances />
      <Footer />
    </>
  );
};

export default ServicesHome;
