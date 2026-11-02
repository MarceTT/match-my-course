import { DM_Sans, Raleway } from "next/font/google";

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

// Scoped to the /beneficios landing only, which is a faithful port of an
// existing design built on DM Sans. It is applied on that page's root wrapper,
// never globally, so the rest of the site keeps Raleway.
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-dm-sans",
  fallback: ["Inter", "Segoe UI", "Arial", "sans-serif"],
});
