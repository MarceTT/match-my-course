import type { Metadata } from "next";

import { dmSans } from "@/app/ui/fonts";

// Only the shared reset belongs here. Styles imported by a layout apply to
// EVERY route under it, so the landing's stylesheets used to reach all 21
// microsite pages and override their own: `style.css` sets
// `.hero h1 { color:#182445 }`, which turned the white hero headings on the
// programme pages dark. In the source each page loads only its own sheets, so
// each page imports its own here too.
//
// Every selector in them is scoped under `.mmc-microsite` (see the wrapper
// below). Without that scope the two sets of styles collide on generic class
// names: Tailwind emits its own `.container { width: 100% }`, which overrode
// the source's `.container { width: min(1160px, calc(100% - 48px)); margin: auto }`
// and flattened every page margin. Eight files outside this segment use
// Tailwind's container, so disabling it was not an option — scoping fixes the
// collision in both directions and keeps these sheets from leaking out.
// Last, so it wins: corrections against the root layout's critical CSS. Kept
// out of the ported sheets, which the port script rewrites wholesale.
import "./styles/microsite-overrides.css";

export const metadata: Metadata = {
  title: "Beneficios para estudiar inglés en el extranjero | MatchMyCourse",
};

export default function BeneficiosEmpresaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`mmc-microsite ${dmSans.className}`}>{children}</div>;
}
