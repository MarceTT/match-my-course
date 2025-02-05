"use client";
import React, { useEffect } from "react";
import Header from "../components/common/Header";
import HeroVisa from "../components/features/Hero/HeroVisa";
import Features from "../components/Features";
import Destinations from "../components/servicios/Destinations";
import Advisory from "../components/servicios/Advisory";
import Testimonials from "../components/servicios/Testimonials";
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
      {/* <Advisory />
      <Testimonials /> */}
      <Footer />
    </>
  );
};

export default ServicesHome;
