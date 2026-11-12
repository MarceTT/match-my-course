import localFont from "next/font/local";

// Primary font - optimized for performance
// Reduced to only 2 weights (removed 600 for better performance)
// SELF-HOSTED, not `next/font/google`. The Google loader downloads at BUILD
// time, so every production build depended on Google Fonts answering. That
// dependency took down a Railway deploy (see #100) and then blocked local
// builds twice in a row with the same crash:
//   TypeError: Cannot read properties of null (reading '1')
//   at @next/font/dist/google/loader.js:122  // /\.(woff|woff2|...)$/.exec(url)[1]
// Raleway is a variable font, so one file covers 400-700.
export const raleway = localFont({
  src: "./fonts/Raleway-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "optional", // kept from the previous config for LCP
  preload: true,
  variable: "--font-raleway",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "arial", "sans-serif"],
});

// Scoped to the ported /beneficios microsite, a faithful clone of a design
// built on DM Sans. Applied on those pages' root wrapper, never globally, so
// the rest of the site keeps Raleway.
//
// SELF-HOSTED ON PURPOSE, not `next/font/google`. Two reasons, both learned
// from a failed Railway deploy:
//
// 1. DM Sans is a VARIABLE font — Google serves it as a single file with
//    `font-weight: 400 800`. Requesting five static weights made the Google
//    loader fetch per-weight URLs and crash on
//    `/\.(woff|woff2|eot|ttf|otf)$/.exec(url)[1]` when the regex returned null.
// 2. More importantly, `next/font/google` downloads at BUILD time, so the
//    production build depended on Google Fonts answering correctly. A deploy
//    must not fail because a third party had a bad minute.
//
// The file is the exact latin woff2 Google serves, committed to the repo. Same
// rendering, zero network dependency during the build.
export const dmSans = localFont({
  src: "./fonts/DMSans-Variable.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-dm-sans",
  fallback: ["Inter", "Segoe UI", "Arial", "sans-serif"],
});
