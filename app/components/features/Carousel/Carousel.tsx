"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from 'framer-motion';

const images = Array.from({ length: 26 }, (_, i) => `/schools/${i + 1}.png`);

const Carousel = () => {
    const controls = useAnimation();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef);
  
    useEffect(() => {
      if (isInView) {
        controls.start({
          x: [0, -200 * images.length],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          },
        });
      } else {
        controls.stop();
      }
    }, [controls, isInView]);

  return (
    <div className="bg-gray-100 py-12 overflow-hidden relative" ref={containerRef}>
        <h1 className="text-xl md:text-xl text-center mb-12 text-gray-900 font-bold">
          Trabajamos con más de 30 escuelas de inglés a nivel mundial y seguimos creciendo
        </h1>
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-100 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-100 to-transparent z-10"></div>
          <div className="overflow-hidden">
            <motion.div 
              className="flex min-h-[120px]"
              animate={controls}
              style={{ width: `${images.length * 200 * 2}px` }}
            >
              {[...images, ...images].map((src, index) => (
                <motion.div 
                  key={index} 
                  className="flex-shrink-0 w-[200px] px-2 min-h-[120px]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Escuela asociada ${index + 1}`}
                    width={180}
                    height={120}
                    className="rounded-lg shadow-md object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
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
