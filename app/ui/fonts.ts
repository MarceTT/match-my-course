import { Raleway } from "next/font/google";

// Primary font - optimized for performance
// Reduced to only 2 weights (removed 600 for better performance)
export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"], // Only essential weights (normal and bold)
  display: "optional", // Changed from 'swap' to 'optional' for better LCP
  preload: true,
  variable: '--font-raleway',
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "arial", "sans-serif"],
  adjustFontFallback: true // Better font metric matching
});
