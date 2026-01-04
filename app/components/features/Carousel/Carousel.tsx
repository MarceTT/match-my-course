"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { m, LazyMotion, domAnimation, useAnimation, useInView } from 'framer-motion';

const images = Array.from({ length: 26 }, (_, i) => `/schools/${i + 1}.png`);

const LOGO_WIDTH = 100; // Mitad del tamaño original

const Carousel = () => {
    const controls = useAnimation();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef);
  
    useEffect(() => {
      if (isInView) {
        controls.start({
          x: [0, -LOGO_WIDTH * images.length],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          },
        });
      } else {
        controls.stop();
      }
    }, [controls, isInView]);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bg-white py-2 overflow-hidden relative" ref={containerRef}>
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="absolute top-0 left-0 w-8 md:w-16 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-8 md:w-16 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
            <div className="overflow-hidden">
              <m.div
                className="flex items-center min-h-[60px] md:min-h-[80px]"
                animate={controls}
                style={{ width: `${images.length * LOGO_WIDTH * 2}px` }}
              >
                {[...images, ...images].map((src, index) => (
                  <m.div 
                    key={index} 
                    className="flex-shrink-0 px-2 md:px-3"
                    style={{ width: `${LOGO_WIDTH}px` }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Escuela asociada ${(index % images.length) + 1}`}
                      width={LOGO_WIDTH}
                      height={60}
                      className="rounded-md object-contain h-[50px] md:h-[60px] w-auto mx-auto"
                      loading="lazy"
                    />
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default Carousel;
