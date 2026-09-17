import { defineConfig } from "vitest/config";

// Minimal Vitest setup for pure unit tests (no DOM needed yet).
// Mirrors the tsconfig `@/*` -> `./*` path alias so imports resolve.
export default defineConfig({
  resolve: {
    alias: {
      "@": import.meta.dirname,
    },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: ["node_modules", ".next", "dist"],
  },
});
