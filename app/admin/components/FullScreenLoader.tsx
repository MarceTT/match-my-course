"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "@/public/logos/Logo_Match.png";
import { Loader2 } from "lucide-react";

interface FullScreenLoaderProps {
  isLoading: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <Image
                src={Logo} // Cambia esto a la ruta de tu logo
                alt="Logo"
                width={100}
                height={100}
                className="animate-pulse"
              />
            </motion.div>

            {/* <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }} // 🔥 Más rápido y fluido
            >
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            </motion.div> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenLoader;
