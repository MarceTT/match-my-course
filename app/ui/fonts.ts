import {Raleway, Nunito} from "next/font/google";

// Primary font - preload for critical performance
export const raleway = Raleway({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"], // Only most used weights
  display: "swap",
  preload: true,
  variable: '--font-raleway',
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "arial", "sans-serif"]
});

// Secondary font - lazy load to reduce initial bundle
export const nunito = Nunito({ 
  subsets: ["latin"], 
  weight: ["400", "600"], // Minimal weights for secondary font
  display: "swap", 
  preload: false, // Don't preload secondary font
  variable: '--font-nunito',
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "arial", "sans-serif"]
});
