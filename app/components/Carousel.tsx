"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = Array.from({ length: 26 }, (_, i) => `/schools/${i + 1}.png`);

const Carousel = () => {
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 15000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    variableWidth: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // Duplicar las imágenes para crear un efecto de bucle sin fin
  const duplicatedImages = [...images, ...images];

  if (!isClient) {
    return null; // No renderizar nada en el servidor
  }
  return (
    <div className="bg-gray-100 py-12 overflow-hidden relative">
        <h2 className="text-xl md:text-xl text-center mb-12 text-gray-900">
          Trabajamos con más de 30 escuelas de inglés a nivel mundial y seguimos creciendo
        </h2>
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-100 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-100 to-transparent z-10"></div>
          <Slider ref={sliderRef} {...settings}>
            {duplicatedImages.map((src, index) => (
              <div key={index} style={{ width: 200 }}>
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Carousel image ${(index % images.length) + 1}`}
                  width={160}
                  height={100}
                  className="rounded-lg shadow-md m-1"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <style jsx global>{`
        .slick-track {
          display: flex !important;
        }
        .slick-slide {
          height: inherit !important;
          display: flex !important;
          justify-content: center;
          align-items: center;
        }
        .slick-list {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
