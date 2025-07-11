"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MIN_SCROLL_UP_THRESHOLD = 0.3; // 30% of viewport height
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
      target.scrollIntoView({ behavior: "smooth" });
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

      if (bookingVisible) {
        setIsVisible(false);
        return;
      }

      const scrollingUp = currentY < lastScrollY.current;
      const scrolledUpEnough = lastScrollY.current - currentY > window.innerHeight * MIN_SCROLL_UP_THRESHOLD;
      const scrolledDownEnough = currentY > MIN_SCROLL_DOWN_THRESHOLD;

      if (scrollingUp && scrolledUpEnough) {
        setIsVisible(true);
      } else if (!scrollingUp && !bookingVisible && scrolledDownEnough) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
          className="fixed bottom-4 left-4 right-4 z-50 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-full shadow-md md:hidden"
        >
          Reserva aquí
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToBookingButton;
