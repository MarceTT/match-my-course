"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MIN_SCROLL_DOWN_THRESHOLD = 100; // Show button if scrolled at least 100px down

const ScrollToBookingButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const lastScrollY = useRef(0);

  const checkBookingVisibility = () => {
    const target = document.getElementById("booking-pannel");
    if (!target) return false;
    const rect = target.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };


  const scrollToBooking = () => {
    const target = document.getElementById("booking-pannel");
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
  
      setHasClicked(true);
      setTimeout(() => {
        if (checkBookingVisibility()) {
          setIsVisible(false);
        }
      }, 600);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const bookingVisible = checkBookingVisibility();
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;

      // Si el formulario es visible, NUNCA mostrar el botón
      if (bookingVisible) {
        setIsVisible(false);
        lastScrollY.current = currentY;
        return;
      }

      // Solo mostrar el botón cuando:
      // 1. El formulario NO es visible (está arriba, fuera de vista)
      // 2. El usuario ha hecho scroll suficiente hacia abajo
      // 3. El usuario está haciendo scroll hacia abajo
      const scrolledEnough = currentY > MIN_SCROLL_DOWN_THRESHOLD;

      if (scrollingDown && scrolledEnough && !bookingVisible) {
        setIsVisible(true);
      }
      // El botón permanece visible cuando se hace scroll hacia arriba
      // Solo desaparece cuando el formulario se vuelve visible

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check inicial al montar
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-button"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
          onClick={scrollToBooking}
          className="fixed bottom-4 left-4 right-4 z-50 bg-[#fe6361] hover:bg-red-500 text-white text-lg font-semibold py-3 rounded-full shadow-md md:hidden"
        >
         Precios
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToBookingButton;
