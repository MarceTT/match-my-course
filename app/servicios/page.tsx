"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import HeroVisa from "../components/HeroVisa";
import Features from "../components/Features";
import Destinations from "../components/servicios-component/Destinations";
import Advisory from "../components/servicios-component/Advisory";
import Testimonials from "../components/servicios-component/Testimonials";
import Footer from "../components/Footer";

const page = () => {
  //crear una funcion o una hook para cuando llegue a esta pagina se vaya al top de inmediato
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Header />
      <HeroVisa />
      <Features />
      <Destinations />
      <Advisory />
      <Testimonials />
      <Footer />
    </>
  );
};

export default page;
