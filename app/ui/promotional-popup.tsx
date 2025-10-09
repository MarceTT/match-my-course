"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Megaphone, X, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { sendGTMEvent } from "../lib/gtm";

const POPUP_KEY = "popupOfertaDismissed";
const POPUP_INTERVAL_DAYS = 1; // Cada cuántos días reaparece

export default function PopupOferta({ scrollTrigger = 200 }: { scrollTrigger?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const shouldShowPopup = () => {
    const lastDismissed = localStorage.getItem(POPUP_KEY);
    if (!lastDismissed) return true;

    const lastDate = new Date(lastDismissed);
    const now = new Date();

    const diffDays = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays >= POPUP_INTERVAL_DAYS;
  };

  const markAsDismissed = () => {
    sendGTMEvent("popup_dismissed", {
        popup_name: "special_offer",
        page_path: window.location.pathname,
      });
    localStorage.setItem(POPUP_KEY, new Date().toISOString());
    setIsOpen(false);
  };

  const handleClickSchools = () => {
    sendGTMEvent("popup_cta_clicked", {
        popup_name: "special_offer",
        page_path: window.location.pathname,
        target_url: "/school-search?course=ingles-visa-de-trabajo",
      });
    markAsDismissed();
    router.push("/school-search?course=ingles-visa-de-trabajo");
  };

  // Mostrar solo cuando el usuario scrollea lo suficiente
  useEffect(() => {
    if (!shouldShowPopup()) return;

    const handleScroll = () => {
      if (window.scrollY > scrollTrigger) {
        setIsOpen(true);
        sendGTMEvent("popup_shown", {
            popup_name: "special_offer",
            page_path: window.location.pathname,
          });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTrigger]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-16 right-9 z-50 w-80 max-w-[90vw] rounded-lg shadow-xl border bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6 md:bottom-6 md:right-6 lg:bottom-6 lg:right-6 xl:bottom-6 xl:right-6 "
        >
          {/* Botón cerrar */}
          <button
            onClick={markAsDismissed}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 hover:bg-white transition-colors shadow-sm"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>

          {/* Contenido */}
          <div className="text-center">
            <div className="relative mx-auto mb-4 w-16 h-16">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full animate-pulse opacity-20"></div>
              <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full p-3 shadow-lg">
                <Megaphone className="h-8 w-8 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-400 animate-bounce" />
            </div>

            <h3 className="text-lg font-bold text-gray-800">
              ¡Oferta Especial!
            </h3>
            <p className="mt-2 text-sm text-gray-700">
              Hasta <span className="font-bold text-green-600">300 euros</span>{" "}
              de descuento en tu curso de{" "}
              <span className="font-semibold text-purple-600">6 meses</span>.
            </p>

            <Button
              size="sm"
              className="mt-4 w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleClickSchools}
            >
              Ver Escuelas
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>

            <p className="mt-3 text-xs text-gray-500">
              ⏰ Oferta válida para reservas hasta el 30 de noviembre
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
